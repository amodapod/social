"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const subscriberData = [
  { name: "Jan", subscribers: 10000, views: 150000 },
  { name: "Feb", subscribers: 12000, views: 180000 },
  { name: "Mar", subscribers: 15000, views: 220000 },
  { name: "Apr", subscribers: 18000, views: 280000 },
  { name: "May", subscribers: 22000, views: 350000 },
  { name: "Jun", subscribers: 28000, views: 420000 },
]

const contentPerformance = [
  { type: "Shorts", views: 45000, engagement: 12.5 },
  { type: "Long-form", views: 35000, engagement: 8.2 },
  { type: "Live", views: 15000, engagement: 15.8 },
  { type: "Tutorials", views: 28000, engagement: 9.8 },
]

const audienceData = [
  { name: "18-24", value: 35, color: "#8B5CF6" },
  { name: "25-34", value: 40, color: "#3B82F6" },
  { name: "35-44", value: 15, color: "#10B981" },
  { name: "45+", value: 10, color: "#F59E0B" },
]

export function OverviewCharts() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Channel Growth</CardTitle>
          <CardDescription>
            Subscriber and view count over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={subscriberData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="subscribers" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Subscribers"
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Views"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>
            Views and engagement by content type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience Demographics</CardTitle>
          <CardDescription>
            Age distribution of your viewers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}