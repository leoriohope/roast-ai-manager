import type { Review, ReviewAnalysis } from '../types'

const IMPROVEMENT_MAP: Record<string, string> = {
  等位时间长: '建议高峰时段增加迎宾引导和预点单，缩短实际等位感知',
  上菜慢: '建议晚高峰增加传菜/厨房人手，优化出餐流程',
  偏贵: '建议增加高性价比套餐，突出人均价格锚点',
  服务态度一般: '建议加强高峰时段服务培训，明确服务标准动作',
}

const POSITIVE_REPLY_TEMPLATES = [
  '谢谢您的认可！{keyword}是我们一直在坚持的地方，欢迎常来～',
  '感谢支持！我们会继续保持{keyword}，期待您下次光临！',
]

const NEGATIVE_REPLY_TEMPLATES = [
  '非常抱歉给您带来不好的体验，关于{keyword}我们已经记录并会尽快改进，欢迎您再次光临，我们一定用心服务。',
  '感谢反馈，{keyword}的问题我们门店已经重视起来，正在优化中，给您带来的不便深表歉意。',
]

function pickTemplate(templates: string[], seed: string): string {
  const index = seed.length % templates.length
  return templates[index]
}

export async function analyzeReviews(storeId: string, reviews: Review[]): Promise<ReviewAnalysis> {
  const storeReviews = reviews.filter((r) => r.storeId === storeId)

  const positiveCounts = new Map<string, number>()
  const negativeCounts = new Map<string, number>()

  for (const review of storeReviews) {
    const bucket = review.sentiment === 'negative' ? negativeCounts : positiveCounts
    if (review.sentiment === 'neutral') continue
    for (const keyword of review.keywords) {
      bucket.set(keyword, (bucket.get(keyword) ?? 0) + 1)
    }
  }

  const toSorted = (m: Map<string, number>) =>
    [...m.entries()].map(([keyword, count]) => ({ keyword, count })).sort((a, b) => b.count - a.count)

  const positiveKeywords = toSorted(positiveCounts)
  const negativeKeywords = toSorted(negativeCounts)

  const total = storeReviews.length
  const positiveTotal = storeReviews.filter((r) => r.sentiment === 'positive').length
  const positiveRate = total > 0 ? Math.round((positiveTotal / total) * 100) : 0

  const topNegative = negativeKeywords[0]?.keyword
  const summary = total
    ? `近期共${total}条评价，好评率${positiveRate}%${
        topNegative ? `，差评主要集中在"${topNegative}"` : '，暂无明显差评集中问题'
      }`
    : '该门店暂无评价数据'

  const suggestedReplies: Record<string, string> = {}
  for (const review of storeReviews) {
    const keyword = review.keywords[0] ?? '这次体验'
    if (review.sentiment === 'negative') {
      suggestedReplies[review.id] = pickTemplate(NEGATIVE_REPLY_TEMPLATES, review.id).replace(
        '{keyword}',
        keyword,
      )
    } else {
      suggestedReplies[review.id] = pickTemplate(POSITIVE_REPLY_TEMPLATES, review.id).replace(
        '{keyword}',
        keyword,
      )
    }
  }

  const internalSuggestions = negativeKeywords
    .slice(0, 2)
    .map((k) => IMPROVEMENT_MAP[k.keyword] ?? `建议针对"${k.keyword}"安排门店复盘，明确改进动作`)

  if (internalSuggestions.length === 0) {
    internalSuggestions.push('近期无明显差评问题，建议保持当前服务水准')
  }

  return {
    storeId,
    positiveKeywords,
    negativeKeywords,
    summary,
    suggestedReplies,
    internalSuggestions,
  }
}
