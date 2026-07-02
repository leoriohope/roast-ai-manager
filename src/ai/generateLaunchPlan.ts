import type { LaunchFormInput, LaunchPlanResult, WeekCalendarDay } from '../types'
import {
  AUDIENCE_LABEL,
  BUNDLE_FILLERS,
  DISH_TYPE_LABEL,
  GOAL_LABEL,
  SELLING_POINT_BANK,
  STAFF_OBJECTION_HANDLING,
  WEEK_CALENDAR_TEMPLATE,
} from '../mock/copyBank'
import {
  generateDouyinScript,
  generateGroupBuyTitles,
  generateMomentsCopy,
  generateWechatGroupMessage,
  generateXiaohongshuPost,
} from './contentTemplates'
import { delay, pick, sample } from './randomUtils'
import { formatPrice } from '../utils/format'
import { uid } from '../utils/id'

const GROUP_BUY_PLATFORMS = new Set(['meituan_dianping', 'douyin_groupbuy'])

function buildPositioning(input: LaunchFormInput): string {
  const audienceLabel = input.targetAudience.map((a) => AUDIENCE_LABEL[a]).join('、') || '广泛客群'
  const goalLabel = input.goal.map((g) => GOAL_LABEL[g]).join('、') || '提升门店曝光'
  return `${input.name}：面向${audienceLabel}的${DISH_TYPE_LABEL[input.type]}，主打${goalLabel}`
}

function buildSellingPoints(input: LaunchFormInput): string[] {
  const fromInput = (input.sellingPoints ?? '')
    .split(/[，,、\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
  const stock = sample(SELLING_POINT_BANK, 3).filter((s) => !fromInput.includes(s))
  const points = [...fromInput, ...stock].slice(0, 5)
  return points.length > 0 ? points : sample(SELLING_POINT_BANK, 3)
}

function buildBundleSuggestion(input: LaunchFormInput) {
  if (!input.bundleable) {
    return {
      name: '暂不建议组合套餐',
      items: [input.name],
      price: input.price,
      note: '该新品未标记为可组合，建议先单品上市观察销量',
    }
  }
  const fillers = sample(BUNDLE_FILLERS, 2)
  const bundlePrice = Math.round((input.price * 1.6) / 5) * 5
  return {
    name: `${input.name}超值组合`,
    items: [input.name, ...fillers],
    price: bundlePrice,
    note: `建议定价${formatPrice(bundlePrice)}，比单点更划算，提升客单价`,
  }
}

function buildStaffScript(input: LaunchFormInput): string[] {
  const script = [
    `见到顾客可以说：“我们新上了${input.name}，${input.flavorDescription || '味道很不错'}，要不要试试？”`,
    `如果顾客点了其他菜，可以补充：“搭配${input.name}一起吃更划算哦”`,
  ]
  if (input.promotionsToAvoid) {
    script.push(`注意：避免提及“${input.promotionsToAvoid}”相关的促销话术`)
  }
  script.push(pick(STAFF_OBJECTION_HANDLING))
  return script
}

function buildWeekCalendar(input: LaunchFormInput): WeekCalendarDay[] {
  const channels = input.platforms.length > 0 ? input.platforms : (['store'] as const)
  return WEEK_CALENDAR_TEMPLATE.map((day, i) => ({
    day: `Day ${i + 1}`,
    focus: day.focus,
    action: day.action,
    channel: channels[i % channels.length],
  }))
}

function buildRiskReminders(input: LaunchFormInput): string[] {
  const reminders: string[] = []
  if (input.costLevel === 'high') {
    reminders.push('成本较高，注意促销折扣力度，避免亏本冲量')
  }
  if (input.supplyLimitation) {
    reminders.push(`供应存在限制（${input.supplyLimitation}），建议提前备货并设置每日限量`)
  }
  if (input.minPrice && input.minPrice < input.price) {
    reminders.push(`定价不应低于${formatPrice(input.minPrice)}，避免利润过薄`)
  }
  reminders.push('上新首周建议密切关注顾客反馈，及时调整方案')
  return reminders
}

export async function generateLaunchPlan(input: LaunchFormInput): Promise<LaunchPlanResult> {
  await delay(400)

  const priceLabel = formatPrice(input.price)
  const isGroupBuy = input.platforms.some((p) => GROUP_BUY_PLATFORMS.has(p))
  const sellingPoints = buildSellingPoints(input)

  return {
    id: uid('launch'),
    formSnapshot: input,
    generatedAt: new Date().toISOString(),
    positioning: buildPositioning(input),
    sellingPoints,
    douyinScript: generateDouyinScript(input.name, priceLabel),
    xiaohongshuPost: generateXiaohongshuPost(input.name, sellingPoints),
    momentsCopy: generateMomentsCopy(input.name),
    wechatGroupMessage: generateWechatGroupMessage(input.name, priceLabel, Boolean(input.limitedTime)),
    groupBuyTitles: isGroupBuy ? generateGroupBuyTitles(input.name, priceLabel, input.partySize) : [],
    bundleSuggestion: buildBundleSuggestion(input),
    staffScript: buildStaffScript(input),
    weekCalendar: buildWeekCalendar(input),
    riskReminders: buildRiskReminders(input),
  }
}
