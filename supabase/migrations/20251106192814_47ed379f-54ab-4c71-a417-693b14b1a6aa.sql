-- Add unique constraint on section_key to enable proper upsert operations
ALTER TABLE section_content
ADD CONSTRAINT section_content_section_key_unique UNIQUE (section_key);