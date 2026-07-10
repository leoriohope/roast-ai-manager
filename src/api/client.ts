import type {
  BrandStyleProfile,
  BrandStyleProfileDraft,
  ChatMessage,
  ContentPlan,
  LaunchPlanResult,
  PackagePlan,
  Review,
  Store,
  StoreCheckup,
  Task,
  TaskStatus,
  TodaySummary,
} from '../types'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const getStores = () => request<Store[]>('/stores')
export const getReviews = () => request<Review[]>('/reviews')
export const getCheckup = (storeId: string) => request<StoreCheckup>(`/checkups/${storeId}`)
export const getTodaySummary = (storeId: string) => request<TodaySummary>(`/today-summaries/${storeId}`)

export const getTasks = () => request<Task[]>('/tasks')
export const createTask = (task: Omit<Task, 'id' | 'createdAt'>) =>
  request<Task>('/tasks', { method: 'POST', body: JSON.stringify(task) })
export const patchTaskStatus = (id: string, status: TaskStatus) =>
  request<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })

export const getLaunchResults = () => request<LaunchPlanResult[]>('/launch-results')
export const createLaunchResult = (result: LaunchPlanResult) =>
  request<LaunchPlanResult>('/launch-results', { method: 'POST', body: JSON.stringify(result) })

export const getPackagePlans = () => request<PackagePlan[]>('/package-plans')
export const createPackagePlan = (storeId: string, plan: PackagePlan) =>
  request<PackagePlan>('/package-plans', { method: 'POST', body: JSON.stringify({ storeId, ...plan }) })

export const getContentPlans = () => request<ContentPlan[]>('/content-plans')
export const createContentPlan = (storeId: string, plan: ContentPlan) =>
  request<ContentPlan>('/content-plans', { method: 'POST', body: JSON.stringify({ storeId, ...plan }) })

export const getChatMessages = () => request<ChatMessage[]>('/chat-messages')
export const createChatMessage = (message: Omit<ChatMessage, 'id' | 'createdAt'>) =>
  request<ChatMessage>('/chat-messages', { method: 'POST', body: JSON.stringify(message) })

export const getBrandStyleProfile = () => request<BrandStyleProfile | null>('/brand-style-profiles')
export const saveBrandStyleProfile = (profile: BrandStyleProfileDraft) =>
  request<BrandStyleProfile>('/brand-style-profiles', { method: 'POST', body: JSON.stringify(profile) })

// Both hit the same merged /api/gemini endpoint (real, server-held-key Gemini calls) —
// src/ai/extractBrandStyle.ts and generateContentImage.ts wrap them with a try/catch
// that falls back to a local mock on failure (e.g. while GEMINI_API_KEY is a placeholder).
export const requestBrandStyleDraft = (referenceImages: string[]) =>
  request<BrandStyleProfileDraft>('/gemini', {
    method: 'POST',
    body: JSON.stringify({ type: 'extract-style', referenceImages }),
  })
export const requestStyledImage = (subject: string, style: BrandStyleProfile | null) =>
  request<{ dataUrl: string; prompt: string }>('/gemini', {
    method: 'POST',
    body: JSON.stringify({ type: 'generate-image', subject, style }),
  })
