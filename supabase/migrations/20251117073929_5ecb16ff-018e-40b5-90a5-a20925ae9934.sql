-- Add reference fields to security_compliance_article table
ALTER TABLE security_compliance_article
ADD COLUMN reference_text TEXT DEFAULT 'This article was originally published on the SecureHospitals.eu online Hub. For full references and further reading suggestions, please visit the original source.',
ADD COLUMN reference_url TEXT DEFAULT NULL;