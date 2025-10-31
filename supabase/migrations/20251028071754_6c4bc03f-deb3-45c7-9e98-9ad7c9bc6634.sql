-- Create table for editable section content
CREATE TABLE IF NOT EXISTS public.section_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view section content"
  ON public.section_content
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage section content"
  ON public.section_content
  FOR ALL
  USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_section_content_updated_at
  BEFORE UPDATE ON public.section_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default Research Credibility section content
INSERT INTO public.section_content (section_key, title, subtitle) VALUES
  ('research_credibility', 'Research Credibility & Publications', 'Founded by PhD researchers with institutional backing and peer-reviewed scientific contributions')
ON CONFLICT (section_key) DO NOTHING;