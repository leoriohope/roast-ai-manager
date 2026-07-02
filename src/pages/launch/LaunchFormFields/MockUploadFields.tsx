import type { LaunchFormInput } from '../../../types'
import { MockUploadField } from '../../../components/shared/MockUploadField'

export function MockUploadFields({
  draft,
  onPatch,
}: {
  draft: LaunchFormInput
  onPatch: (patch: Partial<LaunchFormInput>) => void
}) {
  return (
    <div className="flex gap-3">
      <MockUploadField
        label="菜品图片"
        value={draft.dishImage}
        onChange={(v) => onPatch({ dishImage: v })}
      />
      <MockUploadField
        label="菜单截图"
        value={draft.menuScreenshot}
        onChange={(v) => onPatch({ menuScreenshot: v })}
      />
      <MockUploadField
        label="评价截图"
        value={draft.reviewScreenshot}
        onChange={(v) => onPatch({ reviewScreenshot: v })}
      />
    </div>
  )
}
