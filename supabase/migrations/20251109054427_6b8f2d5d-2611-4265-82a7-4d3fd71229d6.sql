-- Create table for technology deployments page hero section
CREATE TABLE IF NOT EXISTS public.technology_deployments_hero (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Technology Deployments',
  subtitle TEXT NOT NULL DEFAULT 'Empowering patient safety with privacy-first sensing in every environment—from clinical settings to the comfort of home.',
  cta_primary_text TEXT NOT NULL DEFAULT 'Download Technical Brief',
  cta_primary_url TEXT,
  cta_secondary_text TEXT NOT NULL DEFAULT 'Schedule a Demo',
  cta_secondary_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for deployment sections
CREATE TABLE IF NOT EXISTS public.technology_deployments_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  badge_text TEXT NOT NULL,
  badge_color TEXT NOT NULL DEFAULT '#2C5F8D',
  badge_bg_color TEXT NOT NULL DEFAULT '#E9F0F6',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  image_position TEXT NOT NULL DEFAULT 'right',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for comparison section
CREATE TABLE IF NOT EXISTS public.technology_deployments_comparison (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Two Technologies, One Mission',
  subtitle TEXT NOT NULL DEFAULT 'Our dual-technology approach ensures the perfect fit for any care environment.',
  comparison_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for CTA section
CREATE TABLE IF NOT EXISTS public.technology_deployments_cta (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Become a Pilot Partner',
  description TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Learn About Partnership Benefits',
  button_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.technology_deployments_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_deployments_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_deployments_comparison ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_deployments_cta ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for technology_deployments_hero"
  ON public.technology_deployments_hero FOR SELECT
  USING (true);

CREATE POLICY "Public read access for technology_deployments_sections"
  ON public.technology_deployments_sections FOR SELECT
  USING (true);

CREATE POLICY "Public read access for technology_deployments_comparison"
  ON public.technology_deployments_comparison FOR SELECT
  USING (true);

CREATE POLICY "Public read access for technology_deployments_cta"
  ON public.technology_deployments_cta FOR SELECT
  USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Authenticated write access for technology_deployments_hero"
  ON public.technology_deployments_hero FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access for technology_deployments_sections"
  ON public.technology_deployments_sections FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access for technology_deployments_comparison"
  ON public.technology_deployments_comparison FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access for technology_deployments_cta"
  ON public.technology_deployments_cta FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default hero data
INSERT INTO public.technology_deployments_hero (title, subtitle, cta_primary_text, cta_secondary_text)
VALUES (
  'Technology Deployments',
  'Empowering patient safety with privacy-first sensing in every environment—from clinical settings to the comfort of home.',
  'Download Technical Brief',
  'Schedule a Demo'
);

-- Insert default deployment sections
INSERT INTO public.technology_deployments_sections (badge_text, badge_color, badge_bg_color, title, description, image_position, features, display_order)
VALUES
  (
    'Hospitals',
    '#2C5F8D',
    '#E9F0F6',
    'Continuous Monitoring, Clinical-Grade Accuracy',
    'In high-acuity environments, our SFCW Radar provides contactless, continuous vital signs monitoring and fall detection, even in sensitive areas like bathrooms, without compromising patient privacy. This enhances triage efficiency and enables proactive care.',
    'right',
    '[
      {"title": "Real-time Fall Alert Protocols", "description": "Instant alerts under 2 seconds for rapid staff response, crucial in post-operative or high-risk units."},
      {"title": "Contactless Respiratory Monitoring", "description": "Track breathing rates without wires or patient contact, ideal for infectious disease wards and recovery rooms."},
      {"title": "Emergency Department Triage", "description": "Continuously monitor waiting patients to detect deterioration, improving patient flow and safety."}
    ]'::jsonb,
    1
  ),
  (
    'Assisted Living',
    '#4CAF50',
    '#EAF6EA',
    'Safety Without Sacrificing Privacy',
    'Our WiFi Signal Analysis platform offers a cost-effective, facility-wide safety net. By leveraging existing WiFi infrastructure, we provide ambient monitoring in both private rooms and common areas, ensuring resident safety while respecting their independence and dignity.',
    'left',
    '[
      {"title": "24/7 Resident Monitoring", "description": "Continuous, passive monitoring for falls and unusual activity patterns without intrusive cameras or wearables."},
      {"title": "Common Area Coverage", "description": "Extend safety coverage to lounges, hallways, and dining rooms using the facility''s existing WiFi network."},
      {"title": "Staff Alert Optimization", "description": "Reduce false alarms and alert fatigue with AI-powered event classification, allowing staff to focus on genuine needs."}
    ]'::jsonb,
    2
  ),
  (
    'Memory Care',
    '#9333EA',
    '#F3EBF9',
    'Specialized Monitoring for Cognitive Health',
    'For residents with dementia or Alzheimer''s, our technology provides specialized insights into behavioral patterns like wandering and nighttime restlessness. This data helps caregivers provide more personalized, effective, and proactive care in a secure environment.',
    'right',
    '[
      {"title": "Wandering Detection", "description": "Receive alerts when a resident enters a restricted area or exhibits exit-seeking behavior, enhancing safety."},
      {"title": "Behavioral Pattern Analysis", "description": "Identify changes in activity levels or sleep patterns that may indicate health changes, enabling early intervention."},
      {"title": "Nighttime Safety Monitoring", "description": "Monitor for falls or prolonged inactivity during the night without disturbing sleep with lights or check-ins."}
    ]'::jsonb,
    3
  ),
  (
    'Private Homes',
    '#FF6B35',
    '#FDF1E9',
    'Supporting Independent Living with Confidence',
    'Care Aware Tech empowers seniors to age in place safely. Our discreet sensing technology provides peace of mind for families and caregivers by monitoring for falls and health trends, facilitating timely support while respecting the autonomy of loved ones.',
    'left',
    '[
      {"title": "Family Notification System", "description": "Customizable alerts sent directly to family members or caregivers in the event of a fall or other concern."},
      {"title": "Activity Pattern Tracking", "description": "Observe long-term trends in mobility and activity to share with healthcare providers, all while preserving daily privacy."},
      {"title": "Remote Caregiver Access", "description": "A secure portal allows designated caregivers to check status and receive updates without being physically present."}
    ]'::jsonb,
    4
  );

-- Insert default comparison data
INSERT INTO public.technology_deployments_comparison (title, subtitle, comparison_data)
VALUES (
  'Two Technologies, One Mission',
  'Our dual-technology approach ensures the perfect fit for any care environment. Whether it''s the clinical precision of SFCW Radar or the scalable infrastructure of WiFi Sensing, our core principle remains: Privacy by Physics.',
  '[
    {"attribute": "Infrastructure", "radar": "Dedicated sensor unit", "wifi": "Uses existing WiFi"},
    {"attribute": "Coverage", "radar": "Single room (bathroom-safe)", "wifi": "Whole facility potential"},
    {"attribute": "Accuracy Stage", "radar": "Clinical-grade (≥98%)", "wifi": "Feasibility (validation planned)"},
    {"attribute": "Deployment Cost", "radar": "Moderate (hardware + install)", "wifi": "Low (software deployment)"},
    {"attribute": "Privacy", "radar": "No imagery, anonymous", "wifi": "No imagery, anonymous"},
    {"attribute": "Best For", "radar": "Hospitals, Memory Care, Premium Facilities", "wifi": "Assisted Living, Private Homes, Scalable Deployments"}
  ]'::jsonb
);

-- Insert default CTA data
INSERT INTO public.technology_deployments_cta (title, description, button_text)
VALUES (
  'Become a Pilot Partner',
  'Join us in shaping the future of elderly care. We are actively recruiting Portland-area assisted living facilities for our clinical validation studies. Help us enhance resident safety while gaining access to cutting-edge technology.',
  'Learn About Partnership Benefits'
);

-- Create triggers for updated_at
CREATE TRIGGER update_technology_deployments_hero_updated_at
  BEFORE UPDATE ON public.technology_deployments_hero
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_technology_deployments_sections_updated_at
  BEFORE UPDATE ON public.technology_deployments_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_technology_deployments_comparison_updated_at
  BEFORE UPDATE ON public.technology_deployments_comparison
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_technology_deployments_cta_updated_at
  BEFORE UPDATE ON public.technology_deployments_cta
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();