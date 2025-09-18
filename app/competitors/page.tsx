"use client"

import { useState, useEffect } from "react"
import { CompetitorCard } from "@/components/competitors/competitor-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp, Users, Eye } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Competitor {
  id: string
  name: string
  channel_id: string
  subscribers: number
  total_views: number
  engagement_rate: number
  niche: string
  last_updated: string
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompetitors()
  }, [])

  const fetchCompetitors = async () => {
    try {
      const { data, error } = await supabase
        .from('competitor_channels')
        .select('*')
        .order('subscribers', { ascending: false })

      if (error) {
        console.error('Error fetching competitors:', error)
        return
      }

      setCompetitors(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCompetitors = competitors.filter(competitor =>
    competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    competitor.niche.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalSubscribers = competitors.reduce((sum, comp) => sum + comp.subscribers, 0)
  const avgEngagement = competitors.reduce((sum, comp) => sum + comp.engagement_rate, 0) / competitors.length || 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading competitors...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
          <p className="text-muted-foreground">
            Track and analyze your competitors to stay ahead in your niche
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Competitor
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tracked Competitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitors.length}</div>
            <p className="text-xs text-muted-foreground">
              Active channels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reach
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalSubscribers / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Combined subscribers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Engagement
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all channels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Niche
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              Entertainment
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Channels in niche
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search competitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">All Niches</Badge>
          <Badge variant="outline">Entertainment</Badge>
          <Badge variant="outline">Gaming</Badge>
          <Badge variant="outline">Technology</Badge>
        </div>
      </div>

      {/* Competitor Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompetitors.map((competitor) => (
          <CompetitorCard
            key={competitor.id}
            name={competitor.name}
            channelId={competitor.channel_id}
            subscribers={competitor.subscribers}
            totalViews={competitor.total_views}
            engagementRate={competitor.engagement_rate}
            niche={competitor.niche}
            isTracking={true}
          />
        ))}
      </div>

      {filteredCompetitors.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No competitors found</CardTitle>
            <CardDescription>
              {searchTerm 
                ? "Try adjusting your search terms or add new competitors to track."
                : "Start by adding competitors in your niche to analyze their performance."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Competitor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}