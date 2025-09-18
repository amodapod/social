 Project Context & Roadmap

## 🎯 Project Goal
Build an AI-powered Creator Dashboard with SocialBlade-style analytics, SEO optimization, workflow automation, monetization insights, and AI tools (title, tags, thumbnail generation, script, chapters) — starting with **YouTube** integration.

---

## 🛠️ Tech Stack

### Frontend
- React + TSX (Next.js recommended)
- TailwindCSS + shadcn/ui (UI components)
- Recharts / Chart.js (charts/graphs)
- Framer Motion (animations)

### Backend
- Node.js / Express (or Next.js API routes)
- Inngest → event-driven workflows (data collection, enrichment, automation)
- Supabase → Database + Auth + Storage
  - Postgres with row-level security
  - Supabase Auth for creator accounts
  - Supabase Functions / Edge Functions for lightweight APIs
- Redis (optional) → caching layer
- Auth: OAuth2 (Google Sign-In for YouTube)

### AI / Analysis
- Google Gemini API → titles, scripts, captions, summaries, insights
- Vertex AI Speech-to-Text → fallback for transcripts
- AI Tools Credit System: Each AI tool consumes credits; tracked per user in Supabase

### APIs / Data Sources
- YouTube Data API v3 → video metadata, engagement, channel stats
- YouTube Captions API → transcripts
- Google Trends → keyword/trend data
- Google Ads Keyword Planner → keyword volumes
- Optional Paid Enrichment:
  - SocialBlade API (competitor stats)
  - Ahrefs / SEMrush (SEO insights)
  - Pentos / Apify scrapers (TikTok/Spotify trends)

---

## 📊 AI Tools with Credit System

| Tool | Cost (credits) | Description |
|------|---------------|------------|
| Title Generator | 1 | Generate SEO-rich video title |
| Tags / Hashtags | 1 | 5–10 tags per video/post |
| Description / Caption | 2 | YouTube/TikTok descriptions |
| Script Generator | 5 | Full video script |
| Thumbnail Generation | 10 | Image creation or analysis |
| Video Chapters / Highlights | 3 | Generate timestamps from transcript |
| Hook & Intro Writer | 2 | Generate engaging video openings |

**Workflow:**
1. Frontend calls API → triggers `credits.checkAndDeduct`.
2. If sufficient credits, Inngest event fired (e.g., `ai.title.requested`).
3. Inngest worker calls Gemini → saves results in Supabase `ai_results`.
4. Notification sent to user when ready.

---

## 📦 Supabase Tables

```sql
-- User metrics for dashboard
CREATE TABLE channel_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  subscribers int,
  total_views int,
  engagement_rate numeric,
  revenue_estimate numeric,
  created_at timestamptz DEFAULT now()
);

-- AI Results
CREATE TABLE ai_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  tool varchar NOT NULL,
  input jsonb,
  output jsonb,
  status varchar NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Competitor Channels
CREATE TABLE competitor_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  channel_id varchar NOT NULL,
  subscribers int,
  total_views int,
  engagement_rate numeric,
  niche varchar,
  last_updated timestamptz DEFAULT now()
);
🔄 Recommended Inngest Functions
Function	Event Trigger	Purpose
ai.title.generate	ai.title.requested	Generate SEO-rich video title
ai.tags.generate	ai.tags.requested	Generate relevant hashtags/tags
ai.description.generate	ai.description.requested	Generate descriptions/captions
ai.script.generate	ai.script.requested	Generate full scripts
ai.thumbnail.generate	ai.thumbnail.requested	Generate/optimize thumbnails
ai.chapters.generate	ai.chapters.requested	Create video chapters from transcript
ai.hook.generate	ai.hook.requested	Generate engaging video hooks/intros
analytics.fetch	analytics/fetch	Pull user channel data from YouTube APIs
competitor.sync	competitor.sync.start	Fetch competitor stats, compute metrics
workflow.repurposeVideo	workflow.repurposeVideo.requested	Convert long-form content into Shorts/TikToks
comments.analyzeSentiment	comments.analyze.requested	Analyze comment sentiment
community.replyDraft	community.reply.requested	Draft comment/DM responses
credits.checkAndDeduct	Before AI events	Validate/deduct credits atomically
notifications.send	After AI/workflow completion	Notify frontend via Realtime/WebSocket/email

📊 Competitor Analytics
Data Sources: YouTube Data API v3

Channel stats: subscriberCount, viewCount, videoCount

Recent videos: views, likes, comments, duration, publishedAt

Trending/Shorts discovery: search.list with filters

Metrics:

Daily/weekly growth, engagement rate, velocity, influence score, estimated RPM

🚀 Advanced Feature Roadmap
Feature Area	Enhancement	Benefit
AI Tools	Trend prediction	Suggest videos likely to go viral
AI Tools	Tone/style matching	Consistent creator voice
AI Tools	Predictive thumbnail CTR	Maximize engagement
AI Tools	Challenge Finder	Trending Shorts/Reels ideas
Analytics	Engagement forecasting	Predict competitor video growth & engagement trends
Analytics	Content gap analysis	Identify unmade topics
Analytics	Audience behavior patterns	Optimize video length, posting times
Analytics	Performance Alerts	Detect spikes/drops
Workflow	Cross-platform automation	Repurpose videos for Shorts/TikTok/Reels
Workflow	Smart scheduling	Post at optimal times
Workflow	Comment & DM automation	Efficient audience engagement
Credits	Dynamic pricing & rewards	Incentivize usage
Monetization	Revenue forecasting & brand deals	Maximize earnings
AI Insights	Trend Radar	Detect trending challenges/sounds
AI Insights	Predictive scoring	Estimate video performance
Competitors	Influencer Finder	Suggest collaborations
Competitors	Anomaly Detection	Highlight unusual engagement

📈 Pipeline Overview
User Action / Scheduled Event triggers Inngest workflow.

Credits checked → AI job or analytics fetch starts.

Inngest Worker calls Google Gemini or YouTube API.

Results stored in Supabase → ai_results, channel_stats, video_stats.

Metrics computed → computed_metrics.

Notifications sent → frontend dashboards update in real-time.

Advanced AI recommendations displayed → content suggestions, thumbnails, scripts, trends, and monetization insights.

🎨 UI / UX Design Guidelines
Sidebar / Navigation
Dashboard, AI Tools, Analytics, Competitors, Workflows, Monetization, Trends, Settings/Profile

Dashboard Layout
KPI Cards: Subscribers, Views, Engagement, Revenue Estimate

Charts: Subscriber growth, engagement per video, heatmap of best posting times

Right Panel: AI Suggestions (titles, tags, thumbnails, scripts)

Bottom Section: Recent activity, competitor highlights, notifications

AI Tools Page
Input panel: topic, niche, optional transcript/video link

Output cards: title, description, tags, script, thumbnail

Credits usage bar: shows credits consumed per tool

Competitor Analytics Page
Competitor selector: search/add channels

Comparison charts: overlay growth, engagement, influence scores

Side panel: AI recommendations and trending opportunities

Workflows Page
Workflow cards: status, start/pause/schedule buttons

Event log: Inngest triggers, results, retry option

Monetization Page
Revenue KPI cards: RPM, earnings, affiliate conversions

Brand/affiliate suggestions: match score, contact/add buttons

Style & UX
Color palette: soft blues/greens for growth, yellow/orange for AI suggestions, red for warnings

Typography: bold sans-serif for headlines, medium-weight for body

Interactions: hover effects, drag-and-drop workflows, collapsible panels

Responsive: desktop-first, stacked cards on mobile/tablet