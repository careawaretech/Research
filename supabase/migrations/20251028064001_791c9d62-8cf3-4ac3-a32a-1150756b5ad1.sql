-- Create publications table
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  journal TEXT NOT NULL,
  year INTEGER NOT NULL,
  citation_count INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  pdf_url TEXT,
  pdf_path TEXT,
  citation_text TEXT,
  abstract TEXT,
  doi TEXT,
  project_link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Admins can manage all publications
CREATE POLICY "Admins can manage publications"
ON public.publications
FOR ALL
USING (is_admin(auth.uid()));

-- Anyone can view publications
CREATE POLICY "Anyone can view publications"
ON public.publications
FOR SELECT
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_publications_updated_at
BEFORE UPDATE ON public.publications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for publication PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('publication-pdfs', 'publication-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for publication PDFs
CREATE POLICY "Anyone can view publication PDFs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'publication-pdfs');

CREATE POLICY "Admins can upload publication PDFs"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'publication-pdfs' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update publication PDFs"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'publication-pdfs' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete publication PDFs"
ON storage.objects
FOR DELETE
USING (bucket_id = 'publication-pdfs' AND is_admin(auth.uid()));