import { Router } from 'express'

const router = Router()

const AI_API_KEY = process.env.VITE_AI_API_KEY
const AI_API_BASE_URL = process.env.VITE_AI_API_BASE_URL || 'https://api.openai.com/v1'
const AI_MODEL = process.env.VITE_AI_MODEL || 'gpt-3.5-turbo'

/**
 * 通用AI调用函数
 */
async function callAI(systemPrompt, userPrompt) {
  const response = await fetch(`${AI_API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

/**
 * 方案生成器
 * POST /api/ai/generate-plan
 */
router.post('/generate-plan', async (req, res) => {
  try {
    const { infoTitle, infoContent, infoTags } = req.body

    const systemPrompt = `你是专为独立开发者打造的 AI 变现方案专家，用户均使用 Cursor/VibeCoding 进行零门槛 MVP 开发。请严格基于以下输入的资讯内容，生成一套可落地、可验证的变现方案，必须严格按照 6 个固定模块输出，模块名称、顺序禁止修改，每个模块内容必须具体、可执行，拒绝空泛话术、通用趋势。

输出格式严格如下，禁止增减模块、修改模块标题：

【1. 核心风口机会】
【2. 细分用户与精准痛点】
【3. VibeCoding 快速落地 MVP 步骤】
【4. 零成本引流渠道与玩法】
【5. 需求验证核心 SOP】
【6. 成本与收益预估】

在正文之后，额外输出结构化参数块：
---PARAMS---
{
  "projectName": "项目名称",
  "targetUser": "目标用户",
  "corePain": "核心痛点",
  "drainageChannel": "引流渠道",
  "projectDesc": "项目描述"
}
---PARAMS---`

    const userPrompt = `【输入资讯标题】：${infoTitle}\n【输入资讯全文】：${infoContent}\n【输入资讯标签】：${(infoTags || []).join('、')}`

    const content = await callAI(systemPrompt, userPrompt)

    // 解析6模块内容
    const modules = []
    const moduleRegex = /【(\d+)\.\s*(.+?)】\s*([\s\S]*?)(?=【\d+\.|---PARAMS---|$)/g
    let match
    while ((match = moduleRegex.exec(content)) !== null) {
      modules.push({ title: `${match[1]}. ${match[2]}`, content: match[3].trim() })
    }

    // 解析参数块
    let params = {}
    const paramsMatch = content.match(/---PARAMS---\s*([\s\S]*?)\s*---PARAMS---/)
    if (paramsMatch) {
      try {
        params = JSON.parse(paramsMatch[1])
      } catch (e) {
        console.warn('参数解析失败:', e.message)
      }
    }

    res.json({ modules, params })
  } catch (err) {
    console.error('方案生成失败:', err.message)
    res.status(500).json({ error: err.message })
  }
})

/**
 * 小红书笔记生成器
 * POST /api/ai/generate-xiaohongshu
 */
router.post('/generate-xiaohongshu', async (req, res) => {
  try {
    const { projectName, targetUser, corePain, drainageChannel } = req.body

    const systemPrompt = `你是小红书爆款笔记写手，专门为独立开发者写引流笔记。根据给定的项目信息，生成3条小红书笔记。每条笔记包含：标题（带emoji，吸引点击）、正文（300字以内，口语化）、话题标签（3-5个）。输出JSON格式：
{
  "notes": [
    { "title": "标题", "content": "正文", "hashtags": ["标签1", "标签2"] }
  ]
}`

    const userPrompt = `项目名称：${projectName}\n目标用户：${targetUser}\n核心痛点：${corePain}\n引流渠道：${drainageChannel}`

    const content = await callAI(systemPrompt, userPrompt)

    // 尝试解析JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      res.json(JSON.parse(jsonMatch[0]))
    } else {
      res.json({ notes: [{ title: '生成结果', content, hashtags: [] }] })
    }
  } catch (err) {
    console.error('小红书生成失败:', err.message)
    res.status(500).json({ error: err.message })
  }
})

/**
 * 落地页生成器
 * POST /api/ai/generate-landing-page
 */
router.post('/generate-landing-page', async (req, res) => {
  try {
    const { projectName, targetUser, corePain, projectDesc } = req.body

    const systemPrompt = `你是专业的落地页设计师，为独立开发者的MVP产品生成一个精美的单页HTML落地页。要求：
1. 完整的HTML文件，内联CSS样式
2. 现代化设计，渐变色背景
3. 包含：Hero区域、痛点描述、产品特色、CTA按钮
4. 响应式设计
5. 只输出HTML代码，不要任何解释`

    const userPrompt = `项目名称：${projectName}\n目标用户：${targetUser}\n核心痛点：${corePain}\n项目描述：${projectDesc}`

    const content = await callAI(systemPrompt, userPrompt)

    // 提取HTML代码
    const htmlMatch = content.match(/<!DOCTYPE[\s\S]*<\/html>/i) || content.match(/<html[\s\S]*<\/html>/i)
    res.json({ html: htmlMatch ? htmlMatch[0] : content })
  } catch (err) {
    console.error('落地页生成失败:', err.message)
    res.status(500).json({ error: err.message })
  }
})

export default router
