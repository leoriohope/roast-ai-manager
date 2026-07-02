import type {
  ChatMessage,
  ContentPlan,
  LaunchFormInput,
  LaunchPlanResult,
  PackagePlan,
  Review,
  ReviewAnalysis,
  Store,
  Task,
} from '../types'

export type TabKey = 'today' | 'launch' | 'checkup' | 'package' | 'content' | 'review' | 'assistant'

export interface Toast {
  id: string
  message: string
  kind?: 'success' | 'info' | 'error'
}

export interface AppState {
  currentStoreId: string
  currentTab: TabKey
  stores: Store[]

  launchDraft: LaunchFormInput
  launchResults: LaunchPlanResult[]

  packagePlans: PackagePlan[]
  contentPlans: ContentPlan[]

  reviews: Review[]
  reviewAnalysisByStore: Record<string, ReviewAnalysis>

  tasks: Task[]

  chatHistory: ChatMessage[]

  toasts: Toast[]
}

export type AppAction =
  | { type: 'SET_STORE'; storeId: string }
  | { type: 'SET_TAB'; tab: TabKey }
  | { type: 'UPDATE_LAUNCH_DRAFT'; patch: Partial<LaunchFormInput> }
  | { type: 'RESET_LAUNCH_DRAFT'; draft: LaunchFormInput }
  | { type: 'ADD_LAUNCH_RESULT'; result: LaunchPlanResult }
  | { type: 'ADD_PACKAGE_PLAN'; plan: PackagePlan }
  | { type: 'ADD_CONTENT_PLAN'; plan: ContentPlan }
  | { type: 'SET_REVIEW_ANALYSIS'; storeId: string; analysis: ReviewAnalysis }
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'TOGGLE_TASK_STATUS'; taskId: string }
  | { type: 'ADD_CHAT_MESSAGE'; message: ChatMessage }
  | { type: 'PUSH_TOAST'; toast: Toast }
  | { type: 'DISMISS_TOAST'; id: string }
  | { type: 'HYDRATE'; state: Partial<AppState> }

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STORE':
      return { ...state, currentStoreId: action.storeId }

    case 'SET_TAB':
      return { ...state, currentTab: action.tab }

    case 'UPDATE_LAUNCH_DRAFT':
      return { ...state, launchDraft: { ...state.launchDraft, ...action.patch } }

    case 'RESET_LAUNCH_DRAFT':
      return { ...state, launchDraft: action.draft }

    case 'ADD_LAUNCH_RESULT':
      return { ...state, launchResults: [action.result, ...state.launchResults] }

    case 'ADD_PACKAGE_PLAN':
      return { ...state, packagePlans: [action.plan, ...state.packagePlans] }

    case 'ADD_CONTENT_PLAN':
      return { ...state, contentPlans: [action.plan, ...state.contentPlans] }

    case 'SET_REVIEW_ANALYSIS':
      return {
        ...state,
        reviewAnalysisByStore: { ...state.reviewAnalysisByStore, [action.storeId]: action.analysis },
      }

    case 'ADD_TASK':
      return { ...state, tasks: [action.task, ...state.tasks] }

    case 'TOGGLE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.taskId ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t,
        ),
      }

    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.message] }

    case 'PUSH_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] }

    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }

    case 'HYDRATE':
      return { ...state, ...action.state }

    default:
      return state
  }
}
