-- Add page_order column to content_pages table for drag-and-drop ordering
ALTER TABLE public.content_pages
ADD COLUMN IF NOT EXISTS page_order integer DEFAULT 0;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_content_pages_page_order ON public.content_pages(page_order);

-- Update existing pages with sequential order if they don't have one
UPDATE public.content_pages
SET page_order = subquery.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num
  FROM public.content_pages
  WHERE page_order = 0
) AS subquery
WHERE public.content_pages.id = subquery.id;