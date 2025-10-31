-- Fix security warnings: Add search_path to functions

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix track_customer_activity function
CREATE OR REPLACE FUNCTION public.track_customer_activity(
  _customer_id UUID,
  _activity_type TEXT,
  _description TEXT,
  _metadata JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fix update_customer_stats function
CREATE OR REPLACE FUNCTION public.update_customer_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fix generate_order_number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_val BIGINT;
BEGIN
  next_val := nextval('order_number_seq');
  RETURN 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || LPAD(next_val::TEXT, 6, '0');
END;
$$;