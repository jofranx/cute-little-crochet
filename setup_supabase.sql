-- ==============================================================================
-- 🌸 Cute Little Crochet — Supabase Database & Storage Setup Script
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/_/sql
-- 2. Click "New query", paste this entire script, and click "Run".
-- ==============================================================================

-- 1. CREATE PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    badge TEXT NOT NULL DEFAULT 'ready', -- 'ready', 'custom', 'sold'
    image TEXT NOT NULL,
    description TEXT,
    yarn TEXT DEFAULT '100% Premium Milk Cotton',
    dimensions TEXT DEFAULT 'Standard',
    care TEXT DEFAULT 'Gentle hand wash cold, dry flat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;

-- Allow anyone to view products (shoppers across India)
CREATE POLICY "Public can view products"
ON public.products FOR SELECT
USING (true);

-- Only logged-in owner can insert new creations
CREATE POLICY "Authenticated users can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only logged-in owner can update creations (prices, badges, etc.)
CREATE POLICY "Authenticated users can update products"
ON public.products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only logged-in owner can delete creations
CREATE POLICY "Authenticated users can delete products"
ON public.products FOR DELETE
TO authenticated
USING (true);

-- 3. CREATE PUBLIC STORAGE BUCKET FOR CROCHET PHOTOS
INSERT INTO storage.buckets (id, name, public)
VALUES ('crochet-photos', 'crochet-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies if re-running
DROP POLICY IF EXISTS "Public can view crochet photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload crochet photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update crochet photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete crochet photos" ON storage.objects;

-- Allow public read access to photos
CREATE POLICY "Public can view crochet photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'crochet-photos');

-- Only logged-in owner can upload photos
CREATE POLICY "Authenticated users can upload crochet photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'crochet-photos');

-- Only logged-in owner can update photos
CREATE POLICY "Authenticated users can update crochet photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'crochet-photos');

-- Only logged-in owner can delete photos
CREATE POLICY "Authenticated users can delete crochet photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'crochet-photos');

-- 4. INSERT STARTER CREATIONS (IF TABLE IS EMPTY)
INSERT INTO public.products (id, name, category, price, original_price, badge, image, description, dimensions, yarn, care)
VALUES 
(
  'clc-1',
  'Daisy Meadow Slouchy Tote Bag',
  'bags',
  1199,
  1499,
  'ready',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
  'A breezy, aesthetic shoulder bag handcrafted from individual granny squares with cheerful daisies. Spacious enough for a book, wallet, keys, and your daily essentials.',
  '32 cm x 30 cm (Drop length: 26 cm)',
  '100% Breathable Milk Cotton Yarn',
  'Gentle hand wash with cold water, lay flat to dry in shade'
),
(
  'clc-2',
  'Strawberry Bunny Amigurumi Plushie',
  'plushies',
  649,
  NULL,
  'ready',
  'https://images.unsplash.com/photo-1559715745-e1b123c5c407?q=80&w=800&auto=format&fit=crop',
  'Super soft pocket-sized plush bunny wearing a tiny strawberry beret. Stuffed with hypoallergenic polyester fiberfill and fitted with safety eyes.',
  '18 cm tall (including floppy ears)',
  'Extra Soft Baby Cotton Blend',
  'Spot clean only with a damp cloth'
),
(
  'clc-3',
  'Pastel Checkered Bucket Hat',
  'wearables',
  849,
  1099,
  'custom',
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
  'A trendy cottagecore bucket hat woven in soft lilac and cream checkerboard pattern. Lightweight, cozy, and perfectly styled for sunny afternoons.',
  'Standard Adult Fit (Head circumference 54-58 cm)',
  '100% Breathable Organic Cotton',
  'Hand wash cold, reshape and dry flat'
),
(
  'clc-4',
  'Cozy Daisy Bloom Coaster Set (Pack of 4)',
  'home',
  449,
  599,
  'ready',
  'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  'Brighten your morning chai or coffee! Set of 4 handmade floral mug rugs that absorb heat and tabletop moisture with vibrant petals.',
  '12 cm diameter per coaster',
  'Durable Double-strand Cotton',
  'Machine washable on gentle cycle inside a laundry mesh bag'
),
(
  'clc-5',
  'Handcrafted Granny Square Cardigan',
  'wearables',
  2899,
  3499,
  'custom',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
  'Our signature statement piece! Over 50 unique hand-stitched floral squares joined into a cozy, oversized cardigan with ribbed cuffs and horn buttons.',
  'Free size (Oversized fit, chest up to 44 inches)',
  'Premium Milk Cotton & Acrylic Blend',
  'Dry clean recommended or hand wash with mild wool wash detergent'
),
(
  'clc-6',
  'Matcha Turtle Desk Amigurumi',
  'plushies',
  549,
  NULL,
  'ready',
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
  'A charming little turtle with a spiral matcha-green shell to keep you company on your study desk or office setup. Guaranteed to bring instant smile!',
  '14 cm length x 8 cm height',
  '100% Milk Cotton',
  'Spot clean with mild soapy water'
),
(
  'clc-7',
  'Ruffled Cottagecore Scrunchie Duo',
  'accessories',
  299,
  NULL,
  'ready',
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop',
  'Set of two voluminous ruffled crochet scrunchies in Dusty Rose and Cream. Gentle on hair strands with zero snagging or breakage.',
  '11 cm outer diameter (stretches up to 20 cm)',
  'Silky Soft Microfiber Cotton',
  'Quick hand rinse, air dry'
),
(
  'clc-8',
  'Blooming Tulip Flower Pot Desk Buddy',
  'home',
  499,
  NULL,
  'sold',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
  'A potted crochet tulip that never withers! Hand-wired stem allows you to bend and adjust the blossom angle.',
  '16 cm total height',
  'Cotton Yarn with weighted base',
  'Gently dust with a soft brush'
)
ON CONFLICT (id) DO NOTHING;
