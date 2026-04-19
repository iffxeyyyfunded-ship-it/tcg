-- ============================================
-- FILE: supabase/migrations/004_seed_data.sql
-- ============================================

-- ─── ACCOUNT PLANS — FOREX ───
INSERT INTO public.account_plans
  (market, size_label, size_value, drawdown_type, drawdown_type_label,
   max_loss_pct, buffer_zone_pct, min_trading_days, base_price_usd, sort_order)
VALUES
  -- $5K
  ('forex','$5K',5000,'intraday_trailing','Intraday Trailing',8,4,5,89,10),
  ('forex','$5K',5000,'eod_trailing','EOD Trailing',8,5,5,99,20),
  ('forex','$5K',5000,'classic','No Max Drawdown',NULL,5,5,119,30),
  ('forex','$5K',5000,'static','Static',10,8,5,149,40),
  -- $10K
  ('forex','$10K',10000,'intraday_trailing','Intraday Trailing',8,4,5,129,10),
  ('forex','$10K',10000,'eod_trailing','EOD Trailing',8,5,5,149,20),
  ('forex','$10K',10000,'classic','No Max Drawdown',NULL,5,5,179,30),
  ('forex','$10K',10000,'static','Static',10,8,5,219,40),
  -- $25K
  ('forex','$25K',25000,'intraday_trailing','Intraday Trailing',8,4,5,199,10),
  ('forex','$25K',25000,'eod_trailing','EOD Trailing',8,5,5,229,20),
  ('forex','$25K',25000,'classic','No Max Drawdown',NULL,5,5,279,30),
  ('forex','$25K',25000,'static','Static',10,8,5,349,40),
  -- $50K
  ('forex','$50K',50000,'intraday_trailing','Intraday Trailing',8,4,5,299,10),
  ('forex','$50K',50000,'eod_trailing','EOD Trailing',8,5,5,349,20),
  ('forex','$50K',50000,'classic','No Max Drawdown',NULL,5,5,429,30),
  ('forex','$50K',50000,'static','Static',10,8,5,539,40),
  -- $100K
  ('forex','$100K',100000,'intraday_trailing','Intraday Trailing',8,4,5,449,10),
  ('forex','$100K',100000,'eod_trailing','EOD Trailing',8,5,5,519,20),
  ('forex','$100K',100000,'classic','No Max Drawdown',NULL,5,5,629,30),
  ('forex','$100K',100000,'static','Static',10,8,5,799,40),
  -- $200K
  ('forex','$200K',200000,'intraday_trailing','Intraday Trailing',8,4,5,799,10),
  ('forex','$200K',200000,'eod_trailing','EOD Trailing',8,5,5,929,20),
  ('forex','$200K',200000,'classic','No Max Drawdown',NULL,5,5,1129,30),
  ('forex','$200K',200000,'static','Static',10,8,5,1429,40);

-- ─── COUPONS ───
INSERT INTO public.coupons (code, description, discount_pct, max_uses, is_active)
VALUES
  ('TCGLAUNCH', 'Launch discount — 65% off', 65, 1000, true),
  ('TCGVIP', 'VIP trader discount — 50% off', 50, 100, true),
  ('WELCOME10', 'Welcome discount — 10% off', 10, NULL, true);

-- ─── OPEN FIRST WEEKLY POOL ───
INSERT INTO public.weekly_pools
  (week_number, year, week_start, week_end, payout_date, 
   total_revenue_usd, pool_amount_usd, ops_amount_usd, profit_amount_usd, status)
VALUES
  (
    EXTRACT(WEEK FROM now())::INT,
    EXTRACT(YEAR FROM now())::INT,
    date_trunc('week', now())::DATE,
    (date_trunc('week', now()) + INTERVAL '6 days')::DATE,
    (date_trunc('week', now()) + INTERVAL '4 days')::DATE,
    0, 0, 0, 0, 'open'
  );
