import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePlan } from '../utils/api'

function PlanGenerator() {
  const navigate = useNavigate()
  const [infoTitle, setInfoTitle] = useState('')
  const [infoContent, setInfoContent] = useState('')
  const [infoTags, setInfoTags] = useState([])
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // 从 localStorage 读取资讯参数
    const title = localStorage.getItem('infoTitle') || ''
    const content = localStorage.getItem('infoContent') || ''
    const tags = JSON.parse(localStorage.getItem('infoTags') || '[]')
    setInfoTitle(title)
    setInfoContent(content)
    setInfoTags(tags)
  }, [])

  const handleGenerate = async () => {
    if (!infoTitle || !infoContent) {
      setError('请先从资讯列表选择一条资讯')
      return
    }

    setLoading(true)
    setError('')
    setPlan(null)

    try {
      const result = await generatePlan({ infoTitle, infoContent, infoTags })
      setPlan(result)

      // 提取方案参数，存入 localStorage 供工具箱使用
      if (result.params) {
        localStorage.setItem('projectName', result.params.projectName || '')
        localStorage.setItem('targetUser', result.params.targetUser || '')
        localStorage.setItem('corePain', result.params.corePain || '')
        localStorage.setItem('drainageChannel', result.params.drainageChannel || '')
        localStorage.setItem('projectDesc', result.params.projectDesc || '')
      }
    } catch (err) {
      setError('方案生成失败：' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoToolkit = () => {
    navigate('/toolkit')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">🤖 AI变现方案生成器</h1>
      <p className="text-slate-400 mb-8">基于资讯内容，AI自动生成6模块结构化变现方案</p>

      {/* 输入区域 */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">输入资讯</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">资讯标题</label>
            <input
              type="text"
              value={infoTitle}
              onChange={(e) => setInfoTitle(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="从资讯列表自动带入，或手动输入"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">资讯内容</label>
            <textarea
              value={infoContent}
              onChange={(e) => setInfoContent(e.target.value)}
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="资讯全文"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {infoTags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? '⏳ AI方案生成中...' : '🚀 生成变现方案'}
        </button>

        {error && (
          <div className="mt-3 text-red-400 text-sm">{error}</div>
        )}
      </div>

      {/* 方案输出区域 */}
      {plan && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6">
          <h2 className="text-xl font-bold text-white">📋 生成方案</h2>

          {plan.modules?.map((mod, idx) => (
            <div key={idx} className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">{mod.title}</h3>
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{mod.content}</div>
            </div>
          ))}

          <button
            onClick={handleGoToolkit}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🛠️ 进入需求验证工具箱
          </button>
        </div>
      )}
    </div>
  )
}

export default PlanGenerator
