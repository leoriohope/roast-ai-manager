import type {
  BrandStyleProfile,
  BrandStyleProfileDraft,
  ChatMessage,
  ContentPlan,
  ImageProvider,
  LaunchContentDraft,
  LaunchFormInput,
  LaunchPlanResult,
  PackagePlan,
  Review,
  Store,
  StoreCheckup,
  Task,
  TaskStatus,
  TodaySummary,
} from '../types'
import { getStoredAccessCode } from './accessCode'

export class AccessCodeError extends Error {
  constructor() {
    super('Invalid or missing access code')
    this.name = 'AccessCodeError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const code = getStoredAccessCode()
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(code ? { 'x-access-code': code } : {}),
      ...init?.headers,
    },
  })
  if (res.status === 401) {
    throw new AccessCodeError()
  }
  if (!res.ok) {
    throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function verifyAccessCode(code: string): Promise<boolean> {
  const res = await fetch('/api/stores', { headers: { 'x-access-code': code } })
  return res.ok
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

// Both hit the same merged /api/image-actions endpoint (real, server-held-key
// calls) — src/ai/extractBrandStyle.ts and generateContentImage.ts wrap them
// with a try/catch that falls back to a local mock on failure (e.g. while the
// relevant provider's API key is still a placeholder).
export const requestBrandStyleDraft = (referenceImages: string[]) =>
  request<BrandStyleProfileDraft>('/image-actions', {
    method: 'POST',
    body: JSON.stringify({ type: 'extract-style', referenceImages }),
  })
export const requestStyledImage = (
  subject: string,
  style: BrandStyleProfile | null,
  provider: ImageProvider = 'gemini',
) =>
  request<{ url: string; prompt: string }>('/image-actions', {
    method: 'POST',
    body: JSON.stringify({ type: 'generate-image', subject, style, provider }),
  })

// src/ai/generateLaunchPlan.ts wraps this with a try/catch that falls back to
// local template copy on failure (same pattern as the two calls above). PATCH
// on /launch-results (rather than a separate endpoint file) to stay under
// Vercel Hobby's 12-serverless-function cap.
export const requestLaunchContent = (input: LaunchFormInput) =>
  request<LaunchContentDraft>('/launch-results', { method: 'PATCH', body: JSON.stringify(input) })
