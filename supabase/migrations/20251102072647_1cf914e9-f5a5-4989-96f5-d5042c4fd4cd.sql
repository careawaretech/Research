-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public read access for media_library" ON public.media_library;
  DROP POLICY IF EXISTS "Authenticated write access for media_library" ON public.media_library;
  DROP POLICY IF EXISTS "Public read access for team_members" ON public.team_members;
  DROP POLICY IF EXISTS "Authenticated write access for team_members" ON public.team_members;
  DROP POLICY IF EXISTS "Public read access for academic_partners" ON public.academic_partners;
  DROP POLICY IF EXISTS "Authenticated write access for academic_partners" ON public.academic_partners;
  DROP POLICY IF EXISTS "Public read access for how_it_works_cards" ON public.how_it_works_cards;
  DROP POLICY IF EXISTS "Authenticated write access for how_it_works_cards" ON public.how_it_works_cards;
  DROP POLICY IF EXISTS "Public read access for publications" ON public.publications;
  DROP POLICY IF EXISTS "Authenticated write access for publications" ON public.publications;
  DROP POLICY IF EXISTS "Public read access for collaboration_opportunities" ON public.collaboration_opportunities;
  DROP POLICY IF EXISTS "Authenticated write access for collaboration_opportunities" ON public.collaboration_opportunities;
  DROP POLICY IF EXISTS "Public read access for grant_progress_steps" ON public.grant_progress_steps;
  DROP POLICY IF EXISTS "Authenticated write access for grant_progress_steps" ON public.grant_progress_steps;
  DROP POLICY IF EXISTS "Public read access for research_metrics" ON public.research_metrics;
  DROP POLICY IF EXISTS "Authenticated write access for research_metrics" ON public.research_metrics;
  DROP POLICY IF EXISTS "Public read access for section_content" ON public.section_content;
  DROP POLICY IF EXISTS "Authenticated write access for section_content" ON public.section_content;
  DROP POLICY IF EXISTS "Public read access for content_pages" ON public.content_pages;
  DROP POLICY IF EXISTS "Authenticated write access for content_pages" ON public.content_pages;
  DROP POLICY IF EXISTS "Public read access for page_sections" ON public.page_sections;
  DROP POLICY IF EXISTS "Authenticated write access for page_sections" ON public.page_sections;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Create storage buckets for media
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('media-library', 'media-library', true),
  ('partner-logos', 'partner-logos', true),
  ('grant-logos', 'grant-logos', true),
  ('how-it-works-images', 'how-it-works-images', true),
  ('team-photos', 'team-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create media_library table
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  category TEXT NOT NULL,
  page_slug TEXT,
  alt_text TEXT,
  folder_thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for media_library"
ON public.media_library FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for media_library"
ON public.media_library FOR ALL
USING (auth.role() = 'authenticated');

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  photo_path TEXT,
  title TEXT NOT NULL,
  affiliation TEXT,
  biography TEXT,
  publication_count INTEGER NOT NULL DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for team_members"
ON public.team_members FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for team_members"
ON public.team_members FOR ALL
USING (auth.role() = 'authenticated');

-- Create academic_partners table
CREATE TABLE IF NOT EXISTS public.academic_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_name TEXT NOT NULL,
  logo_url TEXT,
  logo_path TEXT,
  description TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.academic_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for academic_partners"
ON public.academic_partners FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for academic_partners"
ON public.academic_partners FOR ALL
USING (auth.role() = 'authenticated');

-- Create how_it_works_cards table
CREATE TABLE IF NOT EXISTS public.how_it_works_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  icon_path TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.how_it_works_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for how_it_works_cards"
ON public.how_it_works_cards FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for how_it_works_cards"
ON public.how_it_works_cards FOR ALL
USING (auth.role() = 'authenticated');

-- Create publications table
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[],
  journal TEXT,
  publication_date DATE,
  doi TEXT,
  url TEXT,
  abstract TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for publications"
ON public.publications FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for publications"
ON public.publications FOR ALL
USING (auth.role() = 'authenticated');

-- Create collaboration_opportunities table
CREATE TABLE IF NOT EXISTS public.collaboration_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  opportunity_type TEXT NOT NULL,
  requirements TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.collaboration_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for collaboration_opportunities"
ON public.collaboration_opportunities FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for collaboration_opportunities"
ON public.collaboration_opportunities FOR ALL
USING (auth.role() = 'authenticated');

-- Create grant_progress_steps table
CREATE TABLE IF NOT EXISTS public.grant_progress_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  completion_date DATE,
  logo_url TEXT,
  logo_path TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.grant_progress_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for grant_progress_steps"
ON public.grant_progress_steps FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for grant_progress_steps"
ON public.grant_progress_steps FOR ALL
USING (auth.role() = 'authenticated');

-- Create research_metrics table
CREATE TABLE IF NOT EXISTS public.research_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.research_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for research_metrics"
ON public.research_metrics FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for research_metrics"
ON public.research_metrics FOR ALL
USING (auth.role() = 'authenticated');

-- Create section_content table
CREATE TABLE IF NOT EXISTS public.section_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for section_content"
ON public.section_content FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for section_content"
ON public.section_content FOR ALL
USING (auth.role() = 'authenticated');

-- Create content_pages table
CREATE TABLE IF NOT EXISTS public.content_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_description TEXT,
  content JSONB,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for content_pages"
ON public.content_pages FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for content_pages"
ON public.content_pages FOR ALL
USING (auth.role() = 'authenticated');

-- Create page_sections table
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.content_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for page_sections"
ON public.page_sections FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for page_sections"
ON public.page_sections FOR ALL
USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_media_library_page_slug ON public.media_library(page_slug);
CREATE INDEX IF NOT EXISTS idx_media_library_category ON public.media_library(category);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON public.team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_academic_partners_display_order ON public.academic_partners(display_order);
CREATE INDEX IF NOT EXISTS idx_how_it_works_cards_display_order ON public.how_it_works_cards(display_order);
CREATE INDEX IF NOT EXISTS idx_page_sections_page_id ON public.page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_sections_display_order ON public.page_sections(display_order);