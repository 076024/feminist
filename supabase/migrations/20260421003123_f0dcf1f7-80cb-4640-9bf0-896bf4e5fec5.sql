-- Add length limits and category enum check to public submission tables
ALTER TABLE public.help_requests
  ADD CONSTRAINT help_requests_message_length CHECK (char_length(message) BETWEEN 1 AND 5000),
  ADD CONSTRAINT help_requests_category_enum CHECK (category IN ('domestic_violence','sexual_assault','harassment','discrimination','mental_health','other'));

ALTER TABLE public.contacts
  ADD CONSTRAINT contacts_name_length CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT contacts_email_length CHECK (char_length(email) BETWEEN 3 AND 254),
  ADD CONSTRAINT contacts_message_length CHECK (char_length(message) BETWEEN 1 AND 5000);

ALTER TABLE public.volunteers
  ADD CONSTRAINT volunteers_name_length CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT volunteers_email_length CHECK (char_length(email) BETWEEN 3 AND 254),
  ADD CONSTRAINT volunteers_interests_length CHECK (interests IS NULL OR char_length(interests) <= 2000);

ALTER TABLE public.testimonials
  ADD CONSTRAINT testimonials_content_length CHECK (char_length(content) BETWEEN 1 AND 3000);

ALTER TABLE public.petitions
  ADD CONSTRAINT petitions_signer_name_length CHECK (char_length(signer_name) BETWEEN 1 AND 200),
  ADD CONSTRAINT petitions_signer_email_length CHECK (char_length(signer_email) BETWEEN 3 AND 254);

-- Restrict the blog-images bucket so files can be read by direct URL but NOT listed/enumerated.
-- Drop any broad SELECT policy on storage.objects scoped to this bucket and replace with
-- a policy that only allows direct GET-by-path (still works because the bucket is public).
DROP POLICY IF EXISTS "Public read for blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;

-- Note: For a public bucket, files are still accessible via their direct public URL through
-- the Supabase storage CDN even without a SELECT policy. Removing the SELECT policy prevents
-- listing/enumeration via the storage API while preserving direct image access on the site.