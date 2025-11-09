-- Create table for care solutions showcase (training programs carousel)
CREATE TABLE public.care_solutions_showcase (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  image_path TEXT,
  link_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.care_solutions_showcase ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for care_solutions_showcase"
ON public.care_solutions_showcase
FOR SELECT
USING (true);

CREATE POLICY "Authenticated write access for care_solutions_showcase"
ON public.care_solutions_showcase
FOR ALL
USING (auth.role() = 'authenticated');

-- Insert default data
INSERT INTO public.care_solutions_showcase (title, category, image_url, link_url, display_order) VALUES
('Fall Detection & Prevention', 'ASSISTED LIVING', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=500&fit=crop', '/technology', 1),
('Activity Monitoring', 'MEMORY CARE', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=500&fit=crop', '/technology', 2),
('Vital Signs Tracking', 'HEALTHCARE', 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=500&fit=crop', '/clinical-validation', 3),
('Privacy-First Security', 'SENIOR LIVING', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=500&fit=crop', '/privacy', 4),
('Clinical Validation Studies', 'RESEARCH', 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=400&h=500&fit=crop', '/research-hub', 5);

-- Add section content for social proof
INSERT INTO public.section_content (section_key, content)
VALUES (
  'care-solutions-showcase',
  '{
    "socialProof": {
      "text": "Trusted by 50+ care facilities",
      "avatars": [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
      ]
    }
  }'::jsonb
)
ON CONFLICT (section_key) 
DO UPDATE SET content = EXCLUDED.content;