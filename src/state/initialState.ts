import { DEFAULT_STORE_ID } from '../mock/stores'
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

// stores/reviews/launchResults/packagePlans/contentPlans/tasks/chatHistory all
// start empty and are filled in by AppContext's API bootstrap on mount.
export const initialState: AppState = {
  currentStoreId: DEFAULT_STORE_ID,
  currentTab: 'today',
  stores: [],
  launchDraft: EMPTY_LAUNCH_DRAFT,
  launchResults: [],
  packagePlans: [],
  contentPlans: [],
  reviews: [],
  reviewAnalysisByStore: {},
  tasks: [],
  chatHistory: [],
  brandStyleProfile: null,
  toasts: [],
}
