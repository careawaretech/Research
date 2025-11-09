-- Add image_url and video_url columns to technology_deployments_hero table
ALTER TABLE public.technology_deployments_hero
ADD COLUMN image_url TEXT,
ADD COLUMN video_url TEXT;