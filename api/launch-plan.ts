import type { LaunchFormInput } from '../src/types/index.js'
import { generateLaunchContent } from './_lib/launchPlan.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const input = req.body as LaunchFormInput
  const draft = await generateLaunchContent(input)
  res.status(200).json(draft)
})
