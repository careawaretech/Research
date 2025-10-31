-- Add page_slug column to media_library table
ALTER TABLE public.media_library 
ADD COLUMN IF NOT EXISTS page_slug text;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_media_library_page_slug 
ON public.media_library(page_slug);

-- Add comment for clarity
COMMENT ON COLUMN public.media_library.page_slug IS 'The page this media belongs to (e.g., home, about-us, technology, etc.)';