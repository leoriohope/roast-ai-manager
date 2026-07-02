import type { Store } from '../types'

export const MOCK_STORES: Store[] = [
  { id: 'store-cs', name: '春熙路店', address: '锦江区春熙路88号', todayRevenue: 18600 },
  { id: 'store-tql', name: '太古里店', address: '锦江区太古里南巷12号', todayRevenue: 24300 },
  { id: 'store-jsl', name: '建设路店', address: '成华区建设路56号', todayRevenue: 12800 },
  { id: 'store-gxq', name: '高新区店', address: '高新区天府大道1200号', todayRevenue: 15900 },
]

export const DEFAULT_STORE_ID = MOCK_STORES[0].id
