import { Outlet, Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '📰 资讯列表' },
  { path: '/plan', label: '🤖 方案生成器' },
  { path: '/toolkit', label: '🛠️ 工具箱' },
]

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            AI独立开发者变现平台
          </Link>
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-4 text-center text-slate-500 text-sm">
        AI独立开发者变现工具平台 MVP © 2026
      </footer>
    </div>
  )
}

export default Layout
