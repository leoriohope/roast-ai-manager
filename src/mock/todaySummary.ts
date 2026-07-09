import type { TodaySummary } from '../types'

export const MOCK_TODAY_SUMMARIES: Record<string, TodaySummary> = {
  'store-hq': {
    storeId: 'store-hq',
    headline: '今天环球店预计客流较周中提升，抓住晚市高峰做好上新推广',
    recommendedTasks: [
      {
        id: 'rt-hq-1',
        title: '为新品做上新推广',
        description: '环球店本周有新菜品待上新，建议今天生成一份上新方案',
        actionTab: 'launch',
      },
      {
        id: 'rt-hq-2',
        title: '优化129元双人烤肉套餐',
        description: '该套餐近两周点击率下降，建议检查套餐内容和标题',
        actionTab: 'package',
      },
      {
        id: 'rt-hq-3',
        title: '回复2条差评',
        description: '近期差评集中在“等位时间长”，建议今天统一回复',
        actionTab: 'review',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥83,028', trend: 'up', changeLabel: '+24.8%' },
      { label: '团购订单', value: '260单', trend: 'up', changeLabel: '+3.1%' },
      { label: '好评率', value: '96%', trend: 'flat', changeLabel: '持平' },
      { label: '差评数', value: '2条', trend: 'down', changeLabel: '-1条' },
    ],
  },
  'store-fml': {
    storeId: 'store-fml',
    headline: '凡米里店晚市贡献超八成营收，建议控制团购在高峰的占用比例',
    recommendedTasks: [
      {
        id: 'rt-fml-1',
        title: '晚市保障排班',
        description: '17:30-19:30是核心时段，建议提前备货并加强前厅确认',
        actionTab: 'checkup',
      },
      {
        id: 'rt-fml-2',
        title: '团购控峰',
        description: '美团团购核销集中在晚市高峰，建议优先把优惠引导到工作日午市',
        actionTab: 'package',
      },
      {
        id: 'rt-fml-3',
        title: '为新品做上新推广',
        description: '建议为新品拟定上新方案，覆盖朋友圈和门店海报',
        actionTab: 'launch',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥48,208', trend: 'up', changeLabel: '+23.0%' },
      { label: '团购订单', value: '150单', trend: 'up', changeLabel: '+5.6%' },
      { label: '好评率', value: '96%', trend: 'flat', changeLabel: '持平' },
      { label: '差评数', value: '1条', trend: 'down', changeLabel: '-1条' },
    ],
  },
  'store-hy': {
    storeId: 'store-hy',
    headline: '和悦店周末流量高，建议提前准备内容素材抢占曝光',
    recommendedTasks: [
      {
        id: 'rt-hy-1',
        title: '生成周末抖音探店脚本',
        description: '和悦店适合拍摄探店内容，建议提前生成脚本',
        actionTab: 'content',
      },
      {
        id: 'rt-hy-2',
        title: '检查团购转化情况',
        description: '近一周团购曝光下降，建议查看套餐标题是否需要调整',
        actionTab: 'package',
      },
      {
        id: 'rt-hy-3',
        title: '处理等位差评',
        description: '多条差评提到排队时间长，建议今天统一回复并记录到店内改进',
        actionTab: 'review',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥87,689', trend: 'up', changeLabel: '+2.4%' },
      { label: '团购订单', value: '275单', trend: 'up', changeLabel: '+5.6%' },
      { label: '好评率', value: '95%', trend: 'down', changeLabel: '-2%' },
      { label: '差评数', value: '4条', trend: 'up', changeLabel: '+2条' },
    ],
  },
  'store-dyc': {
    storeId: 'store-dyc',
    headline: '大悦城店适合家庭客群，建议今天推一波家庭套餐内容',
    recommendedTasks: [
      {
        id: 'rt-dyc-1',
        title: '生成家庭聚餐套餐',
        description: '大悦城店家庭客群占比高，建议生成一份四人餐套餐方案',
        actionTab: 'package',
      },
      {
        id: 'rt-dyc-2',
        title: '为新品做上新推广',
        description: '建议为新品拟定上新方案，覆盖朋友圈和门店海报',
        actionTab: 'launch',
      },
      {
        id: 'rt-dyc-3',
        title: '回复“性价比一般”差评',
        description: '近期差评提到偏贵，建议统一回复并说明套餐性价比',
        actionTab: 'review',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥106,607', trend: 'up', changeLabel: '+7.8%' },
      { label: '团购订单', value: '335单', trend: 'down', changeLabel: '-1.8%' },
      { label: '好评率', value: '93%', trend: 'flat', changeLabel: '持平' },
      { label: '差评数', value: '3条', trend: 'flat', changeLabel: '持平' },
    ],
  },
  'store-lhsc': {
    storeId: 'store-lhsc',
    headline: '龙湖上城店下班客流集中，建议今天准备下班聚餐相关内容',
    recommendedTasks: [
      {
        id: 'rt-lhsc-1',
        title: '生成下班聚餐内容',
        description: '龙湖上城店白领客群多，建议生成一份下班聚餐主题内容',
        actionTab: 'content',
      },
      {
        id: 'rt-lhsc-2',
        title: '优化上菜慢的问题',
        description: '晚高峰差评集中在上菜慢，建议今天安排店内复盘',
        actionTab: 'review',
      },
      {
        id: 'rt-lhsc-3',
        title: '为新品做上新推广',
        description: '建议为新品生成一份完整上新方案',
        actionTab: 'launch',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥60,683', trend: 'up', changeLabel: '+0.3%' },
      { label: '团购订单', value: '190单', trend: 'up', changeLabel: '+2.4%' },
      { label: '好评率', value: '94%', trend: 'down', changeLabel: '-1%' },
      { label: '差评数', value: '2条', trend: 'flat', changeLabel: '持平' },
    ],
  },
  'store-sxtj': {
    storeId: 'store-sxtj',
    headline: '蜀新天街店内容播放量高但转化偏低，建议优化短视频引导',
    recommendedTasks: [
      {
        id: 'rt-sxtj-1',
        title: '优化抖音内容转化',
        description: '近期视频播放量可观但成交转化率偏低，建议调整内容引导话术',
        actionTab: 'content',
      },
      {
        id: 'rt-sxtj-2',
        title: '为新品做上新推广',
        description: '建议为新品生成一份完整上新方案',
        actionTab: 'launch',
      },
      {
        id: 'rt-sxtj-3',
        title: '检查团购转化情况',
        description: '建议查看套餐标题是否需要调整以提升曝光转化',
        actionTab: 'package',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥75,015', trend: 'up', changeLabel: '+7.9%' },
      { label: '团购订单', value: '235单', trend: 'up', changeLabel: '+4.0%' },
      { label: '好评率', value: '97%', trend: 'flat', changeLabel: '持平' },
      { label: '差评数', value: '2条', trend: 'flat', changeLabel: '持平' },
    ],
  },
}
