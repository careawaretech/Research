-- Create page_sections table
CREATE TABLE public.page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.content_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  button_text TEXT,
  button_url TEXT,
  section_order INTEGER NOT NULL DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage all sections"
ON public.page_sections
FOR ALL
USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can view sections of published pages"
ON public.page_sections
FOR SELECT
USING (
  page_id IN (
    SELECT id FROM public.content_pages WHERE status = 'published'
  ) OR is_admin(auth.uid())
);

-- Create trigger for updated_at
CREATE TRIGGER update_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX idx_page_sections_order ON public.page_sections(section_order);