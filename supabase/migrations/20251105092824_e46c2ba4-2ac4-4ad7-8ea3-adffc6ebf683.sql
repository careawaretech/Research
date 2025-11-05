-- Add pdf_url and category to research hub papers tables
ALTER TABLE research_hub_featured_papers 
ADD COLUMN IF NOT EXISTS pdf_url text,
ADD COLUMN IF NOT EXISTS category text;

ALTER TABLE research_hub_latest_papers 
ADD COLUMN IF NOT EXISTS pdf_url text,
ADD COLUMN IF NOT EXISTS category text;

-- Add icon_type and lucide_icon_name to categories if not exists
ALTER TABLE research_hub_categories 
ADD COLUMN IF NOT EXISTS icon_type text DEFAULT 'upload',
ADD COLUMN IF NOT EXISTS lucide_icon_name text;