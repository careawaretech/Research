-- Create research_hub_featured_papers table for hero section cards
CREATE TABLE IF NOT EXISTS public.research_hub_featured_papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  year TEXT NOT NULL,
  views TEXT NOT NULL DEFAULT '0',
  comments TEXT NOT NULL DEFAULT '0',
  image_url TEXT,
  badges JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create research_hub_latest_papers table
CREATE TABLE IF NOT EXISTS public.research_hub_latest_papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  year TEXT NOT NULL,
  views TEXT NOT NULL DEFAULT '0',
  comments TEXT NOT NULL DEFAULT '0',
  image_url TEXT,
  badges JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create research_hub_categories table
CREATE TABLE IF NOT EXISTS public.research_hub_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  paper_count INTEGER NOT NULL DEFAULT 0,
  icon_url TEXT,
  color TEXT NOT NULL DEFAULT 'text-purple-100',
  bg_gradient TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.research_hub_featured_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_hub_latest_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_hub_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for research_hub_featured_papers"
  ON public.research_hub_featured_papers
  FOR SELECT
  USING (true);

CREATE POLICY "Public read access for research_hub_latest_papers"
  ON public.research_hub_latest_papers
  FOR SELECT
  USING (true);

CREATE POLICY "Public read access for research_hub_categories"
  ON public.research_hub_categories
  FOR SELECT
  USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Authenticated write access for research_hub_featured_papers"
  ON public.research_hub_featured_papers
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access for research_hub_latest_papers"
  ON public.research_hub_latest_papers
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access for research_hub_categories"
  ON public.research_hub_categories
  FOR ALL
  USING (auth.role() = 'authenticated');