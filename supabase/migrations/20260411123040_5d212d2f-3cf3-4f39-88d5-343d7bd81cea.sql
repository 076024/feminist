CREATE POLICY "Admins can read petitions"
ON public.petitions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));