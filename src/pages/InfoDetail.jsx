import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function InfoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const res = await import('../assets/data/info.json')
        const found = res.default.find((item) => item.id === id)
        setInfo(found || null)
      } catch (err) {
        console.error('加载资讯详情失败:', err)
      }
    }
    loadInfo()
  }, [id])

  const handleGeneratePlan = () => {
    if (!info) return
    // 将资讯参数传递给方案生成器（通过 localStorage）
    localStorage.setItem('infoTitle', info.title)
    localStorage.setItem('infoContent', info.content)
    localStorage.setItem('infoTags', JSON.stringify(info.tags))
    navigate('/plan')
  }

  if (!info) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400 text-lg">资讯不存在或加载中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-slate-400 hover:text-white mb-6 flex items-center gap-1 transition-colors"
      >
        ← 返回列表
      </button>

      <article className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-4">{info.title}</h1>

        <div className="flex gap-2 mb-4 flex-wrap">
          {info.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-6">
          <p className="text-indigo-200 text-sm font-medium">💡 变现亮点：{info.highlight}</p>
        </div>

        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap mb-8">
          {info.content}
        </div>

        <p className="text-slate-500 text-sm mb-6">发布时间：{info.createTime}</p>

        <button
          onClick={handleGeneratePlan}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          🤖 基于此资讯生成变现方案
        </button>
      </article>
    </div>
  )
}

export default InfoDetail
