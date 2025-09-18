"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUp, Users, Eye, Heart, ExternalLink } from "lucide-react"

interface CompetitorCardProps {
  name: string
  channelId: string
  subscribers: number
  totalViews: number
  engagementRate: number
  niche: string
  isTracking?: boolean
}

export function CompetitorCard({
  name,
  channelId,
  subscribers,
  totalViews,
  engagementRate,
  niche,
  isTracking = false
}: CompetitorCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-600 text-white">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{niche}</CardDescription>
          </div>
        </div>
        <Badge variant={isTracking ? "default" : "secondary"}>
          {isTracking ? "Tracking" : "Track"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center text-muted-foreground mb-1">
              <Users className="h-4 w-4 mr-1" />
            </div>
            <div className="text-sm font-medium">{formatNumber(subscribers)}</div>
            <div className="text-xs text-muted-foreground">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-muted-foreground mb-1">
              <Eye className="h-4 w-4 mr-1" />
            </div>
            <div className="text-sm font-medium">{formatNumber(totalViews)}</div>
            <div className="text-xs text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-muted-foreground mb-1">
              <Heart className="h-4 w-4 mr-1" />
            </div>
            <div className="text-sm font-medium">{engagementRate}%</div>
            <div className="text-xs text-muted-foreground">Engagement</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            Analyze
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}