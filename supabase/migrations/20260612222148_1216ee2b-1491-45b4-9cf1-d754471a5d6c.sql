CREATE TYPE public.app_role AS ENUM ('admin', 'member');
CREATE TYPE public.profile_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 80),
  avatar_url text CHECK (avatar_url IS NULL OR char_length(avatar_url) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Members update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Members delete own profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.dogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  photo_url text NOT NULL CHECK (char_length(photo_url) <= 1000),
  breed text NOT NULL CHECK (char_length(breed) BETWEEN 1 AND 100),
  age text NOT NULL CHECK (char_length(age) BETWEEN 1 AND 40),
  personality text NOT NULL CHECK (char_length(personality) BETWEEN 1 AND 240),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1200),
  owner_name text NOT NULL CHECK (char_length(owner_name) BETWEEN 1 AND 80),
  status public.profile_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.dogs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dogs TO authenticated;
GRANT ALL ON public.dogs TO service_role;
ALTER TABLE public.dogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views approved dogs" ON public.dogs FOR SELECT TO anon, authenticated USING (status = 'approved' OR auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Members add own dogs" ON public.dogs FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id AND status = 'pending');
CREATE POLICY "Members update own dogs" ON public.dogs FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin')) WITH CHECK (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Members delete own dogs" ON public.dogs FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 140),
  category text NOT NULL CHECK (category IN ('Tiendas Recomendadas', 'Clínicas de Emergencia', 'Veterinarios y Especialidades')),
  address text NOT NULL CHECK (char_length(address) BETWEEN 1 AND 240),
  website text CHECK (website IS NULL OR char_length(website) <= 1000),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 600),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.resources TO anon, authenticated;
GRANT ALL ON public.resources TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.resources TO authenticated;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Resources are public" ON public.resources FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage resources" ON public.resources FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.community_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 140),
  image_url text NOT NULL CHECK (char_length(image_url) <= 1000),
  text text NOT NULL CHECK (char_length(text) BETWEEN 1 AND 600),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.community_highlights TO anon, authenticated;
GRANT ALL ON public.community_highlights TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.community_highlights TO authenticated;
ALTER TABLE public.community_highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Highlights are public" ON public.community_highlights FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage highlights" ON public.community_highlights FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER dogs_updated_at BEFORE UPDATE ON public.dogs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER highlights_updated_at BEFORE UPDATE ON public.community_highlights FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();