-- Create table for managing home page section visibility
CREATE TABLE IF NOT EXISTS public.home_page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  section_name TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.home_page_sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for home_page_sections"
  ON public.home_page_sections
  FOR SELECT
  USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated write access for home_page_sections"
  ON public.home_page_sections
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default sections
INSERT INTO public.home_page_sections (section_key, section_name, visible, display_order) VALUES
  ('research_in_progress', 'Research in Progress', true, 1),
  ('critical_gap', 'Critical Gap', true, 2),
  ('how_it_works', 'How It Works', true, 3),
  ('core_technology', 'Core Technology Features', true, 4),
  ('market_opportunity', 'Market Opportunity', true, 5),
  ('partnership_opportunities', 'Partnership Opportunities', true, 6),
  ('technology_comparison', 'Technology Comparison', true, 7),
  ('regional_focus', 'Regional Focus Strategy', true, 8),
  ('privacy_section', 'Privacy & Security', true, 9),
  ('research_credibility', 'Research Credibility', true, 10),
  ('partners', 'Partners', true, 11),
  ('call_to_action', 'Call to Action', true, 12);