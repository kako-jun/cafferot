import { useState } from 'react'
import { RealtimeGallery } from './components/community/RealtimeGallery'
import { CafeView } from './components/cafe/CafeView'
import type { Cafe } from './types'

type ViewMode = 'gallery' | 'cafe'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('cafe')

  // モックカフェデータ（後でLocalStorageから取得）
  const mockCafe: Cafe = {
    id: 'cafe-001',
    ownerId: 'user-001',
    name: 'マイカフェ',
    level: 1,
    displayedCafferots: [],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション */}
      <nav className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="flex items-center justify-between px-3 py-3 sm:px-4">
          <h1 className="text-lg font-bold text-purple-600 sm:text-xl md:text-2xl">
            Caffèrot
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('gallery')}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
                viewMode === 'gallery'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ギャラリー
            </button>
            <button
              onClick={() => setViewMode('cafe')}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
                viewMode === 'cafe'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              マイカフェ
            </button>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="pt-16">
        {viewMode === 'gallery' ? (
          <RealtimeGallery />
        ) : (
          <CafeView cafe={mockCafe} />
        )}
      </main>
    </div>
  )
}

export default App
