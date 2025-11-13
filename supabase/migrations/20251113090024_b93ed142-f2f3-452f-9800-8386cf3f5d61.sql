-- Add color fields to research_in_progress_highlights table
ALTER TABLE public.research_in_progress_highlights
ADD COLUMN IF NOT EXISTS background_color text DEFAULT '#010201',
ADD COLUMN IF NOT EXISTS text_color text DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS border_color text DEFAULT '#3b82f6';