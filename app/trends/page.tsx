"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp,
  TrendingDown,
  Hash,
  Play,
  Eye,
  Clock,
  Flame,
  Lightbulb,
  Target
} from "lucide-react"

const trendingTopics = [
  {
    topic: "AI Productivity Tools",
    growth: +245,
    volume: 2400000,
    difficulty: "Medium",
    opportunity: "High",
    category: "Technology"
  },
  {
    topic: "Sustainable Living",
    growth: +189,
    volume: 1800000,
    difficulty: "Low",
    opportunity: "High",
    category: "Lifestyle"
  },
  {
    topic: "Remote Work Tips",
    growth: +156,
    volume: 3200000,
    difficulty: "High",
    opportunity: "Medium",
    category: "Business"
  },
  {
    topic: "Mental Health Awareness",
    growth: +134,
    volume: 2900000,
    difficulty: "Medium",
    opportunity: "High",
    category: "Health"
  },
  {
    topic: "Crypto Education",
    growth: -23,
    volume: 1500000,
    difficulty: "High",
    opportunity: "Low",
    category: "Finance"
  }
]

const contentIdeas = [
  {
    title: "\"5 AI Tools That Will Replace Your Job (And How to Use Them)\"",
    trend: "AI Productivity Tools",
    estimated_views: "150K - 300K",
    competition: "Medium",
    keywords: ["AI tools", "productivity", "automation", "future of work"]
  },
  {
    title: "\"I Lived Sustainably for 30 Days - Here's What Happened\"",
    trend: "Sustainable Living",
    estimated_views: "80K - 200K",
    competition: "Low",
    keywords: ["sustainable", "eco-friendly", "zero waste", "environment"]
  },
  {
    title: "\"Remote Work Setup That Boosted My Productivity by 300%\"",
    trend: "Remote Work Tips",
    estimated_views: "120K - 250K",
    competition: "High",
    keywords: ["remote work", "productivity", "home office", "work from home"]
  }
]

const hashtags = [
  { tag: "#AITools", growth: "+89%", volume: "2.4M" },
  { tag: "#Sustainability", growth: "+67%", volume: "1.8M" },
  { tag: "#RemoteWork", growth: "+45%", volume: "3.2M" },
  { tag: "#MentalHealth", growth: "+78%", volume: "2.9M" },
  { tag: "#Productivity", growth: "+56%", volume: "4.1M" },
  { tag: "#TechReview", growth: "+34%", volume: "1.6M" }
]

const competitorTrends = [
  {
    channel: "Tech Reviewer Pro",
    topic: "AI Reviews",
    views: "500K",
    engagement: "12.3%",
    trend: "rising"
  },
  {
    channel: "Sustainable Sarah",
    topic: "Eco Lifestyle",
    views: "250K",
    engagement: "18.7%",
    trend: "rising"
  },
  {
    channel: "Remote Work Hub",
    topic: "WFH Tips",
    views: "180K",
    engagement: "9.2%",
    trend: "stable"
  }
]

export default function TrendsPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low':
        return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'Medium':
        return 'bg-orange-500/20 text-orange-700 border-orange-500/30'
      case 'High':
        return 'bg-red-500/20 text-red-700 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'High':
        return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'Medium':
        return 'bg-orange-500/20 text-orange-700 border-orange-500/30'
      case 'Low':
        return 'bg-red-500/20 text-red-700 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trending Content</h1>
          <p className="text-muted-foreground">
            Discover trending topics and content opportunities in your niche
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Ideas
        </Button>
      </div>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Hot Topics Right Now
          </CardTitle>
          <CardDescription>
            Most trending topics with growth potential in your niche
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{topic.topic}</h3>
                    <Badge variant="outline" className="text-xs">
                      {topic.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {(topic.volume / 1000000).toFixed(1)}M searches
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(topic.difficulty)}
                      >
                        {topic.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lightbulb className="h-4 w-4" />
                      <Badge 
                        variant="outline" 
                        className={getOpportunityColor(topic.opportunity)}
                      >
                        {topic.opportunity}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    topic.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {topic.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {topic.growth >= 0 ? '+' : ''}{topic.growth}%
                  </div>
                  <p className="text-xs text-muted-foreground">growth</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Content Ideas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI-Generated Content Ideas
          </CardTitle>
          <CardDescription>
            Personalized video ideas based on trending topics and your style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentIdeas.map((idea, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">{idea.title}</h3>
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span>Based on: <strong>{idea.trend}</strong></span>
                  <span>Est. Views: <strong>{idea.estimated_views}</strong></span>
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(idea.competition)}
                  >
                    {idea.competition} Competition
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {idea.keywords.map((keyword, keyIndex) => (
                    <Badge key={keyIndex} variant="secondary" className="text-xs">
                      #{keyword}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Play className="mr-1 h-3 w-3" />
                  Create Script
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hashtags and Competitor Trends */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-blue-500" />
              Trending Hashtags
            </CardTitle>
            <CardDescription>
              Popular hashtags to maximize your content reach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hashtags.map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{hashtag.tag}</h4>
                    <p className="text-sm text-muted-foreground">{hashtag.volume} posts</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{hashtag.growth}</div>
                    <p className="text-xs text-muted-foreground">growth</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Trends</CardTitle>
            <CardDescription>
              What's working for similar channels in your niche
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competitorTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{trend.channel}</h4>
                    <p className="text-sm text-muted-foreground">{trend.topic}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-3 w-3" />
                      {trend.views}
                    </div>
                    <div className="text-sm text-green-600">{trend.engagement}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}