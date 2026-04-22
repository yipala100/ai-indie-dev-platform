const API_TIMEOUT = 15000 // 15秒超时

/**
 * 调用方案生成器API
 * 超时或失败时自动加载兜底数据
 */
export async function generatePlan({ infoTitle, infoContent, infoTags }) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

    const res = await fetch('/api/ai/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ infoTitle, infoContent, infoTags }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) throw new Error('API返回错误')
    return await res.json()
  } catch (err) {
    console.warn('方案生成API失败，加载兜底数据:', err.message)
    const backup = await import('../assets/data/backup/backup-plan.json')
    return backup.default
  }
}

/**
 * 调用小红书笔记生成器API
 * 超时或失败时自动加载兜底数据
 */
export async function generateXiaohongshu(params) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

    const res = await fetch('/api/ai/generate-xiaohongshu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) throw new Error('API返回错误')
    return await res.json()
  } catch (err) {
    console.warn('小红书生成API失败，加载兜底数据:', err.message)
    const backup = await import('../assets/data/backup/backup-xiaohongshu.json')
    return backup.default
  }
}

/**
 * 调用落地页生成器API
 * 超时或失败时自动加载兜底数据
 */
export async function generateLandingPage(params) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

    const res = await fetch('/api/ai/generate-landing-page', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) throw new Error('API返回错误')
    return await res.json()
  } catch (err) {
    console.warn('落地页生成API失败，加载兜底数据:', err.message)
    const backup = await fetch('/backup-landing.html')
    const html = await backup.text()
    return { html }
  }
}
