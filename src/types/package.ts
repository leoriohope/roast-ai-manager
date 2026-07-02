import type { Platform, TargetAudience } from './launch'

export type PackageGoalKey = 'traffic_2p' | 'profit' | 'gathering_4p' | 'weekday_offpeak' | 'birthday'

export interface PackagePlanInput {
  storeId: string
  goal: PackageGoalKey
}

export interface PackagePlan {
  id: string
  goal: PackageGoalKey
  name: string
  price: number
  includedItems: string[]
  platform: Platform[]
  audience: TargetAudience[]
  groupBuyTitle: string
  marginRiskNote: string
  generatedAt: string
}
