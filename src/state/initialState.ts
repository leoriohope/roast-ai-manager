import { DEFAULT_STORE_ID, MOCK_STORES } from '../mock/stores'
import { MOCK_REVIEWS } from '../mock/reviews'
import type { LaunchFormInput } from '../types'
import type { AppState } from './appReducer'

export const EMPTY_LAUNCH_DRAFT: LaunchFormInput = {
  name: '',
  type: 'bbq_item',
  price: 0,
  costLevel: 'med',
  storeId: DEFAULT_STORE_ID,
  targetAudience: [],
  goal: [],
  platforms: [],
  sellingPoints: '',
  flavorDescription: '',
  partySize: undefined,
  limitedTime: null,
  bundleable: false,
  promotionsToAvoid: '',
  minPrice: undefined,
  supplyLimitation: '',
  dishImage: null,
  menuScreenshot: null,
  reviewScreenshot: null,
}

export const initialState: AppState = {
  currentStoreId: DEFAULT_STORE_ID,
  currentTab: 'today',
  stores: MOCK_STORES,
  launchDraft: EMPTY_LAUNCH_DRAFT,
  launchResults: [],
  packagePlans: [],
  contentPlans: [],
  reviews: MOCK_REVIEWS,
  reviewAnalysisByStore: {},
  tasks: [],
  chatHistory: [],
  toasts: [],
}
