-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Create RLS policies for the images bucket
CREATE POLICY "Public images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update their own images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'images');