CREATE OR REPLACE FUNCTION public.get_campaign_petition_count(_campaign_id text)
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::bigint FROM public.petitions WHERE campaign_id = _campaign_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_campaign_petition_count(text) TO anon, authenticated;