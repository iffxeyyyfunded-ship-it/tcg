-- TCG FUNDED - Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  country TEXT,
  discord_username TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending','submitted','approved','rejected')),
  kyc_submitted_at TIMESTAMPTZ,
  kyc_approved_at TIMESTAMPTZ,
  affiliate_code TEXT UNIQUE DEFAULT UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)),
  referred_by UUID REFERENCES public.profiles(id),
  total_affiliate_earnings DECIMAL(12,2) DEFAULT 0,
  role TEXT DEFAULT 'trader' CHECK (role IN ('trader', 'admin', 'super_admin', 'support')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);

-- ============================================
-- ADMINS
-- ============================================
CREATE TABLE public.admins (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin','super_admin','support')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACCOUNTS (funded trading accounts)
-- ============================================
CREATE TABLE public.accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  account_number TEXT UNIQUE NOT NULL DEFAULT 'TCG-' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)),
  
  -- Account Configuration
  market TEXT NOT NULL CHECK (market IN ('forex','crypto','futures')),
  account_size DECIMAL(12,2) NOT NULL,
  drawdown_type TEXT NOT NULL CHECK (drawdown_type IN ('intraday_trailing','eod_trailing','classic','static')),
  
  -- Status
  status TEXT DEFAULT 'pending_kyc' CHECK (status IN (
    'pending_kyc','active','breached','payout_requested','suspended','closed'
  )),
  
  -- Financial Tracking
  starting_balance DECIMAL(12,2) NOT NULL,
  current_balance DECIMAL(12,2) NOT NULL,
  peak_balance DECIMAL(12,2) NOT NULL,
  all_time_profit DECIMAL(12,2) DEFAULT 0,
  current_drawdown_pct DECIMAL(5,2) DEFAULT 0,
  max_drawdown_pct DECIMAL(5,2) NOT NULL,
  
  -- Payout Rules
  buffer_zone_pct DECIMAL(4,2) NOT NULL DEFAULT 5.00,
  min_trading_days INT NOT NULL DEFAULT 5,
  consistency_rule_pct DECIMAL(4,2) NOT NULL DEFAULT 30.00,
  profit_goal_pct DECIMAL(4,2) NOT NULL DEFAULT 3.00,
  
  -- Payout Pool
  current_score DECIMAL(10,4) DEFAULT 0,
  total_payouts_received DECIMAL(12,2) DEFAULT 0,
  payout_eligible BOOLEAN DEFAULT FALSE,
  
  -- Add-ons purchased
  addon_reduced_days BOOLEAN DEFAULT FALSE,
  addon_no_consistency BOOLEAN DEFAULT FALSE,
  addon_multiplier_boost DECIMAL(4,2) DEFAULT 1.0,
  addon_account_revival BOOLEAN DEFAULT FALSE,
  addon_leverage_powerup BOOLEAN DEFAULT FALSE,
  addon_drawdown_boost BOOLEAN DEFAULT FALSE,
  
  -- Effective leverage (after add-ons)
  effective_leverage INT DEFAULT 100,
  
  -- Dates
  activated_at TIMESTAMPTZ,
  breached_at TIMESTAMPTZ,
  last_trade_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own accounts" ON public.accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins full access accounts" ON public.accounts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);

-- ============================================
-- ORDERS (checkout / purchases)
-- ============================================
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  
  -- Product Details
  market TEXT NOT NULL,
  account_size DECIMAL(12,2) NOT NULL,
  drawdown_type TEXT NOT NULL,
  
  -- Pricing
  base_price DECIMAL(10,2) NOT NULL,
  addons_price DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  coupon_code TEXT,
  final_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  
  -- Add-ons
  addons JSONB DEFAULT '{}',
  
  -- Payment
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT UNIQUE,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  paid_at TIMESTAMPTZ,
  
  -- Account created from this order
  account_id UUID REFERENCES public.accounts(id),
  
  -- Affiliate
  referred_by_code TEXT,
  affiliate_commission DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins full access orders" ON public.orders FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid())
);

-- ============================================
-- PAYOUT POOL (weekly pools)
-- ============================================
CREATE TABLE public.payout_pools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  week_start DATE NOT NULL UNIQUE,
  week_end DATE NOT NULL,
  
  -- Revenue this week
  gross_revenue DECIMAL(12,2) DEFAULT 0,
  operating_costs DECIMAL(12,2) DEFAULT 0,
  pool_allocation_pct DECIMAL(4,2) DEFAULT 40.00,
  pool_amount DECIMAL(12,2) DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open','calculating','distributed','closed')),
  
  -- Total scores
  total_scores DECIMAL(14,4) DEFAULT 0,
  total_payouts_distributed DECIMAL(12,2) DEFAULT 0,
  total_traders_paid INT DEFAULT 0,
  
  distributed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payout_pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pools" ON public.payout_pools FOR SELECT USING (true);

-- ============================================
-- PAYOUT REQUESTS
-- ============================================
CREATE TABLE public.payout_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  account_id UUID REFERENCES public.accounts(id) NOT NULL,
  pool_id UUID REFERENCES public.payout_pools(id),
  
  -- Score & Share
  score DECIMAL(10,4) NOT NULL,
  pool_share_pct DECIMAL(8,6),
  payout_amount DECIMAL(12,2),
  
  -- Payment
  payment_method TEXT DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer','crypto')),
  payment_details JSONB,
  
  -- Status
  status TEXT DEFAULT 'requested' CHECK (status IN (
    'requested','approved','processing','paid','denied','cancelled'
  )),
  
  -- Dates (Friday to Monday process)
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own payouts" ON public.payout_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create payout requests" ON public.payout_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- REVENUE (for transparency dashboard)
-- ============================================
CREATE TABLE public.revenue_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE NOT NULL,
  market TEXT NOT NULL,
  gross_revenue DECIMAL(12,2) NOT NULL,
  pool_contribution DECIMAL(12,2) NOT NULL,
  operating_costs DECIMAL(12,2) NOT NULL,
  company_profit DECIMAL(12,2) NOT NULL,
  new_accounts INT DEFAULT 0,
  active_accounts INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.revenue_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read revenue" ON public.revenue_records FOR SELECT USING (true);

-- ============================================
-- COUPONS
-- ============================================
CREATE TABLE public.coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage','fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  applies_to JSONB DEFAULT '{"markets": ["forex","crypto","futures"], "account_sizes": "all"}',
  max_uses INT,
  current_uses INT DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active coupons" ON public.coupons FOR SELECT USING (is_active = true);

-- Insert default coupons
INSERT INTO public.coupons (code, description, discount_type, discount_value) VALUES
('WELCOME20', 'Welcome discount 20% off', 'percentage', 20),
('TCG10', '10% off any account', 'percentage', 10),
('LAUNCH50', 'Launch special 50% off', 'percentage', 50);

-- ============================================
-- TRADING DAYS LOG (for score calculation)
-- ============================================
CREATE TABLE public.trading_days (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id UUID REFERENCES public.accounts(id) NOT NULL,
  trade_date DATE NOT NULL,
  daily_profit_pct NUMERIC NOT NULL,
  daily_profit_usd NUMERIC NOT NULL,
  lots_traded NUMERIC,
  trades_count INT,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(account_id, trade_date)
);

-- ============================================
-- AFFILIATE COMMISSIONS
-- ============================================
CREATE TABLE public.affiliate_commissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  affiliate_id UUID REFERENCES public.profiles(id) NOT NULL,
  referred_user_id UUID REFERENCES public.profiles(id),
  order_id UUID REFERENCES public.orders(id),
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_pct DECIMAL(4,2) DEFAULT 10.00,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','paid')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.affiliate_commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Affiliates can read own commissions" ON public.affiliate_commissions FOR SELECT USING (auth.uid() = affiliate_id);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info','success','warning','error','payout')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update updated_at on profiles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER accounts_updated_at BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ============================================
-- VIEWS (for transparency dashboard)
-- ============================================

CREATE OR REPLACE VIEW public.transparency_stats AS
SELECT
  COALESCE(SUM(gross_revenue), 0) as total_revenue,
  COALESCE(SUM(pool_contribution), 0) as total_pool_contributions,
  COALESCE(SUM(operating_costs), 0) as total_operating_costs,
  COALESCE(SUM(company_profit), 0) as total_company_profit,
  COALESCE(SUM(new_accounts), 0) as total_accounts_created
FROM public.revenue_records;

CREATE OR REPLACE VIEW public.weekly_pool_summary AS
SELECT
  pp.*,
  COUNT(pr.id) as payout_count,
  COALESCE(SUM(pr.payout_amount), 0) as total_paid
FROM public.payout_pools pp
LEFT JOIN public.payout_requests pr ON pr.pool_id = pp.id AND pr.status = 'paid'
GROUP BY pp.id
ORDER BY pp.week_start DESC;

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX idx_accounts_user_id ON public.accounts(user_id);
CREATE INDEX idx_accounts_status ON public.accounts(status);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_payout_requests_user_id ON public.payout_requests(user_id);
CREATE INDEX idx_payout_requests_status ON public.payout_requests(status);
CREATE INDEX idx_revenue_records_date ON public.revenue_records(date DESC);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id, read);
