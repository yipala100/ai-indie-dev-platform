import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateLandingPage } from '../../utils/api'

function LandingPageTool() {
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [htmlCode, setHtmlCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    setParams({
      projectName: localStorage.getItem('projectName') || '',
      targetUser: localStorage.getItem('targetUser') || '',
      corePain: localStorage.getItem('corePain') || '',
      projectDesc: localStorage.getItem('projectDesc') || '',
    })
  }, [])

  const handleGenerate = async () => {
    if (!params.projectName) {
      setError('请先生成变现方案')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await generateLandingPage(params)
      setHtmlCode(res.html || '')
    } catch (err) {
      setError('生成失败：' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode)
    alert('HTML代码已复制到剪贴板！')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/toolkit')}
        className="text-slate-400 hover:text-white mb-6 flex items-center gap-1 transition-colors"
      >
        ← 返回工具箱
      </button>

      <h1 className="text-3xl font-bold text-white mb-2">🌐 落地页生成器</h1>
      <p className="text-slate-400 mb-8">一键生成MVP产品落地页HTML代码</p>

      {/* 参数展示 */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">自动填充参数</h2>
        <div className="space-y-2 text-sm">
          <div><span className="text-slate-400">项目名称：</span><span className="text-white">{params.projectName || '未设置'}</span></div>
          <div><span className="text-slate-400">目标用户：</span><span className="text-white">{params.targetUser || '未设置'}</span></div>
          <div><span className="text-slate-400">核心痛点：</span><span className="text-white">{params.corePain || '未设置'}</span></div>
          <div><span className="text-slate-400">项目描述：</span><span className="text-white">{params.projectDesc || '未设置'}</span></div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? '⏳ 生成中...' : '🌐 生成落地页'}
        </button>

        {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}
      </div>

      {/* 生成结果 */}
      {htmlCode && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">生成结果</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                {showPreview ? '查看代码' : '预览效果'}
              </button>
              <button
                onClick={handleCopy}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                📋 复制代码
              </button>
            </div>
          </div>

          {showPreview ? (
            <div className="bg-white rounded-lg overflow-hidden">
              <iframe
                srcDoc={htmlCode}
                className="w-full h-96 border-0"
                title="落地页预览"
              />
            </div>
          ) : (
            <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-sm text-slate-300 overflow-auto max-h-96">
              <code>{htmlCode}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

export default LandingPageTool
