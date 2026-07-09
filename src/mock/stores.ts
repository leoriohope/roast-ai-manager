import type { Store } from '../types'

export const MOCK_STORES: Store[] = [
  { id: 'store-hq', name: '环球店', todayRevenue: 83028 },
  { id: 'store-fml', name: '凡米里店', address: '四川省成都市武侯区万兴路477号', todayRevenue: 48208 },
  { id: 'store-hy', name: '和悦店', todayRevenue: 87689 },
  { id: 'store-dyc', name: '大悦城店', todayRevenue: 106607 },
  { id: 'store-lhsc', name: '龙湖上城店', todayRevenue: 60683 },
  { id: 'store-sxtj', name: '蜀新天街店', todayRevenue: 75015 },
]

export const DEFAULT_STORE_ID = MOCK_STORES[0].id
