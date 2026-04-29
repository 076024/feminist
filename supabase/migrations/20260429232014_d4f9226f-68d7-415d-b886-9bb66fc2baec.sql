-- Add phone to volunteers
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS phone text;

-- Event RSVPs table
CREATE TABLE public.event_rsvps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit event RSVPs"
  ON public.event_rsvps FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Event RSVPs are not publicly readable"
  ON public.event_rsvps FOR SELECT
  TO public
  USING (false);

CREATE POLICY "Admins can read event RSVPs"
  ON public.event_rsvps FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update event RSVPs"
  ON public.event_rsvps FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete event RSVPs"
  ON public.event_rsvps FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_event_rsvps_updated_at
  BEFORE UPDATE ON public.event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_event_rsvps_event_id ON public.event_rsvps(event_id);