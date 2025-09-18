/*
  # Creator Dashboard Schema

  1. New Tables
    - `channel_metrics` - Store YouTube channel analytics and KPIs
    - `ai_results` - Store AI-generated content results and status
    - `competitor_channels` - Track competitor channel data and analytics
    - `user_credits` - Manage user credit system for AI tools

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for competitor data access

  3. Features
    - Credit system for AI tool usage
    - Real-time analytics tracking
    - Competitor monitoring
    - AI content generation history
*/

-- Channel Metrics Table
CREATE TABLE IF NOT EXISTS channel_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subscribers int DEFAULT 0,
  total_views int DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  revenue_estimate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- AI Results Table
CREATE TABLE IF NOT EXISTS ai_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tool varchar NOT NULL,
  input jsonb,
  output jsonb,
  status varchar NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Competitor Channels Table
CREATE TABLE IF NOT EXISTS competitor_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  channel_id varchar NOT NULL UNIQUE,
  subscribers int DEFAULT 0,
  total_views int DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  niche varchar,
  last_updated timestamptz DEFAULT now()
);

-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  credits int DEFAULT 100,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE channel_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Channel Metrics Policies
CREATE POLICY "Users can access their own channel metrics"
  ON channel_metrics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- AI Results Policies
CREATE POLICY "Users can access their own AI results"
  ON ai_results
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Competitor Channels Policies (all authenticated users can read)
CREATE POLICY "Users can read competitor channels"
  ON competitor_channels
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert competitor channels"
  ON competitor_channels
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- User Credits Policies
CREATE POLICY "Users can access their own credits"
  ON user_credits
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS channel_metrics_user_id_idx ON channel_metrics(user_id);
CREATE INDEX IF NOT EXISTS ai_results_user_id_idx ON ai_results(user_id);
CREATE INDEX IF NOT EXISTS ai_results_status_idx ON ai_results(status);
CREATE INDEX IF NOT EXISTS competitor_channels_channel_id_idx ON competitor_channels(channel_id);
CREATE INDEX IF NOT EXISTS user_credits_user_id_idx ON user_credits(user_id);

-- Insert sample competitor data
INSERT INTO competitor_channels (name, channel_id, subscribers, total_views, engagement_rate, niche) 
VALUES 
  ('MrBeast', 'UCX6OQ3DkcsbYNE6H8uQQuVA', 200000000, 50000000000, 12.5, 'Entertainment'),
  ('PewDiePie', 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', 111000000, 29000000000, 8.2, 'Gaming'),
  ('Dude Perfect', 'UCRijo3ddMTht_IHyNSNXpNQ', 59000000, 14000000000, 15.1, 'Sports'),
  ('Marques Brownlee', 'UCBJycsmduvYEL83R_U4JriQ', 17500000, 3500000000, 9.8, 'Technology'),
  ('Emma Chamberlain', 'UCMpqT1sRFurGXJwKCDvH1rg', 12000000, 2000000000, 11.3, 'Lifestyle')
ON CONFLICT (channel_id) DO NOTHING;