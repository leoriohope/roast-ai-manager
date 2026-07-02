export function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export function formatRelativeDay(iso: string): string {
  const target = new Date(iso)
  const now = new Date()
  const diffMs = now.setHours(0, 0, 0, 0) - new Date(target).setHours(0, 0, 0, 0)
  const diffDays = Math.round(diffMs / 86400000)
  if (diffDays <= 0) return '今天'
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) return `${diffDays}天前`
  return formatDate(iso)
}

export const WEEK_DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
