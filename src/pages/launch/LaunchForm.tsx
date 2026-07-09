import { useState } from 'react'
import type { LaunchFormInput, Store } from '../../types'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { RequiredFields } from './LaunchFormFields/RequiredFields'
import { OptionalFields } from './LaunchFormFields/OptionalFields'
import { MockUploadFields } from './LaunchFormFields/MockUploadFields'

function isValid(draft: LaunchFormInput): boolean {
  return (
    draft.name.trim().length > 0 &&
    draft.price > 0 &&
    draft.storeId.length > 0 &&
    draft.targetAudience.length > 0 &&
    draft.goal.length > 0 &&
    draft.platforms.length > 0
  )
}

export function LaunchForm({
  draft,
  onPatch,
  onSubmit,
  submitting,
  stores,
}: {
  draft: LaunchFormInput
  onPatch: (patch: Partial<LaunchFormInput>) => void
  onSubmit: () => void
  submitting: boolean
  stores: Store[]
}) {
  const [showOptional, setShowOptional] = useState(false)
  const valid = isValid(draft)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <p className="mb-3 text-sm font-medium text-ink">基本信息</p>
        <RequiredFields draft={draft} onPatch={onPatch} stores={stores} />
      </Card>

      <Card>
        <p className="mb-3 text-sm font-medium text-ink">参考素材（选填）</p>
        <MockUploadFields draft={draft} onPatch={onPatch} />
      </Card>

      <Card>
        <button
          className="flex w-full items-center justify-between"
          onClick={() => setShowOptional((v) => !v)}
        >
          <p className="text-sm font-medium text-ink">更多信息（选填，有助于生成更精准的方案）</p>
          <span className="text-ink-faint">{showOptional ? '收起 ▴' : '展开 ▾'}</span>
        </button>
        {showOptional && (
          <div className="mt-3">
            <OptionalFields draft={draft} onPatch={onPatch} />
          </div>
        )}
      </Card>

      <Button disabled={!valid || submitting} onClick={onSubmit} className="w-full">
        {submitting ? '生成中…' : '生成上新方案'}
      </Button>
      {!valid && (
        <p className="-mt-2 text-center text-xs text-ink-faint">
          请填写名称、定价、门店、目标客群、上新目标和投放平台
        </p>
      )}
    </div>
  )
}
