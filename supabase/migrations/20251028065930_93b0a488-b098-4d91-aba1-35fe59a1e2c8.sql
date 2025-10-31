-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  photo_path TEXT,
  title TEXT NOT NULL,
  affiliation TEXT,
  biography TEXT,
  publication_count INTEGER DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create academic_partners table
CREATE TABLE public.academic_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_name TEXT NOT NULL,
  logo_url TEXT,
  logo_path TEXT,
  description TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create research_metrics table
CREATE TABLE public.research_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_publications INTEGER NOT NULL DEFAULT 0,
  citation_count INTEGER NOT NULL DEFAULT 0,
  h_index INTEGER DEFAULT 0,
  auto_sync_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collaboration_opportunities table
CREATE TABLE public.collaboration_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_name TEXT NOT NULL,
  description TEXT NOT NULL,
  button_text TEXT,
  button_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grant_progress_steps table
CREATE TABLE public.grant_progress_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  step_title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Not Started',
  completed BOOLEAN DEFAULT false,
  logo_url TEXT,
  logo_path TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grant_progress_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members
CREATE POLICY "Anyone can view team members"
  ON public.team_members FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage team members"
  ON public.team_members FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for academic_partners
CREATE POLICY "Anyone can view academic partners"
  ON public.academic_partners FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage academic partners"
  ON public.academic_partners FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for research_metrics
CREATE POLICY "Anyone can view research metrics"
  ON public.research_metrics FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage research metrics"
  ON public.research_metrics FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for collaboration_opportunities
CREATE POLICY "Anyone can view collaboration opportunities"
  ON public.collaboration_opportunities FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage collaboration opportunities"
  ON public.collaboration_opportunities FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for grant_progress_steps
CREATE POLICY "Anyone can view grant progress steps"
  ON public.grant_progress_steps FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage grant progress steps"
  ON public.grant_progress_steps FOR ALL
  USING (is_admin(auth.uid()));

-- Add triggers for updated_at
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_academic_partners_updated_at
  BEFORE UPDATE ON public.academic_partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_research_metrics_updated_at
  BEFORE UPDATE ON public.research_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_collaboration_opportunities_updated_at
  BEFORE UPDATE ON public.collaboration_opportunities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grant_progress_steps_updated_at
  BEFORE UPDATE ON public.grant_progress_steps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-photos', 'team-photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-logos', 'partner-logos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('grant-logos', 'grant-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for team-photos
CREATE POLICY "Anyone can view team photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team-photos');

CREATE POLICY "Admins can upload team photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'team-photos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update team photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'team-photos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete team photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'team-photos' AND is_admin(auth.uid()));

-- Storage policies for partner-logos
CREATE POLICY "Anyone can view partner logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'partner-logos');

CREATE POLICY "Admins can upload partner logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'partner-logos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update partner logos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'partner-logos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete partner logos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'partner-logos' AND is_admin(auth.uid()));

-- Storage policies for grant-logos
CREATE POLICY "Anyone can view grant logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'grant-logos');

CREATE POLICY "Admins can upload grant logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'grant-logos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update grant logos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'grant-logos' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete grant logos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'grant-logos' AND is_admin(auth.uid()));

-- Insert default research metrics row
INSERT INTO public.research_metrics (total_publications, citation_count, h_index, auto_sync_enabled)
VALUES (0, 0, 0, true);