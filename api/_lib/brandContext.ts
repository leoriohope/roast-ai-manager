// Shared, non-store-level brand identity — used as the base layer in both
// the image-generation prompt (imagePrompt.ts) and the launch-content text
// prompt (launchPlan.ts). Distilled from the brand's own intro doc down to
// what's actually useful for generation: concrete visual/menu signatures,
// not abstract positioning language ("品质餐饮品牌" etc. doesn't help a model
// draw or write anything differently).
export const BRAND_NAME = '南北征赞·野核桃东北烤肉'

export const BRAND_DESCRIPTION =
  `${BRAND_NAME}是主打东北风味炭火烤肉的品牌，核心特色是木炭明火烤制（不是电烤炉），` +
  `代表食材是鲜切牛肉——常见部位有丹东小黄牛、牛肋条、横膈膜、牛五花、雪花牛肉；` +
  `招牌服务是店员在餐桌旁的炭炉上专业代烤、翻面、分切。` +
  `菜单也包含东北特色产品，如东北冷面、东北拌饭、东北特色凉菜、冻梨。` +
  `门店设计现代舒适，客群以年轻人、家庭和朋友聚会为主，整体氛围兼具东北豪爽烟火气与年轻化社交聚餐感。`
