export type DishType = 'bbq_item' | 'package' | 'drink' | 'snack' | 'seasonal'
export type CostLevel = 'low' | 'med' | 'high'
export type TargetAudience = 'couples' | 'friends' | 'students' | 'white_collar' | 'families'
export type LaunchGoal = 'new_customers' | 'aov' | 'viral' | 'repeat_visits' | 'clear_inventory'
export type Platform =
  | 'douyin'
  | 'xiaohongshu'
  | 'wechat_moments'
  | 'wechat_group'
  | 'meituan_dianping'
  | 'douyin_groupbuy'

export interface LaunchFormInput {
  name: string
  type: DishType
  price: number
  costLevel: CostLevel
  storeId: string
  targetAudience: TargetAudience[]
  goal: LaunchGoal[]
  platforms: Platform[]

  sellingPoints?: string
  flavorDescription?: string
  partySize?: number
  limitedTime?: { start: string; end: string } | null
  bundleable?: boolean
  promotionsToAvoid?: string
  minPrice?: number
  supplyLimitation?: string

  dishImage?: string | null
  menuScreenshot?: string | null
  reviewScreenshot?: string | null
}

export interface WeekCalendarDay {
  day: string
  focus: string
  action: string
  channel: Platform | 'store'
}

export interface LaunchPlanResult {
  id: string
  formSnapshot: LaunchFormInput
  generatedAt: string
  positioning: string
  sellingPoints: string[]
  douyinScript: string
  xiaohongshuPost: { title: string; body: string; tags: string[] }
  momentsCopy: string
  wechatGroupMessage: string
  groupBuyTitles: string[]
  bundleSuggestion: { name: string; items: string[]; price: number; note: string }
  staffScript: string[]
  weekCalendar: WeekCalendarDay[]
  riskReminders: string[]
}
