"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign,
  TrendingUp,
  Target,
  Calendar,
  ExternalLink,
  Briefcase,
  Star,
  Clock
} from "lucide-react"

const revenueStreams = [
  {
    name: "Ad Revenue",
    amount: "$2,840",
    percentage: 65,
    change: +12.5,
    color: "bg-blue-500"
  },
  {
    name: "Sponsorships",
    amount: "$1,200",
    percentage: 27,
    change: +8.2,
    color: "bg-purple-500"
  },
  {
    name: "Merchandise",
    amount: "$350",
    percentage: 8,
    change: -3.1,
    color: "bg-green-500"
  }
]

const brandDeals = [
  {
    company: "TechGadget Co",
    status: "active",
    amount: "$5,000",
    deadline: "Jan 15, 2025",
    type: "Product Review",
    priority: "high"
  },
  {
    company: "Learning Platform",
    status: "pending",
    amount: "$2,500",
    deadline: "Jan 20, 2025",
    type: "Educational Content",
    priority: "medium"
  },
  {
    company: "Fitness Brand",
    status: "negotiating",
    amount: "$3,200",
    deadline: "Jan 25, 2025",
    type: "Lifestyle Integration",
    priority: "high"
  }
]

const opportunities = [
  {
    title: "Health & Wellness Brands",
    description: "Growing demand for health-focused content creators",
    avgRate: "$1,500-3,000",
    difficulty: "Medium",
    match: 85
  },
  {
    title: "Tech Product Reviews",
    description: "High-paying tech companies seeking authentic reviews",
    avgRate: "$2,000-5,000",
    difficulty: "High",
    match: 92
  },
  {
    title: "Educational Partnerships",
    description: "Online learning platforms looking for creators",
    avgRate: "$800-2,000",
    difficulty: "Easy",
    match: 78
  }
]

export default function MonetizationPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'pending':
        return 'bg-orange-500/20 text-orange-700 border-orange-500/30'
      case 'negotiating':
        return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-orange-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monetization</h1>
          <p className="text-muted-foreground">
            Track revenue, manage brand deals, and discover new opportunities
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Briefcase className="mr-2 h-4 w-4" />
          Find Deals
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,390</div>
            <p className="text-xs text-green-600">
              +$480 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RPM</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3.20</div>
            <p className="text-xs text-green-600">
              +15% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              $10.7K total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Monthly</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,200</div>
            <p className="text-xs text-green-600">
              +22% projected growth
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>
            Your income sources and their performance this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stream.color}`} />
                    <span className="font-medium">{stream.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stream.amount}</span>
                    <span className={`text-sm ${stream.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stream.change >= 0 ? '+' : ''}{stream.change}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stream.color}`}
                    style={{ width: `${stream.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Brand Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Deals & Partnerships</CardTitle>
          <CardDescription>
            Manage your current sponsorship deals and partnerships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {brandDeals.map((deal, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{deal.company}</h3>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(deal.status)}
                      >
                        {deal.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{deal.type}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>Due: {deal.deadline}</span>
                      <span className={getPriorityColor(deal.priority)}>
                        {deal.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{deal.amount}</div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>New Opportunities</CardTitle>
          <CardDescription>
            AI-discovered monetization opportunities based on your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {opportunities.map((opp, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{opp.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{opp.match}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{opp.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate Range:</span>
                    <span className="font-medium">{opp.avgRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <Badge variant="outline" className="text-xs">
                      {opp.difficulty}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}