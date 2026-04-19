-- ============================================
-- FILE: supabase/migrations/003_functions.sql
-- ============================================

-- ─── AUTO-CREATE PROFILE ON AUTH SIGNUP ───
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  affiliate_suffix TEXT;
BEGIN
  affiliate_suffix := upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  
  INSERT INTO public.profiles (id, email, full_name, affiliate_code)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'TCG-' || affiliate_suffix
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── GENERATE ACCOUNT NUMBER ───
CREATE SEQUENCE IF NOT EXISTS account_number_seq START 100001;

CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TCG-' || nextval('account_number_seq')::text;
END;
$$ LANGUAGE plpgsql;

-- ─── GET CURRENT WEEK POOL ───
CREATE OR REPLACE FUNCTION get_current_pool()
RETURNS public.weekly_pools AS $$
  SELECT * FROM public.weekly_pools
  WHERE status = 'open'
  ORDER BY week_start DESC
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- ─── LIVE REVENUE STATS (for transparency page) ───
CREATE OR REPLACE FUNCTION get_revenue_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'all_time_revenue', COALESCE(SUM(amount_usd), 0),
    'this_week_revenue', COALESCE(SUM(CASE WHEN recorded_at >= date_trunc('week', now()) THEN amount_usd ELSE 0 END), 0),
    'this_month_revenue', COALESCE(SUM(CASE WHEN recorded_at >= date_trunc('month', now()) THEN amount_usd ELSE 0 END), 0),
    'total_entries', COUNT(*)
  ) INTO result
  FROM public.revenue_entries;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── CHECK PAYOUT ELIGIBILITY ───
CREATE OR REPLACE FUNCTION check_payout_eligibility(p_account_id UUID)
RETURNS JSON AS $$
DECLARE
  acct public.trader_accounts;
  plan public.account_plans;
  result JSON;
  min_days_required INT;
  consistency_ok BOOLEAN;
  profit_goal_ok BOOLEAN;
  buffer_ok BOOLEAN;
BEGIN
  SELECT * INTO acct FROM public.trader_accounts WHERE id = p_account_id;
  SELECT * INTO plan FROM public.account_plans WHERE id = acct.plan_id;
  
  -- Check if add-on "Reduced Min Days" is active
  min_days_required := plan.min_trading_days;
  IF acct.add_ons @> '[{"id": "reduced_min_days"}]'::jsonb THEN
    min_days_required := min_days_required - 2;
  END IF;
  
  -- Check profit goal
  profit_goal_ok := acct.cycle_profit_pct >= plan.profit_goal_pct;
  
  -- Check buffer zone
  buffer_ok := acct.total_profit_pct >= plan.buffer_zone_pct;
  
  -- Check consistency (no single day > 30% unless Consistency Gateway add-on)
  IF acct.add_ons @> '[{"id": "consistency_gateway"}]'::jsonb THEN
    consistency_ok := true;
  ELSE
    SELECT (NOT EXISTS (
      SELECT 1 FROM public.trading_days td
      WHERE td.account_id = p_account_id
        AND td.trade_date >= acct.cycle_start_date
        AND acct.cycle_profit_usd > 0
        AND (td.daily_profit_usd / acct.cycle_profit_usd * 100) > plan.consistency_rule_pct
    )) INTO consistency_ok;
  END IF;
  
  SELECT json_build_object(
    'is_eligible', (
      acct.status = 'active' AND
      acct.trading_days_count >= min_days_required AND
      profit_goal_ok AND
      buffer_ok AND
      consistency_ok AND
      acct.share_score > 0
    ),
    'checks', json_build_object(
      'account_active', acct.status = 'active',
      'min_trading_days', json_build_object(
        'required', min_days_required,
        'current', acct.trading_days_count,
        'passed', acct.trading_days_count >= min_days_required
      ),
      'profit_goal', json_build_object(
        'required_pct', plan.profit_goal_pct,
        'current_pct', acct.cycle_profit_pct,
        'passed', profit_goal_ok
      ),
      'buffer_zone', json_build_object(
        'required_pct', plan.buffer_zone_pct,
        'current_pct', acct.total_profit_pct,
        'passed', buffer_ok
      ),
      'consistency', json_build_object(
        'rule_pct', plan.consistency_rule_pct,
        'passed', consistency_ok
      ),
      'share_score', acct.share_score
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
