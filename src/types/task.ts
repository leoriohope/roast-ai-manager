export type TaskSource = 'launch' | 'checkup' | 'package' | 'content' | 'review' | 'manual'
export type TaskStatus = 'pending' | 'done'

export interface Task {
  id: string
  title: string
  description?: string
  source: TaskSource
  storeId: string
  status: TaskStatus
  createdAt: string
  relatedResultId?: string
}
