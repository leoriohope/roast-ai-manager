import type { StoreCheckup } from '../types'

export const MOCK_CHECKUPS: Record<string, StoreCheckup> = {
  'store-cs': {
    storeId: 'store-cs',
    healthScore: 78,
    issues: [
      {
        id: 'ck-cs-1',
        title: '套餐标题缺少卖点',
        evidence: '“129元双人烤肉套餐”标题近30天点击率低于门店均值18%',
        severity: 'medium',
      },
      {
        id: 'ck-cs-2',
        title: '差评集中提到等位时间长',
        evidence: '近7天3条差评提到“等位”“排队”，占比60%',
        severity: 'high',
      },
      {
        id: 'ck-cs-3',
        title: '内容3天未更新',
        evidence: '抖音、小红书账号最近发布时间为3天前',
        severity: 'low',
      },
    ],
    weeklySuggestions: [
      '为129元套餐重新拟定标题，突出“双人”“现烤”“性价比”',
      '晚高峰增加一名传菜员，缓解上菜慢的问题',
      '本周至少更新2条抖音/小红书内容，保持曝光',
    ],
    updatedAt: '2026-07-01T09:00:00+08:00',
  },
  'store-tql': {
    storeId: 'store-tql',
    healthScore: 71,
    issues: [
      {
        id: 'ck-tql-1',
        title: '团购曝光下降',
        evidence: '近7天团购页面曝光量下降8%，可能与标题竞争力下降有关',
        severity: 'medium',
      },
      {
        id: 'ck-tql-2',
        title: '差评集中提到排队和服务态度',
        evidence: '近7天2条差评提到“排队”“态度一般”',
        severity: 'high',
      },
    ],
    weeklySuggestions: [
      '优化团购标题，加入“太古里”“出片”等场景词',
      '周末高峰增加迎宾引导，改善排队体验',
      '为热门探店内容评论区安排专人回复，提升互动',
    ],
    updatedAt: '2026-07-01T09:00:00+08:00',
  },
  'store-jsl': {
    storeId: 'store-jsl',
    healthScore: 82,
    issues: [
      {
        id: 'ck-jsl-1',
        title: '差评提到性价比一般',
        evidence: '近7天1条差评提到“偏贵”“性价比一般”',
        severity: 'low',
      },
      {
        id: 'ck-jsl-2',
        title: '家庭套餐曝光不足',
        evidence: '门店家庭客群占比高，但暂无专门的家庭套餐内容',
        severity: 'medium',
      },
    ],
    weeklySuggestions: [
      '生成一份四人家庭聚餐套餐，突出性价比',
      '在朋友圈和门店海报上增加家庭套餐曝光',
    ],
    updatedAt: '2026-07-01T09:00:00+08:00',
  },
  'store-gxq': {
    storeId: 'store-gxq',
    healthScore: 74,
    issues: [
      {
        id: 'ck-gxq-1',
        title: '晚高峰上菜慢',
        evidence: '近7天2条差评提到“上菜慢”，集中在19:00-20:30',
        severity: 'high',
      },
      {
        id: 'ck-gxq-2',
        title: '下班聚餐内容缺失',
        evidence: '门店白领客群占比高，但近期无相关主题内容发布',
        severity: 'medium',
      },
    ],
    weeklySuggestions: [
      '晚高峰时段增加厨房人手，优化出餐流程',
      '生成“下班聚餐”主题内容，覆盖朋友圈和微信群',
    ],
    updatedAt: '2026-07-01T09:00:00+08:00',
  },
}
