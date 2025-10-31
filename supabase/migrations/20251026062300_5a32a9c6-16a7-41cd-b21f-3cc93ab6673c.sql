-- Create how_it_works_cards table
CREATE TABLE public.how_it_works_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon_url text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.how_it_works_cards ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "How it works cards are publicly readable"
ON public.how_it_works_cards FOR SELECT
TO public
USING (true);

-- Admin write access
CREATE POLICY "Admins can manage how it works cards"
ON public.how_it_works_cards FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_how_it_works_cards_updated_at
  BEFORE UPDATE ON public.how_it_works_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('how-it-works-images', 'how-it-works-images', true);

-- RLS policies for storage
CREATE POLICY "Public can view how-it-works images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'how-it-works-images');

CREATE POLICY "Admins can upload how-it-works images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'how-it-works-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete how-it-works images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'how-it-works-images' AND public.is_admin(auth.uid()));

-- Insert sample data
INSERT INTO public.how_it_works_cards (title, description, icon_url, display_order, is_active) VALUES
('How it works?', 'How it works ?', 'https://bdajvurergjvenfmwohr.supabase.co/storage/v1/object/public/how-it-works-images/k5e8adb659b-1759300873533.png', 1, true),
('Free Installation', 'What is Free Installation?', 'https://bdajvurergjvenfmwohr.supabase.co/storage/v1/object/public/how-it-works-images/vsj34ykyllj-1759301304251.png', 2, true),
('Customized Dashboard', 'What is Dashboard?', 'https://bdajvurergjvenfmwohr.supabase.co/storage/v1/object/public/how-it-works-images/unxn4u2mkwk-1759301559418.png', 3, true),
('Learning Center', 'Your Learning Center is Here!', 'https://bdajvurergjvenfmwohr.supabase.co/storage/v1/object/public/how-it-works-images/kcjnrzt58n-1759301866797.png', 4, true);