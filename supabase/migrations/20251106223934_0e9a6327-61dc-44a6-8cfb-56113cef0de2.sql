-- Add text_color and border_color columns to research_hub_categories table
ALTER TABLE research_hub_categories 
ADD COLUMN IF NOT EXISTS text_color text DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS border_color text DEFAULT '#8b5cf6';