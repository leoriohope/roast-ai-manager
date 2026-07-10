import type { ContentPlan, ContentPlanInput } from '../types'
import {
  generateDouyinScript,
  generateMomentsCopy,
  generateWechatGroupMessage,
  generateXiaohongshuPost,
} from './contentTemplates'
import { generateContentImage } from './generateContentImage'
import { uid } from '../utils/id'

export async function generateContentPlan(input: ContentPlanInput): Promise<ContentPlan> {
  const coverImage = await generateContentImage(input.promotionObject, input.brandStyle, input.imageProvider)

  const platforms = new Set(input.platforms)
  const plan: ContentPlan = {
    id: uid('content'),
    promotionObject: input.promotionObject,
    generatedAt: new Date().toISOString(),
    coverImage,
  }

  if (platforms.has('douyin')) {
    plan.douyinScript = generateDouyinScript(input.promotionObject)
  }
  if (platforms.has('xiaohongshu')) {
    plan.xiaohongshuPost = generateXiaohongshuPost(input.promotionObject, [])
  }
  if (platforms.has('wechat_moments')) {
    plan.momentsCopy = generateMomentsCopy(input.promotionObject)
  }
  if (platforms.has('wechat_group')) {
    plan.wechatGroupMessage = generateWechatGroupMessage(input.promotionObject, '门店咨询', false)
  }

  return plan
}
