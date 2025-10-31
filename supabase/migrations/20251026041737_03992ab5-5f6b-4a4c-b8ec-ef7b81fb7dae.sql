-- Create storage bucket for media library
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-library', 'media-library', true)
ON CONFLICT (id) DO NOTHING;

-- Create media_library table
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  category TEXT NOT NULL DEFAULT 'uncategorized',
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- Create policies for media_library
CREATE POLICY "Anyone can view media library" 
ON public.media_library 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert media" 
ON public.media_library 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update media" 
ON public.media_library 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete media" 
ON public.media_library 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create storage policies for media-library bucket
CREATE POLICY "Anyone can view media files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media-library');

CREATE POLICY "Admins can upload media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media-library' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media-library' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete media files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media-library' AND is_admin(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_media_library_updated_at
BEFORE UPDATE ON public.media_library
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();