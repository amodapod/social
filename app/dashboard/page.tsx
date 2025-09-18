"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, BarChart, PieChart } from "@/components/ui/charts"
import { 
  Users, 
  Eye, 
  Heart, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  PlayCircle,
  Sparkles,
  Youtube,
  MessageSquare,
  ThumbsUp,
  Clock3,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

type MetricCardProps = {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down'
}

const MetricCard = ({ title, value, change, icon, trend }: MetricCardProps) => (
  <Card className="p-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          <span className="ml-1">{change}% from last month</span>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-primary/10">
        {icon}
      </div>
    </div>
  </Card>
)

const RecentVideo = ({ title, views, published, thumbnail }: { title: string, views: string, published: string, thumbnail: string }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
    <div className="relative w-16 h-10 bg-muted rounded overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
        <PlayCircle className="h-5 w-5" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{title}</p>
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        <span>{views} views</span>
        <span className="mx-1">•</span>
        <span>{published}</span>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </div>
)

export default function DashboardPage() {
  const metrics = [
    { title: 'Total Subscribers', value: '125.4K', change: 12.5, icon: <Users className="h-5 w-5 text-blue-500" />, trend: 'up' as const },
    { title: 'Total Views', value: '2.4M', change: 8.2, icon: <Eye className="h-5 w-5 text-purple-500" />, trend: 'up' as const },
    { title: 'Engagement Rate', value: '11.8%', change: -2.1, icon: <Heart className="h-5 w-5 text-pink-500" />, trend: 'down' as const },
    { title: 'Revenue', value: '$4,280', change: 15.3, icon: <DollarSign className="h-5 w-5 text-green-500" />, trend: 'up' as const },
  ]

  const recentVideos = [
    { title: '5 Secret Tips That Will Change Your Life', views: '124K', published: '2 days ago' },
    { title: 'How to Grow Your Channel in 30 Days', views: '89.5K', published: '1 week ago' },
    { title: 'The Ultimate Guide to YouTube SEO', views: '210K', published: '2 weeks ago' },
  ]

  const comments = [
    { author: 'JohnDoe', text: 'Great video! Very helpful tips.', time: '2h ago', likes: 42 },
    { author: 'JaneSmith', text: 'When is the next video coming?', time: '5h ago', likes: 15 },
  ]

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening with your channel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock3 className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Sparkles className="h-4 w-4 mr-2" />
            New Video
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 grid gap-4 md:grid-cols-3 overflow-hidden">
        {/* Left Column - Charts */}
        <div className="md:col-span-2 space-y-4 overflow-auto pr-2">
          {/* Views Chart */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Views & Watch Time</h3>
                <p className="text-sm text-muted-foreground">Last 14 days</p>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View All
              </Button>
            </div>
            <div className="h-64">
              <LineChart />
            </div>
          </Card>

          {/* Engagement Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-4">Engagement Rate</h4>
              <div className="h-40">
                <PieChart />
              </div>
            </Card>
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-4">Audience Demographics</h4>
              <div className="h-40">
                <BarChart />
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - Activity Feed */}
        <div className="space-y-4 overflow-auto">
          {/* Recent Videos */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Recent Videos</h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {recentVideos.map((video, i) => (
                <RecentVideo key={i} {...video} thumbnail="" />
              ))}
            </div>
          </Card>

          {/* Recent Comments */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Recent Comments</h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <MessageSquare className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {comments.map((comment, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-muted-foreground">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-muted-foreground">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Channel Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Watch Time</span>
                  <span className="font-medium">+12.5%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Subscriber Growth</span>
                  <span className="font-medium">+8.2%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-medium">-2.1%</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}