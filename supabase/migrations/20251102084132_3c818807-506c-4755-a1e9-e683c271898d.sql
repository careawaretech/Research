-- Add display_order column to media_library table for folder ordering
ALTER TABLE media_library 
ADD COLUMN display_order INTEGER DEFAULT 0;