-- Create table for research in progress highlights
CREATE TABLE IF NOT EXISTS public.research_in_progress_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon_type TEXT DEFAULT 'lucide',
  lucide_icon_name TEXT,
  icon_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.research_in_progress_highlights ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for research_in_progress_highlights" 
ON public.research_in_progress_highlights 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated write access for research_in_progress_highlights" 
ON public.research_in_progress_highlights 
FOR ALL 
USING (auth.role() = 'authenticated'::text);

-- Insert default highlights
INSERT INTO public.research_in_progress_highlights (title, icon_type, lucide_icon_name, display_order) VALUES
('Advanced feasibility studies & prototyping', 'lucide', 'FlaskConical', 0),
('Applying for grant funding & securing patents', 'lucide', 'FileCheck', 1),
('Seeking collaborative partners & pilot participants', 'lucide', 'Users', 2),
('Validating innovative wireless sensing technology', 'lucide', 'Lightbulb', 3);

-- Insert section content for research-in-progress
INSERT INTO public.section_content (section_key, content) 
VALUES (
  'research-in-progress',
  jsonb_build_object(
    'title', 'Building the Future of Privacy-First Care Technology',
    'subtitle', 'Care Aware Tech is a research-driven startup conducting advanced studies on wireless sensing for real-time fall and vital sign detection in assisted living and memory care settings. We''re transforming innovative ideas into validated technology through grant funding and collaborative partnerships.',
    'listen_button', jsonb_build_object(
      'text', 'Listen More',
      'url', '',
      'enabled', false
    ),
    'read_button', jsonb_build_object(
      'text', 'Read More',
      'url', '',
      'enabled', false
    ),
    'watch_button', jsonb_build_object(
      'text', 'Watch More',
      'url', '',
      'enabled', false
    )
  )
);