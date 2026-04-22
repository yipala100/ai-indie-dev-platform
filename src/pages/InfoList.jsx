import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function InfoList() {
  const [infoList, setInfoList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const res = await import('../assets/data/info.json')
        setInfoList(res.default)
      } catch (err) {
        console.error('加载资讯数据失败:', err)
        setInfoList([])
      } finally {
        setLoading(false)
      }
    }
    loadInfo()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400 text-lg">加载中...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🔥 独立开发者变现资讯</h1>
        <p className="text-slate-400">精选AI时代独立开发者可落地的变现机会，每条都带变现路径</p>
      </div>

      <div className="grid gap-4">
        {infoList.map((item) => (
          <Link
            key={item.id}
            to={`/info/${item.id}`}
            className="block bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{item.highlight}</p>
                <div className="flex gap-2 flex-wrap">
                  {item.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-slate-500 text-sm whitespace-nowrap">{item.createTime}</span>
            </div>
          </Link>
        ))}
      </div>

      {infoList.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          暂无资讯数据，请等待内容录入
        </div>
      )}
    </div>
  )
}

export default InfoList
