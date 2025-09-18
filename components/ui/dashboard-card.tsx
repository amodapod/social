"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  description?: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function DashboardCard({
  title,
  description,
  value,
  icon: Icon,
  trend,
  className
}: DashboardCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow h-full", className)}>
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium">
            {title}
          </CardTitle>
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="text-xl font-bold">{value}</div>
        {description && (
          <p className="text-[11px] text-muted-foreground">
            {description}
          </p>
        )}
        {trend && (
          <p className={cn(
            "text-[11px] mt-0.5",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}