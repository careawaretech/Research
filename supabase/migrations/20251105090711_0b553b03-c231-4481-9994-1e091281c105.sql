-- Create table for trending research topics
CREATE TABLE public.research_hub_trending_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rank INTEGER NOT NULL,
  title TEXT NOT NULL,
  paper_count INTEGER NOT NULL DEFAULT 0,
  growth TEXT NOT NULL,
  icon_url TEXT,
  icon_type TEXT DEFAULT 'upload', -- 'upload' or 'lucide'
  lucide_icon_name TEXT,
  color TEXT NOT NULL DEFAULT 'text-primary',
  border_color TEXT NOT NULL DEFAULT 'border-primary/20',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for curated research collections
CREATE TABLE public.research_hub_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  paper_count INTEGER NOT NULL DEFAULT 0,
  background_image TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.research_hub_trending_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_hub_collections ENABLE ROW LEVEL SECURITY;

-- Create policies for trending topics
CREATE POLICY "Public read access for research_hub_trending_topics" 
ON public.research_hub_trending_topics 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated write access for research_hub_trending_topics" 
ON public.research_hub_trending_topics 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create policies for collections
CREATE POLICY "Public read access for research_hub_collections" 
ON public.research_hub_collections 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated write access for research_hub_collections" 
ON public.research_hub_collections 
FOR ALL 
USING (auth.role() = 'authenticated');