-- Add text_color column to research_hub_trending_topics table
ALTER TABLE research_hub_trending_topics 
ADD COLUMN IF NOT EXISTS text_color text NOT NULL DEFAULT 'text-gray-900';