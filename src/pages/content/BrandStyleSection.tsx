import { useState } from 'react'
import type { BrandStyleProfileDraft } from '../../types'
import { useApp, useToast } from '../../state/AppContext'
import { extractBrandStyle } from '../../ai'
import { saveBrandStyleProfile } from '../../api/client'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { MultiImageUploadField } from '../../components/shared/MultiImageUploadField'
import { formatDate } from '../../utils/date'

const splitList = (text: string) =>
  text
    .split(/[，,]/)
    .map((s) => s.trim())
    .filter(Boolean)

export function BrandStyleSection() {
  const { state, dispatch } = useApp()
  const toast = useToast()
  const [expanded, setExpanded] = useState(false)
  const [referenceImages, setReferenceImages] = useState<string[]>([])
  const [draft, setDraft] = useState<BrandStyleProfileDraft | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [saving, setSaving] = useState(false)

  const profile = state.brandStyleProfile
  const statusLine = profile
    ? `已设置 · ${profile.referenceImageCount}张参考图 · ${formatDate(profile.generatedAt)}`
    : '未设置品牌风格'

  const handleExtract = async () => {
    setExtracting(true)
    try {
      const result = await extractBrandStyle(referenceImages)
      setDraft(result)
    } catch {
      toast('生成风格失败，请重试', 'error')
    } finally {
      setExtracting(false)
    }
  }

  const handleSave = async () => {
    if (!draft) return
    setSaving(true)
    try {
      const saved = await saveBrandStyleProfile(draft)
      dispatch({ type: 'SET_BRAND_STYLE_PROFILE', profile: saved })
      toast('品牌风格已保存')
      setExpanded(false)
      setReferenceImages([])
      setDraft(null)
    } catch {
      toast('保存失败，请重试', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <button
        className="flex w-full items-center justify-between"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="text-left">
          <p className="text-sm font-medium text-ink">品牌风格</p>
          <p className="mt-0.5 text-xs text-ink-faint">{statusLine}</p>
        </div>
        <span className="text-ink-faint">{expanded ? '收起 ▴' : '设置 ▾'}</span>
      </button>

      {expanded && (
        <div className="mt-4 flex flex-col gap-4">
          <MultiImageUploadField
            label="上传参考图（美团/小红书上已有的门店照片）"
            values={referenceImages}
            onChange={setReferenceImages}
          />
          <Button
            variant="secondary"
            disabled={referenceImages.length === 0 || extracting}
            onClick={handleExtract}
          >
            {extracting ? '分析中…' : '生成风格'}
          </Button>

          {draft && (
            <div className="flex flex-col gap-3 rounded-2xl bg-bg p-3">
              <Input
                label="视觉呈现形式（真实摄影 or 海报设计）"
                value={draft.visualFormat}
                onChange={(e) => setDraft({ ...draft, visualFormat: e.target.value })}
              />
              <Input
                label="色调（逗号分隔的色值）"
                value={draft.colorPalette.join(', ')}
                onChange={(e) => setDraft({ ...draft, colorPalette: splitList(e.target.value) })}
              />
              <Input
                label="打光"
                value={draft.lighting}
                onChange={(e) => setDraft({ ...draft, lighting: e.target.value })}
              />
              <Input
                label="构图"
                value={draft.composition}
                onChange={(e) => setDraft({ ...draft, composition: e.target.value })}
              />
              <Input
                label="摆盘风格"
                value={draft.platingStyle}
                onChange={(e) => setDraft({ ...draft, platingStyle: e.target.value })}
              />
              <Input
                label="氛围关键词（逗号分隔）"
                value={draft.moodKeywords.join(', ')}
                onChange={(e) => setDraft({ ...draft, moodKeywords: splitList(e.target.value) })}
              />
              <Button onClick={handleSave} disabled={saving}>
                {saving ? '保存中…' : '保存'}
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
