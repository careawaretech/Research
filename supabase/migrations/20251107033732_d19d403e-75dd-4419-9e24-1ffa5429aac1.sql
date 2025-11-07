-- Create table for Diverse Technology Applications section
CREATE TABLE public.diverse_technology_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon_type TEXT DEFAULT 'upload',
  icon_url TEXT,
  lucide_icon_name TEXT,
  background_color TEXT,
  text_color TEXT,
  border_color TEXT,
  bullet_points JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for Universal Security & Compliance section
CREATE TABLE public.universal_security_compliance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon_type TEXT DEFAULT 'upload',
  icon_url TEXT,
  lucide_icon_name TEXT,
  background_color TEXT,
  text_color TEXT,
  border_color TEXT,
  bullet_points JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.diverse_technology_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universal_security_compliance ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for diverse_technology_applications"
  ON public.diverse_technology_applications
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for diverse_technology_applications"
  ON public.diverse_technology_applications
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access for universal_security_compliance"
  ON public.universal_security_compliance
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for universal_security_compliance"
  ON public.universal_security_compliance
  FOR ALL
  USING (auth.role() = 'authenticated');