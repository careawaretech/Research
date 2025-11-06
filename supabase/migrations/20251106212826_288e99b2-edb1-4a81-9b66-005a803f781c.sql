-- Add show_in_hero column to research_hub_featured_papers
ALTER TABLE research_hub_featured_papers 
ADD COLUMN show_in_hero boolean DEFAULT false;

-- Also add to latest_papers for flexibility
ALTER TABLE research_hub_latest_papers 
ADD COLUMN show_in_hero boolean DEFAULT false;

-- Set first 3 papers to show in hero by default
UPDATE research_hub_featured_papers 
SET show_in_hero = true 
WHERE id IN (
  SELECT id FROM research_hub_featured_papers 
  ORDER BY display_order 
  LIMIT 3
);