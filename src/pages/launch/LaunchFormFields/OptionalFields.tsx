import type { LaunchFormInput } from '../../../types'
import { Input, Textarea } from '../../../components/ui/Input'
import { Toggle } from '../../../components/ui/Toggle'

export function OptionalFields({
  draft,
  onPatch,
}: {
  draft: LaunchFormInput
  onPatch: (patch: Partial<LaunchFormInput>) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="主要卖点（逗号分隔）"
        value={draft.sellingPoints}
        onChange={(e) => onPatch({ sellingPoints: e.target.value })}
        placeholder="现烤锁鲜，招牌酱料，分量足"
      />
      <Input
        label="口味描述"
        value={draft.flavorDescription}
        onChange={(e) => onPatch({ flavorDescription: e.target.value })}
        placeholder="例如：微辣带甜"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="适合人数"
          type="number"
          min={1}
          value={draft.partySize ?? ''}
          onChange={(e) => onPatch({ partySize: e.target.value ? Number(e.target.value) : undefined })}
        />
        <Input
          label="最低可接受价格（元）"
          type="number"
          min={0}
          value={draft.minPrice ?? ''}
          onChange={(e) => onPatch({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <Toggle
        label="限时供应"
        checked={Boolean(draft.limitedTime)}
        onChange={(checked) =>
          onPatch({ limitedTime: checked ? { start: '', end: '' } : null })
        }
      />
      <Toggle
        label="可组合进套餐"
        checked={Boolean(draft.bundleable)}
        onChange={(checked) => onPatch({ bundleable: checked })}
      />
      <Input
        label="需要避免的促销方式"
        value={draft.promotionsToAvoid}
        onChange={(e) => onPatch({ promotionsToAvoid: e.target.value })}
        placeholder="例如：不做买一送一"
      />
      <Input
        label="供应限制"
        value={draft.supplyLimitation}
        onChange={(e) => onPatch({ supplyLimitation: e.target.value })}
        placeholder="例如：每日限量50份"
      />
    </div>
  )
}
