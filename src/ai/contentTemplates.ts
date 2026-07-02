import { DOUYIN_HOOK_STYLES, XHS_TITLE_EMOJI } from '../mock/copyBank'
import { pick } from './randomUtils'

export function generateDouyinScript(name: string, priceLabel?: string): string {
  const hookOption = pick(DOUYIN_HOOK_STYLES)
  const hook = hookOption.hook(name)
  const price = priceLabel ? `现在只要${priceLabel}，` : ''
  return [
    `【开场】${hook}`,
    `【展示】镜头怼近烤架，展示${name}现烤过程，突出滋滋声和香气`,
    `【卖点】一句话讲清楚为什么好吃、为什么值——现烤锁鲜、分量足`,
    `【引导】${price}评论区扣“想吃”，本周到店即享上新价`,
  ].join('\n')
}

export function generateXiaohongshuPost(
  name: string,
  sellingPoints: string[],
): { title: string; body: string; tags: string[] } {
  const emoji = pick(XHS_TITLE_EMOJI)
  const title = `${emoji} 谁懂啊，这份${name}真的绝了`
  const body = [
    `场景：和朋友周末小聚，点了这份${name}`,
    `味道：${sellingPoints[0] ?? '现烤锁鲜，香气十足'}`,
    `真心推荐给同样爱吃烤肉的姐妹们，人均不贵还很有氛围感`,
  ].join('\n')
  const tags = ['成都探店', '烤肉推荐', name].slice(0, 5)
  return { title, body, tags }
}

export function generateMomentsCopy(name: string): string {
  return `今天试了新出的${name}，比想象中还好吃，忍不住想推荐给大家，最近来店里都可以点到～`
}

export function generateWechatGroupMessage(name: string, priceLabel: string, limited: boolean): string {
  const urgency = limited ? '数量有限，卖完即止，' : ''
  return `【上新通知】${name}正式上线啦！${urgency}到店即可点，现在${priceLabel}，姐妹们快约起来～`
}

export function generateGroupBuyTitles(name: string, priceLabel: string, partySize?: number): string[] {
  const titles = [`${name}单人餐${priceLabel}起`, `爆款${name}限时${priceLabel}`]
  if (partySize && partySize > 1) {
    titles.push(`${partySize}人餐『${name}』限时${priceLabel}`)
  }
  return titles
}
