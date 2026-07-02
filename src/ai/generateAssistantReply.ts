interface ReplyRule {
  pattern: RegExp
  reply: string
}

const RULES: ReplyRule[] = [
  {
    pattern: /差评|怎么回/,
    reply: '差评建议先致歉再给出解决方案，具体可以去"评价"页面查看每条差评的建议回复，一键复制即可使用。',
  },
  {
    pattern: /上新|新品/,
    reply: '上新建议去"上新助手"页面，填写新品信息后可以一键生成定位、短视频脚本、朋友圈文案和一周计划。',
  },
  {
    pattern: /团购|不好卖|卖不动|卖不好/,
    reply: '团购卖不动通常是标题缺少价格锚点或卖点，建议去"套餐设计"页面重新生成一版标题，突出人均价格和适用场景。',
  },
  {
    pattern: /今天|做什么/,
    reply: '可以先看"今天"页面的推荐任务，通常会包含上新推广、套餐优化和差评处理三类，按优先级处理即可。',
  },
  {
    pattern: /套餐/,
    reply: '套餐设计可以去"套餐设计"页面，选择一个目标（比如引流、提升客单价）即可生成一份套餐方案。',
  },
  {
    pattern: /内容|文案|发什么/,
    reply: '内容生成可以去"内容生成"页面，选择推广对象和平台，会分别生成抖音、小红书、朋友圈和微信群的文案。',
  },
]

const FALLBACK_REPLY = '我还在学习中，试试点击下方的快捷问题，或者去对应页面看看～'

export function generateAssistantReply(message: string): string {
  const rule = RULES.find((r) => r.pattern.test(message))
  return rule ? rule.reply : FALLBACK_REPLY
}
