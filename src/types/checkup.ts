export interface CheckupIssue {
  id: string
  title: string
  evidence: string
  severity: 'low' | 'medium' | 'high'
}

export interface StoreCheckup {
  storeId: string
  healthScore: number
  issues: CheckupIssue[]
  weeklySuggestions: string[]
  updatedAt: string
}
