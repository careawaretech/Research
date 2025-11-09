-- Create content page entry for technology-deployments
INSERT INTO public.content_pages (page_slug, title, meta_description, content)
VALUES (
  'technology-deployments',
  'Technology Deployments',
  'Empowering patient safety with privacy-first sensing in every environment',
  '{}'::jsonb
)
ON CONFLICT (page_slug) DO NOTHING;

-- Create hero section for technology-deployments page
INSERT INTO public.page_sections (page_id, section_type, content, display_order)
SELECT 
  cp.id,
  'hero',
  jsonb_build_object(
    'title', 'Technology Deployments',
    'subtitle', 'Empowering patient safety with privacy-first sensing in every environment—from clinical settings to the comfort of home.',
    'slider', jsonb_build_array(),
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', 'Activity',
        'title', 'Clinical Deployment',
        'subtitle', 'Hospital-grade monitoring',
        'button', jsonb_build_object(
          'text', 'Learn More',
          'action', 'navigate',
          'url', '/clinical-validation'
        )
      ),
      jsonb_build_object(
        'icon', 'Home',
        'title', 'Home Monitoring',
        'subtitle', 'Privacy-first home care',
        'button', jsonb_build_object(
          'text', 'Explore',
          'action', 'navigate',
          'url', '/partners'
        )
      ),
      jsonb_build_object(
        'icon', 'Shield',
        'title', 'Privacy by Design',
        'subtitle', 'Built-in protection',
        'button', jsonb_build_object(
          'text', 'View Details',
          'action', 'navigate',
          'url', '/privacy'
        )
      )
    )
  ),
  0
FROM public.content_pages cp
WHERE cp.page_slug = 'technology-deployments'
ON CONFLICT DO NOTHING;