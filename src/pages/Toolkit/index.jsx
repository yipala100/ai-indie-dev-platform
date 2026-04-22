import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const tools = [
  {
    id: 'xiaohongshu',
    title: '📕 小红书笔记生成器',
    desc: '基于变现方案，自动生成适配小红书的引流笔记',
    path: '/toolkit/xiaohongshu',
  },
  {
    id: 'landing-page',
    title: '🌐 落地页生成器',
    desc: '一键生成MVP产品落地页HTML代码，零门槛上线',
    path: '/toolkit/landing-page',
  },
]

function Toolkit() {
  const [params, setParams] = useState({})

  useEffect(() => {
    setParams({
      projectName: localStorage.getItem('projectName') || '',
      targetUser: localStorage.getItem('targetUser') || '',
      corePain: localStorage.getItem('corePain') || '',
      drainageChannel: localStorage.getItem('drainageChannel') || '',
      projectDesc: localStorage.getItem('projectDesc') || '',
    })
  }, [])

  const hasParams = params.projectName && params.targetUser

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">🛠️ 需求验证工具箱</h1>
      <p className="text-slate-400 mb-8">使用AI工具快速验证你的变现方案</p>

      {/* 当前方案参数 */}
      {hasParams ? (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">📌 当前方案参数</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-slate-400">项目名称：</span><span className="text-white">{params.projectName}</span></div>
            <div><span className="text-slate-400">目标用户：</span><span className="text-white">{params.targetUser}</span></div>
            <div><span className="text-slate-400">核心痛点：</span><span className="text-white">{params.corePain}</span></div>
            <div><span className="text-slate-400">引流渠道：</span><span className="text-white">{params.drainageChannel}</span></div>
            <div className="col-span-2"><span className="text-slate-400">项目描述：</span><span className="text-white">{params.projectDesc}</span></div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 text-yellow-200 text-sm">
          ⚠️ 尚未生成方案，请先从资讯列表选择资讯并生成变现方案
        </div>
      )}

      {/* 工具列表 */}
      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="block bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
            <p className="text-slate-400 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Toolkit
