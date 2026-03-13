/*
  # Aesthetic Social Haus Database Schema

  1. New Tables
    - `portfolio_items`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `client_name` (text)
      - `category` (text) - e.g., 'branding', 'social-media', 'meta-ads'
      - `image_url` (text)
      - `featured` (boolean)
      - `order_position` (integer)
      - `created_at` (timestamptz)
      
    - `testimonials`
      - `id` (uuid, primary key)
      - `client_name` (text)
      - `company_name` (text)
      - `position` (text)
      - `testimonial` (text)
      - `rating` (integer)
      - `image_url` (text)
      - `featured` (boolean)
      - `created_at` (timestamptz)
      
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `author` (text)
      - `category` (text)
      - `image_url` (text)
      - `published` (boolean)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      
    - `contact_leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `message` (text)
      - `service_interest` (text)
      - `status` (text) - 'new', 'contacted', 'converted'
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Admin-only write access (will be handled via service role)
*/

-- Portfolio Items Table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  client_name text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view portfolio items"
  ON portfolio_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  company_name text NOT NULL,
  position text NOT NULL,
  testimonial text NOT NULL,
  rating integer DEFAULT 5,
  image_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Baris & Gizem',
  category text NOT NULL,
  image_url text,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Contact Leads Table
CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  service_interest text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact leads"
  ON contact_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_items(featured, order_position);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads(status, created_at DESC);