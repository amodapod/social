"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Workflow,
  Play,
  Pause,
  Settings,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from "lucide-react"

const workflows = [
  {
    id: 1,
    name: "Auto Comment Replies",
    description: "Automatically generate and suggest replies to comments using AI",
    status: "active",
    lastRun: "2 minutes ago",
    nextRun: "in 5 minutes",
    runs: 147,
    enabled: true
  },
  {
    id: 2,
    name: "Content Repurposing",
    description: "Convert long-form videos into shorts and social media posts",
    status: "paused",
    lastRun: "1 hour ago",
    nextRun: "paused",
    runs: 23,
    enabled: false
  },
  {
    id: 3,
    name: "Competitor Sync",
    description: "Monitor competitor channels and update analytics data",
    status: "active",
    lastRun: "15 minutes ago",
    nextRun: "in 45 minutes",
    runs: 89,
    enabled: true
  },
  {
    id: 4,
    name: "Trend Analysis",
    description: "Analyze trending topics and suggest content ideas",
    status: "active",
    lastRun: "30 minutes ago",
    nextRun: "in 2 hours",
    runs: 56,
    enabled: true
  },
  {
    id: 5,
    name: "Performance Alerts",
    description: "Send notifications when videos hit performance milestones",
    status: "error",
    lastRun: "2 hours ago",
    nextRun: "retry in 10 min",
    runs: 234,
    enabled: true
  }
]

const recentRuns = [
  {
    workflow: "Auto Comment Replies",
    status: "success",
    duration: "1.2s",
    time: "2 min ago",
    details: "Processed 15 comments"
  },
  {
    workflow: "Competitor Sync",
    status: "success",
    duration: "8.4s",
    time: "15 min ago",
    details: "Updated 5 channels"
  },
  {
    workflow: "Trend Analysis",
    status: "success",
    duration: "3.7s",
    time: "30 min ago",
    details: "Found 12 trending topics"
  },
  {
    workflow: "Performance Alerts",
    status: "error",
    duration: "0.5s",
    time: "2 hours ago",
    details: "Failed to send notification"
  }
]

export default function WorkflowsPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'paused':
        return <Pause className="h-4 w-4 text-orange-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'paused':
        return 'bg-orange-500/20 text-orange-700 border-orange-500/30'
      case 'error':
        return 'bg-red-500/20 text-red-700 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Automation</h1>
          <p className="text-muted-foreground">
            Automate your content creation and channel management tasks
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      {/* Workflow Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">
              {workflows.filter(w => w.enabled).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.reduce((sum, w) => sum + w.runs, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.2%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28h</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
          <CardDescription>
            Manage your automated workflows and their execution status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(workflow.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{workflow.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(workflow.status)}
                      >
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Last run: {workflow.lastRun}</span>
                      <span>Next: {workflow.nextRun}</span>
                      <span>{workflow.runs} total runs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={workflow.enabled}
                    onCheckedChange={() => {}}
                  />
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Executions</CardTitle>
          <CardDescription>
            Latest workflow execution results and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRuns.map((run, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {run.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{run.workflow}</p>
                    <p className="text-xs text-muted-foreground">{run.details}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{run.time}</div>
                  <div>{run.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}