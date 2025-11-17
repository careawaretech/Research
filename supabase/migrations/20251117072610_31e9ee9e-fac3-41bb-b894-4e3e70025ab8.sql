-- Create table for security compliance article content
CREATE TABLE IF NOT EXISTS public.security_compliance_article (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'How to Handle Health Data and Personnel Information',
  subtitle TEXT,
  health_data_content TEXT NOT NULL DEFAULT '',
  health_data_bullets JSONB DEFAULT '[]'::jsonb,
  personnel_data_content TEXT NOT NULL DEFAULT '',
  personnel_data_bullets JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_compliance_article ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for security_compliance_article"
  ON public.security_compliance_article
  FOR SELECT
  USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated write access for security_compliance_article"
  ON public.security_compliance_article
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default content
INSERT INTO public.security_compliance_article (
  title,
  subtitle,
  health_data_content,
  health_data_bullets,
  personnel_data_content,
  personnel_data_bullets
) VALUES (
  'How to Handle Health Data and Personnel Information',
  'Healthcare organisations do not only have access to medical information, but they also gather and store (sometimes sensitive) information about their staff members. Each category of data should be treated securely in order to maintain privacy of patients and personnel.',
  'Health data is all the information that relates to the health status of a person. This concerns not just medical data, such as physical health data and mental health data, but also financial and administrative data related to healthcare provision. When health data relates to an identified or identifiable individual it is considered as personal data, and even a special category of personal data which requires additional protection.',
  '["Is the data directly relevant to medical treatment?", "Is the patient informed about which information is processed and why?", "Is the patient aware of his or her right to access his or her medical file to verify or rectify information?", "Is the process to request access known to him or her?", "Is the data kept according to an appropriate retention period?", "Is data handled by healthcare professionals who are bound by the obligation of medical secrecy?", "Is data handled by administrative staff that signed a specific confidentiality declaration?", "Is a risk assessment conducted and are appropriate security measures put in place?"]'::jsonb,
  'According to information security experts, human resources and administrative departments receive little to no attention when healthcare organisations update their security procedures and implement training sessions. Personnel data protection requires careful handling to ensure compliance with data protection regulations.',
  '["Data quality: do not process more personal data than necessary", "Right of information: inform staff members of their rights", "Right of access: provide access to staff members files for verification", "Retention period: ensure data is kept according to the appropriate retention period", "Data security: make sure personnel data is handled by appropriate staff members"]'::jsonb
);