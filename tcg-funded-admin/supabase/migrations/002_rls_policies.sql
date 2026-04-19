-- ============================================
-- FILE: supabase/migrations/002_rls_policies.sql
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trader_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- ─── HELPER FUNCTION — check if user is admin ───
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- ─── PROFILES ───
CREATE POLICY "Traders can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Traders can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = 'trader');

CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can update all profiles"
  ON public.profiles FOR UPDATE
  USING (is_admin());

CREATE POLICY "Service role can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- ─── ACCOUNT PLANS (public read) ───
CREATE POLICY "Anyone can view active plans"
  ON public.account_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage plans"
  ON public.account_plans FOR ALL
  USING (is_admin());

-- ─── TRADER ACCOUNTS ───
CREATE POLICY "Traders can view own accounts"
  ON public.trader_accounts FOR SELECT
  USING (auth.uid() = trader_id);

CREATE POLICY "Admin can view all accounts"
  ON public.trader_accounts FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can update all accounts"
  ON public.trader_accounts FOR UPDATE
  USING (is_admin());

CREATE POLICY "Service role inserts accounts"
  ON public.trader_accounts FOR INSERT
  WITH CHECK (true);

-- ─── ORDERS ───
CREATE POLICY "Traders can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = trader_id);

CREATE POLICY "Admin can view all orders"
  ON public.orders FOR ALL
  USING (is_admin());

CREATE POLICY "Service role inserts orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- ─── WEEKLY POOLS (public read for transparency) ───
CREATE POLICY "Anyone can view pools"
  ON public.weekly_pools FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage pools"
  ON public.weekly_pools FOR ALL
  USING (is_admin());

CREATE POLICY "Service role inserts pools"
  ON public.weekly_pools FOR INSERT
  WITH CHECK (true);

-- ─── PAYOUT REQUESTS ───
CREATE POLICY "Traders can view own payouts"
  ON public.payout_requests FOR SELECT
  USING (auth.uid() = trader_id);

CREATE POLICY "Traders can insert own payout request"
  ON public.payout_requests FOR INSERT
  WITH CHECK (auth.uid() = trader_id);

CREATE POLICY "Admin can manage all payouts"
  ON public.payout_requests FOR ALL
  USING (is_admin());

-- ─── REVENUE ENTRIES (public read for transparency) ───
CREATE POLICY "Anyone can view revenue entries"
  ON public.revenue_entries FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage revenue entries"
  ON public.revenue_entries FOR ALL
  USING (is_admin());

CREATE POLICY "Service role inserts revenue entries"
  ON public.revenue_entries FOR INSERT
  WITH CHECK (true);

-- ─── TRADING DAYS ───
CREATE POLICY "Traders can view own trading days"
  ON public.trading_days FOR SELECT
  USING (
    auth.uid() = (SELECT trader_id FROM public.trader_accounts WHERE id = account_id)
  );

CREATE POLICY "Admin can view all trading days"
  ON public.trading_days FOR ALL
  USING (is_admin());

CREATE POLICY "Service role inserts trading days"
  ON public.trading_days FOR INSERT
  WITH CHECK (true);

-- ─── COUPONS ───
CREATE POLICY "Anyone can view active coupons code+discount only"
  ON public.coupons FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage coupons"
  ON public.coupons FOR ALL
  USING (is_admin());

-- ─── KYC DOCUMENTS ───
CREATE POLICY "Traders can view own KYC docs"
  ON public.kyc_documents FOR SELECT
  USING (auth.uid() = trader_id);

CREATE POLICY "Traders can insert own KYC docs"
  ON public.kyc_documents FOR INSERT
  WITH CHECK (auth.uid() = trader_id);

CREATE POLICY "Admin can view all KYC docs"
  ON public.kyc_documents FOR ALL
  USING (is_admin());

-- ─── AFFILIATE REFERRALS ───
CREATE POLICY "Affiliates can view own referrals"
  ON public.affiliate_referrals FOR SELECT
  USING (auth.uid() = affiliate_id);

CREATE POLICY "Admin can manage referrals"
  ON public.affiliate_referrals FOR ALL
  USING (is_admin());

CREATE POLICY "Service role inserts referrals"
  ON public.affiliate_referrals FOR INSERT
  WITH CHECK (true);

-- ─── SUPPORT TICKETS ───
CREATE POLICY "Traders can view own tickets"
  ON public.support_tickets FOR SELECT
  USING (auth.uid() = trader_id);

CREATE POLICY "Traders can create tickets"
  ON public.support_tickets FOR INSERT
  WITH CHECK (auth.uid() = trader_id);

CREATE POLICY "Admin can manage all tickets"
  ON public.support_tickets FOR ALL
  USING (is_admin());
