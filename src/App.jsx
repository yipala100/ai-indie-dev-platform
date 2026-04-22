import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import InfoList from './pages/InfoList'
import InfoDetail from './pages/InfoDetail'
import PlanGenerator from './pages/PlanGenerator'
import Toolkit from './pages/Toolkit/index'
import XiaohongshuTool from './pages/Toolkit/XiaohongshuTool'
import LandingPageTool from './pages/Toolkit/LandingPageTool'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<InfoList />} />
        <Route path="info/:id" element={<InfoDetail />} />
        <Route path="plan" element={<PlanGenerator />} />
        <Route path="toolkit" element={<Toolkit />} />
        <Route path="toolkit/xiaohongshu" element={<XiaohongshuTool />} />
        <Route path="toolkit/landing-page" element={<LandingPageTool />} />
      </Route>
    </Routes>
  )
}

export default App
