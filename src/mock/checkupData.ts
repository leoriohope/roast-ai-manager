import type { StoreCheckup } from '../types'

export const MOCK_CHECKUPS: Record<string, StoreCheckup> = {
  'store-hq': {
    storeId: 'store-hq',
    healthScore: 78,
    issues: [
      {
        id: 'ck-hq-1',
        title: '套餐标题缺少卖点',
        evidence: '“129元双人烤肉套餐”标题近30天点击率低于门店均值18%',
        severity: 'medium',
      },
      {
        id: 'ck-hq-2',
        title: '差评集中提到等位时间长',
        evidence: '近7天3条差评提到“等位”“排队”，占比60%',
        severity: 'high',
      },
      {
        id: 'ck-hq-3',
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
  'store-fml': {
    storeId: 'store-fml',
    healthScore: 74,
    issues: [
      {
        id: 'ck-fml-1',
        title: '晚市与周末依赖度高',
        evidence: '晚市17:00-21:00贡献81.6%的营业收入，工作日午市和低峰承接不足',
        severity: 'high',
      },
      {
        id: 'ck-fml-2',
        title: '平台团购集中在晚市高峰',
        evidence: '美团团购核销77.8%发生在17:00-21:00，可能压低高峰时段的自然成交收入质量',
        severity: 'medium',
      },
      {
        id: 'ck-fml-3',
        title: '点单错误导致退菜',
        evidence: '本月退菜64笔，主要原因为“多点”“错点”，指向点单确认流程需要加强',
        severity: 'low',
      },
    ],
    weeklySuggestions: [
      '把17:30-19:30设为核心保障时段，提前备货并加强前厅确认',
      '团购优惠力度优先引导到工作日午市和晚市早段，谨慎放开周末晚市高峰',
      '对套餐、团购、扫码点餐增加确认动作，减少多点和错点',
    ],
    updatedAt: '2026-07-05T09:00:00+08:00',
  },
  'store-hy': {
    storeId: 'store-hy',
    healthScore: 71,
    issues: [
      {
        id: 'ck-hy-1',
        title: '团购曝光下降',
        evidence: '近7天团购页面曝光量下降8%，可能与标题竞争力下降有关',
        severity: 'medium',
      },
      {
        id: 'ck-hy-2',
        title: '差评集中提到排队和服务态度',
        evidence: '近7天2条差评提到“排队”“态度一般”',
        severity: 'high',
      },
    ],
    weeklySuggestions: [
      '优化团购标题，加入“出片”“聚会”等场景词',
      '周末高峰增加迎宾引导，改善排队体验',
      '为热门探店内容评论区安排专人回复，提升互动',
    ],
    updatedAt: '2026-07-01T09:00:00+08:00',
  },
  'store-dyc': {
    storeId: 'store-dyc',
    healthScore: 82,
    issues: [
      {
        id: 'ck-dyc-1',
        title: '差评提到性价比一般',
        evidence: '近7天1条差评提到“偏贵”“性价比一般”',
        severity: 'low',
      },
      {
        id: 'ck-dyc-2',
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
  'store-lhsc': {
    storeId: 'store-lhsc',
    healthScore: 74,
    issues: [
      {
        id: 'ck-lhsc-1',
        title: '晚高峰上菜慢',
        evidence: '近7天2条差评提到“上菜慢”，集中在19:00-20:30',
        severity: 'high',
      },
      {
        id: 'ck-lhsc-2',
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
  'store-sxtj': {
    storeId: 'store-sxtj',
    healthScore: 76,
    issues: [
      {
        id: 'ck-sxtj-1',
        title: '抖音视频转化率偏低',
        evidence: '近期发布视频播放量可观，但成交转化率不足0.2%，内容与转化脱节',
        severity: 'medium',
      },
      {
        id: 'ck-sxtj-2',
        title: '活跃会员占比较低',
        evidence: '新客占比高但复购不足，沉默用户数量偏大',
        severity: 'medium',
      },
    ],
    weeklySuggestions: [
      '提升短视频内容的专业度和互动性，结合直播组合提高转化',
      '针对沉默用户定向推送优惠信息，刺激复购',
    ],
    updatedAt: '2026-07-01T09:00:00+08:00',
  },
}
