
-- Create help_requests table (anonymous submissions)
CREATE TABLE public.help_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit help requests" ON public.help_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Help requests are not publicly readable" ON public.help_requests FOR SELECT USING (false);

-- Create testimonials table (anonymous stories)
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Only approved testimonials are publicly readable" ON public.testimonials FOR SELECT USING (approved = true);

-- Create volunteers table
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can sign up as volunteer" ON public.volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Volunteers are not publicly readable" ON public.volunteers FOR SELECT USING (false);

-- Create petitions table
CREATE TABLE public.petitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.petitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can sign petitions" ON public.petitions FOR INSERT WITH CHECK (true);
CREATE POLICY "Petitions are not publicly readable" ON public.petitions FOR SELECT USING (false);

-- Create contacts table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact form" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact submissions are not publicly readable" ON public.contacts FOR SELECT USING (false);
