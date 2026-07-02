export interface WeeklyMetric {
  label: string
  value: string
  trend?: 'up' | 'down' | 'flat'
  changeLabel?: string
}

export interface RecommendedTask {
  id: string
  title: string
  description: string
  actionTab: 'launch' | 'package' | 'content' | 'review'
}

export interface TodaySummary {
  storeId: string
  headline: string
  recommendedTasks: RecommendedTask[]
  weeklyMetrics: WeeklyMetric[]
}
