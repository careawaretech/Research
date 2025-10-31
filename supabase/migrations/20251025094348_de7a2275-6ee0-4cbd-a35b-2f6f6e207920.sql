-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'customer', 'editor', 'viewer');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create is_admin helper function
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- RLS policies for user_roles (only admins can manage roles)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Create customers table (user profiles for e-commerce)
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  customer_type TEXT DEFAULT 'residential' CHECK (customer_type IN ('residential', 'facility', 'business', 'gift')),
  acquisition_channel TEXT CHECK (acquisition_channel IN ('organic', 'social', 'direct', 'email', 'paid', 'referral')),
  total_orders INTEGER DEFAULT 0,
  lifetime_value DECIMAL(10,2) DEFAULT 0,
  last_order_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- RLS policies for customers
CREATE POLICY "Customers can view own profile"
  ON public.customers FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Customers can update own profile"
  ON public.customers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all customers"
  ON public.customers FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert customers"
  ON public.customers FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update customers"
  ON public.customers FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can insert their own customer profile"
  ON public.customers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  compare_at_price DECIMAL(10,2) CHECK (compare_at_price >= 0),
  cost DECIMAL(10,2) CHECK (cost >= 0),
  sku TEXT UNIQUE,
  inventory_quantity INTEGER DEFAULT 0 CHECK (inventory_quantity >= 0),
  image_url TEXT,
  images TEXT[],
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  tags TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products (public can view active, admins manage all)
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  tax DECIMAL(10,2) DEFAULT 0 CHECK (tax >= 0),
  shipping DECIMAL(10,2) DEFAULT 0 CHECK (shipping >= 0),
  discount DECIMAL(10,2) DEFAULT 0 CHECK (discount >= 0),
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  shipping_address_line1 TEXT,
  shipping_address_line2 TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_zip TEXT,
  shipping_country TEXT,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS policies for orders
CREATE POLICY "Customers can view own orders"
  ON public.orders FOR SELECT
  USING (
    customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid())
    OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all orders"
  ON public.orders FOR ALL
  USING (public.is_admin(auth.uid()));

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for order_items
CREATE POLICY "Users can view items from own orders"
  ON public.order_items FOR SELECT
  USING (
    order_id IN (
      SELECT o.id FROM public.orders o
      JOIN public.customers c ON o.customer_id = c.id
      WHERE c.user_id = auth.uid()
    )
    OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all order items"
  ON public.order_items FOR ALL
  USING (public.is_admin(auth.uid()));

-- Create customer_activity table for tracking
CREATE TABLE public.customer_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('registration', 'order_placed', 'first_purchase', 'high_value_order', 'inquiry', 'profile_update')),
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on customer_activity
ALTER TABLE public.customer_activity ENABLE ROW LEVEL SECURITY;

-- RLS policies for customer_activity
CREATE POLICY "Admins can view all activity"
  ON public.customer_activity FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert activity"
  ON public.customer_activity FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create customer profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.customers (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to create customer profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to track customer activity
CREATE OR REPLACE FUNCTION public.track_customer_activity(
  _customer_id UUID,
  _activity_type TEXT,
  _description TEXT,
  _metadata JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.customer_activity (customer_id, activity_type, description, metadata)
  VALUES (_customer_id, _activity_type, _description, _metadata)
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$;

-- Create function to update customer stats (called when orders change)
CREATE OR REPLACE FUNCTION public.update_customer_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.customers
    SET 
      total_orders = (
        SELECT COUNT(*) FROM public.orders 
        WHERE customer_id = NEW.customer_id 
        AND status NOT IN ('cancelled', 'refunded')
      ),
      lifetime_value = (
        SELECT COALESCE(SUM(total), 0) FROM public.orders 
        WHERE customer_id = NEW.customer_id 
        AND status NOT IN ('cancelled', 'refunded')
      ),
      last_order_date = (
        SELECT MAX(created_at) FROM public.orders 
        WHERE customer_id = NEW.customer_id
      )
    WHERE id = NEW.customer_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to update customer stats when orders change
CREATE TRIGGER update_customer_stats_on_order
  AFTER INSERT OR UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_customer_stats();

-- Create storage buckets for admin uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('customer-avatars', 'customer-avatars', true),
  ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images (public read, admin write)
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND public.is_admin(auth.uid()));

-- Storage policies for customer avatars
CREATE POLICY "Public can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'customer-avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'customer-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'customer-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for documents (admin only)
CREATE POLICY "Admins can view documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'documents' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND public.is_admin(auth.uid()));

-- Generate sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  next_val BIGINT;
BEGIN
  next_val := nextval('order_number_seq');
  RETURN 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || LPAD(next_val::TEXT, 6, '0');
END;
$$;

-- Insert admin user role for research@careawaretech.com
-- Note: This will work after the user signs up
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Find the user ID for research@careawaretech.com
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'research@careawaretech.com'
  LIMIT 1;
  
  -- If user exists, assign admin role
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;