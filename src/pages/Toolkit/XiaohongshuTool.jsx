import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateXiaohongshu } from '../../utils/api'

function XiaohongshuTool() {
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setParams({
      projectName: localStorage.getItem('projectName') || '',
      targetUser: localStorage.getItem('targetUser') || '',
      corePain: localStorage.getItem('corePain') || '',
      drainageChannel: localStorage.getItem('drainageChannel') || '',
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
      const res = await generateXiaohongshu(params)
      setResult(res)
    } catch (err) {
      setError('生成失败：' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/toolkit')}
        className="text-slate-400 hover:text-white mb-6 flex items-center gap-1 transition-colors"
      >
        ← 返回工具箱
      </button>

      <h1 className="text-3xl font-bold text-white mb-2">📕 小红书笔记生成器</h1>
      <p className="text-slate-400 mb-8">基于方案参数，自动生成适配小红书的引流笔记</p>

      {/* 参数展示 */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">自动填充参数</h2>
        <div className="space-y-2 text-sm">
          <div><span className="text-slate-400">项目名称：</span><span className="text-white">{params.projectName || '未设置'}</span></div>
          <div><span className="text-slate-400">目标用户：</span><span className="text-white">{params.targetUser || '未设置'}</span></div>
          <div><span className="text-slate-400">核心痛点：</span><span className="text-white">{params.corePain || '未设置'}</span></div>
          <div><span className="text-slate-400">引流渠道：</span><span className="text-white">{params.drainageChannel || '未设置'}</span></div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? '⏳ 生成中...' : '📕 生成小红书笔记'}
        </button>

        {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}
      </div>

      {/* 生成结果 */}
      {result && (
        <div className="space-y-4">
          {result.notes?.map((note, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-2">{note.title}</h3>
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed mb-3">{note.content}</div>
              {note.hashtags && (
                <div className="flex gap-2 flex-wrap">
                  {note.hashtags.map((tag, i) => (
                    <span key={i} className="text-red-400 text-sm">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default XiaohongshuTool
