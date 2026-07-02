import type { PackageGoalKey } from '../../types'

const GOAL_OPTIONS: { value: PackageGoalKey; label: string; desc: string }[] = [
  { value: 'traffic_2p', label: '双人引流', desc: '低价获客，吸引新客到店' },
  { value: 'profit', label: '利润套餐', desc: '高毛利，适合稳定客群' },
  { value: 'gathering_4p', label: '四人聚会', desc: '适合朋友/家庭多人用餐' },
  { value: 'weekday_offpeak', label: '工作日错峰', desc: '提升非高峰时段上座率' },
  { value: 'birthday', label: '生日套餐', desc: '带动生日场景消费' },
]

export function GoalPicker({
  onPick,
  loadingGoal,
}: {
  onPick: (goal: PackageGoalKey) => void
  loadingGoal: PackageGoalKey | null
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {GOAL_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onPick(opt.value)}
          disabled={loadingGoal !== null}
          className="flex items-center justify-between rounded-card bg-surface p-4 text-left shadow-card disabled:opacity-60"
        >
          <div>
            <p className="text-sm font-medium text-ink">{opt.label}</p>
            <p className="mt-0.5 text-xs text-ink-soft">{opt.desc}</p>
          </div>
          <span className="text-primary">
            {loadingGoal === opt.value ? '生成中…' : '生成套餐 →'}
          </span>
        </button>
      ))}
    </div>
  )
}
