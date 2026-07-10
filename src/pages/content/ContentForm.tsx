import type { ImageProvider, Platform } from '../../types'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { ChipGroup, Chip } from '../../components/ui/Chip'
import { Button } from '../../components/ui/Button'
import { PLATFORM_LABEL } from '../../mock/copyBank'

const CONTENT_PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'douyin', label: PLATFORM_LABEL.douyin },
  { value: 'xiaohongshu', label: PLATFORM_LABEL.xiaohongshu },
  { value: 'wechat_moments', label: PLATFORM_LABEL.wechat_moments },
  { value: 'wechat_group', label: PLATFORM_LABEL.wechat_group },
]

const IMAGE_PROVIDER_OPTIONS: { value: ImageProvider; label: string }[] = [
  { value: 'gemini', label: 'Google' },
  { value: 'openai', label: 'GPT Image 2' },
]

const OBJECT_PRESETS = ['新品', '招牌菜', '双人套餐', '门店氛围', '下班小聚', '生日聚会']

export function ContentForm({
  promotionObject,
  onPromotionObjectChange,
  platforms,
  onPlatformsChange,
  imageProvider,
  onImageProviderChange,
  onSubmit,
  submitting,
}: {
  promotionObject: string
  onPromotionObjectChange: (v: string) => void
  platforms: Platform[]
  onPlatformsChange: (v: Platform[]) => void
  imageProvider: ImageProvider
  onImageProviderChange: (v: ImageProvider) => void
  onSubmit: () => void
  submitting: boolean
}) {
  const valid = promotionObject.trim().length > 0 && platforms.length > 0

  return (
    <Card className="flex flex-col gap-4">
      <Input
        label="推广对象"
        required
        value={promotionObject}
        onChange={(e) => onPromotionObjectChange(e.target.value)}
        placeholder="例如：秘制烤五花肉"
      />
      <div className="flex flex-wrap gap-1.5">
        {OBJECT_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => onPromotionObjectChange(preset)}
            className="rounded-pill bg-bg px-2.5 py-1 text-xs text-ink-soft"
          >
            {preset}
          </button>
        ))}
      </div>
      <ChipGroup
        label="投放平台"
        required
        options={CONTENT_PLATFORMS}
        value={platforms}
        onChange={onPlatformsChange}
      />
      <div>
        <span className="mb-1.5 block text-sm text-ink">配图生成模型</span>
        <div className="flex flex-wrap gap-2">
          {IMAGE_PROVIDER_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={imageProvider === opt.value}
              onClick={() => onImageProviderChange(opt.value)}
            />
          ))}
        </div>
      </div>
      <Button disabled={!valid || submitting} onClick={onSubmit}>
        {submitting ? '生成中…' : '生成推广内容'}
      </Button>
    </Card>
  )
}
