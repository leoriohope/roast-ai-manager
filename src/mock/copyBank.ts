import type { DishType, LaunchGoal, Platform, TargetAudience } from '../types/index.js'

export const PLATFORM_LABEL: Record<Platform, string> = {
  douyin: '抖音',
  xiaohongshu: '小红书',
  wechat_moments: '朋友圈',
  wechat_group: '微信群',
  meituan_dianping: '美团/点评',
  douyin_groupbuy: '抖音团购',
}

export const DISH_TYPE_LABEL: Record<DishType, string> = {
  bbq_item: '烤肉单品',
  package: '套餐',
  drink: '饮品',
  snack: '小吃',
  seasonal: '季节限定',
}

export const AUDIENCE_LABEL: Record<TargetAudience, string> = {
  couples: '情侣',
  friends: '朋友聚会',
  students: '学生党',
  white_collar: '下班白领',
  families: '家庭聚餐',
}

export const GOAL_LABEL: Record<LaunchGoal, string> = {
  new_customers: '吸引新客',
  aov: '提升客单价',
  viral: '打造爆款',
  repeat_visits: '提升复购',
  clear_inventory: '清库存',
}

export const SELLING_POINT_BANK = [
  '锁鲜现烤，肉质更嫩',
  '选用当日新鲜食材',
  '高性价比，人均不到百元',
  '招牌秘制酱料，口味独特',
  '烟火气十足，适合拍照打卡',
  '现场明火炙烤，香气扑鼻',
  '分量十足，适合多人分享',
]

export const DOUYIN_HOOK_STYLES: { style: string; hook: (name: string) => string }[] = [
  { style: '悬念', hook: (name) => `你绝对没吃过这样的${name}！` },
  { style: '反差', hook: (name) => `谁能想到，一份${name}居然能好吃成这样` },
  { style: '福利', hook: (name) => `这条视频看完，评论区抽3位免单${name}` },
]

export const XHS_TITLE_EMOJI = ['🔥', '😋', '✨', '🌟', '💯']

export const BUNDLE_FILLERS = ['招牌烤五花肉', '秘制烤鸡翅', '冰镇酸梅汤', '现烤年糕', '蒜蓉生蚝']

export const STAFF_OBJECTION_HANDLING = [
  '如果顾客觉得贵，可以强调分量和现烤新鲜度',
  '如果顾客犹豫，可以推荐先试点单人份再加菜',
  '如果顾客赶时间，可以说明这道菜出餐速度快',
]

export const WEEK_CALENDAR_TEMPLATE = [
  { focus: '预热造势', action: '发布预告海报，制造期待感' },
  { focus: '正式上线', action: '发布正式内容，门店同步上新' },
  { focus: '追评引导', action: '引导首批顾客留好评并配图' },
  { focus: '员工推荐', action: '强化员工话术，主动推荐新品' },
  { focus: '裂变传播', action: '发起转发/晒图活动，扩大传播' },
  { focus: '周末流量', action: '周末高峰集中曝光，冲刺销量' },
  { focus: '复盘总结', action: '统计销量和反馈，决定是否常态化' },
]

export const PACKAGE_MENU_ITEM_POOL = [
  '招牌烤五花肉',
  '秘制烤鸡翅',
  '烤生蚝',
  '烤年糕',
  '冰镇酸梅汤',
  '烤玉米',
  '招牌牛肉串',
  '蒜蓉金针菇',
]

export const IMPROVEMENT_SUGGESTION_MAP: Record<string, string> = {
  等位时间长: '建议高峰时段增加迎宾引导和预点单',
  上菜慢: '建议增加传菜人手，优化出餐流程',
  偏贵: '建议增加高性价比套餐',
}
