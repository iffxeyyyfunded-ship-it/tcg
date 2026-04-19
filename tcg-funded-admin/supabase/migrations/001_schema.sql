-- ============================================
-- FILE: supabase/migrations/001_schema.sql
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────────
CREATE TABLE public.profiles (
  id                  UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name           TEXT,
  email               TEXT UNIQUE NOT NULL,
  country             TEXT,
  phone               TEXT,
  date_of_birth       DATE,
  kyc_status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (kyc_status IN ('pending','submitted','approved','rejected')),
  kyc_submitted_at    TIMESTAMPTZ,
  kyc_approved_at     TIMESTAMPTZ,
  kyc_rejection_reason TEXT,
  payout_method       TEXT CHECK (payout_method IN ('bank','crypto','wise')),
  payout_details      JSONB DEFAULT '{}',
  affiliate_code      TEXT UNIQUE,
  referred_by         TEXT,
  role                TEXT NOT NULL DEFAULT 'trader'
                        CHECK (role IN ('trader','admin','support')),
  discord_handle      TEXT,
  is_active           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- ACCOUNT PLANS (static config — admin seeded)
-- ─────────────────────────────────────────────
CREATE TABLE public.account_plans (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  market                TEXT NOT NULL CHECK (market IN ('forex','crypto','futures')),
  size_label            TEXT NOT NULL,
  size_value            NUMERIC(15,2) NOT NULL,
  drawdown_type         TEXT NOT NULL
                          CHECK (drawdown_type IN ('intraday_trailing','eod_trailing','classic','static')),
  drawdown_type_label   TEXT NOT NULL,
  max_loss_pct          NUMERIC(5,2),
  buffer_zone_pct       NUMERIC(5,2) NOT NULL DEFAULT 5.00,
  min_trading_days      INT NOT NULL DEFAULT 5,
  consistency_rule_pct  NUMERIC(5,2) NOT NULL DEFAULT 30.00,
  profit_goal_pct       NUMERIC(5,2) NOT NULL DEFAULT 3.00,
  inactivity_days       INT NOT NULL DEFAULT 7,
  leverage_ratio        TEXT NOT NULL DEFAULT '1:100',
  base_price_usd        NUMERIC(10,2) NOT NULL,
  is_active             BOOLEAN DEFAULT true,
  sort_order            INT DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- TRADER ACCOUNTS
-- ─────────────────────────────────────────────
CREATE TABLE public.trader_accounts (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trader_id             UUID REFERENCES public.profiles(id) NOT NULL,
  plan_id               UUID REFERENCES public.account_plans(id) NOT NULL,
  order_id              UUID,
  account_number        TEXT UNIQUE NOT NULL,
  status                TEXT NOT NULL DEFAULT 'pending_kyc'
                          CHECK (status IN ('pending_kyc','pending_activation','active','breached','suspended','closed')),
  starting_balance      NUMERIC(15,2) NOT NULL,
  current_balance       NUMERIC(15,2) NOT NULL,
  peak_balance          NUMERIC(15,2) NOT NULL,
  lowest_balance        NUMERIC(15,2),
  current_drawdown_pct  NUMERIC(8,4) DEFAULT 0,
  max_drawdown_reached  NUMERIC(8,4) DEFAULT 0,
  total_profit_pct      NUMERIC(8,4) DEFAULT 0,
  total_profit_usd      NUMERIC(15,2) DEFAULT 0,
  trading_days_count    INT DEFAULT 0,
  add_ons               JSONB DEFAULT '[]',
  share_score           NUMERIC(10,4) DEFAULT 0,
  cycle_number          INT DEFAULT 1,
  cycle_start_date      DATE,
  cycle_end_date        DATE,
  cycle_profit_pct      NUMERIC(8,4) DEFAULT 0,
  cycle_profit_usd      NUMERIC(15,2) DEFAULT 0,
  is_payout_eligible    BOOLEAN DEFAULT false,
  payout_activated_at   TIMESTAMPTZ,
  last_trade_date       DATE,
  breach_reason         TEXT,
  breach_date           TIMESTAMPTZ,
  revival_used          BOOLEAN DEFAULT false,
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- ORDERS (purchases)
-- ─────────────────────────────────────────────
CREATE TABLE public.orders (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trader_id             UUID REFERENCES public.profiles(id) NOT NULL,
  plan_id               UUID REFERENCES public.account_plans(id) NOT NULL,
  account_id            UUID REFERENCES public.trader_accounts(id),
  stripe_session_id     TEXT UNIQUE,
  stripe_payment_intent TEXT UNIQUE,
  amount_usd            NUMERIC(10,2) NOT NULL,
  original_price        NUMERIC(10,2) NOT NULL,
  coupon_code           TEXT,
  discount_pct          NUMERIC(5,2) DEFAULT 0,
  discount_amount       NUMERIC(10,2) DEFAULT 0,
  add_ons               JSONB DEFAULT '[]',
  add_ons_total         NUMERIC(10,2) DEFAULT 0,
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','paid','failed','refunded','disputed')),
  paid_at               TIMESTAMPTZ,
  refunded_at           TIMESTAMPTZ,
  metadata              JSONB DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- WEEKLY PAYOUT POOLS
-- ─────────────────────────────────────────────
CREATE TABLE public.weekly_pools (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  week_number           INT NOT NULL,
  year                  INT NOT NULL,
  week_start            DATE NOT NULL,
  week_end              DATE NOT NULL,
  payout_date           DATE NOT NULL,
  total_revenue_usd     NUMERIC(15,2) NOT NULL DEFAULT 0,
  pool_allocation_pct   NUMERIC(5,2) NOT NULL DEFAULT 40.00,
  ops_allocation_pct    NUMERIC(5,2) NOT NULL DEFAULT 45.00,
  profit_allocation_pct NUMERIC(5,2) NOT NULL DEFAULT 15.00,
  pool_amount_usd       NUMERIC(15,2) NOT NULL DEFAULT 0,
  ops_amount_usd        NUMERIC(15,2) NOT NULL DEFAULT 0,
  profit_amount_usd     NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_eligible_traders INT DEFAULT 0,
  total_scores          NUMERIC(15,4) DEFAULT 0,
  actual_paid_usd       NUMERIC(15,2) DEFAULT 0,
  status                TEXT NOT NULL DEFAULT 'open'
                          CHECK (status IN ('open','calculating','calculated','paying','paid','closed')),
  calculated_at         TIMESTAMPTZ,
  paid_at               TIMESTAMPTZ,
  admin_notes           TEXT,
  created_at            TIMESTAMPTZ DEFAULT now(),
  UNIQUE(week_number, year)
);

-- ─────────────────────────────────────────────
-- PAYOUT REQUESTS
-- ─────────────────────────────────────────────
CREATE TABLE public.payout_requests (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trader_id             UUID REFERENCES public.profiles(id) NOT NULL,
  account_id            UUID REFERENCES public.trader_accounts(id) NOT NULL,
  pool_id               UUID REFERENCES public.weekly_pools(id),
  share_score           NUMERIC(10,4) NOT NULL,
  total_scores          NUMERIC(15,4),
  pool_share_pct        NUMERIC(8,6),
  gross_payout_usd      NUMERIC(15,2),
  net_payout_usd        NUMERIC(15,2),
  fee_amount            NUMERIC(10,2) DEFAULT 0,
  payout_method         TEXT,
  payout_details        JSONB,
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','approved','processing','paid','denied','cancelled')),
  denial_reason         TEXT,
  payment_reference     TEXT,
  payment_processor     TEXT,
  requested_at          TIMESTAMPTZ DEFAULT now(),
  approved_at           TIMESTAMPTZ,
  paid_at               TIMESTAMPTZ,
  cycle_profit_usd      NUMERIC(15,2),
  cycle_profit_pct      NUMERIC(8,4)
);

-- ─────────────────────────────────────────────
-- REVENUE ENTRIES (transparency dashboard)
-- ─────────────────────────────────────────────
CREATE TABLE public.revenue_entries (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type                  TEXT NOT NULL
                          CHECK (type IN ('account_purchase','addon_purchase','revival_purchase','affiliate_adjustment','manual')),
  amount_usd            NUMERIC(15,2) NOT NULL,
  order_id              UUID REFERENCES public.orders(id),
  pool_id               UUID REFERENCES public.weekly_pools(id),
  description           TEXT,
  recorded_at           TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- TRADING DAYS LOG
-- ─────────────────────────────────────────────
CREATE TABLE public.trading_days (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id            UUID REFERENCES public.trader_accounts(id) NOT NULL,
  trade_date            DATE NOT NULL,
  daily_profit_pct      NUMERIC(8,4) NOT NULL,
  daily_profit_usd      NUMERIC(15,2) NOT NULL,
  lots_traded           NUMERIC(10,2),
  trades_count          INT,
  biggest_trade_pct     NUMERIC(8,4),
  violation_flags       JSONB DEFAULT '[]',
  recorded_at           TIMESTAMPTZ DEFAULT now(),
  UNIQUE(account_id, trade_date)
);

-- ─────────────────────────────────────────────
-- COUPONS
-- ─────────────────────────────────────────────
CREATE TABLE public.coupons (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code                  TEXT UNIQUE NOT NULL,
  description           TEXT,
  discount_pct          NUMERIC(5,2) NOT NULL,
  applicable_markets    TEXT[] DEFAULT ARRAY['forex','crypto','futures'],
  applicable_plan_ids   UUID[],
  max_uses              INT,
  uses_count            INT DEFAULT 0,
  is_active             BOOLEAN DEFAULT true,
  valid_from            TIMESTAMPTZ DEFAULT now(),
  expires_at            TIMESTAMPTZ,
  created_by            UUID REFERENCES public.profiles(id),
  created_at            TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- AFFILIATES
-- ─────────────────────────────────────────────
CREATE TABLE public.affiliate_referrals (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  affiliate_id          UUID REFERENCES public.profiles(id) NOT NULL,
  referred_trader_id    UUID REFERENCES public.profiles(id) NOT NULL,
  order_id              UUID REFERENCES public.orders(id),
  commission_pct        NUMERIC(5,2) NOT NULL DEFAULT 10.00,
  commission_amount_usd NUMERIC(10,2),
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','approved','paid','cancelled')),
  paid_at               TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- KYC DOCUMENTS
-- ─────────────────────────────────────────────
CREATE TABLE public.kyc_documents (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trader_id             UUID REFERENCES public.profiles(id) NOT NULL,
  document_type         TEXT NOT NULL
                          CHECK (document_type IN ('passport','drivers_license','national_id','proof_of_address','selfie')),
  storage_path          TEXT NOT NULL,
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','approved','rejected')),
  rejection_reason      TEXT,
  reviewed_by           UUID REFERENCES public.profiles(id),
  reviewed_at           TIMESTAMPTZ,
  submitted_at          TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- SUPPORT TICKETS (optional)
-- ─────────────────────────────────────────────
CREATE TABLE public.support_tickets (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trader_id             UUID REFERENCES public.profiles(id) NOT NULL,
  account_id            UUID REFERENCES public.trader_accounts(id),
  subject               TEXT NOT NULL,
  message               TEXT NOT NULL,
  status                TEXT NOT NULL DEFAULT 'open'
                          CHECK (status IN ('open','in_progress','resolved','closed')),
  priority              TEXT DEFAULT 'normal'
                          CHECK (priority IN ('low','normal','high','urgent')),
  resolved_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- UPDATED_AT TRIGGER FUNCTION
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER accounts_updated_at
  BEFORE UPDATE ON public.trader_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
