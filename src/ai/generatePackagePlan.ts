import type { PackageGoalKey, PackagePlan, PackagePlanInput, Platform, TargetAudience } from '../types'
import { PACKAGE_MENU_ITEM_POOL } from '../mock/copyBank'
import { delay, sample } from './randomUtils'
import { uid } from '../utils/id'

interface GoalTemplate {
  name: string
  basePrice: number
  audience: TargetAudience[]
  platform: Platform[]
  marginRiskNote: string
}

const PACKAGE_GOAL_TEMPLATES: Record<PackageGoalKey, GoalTemplate> = {
  traffic_2p: {
    name: '双人引流套餐',
    basePrice: 99,
    audience: ['couples', 'students'],
    platform: ['douyin_groupbuy', 'meituan_dianping'],
    marginRiskNote: '低价引流款，注意控制赠品成本，避免单份亏损过多',
  },
  profit: {
    name: '双人尊享套餐',
    basePrice: 218,
    audience: ['couples', 'white_collar'],
    platform: ['wechat_moments', 'meituan_dianping'],
    marginRiskNote: '高毛利套餐，注意用料品质要匹配价格，避免差评',
  },
  gathering_4p: {
    name: '四人畅吃套餐',
    basePrice: 328,
    audience: ['friends', 'families'],
    platform: ['douyin_groupbuy', 'wechat_group'],
    marginRiskNote: '人均分摊后价格敏感，注意控制食材种类避免浪费',
  },
  weekday_offpeak: {
    name: '工作日错峰套餐',
    basePrice: 89,
    audience: ['white_collar', 'students'],
    platform: ['meituan_dianping', 'wechat_group'],
    marginRiskNote: '仅限工作日非高峰使用，需在标题标注适用时段',
  },
  birthday: {
    name: '生日惊喜套餐',
    basePrice: 268,
    audience: ['friends', 'families'],
    platform: ['wechat_moments', 'douyin'],
    marginRiskNote: '含赠品/蛋糕成本较高，需核实证件生日核销规则',
  },
}

export async function generatePackagePlan(input: PackagePlanInput): Promise<PackagePlan> {
  await delay(350)

  const template = PACKAGE_GOAL_TEMPLATES[input.goal]
  const priceVariance = 0.9 + Math.random() * 0.2
  const price = Math.round((template.basePrice * priceVariance) / 5) * 5
  const includedItems = sample(PACKAGE_MENU_ITEM_POOL, 4)

  return {
    id: uid('pkg'),
    goal: input.goal,
    name: template.name,
    price,
    includedItems,
    platform: template.platform,
    audience: template.audience,
    groupBuyTitle: `${template.name}特惠价¥${price}`,
    marginRiskNote: template.marginRiskNote,
    generatedAt: new Date().toISOString(),
  }
}
