-- Add border gradient color fields to research_in_progress_highlights table
ALTER TABLE public.research_in_progress_highlights
ADD COLUMN IF NOT EXISTS border_gradient_color1 text DEFAULT '#4f9dff',
ADD COLUMN IF NOT EXISTS border_gradient_color2 text DEFAULT '#cf30aa';