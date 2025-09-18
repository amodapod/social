"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts"
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Heart,
  Play,
  Share2,
  MessageCircle
} from "lucide-react"

const performanceData = [
  { date: "2024-01", views: 45000, subscribers: 1200, engagement: 8.2, revenue: 850 },
  { date: "2024-02", views: 52000, subscribers: 1450, engagement: 9.1, revenue: 980 },
  { date: "2024-03", views: 48000, subscribers: 1380, engagement: 7.8, revenue: 920 },
  { date: "2024-04", views: 63000, subscribers: 1820, engagement: 10.5, revenue: 1200 },
  { date: "2024-05", views: 71000, subscribers: 2100, engagement: 11.2, revenue: 1450 },
  { date: "2024-06", views: 89000, subscribers: 2650, engagement: 12.8, revenue: 1780 },
]

const audienceRetention = [
  { time: "0%", retention: 100 },
  { time: "10%", retention: 85 },
  { time: "20%", retention: 72 },
  { time: "30%", retention: 65 },
  { time: "40%", retention: 58 },
  { time: "50%", retention: 52 },
  { time: "60%", retention: 45 },
  { time: "70%", retention: 38 },
  { time: "80%", retention: 32 },
  { time: "90%", retention: 25 },
  { time: "100%", retention: 20 },
]

const topVideos = [
  { title: "Ultimate Productivity Tips", views: 125000, engagement: 15.2, duration: "12:34" },
  { title: "AI Tools for Creators", views: 89000, engagement: 12.8, duration: "8:47" },
  { title: "Behind the Scenes Vlog", views: 67000, engagement: 18.9, duration: "15:22" },
  { title: "Q&A Session Live", views: 54000, engagement: 22.1, duration: "45:12" },
  { title: "Tutorial Series Ep 1", views: 43000, engagement: 9.7, duration: "18:56" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Deep insights into your channel performance and audience behavior
          </p>
        </div>
        <Button variant="outline">
          <TrendingUp className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250h</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg View Duration</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8:45</div>
            <p className="text-xs text-muted-foreground">
              65% avg retention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-muted-foreground">
              Above average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,340</div>
            <p className="text-xs text-muted-foreground">
              +25% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Channel Performance Overview</CardTitle>
          <CardDescription>
            Views, subscribers, engagement, and revenue trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="views" 
                stackId="1"
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorViews)" 
              />
              <Area 
                type="monotone" 
                dataKey="subscribers" 
                stackId="2"
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorSubscribers)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Audience Retention & Top Videos */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Audience Retention</CardTitle>
            <CardDescription>
              Average percentage of video watched
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={audienceRetention}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="retention" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Videos</CardTitle>
            <CardDescription>
              Your most successful content this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVideos.map((video, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{video.title}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {video.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {video.engagement}%
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>
            Where your viewers are discovering your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">45%</div>
              <div className="text-sm text-muted-foreground">YouTube Search</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">28%</div>
              <div className="text-sm text-muted-foreground">Suggested Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">15%</div>
              <div className="text-sm text-muted-foreground">External Sources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">12%</div>
              <div className="text-sm text-muted-foreground">Direct/Unknown</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}