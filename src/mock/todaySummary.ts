import type { TodaySummary } from '../types'

export const MOCK_TODAY_SUMMARIES: Record<string, TodaySummary> = {
  'store-cs': {
    storeId: 'store-cs',
    headline: '今天春熙路店预计客流较周中提升，抓住晚市高峰做好上新推广',
    recommendedTasks: [
      {
        id: 'rt-cs-1',
        title: '为新品做上新推广',
        description: '春熙路店本周有新菜品待上新，建议今天生成一份上新方案',
        actionTab: 'launch',
      },
      {
        id: 'rt-cs-2',
        title: '优化129元双人烤肉套餐',
        description: '该套餐近两周点击率下降，建议检查套餐内容和标题',
        actionTab: 'package',
      },
      {
        id: 'rt-cs-3',
        title: '回复2条差评',
        description: '近期差评集中在“等位时间长”，建议今天统一回复',
        actionTab: 'review',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥128,400', trend: 'up', changeLabel: '+6.2%' },
      { label: '团购订单', value: '342单', trend: 'up', changeLabel: '+3.1%' },
      { label: '好评率', value: '91%', trend: 'flat', changeLabel: '持平' },
      { label: '差评数', value: '5条', trend: 'down', changeLabel: '-2条' },
    ],
  },
  'store-tql': {
    storeId: 'store-tql',
    headline: '太古里店周末流量高，建议提前准备内容素材抢占曝光',
    recommendedTasks: [
      {
        id: 'rt-tql-1',
        title: '生成周末抖音探店脚本',
        description: '太古里店适合拍摄探店内容，建议提前生成脚本',
        actionTab: 'content',
      },
      {
        id: 'rt-tql-2',
        title: '检查团购转化情况',
        description: '近一周团购曝光下降，建议查看套餐标题是否需要调整',
        actionTab: 'package',
      },
      {
        id: 'rt-tql-3',
        title: '处理等位差评',
        description: '多条差评提到排队时间长，建议今天统一回复并记录到店内改进',
        actionTab: 'review',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥165,200', trend: 'up', changeLabel: '+9.4%' },
      { label: '团购订单', value: '410单', trend: 'up', changeLabel: '+5.6%' },
      { label: '好评率', value: '88%', trend: 'down', changeLabel: '-2%' },
      { label: '差评数', value: '7条', trend: 'up', changeLabel: '+2条' },
    ],
  },
  'store-jsl': {
    storeId: 'store-jsl',
    headline: '建设路店适合家庭客群，建议今天推一波家庭套餐内容',
    recommendedTasks: [
      {
        id: 'rt-jsl-1',
        title: '生成家庭聚餐套餐',
        description: '建设路店家庭客群占比高，建议生成一份四人餐套餐方案',
        actionTab: 'package',
      },
      {
        id: 'rt-jsl-2',
        title: '为新品做上新推广',
        description: '建议为新品拟定上新方案，覆盖朋友圈和门店海报',
        actionTab: 'launch',
      },
      {
        id: 'rt-jsl-3',
        title: '回复“性价比一般”差评',
        description: '近期差评提到偏贵，建议统一回复并说明套餐性价比',
        actionTab: 'review',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥98,600', trend: 'flat', changeLabel: '持平' },
      { label: '团购订单', value: '256单', trend: 'down', changeLabel: '-1.8%' },
      { label: '好评率', value: '85%', trend: 'flat', changeLabel: '持平' },
      { label: '差评数', value: '4条', trend: 'flat', changeLabel: '持平' },
    ],
  },
  'store-gxq': {
    storeId: 'store-gxq',
    headline: '高新区店下班客流集中，建议今天准备下班聚餐相关内容',
    recommendedTasks: [
      {
        id: 'rt-gxq-1',
        title: '生成下班聚餐内容',
        description: '高新区店白领客群多，建议生成一份下班聚餐主题内容',
        actionTab: 'content',
      },
      {
        id: 'rt-gxq-2',
        title: '优化上菜慢的问题',
        description: '晚高峰差评集中在上菜慢，建议今天安排店内复盘',
        actionTab: 'review',
      },
      {
        id: 'rt-gxq-3',
        title: '为新品做上新推广',
        description: '建议为新品生成一份完整上新方案',
        actionTab: 'launch',
      },
    ],
    weeklyMetrics: [
      { label: '本周营业额', value: '¥112,300', trend: 'up', changeLabel: '+4.0%' },
      { label: '团购订单', value: '298单', trend: 'up', changeLabel: '+2.4%' },
      { label: '好评率', value: '87%', trend: 'down', changeLabel: '-1%' },
      { label: '差评数', value: '6条', trend: 'up', changeLabel: '+1条' },
    ],
  },
}
