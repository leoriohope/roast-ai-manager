import type { LaunchFormInput, Store } from '../../../types'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { ChipGroup } from '../../../components/ui/Chip'
import { DISH_TYPE_LABEL, AUDIENCE_LABEL, GOAL_LABEL, PLATFORM_LABEL } from '../../../mock/copyBank'

const DISH_TYPE_OPTIONS = Object.entries(DISH_TYPE_LABEL).map(([value, label]) => ({ value, label }))
const COST_LEVEL_OPTIONS = [
  { value: 'low', label: '低成本' },
  { value: 'med', label: '中等成本' },
  { value: 'high', label: '高成本' },
]
const AUDIENCE_OPTIONS = Object.entries(AUDIENCE_LABEL).map(([value, label]) => ({ value, label })) as {
  value: LaunchFormInput['targetAudience'][number]
  label: string
}[]
const GOAL_OPTIONS = Object.entries(GOAL_LABEL).map(([value, label]) => ({ value, label })) as {
  value: LaunchFormInput['goal'][number]
  label: string
}[]
const PLATFORM_OPTIONS = Object.entries(PLATFORM_LABEL).map(([value, label]) => ({ value, label })) as {
  value: LaunchFormInput['platforms'][number]
  label: string
}[]

export function RequiredFields({
  draft,
  onPatch,
  stores,
}: {
  draft: LaunchFormInput
  onPatch: (patch: Partial<LaunchFormInput>) => void
  stores: Store[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="新品 / 套餐名称"
        required
        value={draft.name}
        onChange={(e) => onPatch({ name: e.target.value })}
        placeholder="例如：秘制烤五花肉"
      />
      <Select
        label="类型"
        required
        options={DISH_TYPE_OPTIONS}
        value={draft.type}
        onChange={(e) => onPatch({ type: e.target.value as LaunchFormInput['type'] })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="定价（元）"
          required
          type="number"
          min={0}
          value={draft.price || ''}
          onChange={(e) => onPatch({ price: Number(e.target.value) })}
        />
        <Select
          label="成本水平"
          required
          options={COST_LEVEL_OPTIONS}
          value={draft.costLevel}
          onChange={(e) => onPatch({ costLevel: e.target.value as LaunchFormInput['costLevel'] })}
        />
      </div>
      <Select
        label="目标门店"
        required
        options={stores.map((s) => ({ value: s.id, label: s.name }))}
        value={draft.storeId}
        onChange={(e) => onPatch({ storeId: e.target.value })}
      />
      <ChipGroup
        label="目标客群"
        required
        options={AUDIENCE_OPTIONS}
        value={draft.targetAudience}
        onChange={(v) => onPatch({ targetAudience: v })}
      />
      <ChipGroup
        label="上新目标"
        required
        options={GOAL_OPTIONS}
        value={draft.goal}
        onChange={(v) => onPatch({ goal: v })}
      />
      <ChipGroup
        label="投放平台"
        required
        options={PLATFORM_OPTIONS}
        value={draft.platforms}
        onChange={(v) => onPatch({ platforms: v })}
      />
    </div>
  )
}
