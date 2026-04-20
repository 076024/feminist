-- Explicitly deny INSERT/UPDATE/DELETE on user_roles for all client roles.
-- Role assignment must be done via service role only (server-side / migrations).

CREATE POLICY "Block client inserts on user_roles"
  ON public.user_roles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Block client updates on user_roles"
  ON public.user_roles
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Block client deletes on user_roles"
  ON public.user_roles
  FOR DELETE
  TO anon, authenticated
  USING (false);