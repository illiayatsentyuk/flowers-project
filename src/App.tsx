import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { FlowersPage } from './pages/FlowersPage'
import { GalleryPage } from './pages/GalleryPage'
import { KaleidoscopePage } from './pages/KaleidoscopePage'

export function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flowers" element={<FlowersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/kaleidoscope" element={<KaleidoscopePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  )
}

