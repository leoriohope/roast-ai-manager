import type { ContentCopyDraft, ContentPlan, ContentPlanInput } from '../types'
import {
  generateDouyinScript,
  generateMomentsCopy,
  generateWechatGroupMessage,
  generateXiaohongshuPost,
} from './contentTemplates'
import { generateContentImage } from './generateContentImage'
import { requestContentCopy } from '../api/client'
import { uid } from '../utils/id'

// Local per-platform template fallback — same pool-based generation this
// file used before real AI was wired in.
function mockGenerateContentCopy(input: ContentPlanInput): ContentCopyDraft {
  const platforms = new Set(input.platforms)
  const draft: ContentCopyDraft = {}

  if (platforms.has('douyin')) {
    draft.douyinScript = generateDouyinScript(input.promotionObject)
  }
  if (platforms.has('xiaohongshu')) {
    draft.xiaohongshuPost = generateXiaohongshuPost(input.promotionObject, [])
  }
  if (platforms.has('wechat_moments')) {
    draft.momentsCopy = generateMomentsCopy(input.promotionObject)
  }
  if (platforms.has('wechat_group')) {
    draft.wechatGroupMessage = generateWechatGroupMessage(input.promotionObject, '门店咨询', false)
  }
  return draft
}

export async function generateContentPlan(input: ContentPlanInput): Promise<ContentPlan> {
  const coverImage = await generateContentImage(input.promotionObject, input.brandStyle, input.imageProvider)

  let copy: ContentCopyDraft
  try {
    copy = await requestContentCopy(input)
  } catch (err) {
    console.error('Real content copy generation failed, falling back to local mock', err)
    copy = mockGenerateContentCopy(input)
  }

  return {
    id: uid('content'),
    promotionObject: input.promotionObject,
    generatedAt: new Date().toISOString(),
    coverImage,
    ...copy,
  }
}
