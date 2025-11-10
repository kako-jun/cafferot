import { useState } from 'react'
import { CafeView } from '../components/CafeView'
import Scoreboard from '../components/Scoreboard'
import ChatLog from '../components/ChatLog'
import PlayerStats from '../components/PlayerStats'
import NotificationPanel from '../components/NotificationPanel'
import { Mode } from '../types'

interface CafeScreenProps {
  isDark: boolean
  onToggleDark: () => void
  onNavigateToCafferots: () => void
}

function CafeScreen({ isDark, onToggleDark, onNavigateToCafferots }: CafeScreenProps) {
  const [mode, setMode] = useState<Mode>('edit')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // ダミーデータ
  const myCafe = {
    id: 'my-cafe',
    name: 'マイカフェ',
    level: 3,
    displayedCafferots: [],
  }

  const nearbyCafes = [
    { id: '1', name: 'カフェA', level: 2, displayedCafferots: [] },
    { id: '2', name: 'カフェB', level: 4, displayedCafferots: [] },
    { id: '3', name: 'カフェC', level: 1, displayedCafferots: [] },
    { id: '4', name: 'カフェD', level: 5, displayedCafferots: [] },
    { id: '5', name: 'カフェE', level: 3, displayedCafferots: [] },
    { id: '6', name: 'カフェF', level: 2, displayedCafferots: [] },
    { id: '7', name: 'カフェG', level: 4, displayedCafferots: [] },
    { id: '8', name: 'カフェH', level: 1, displayedCafferots: [] },
    { id: '9', name: 'カフェI', level: 3, displayedCafferots: [] },
    { id: '10', name: 'カフェJ', level: 2, displayedCafferots: [] },
    { id: '11', name: 'カフェK', level: 4, displayedCafferots: [] },
    { id: '12', name: 'カフェL', level: 3, displayedCafferots: [] },
    { id: '13', name: 'カフェM', level: 5, displayedCafferots: [] },
    { id: '14', name: 'カフェN', level: 2, displayedCafferots: [] },
    { id: '15', name: 'カフェO', level: 1, displayedCafferots: [] },
    { id: '16', name: 'カフェP', level: 4, displayedCafferots: [] },
  ]

  // スコアボード用のダミーデータ
  const playerScores = [
    { id: 'my-cafe', name: 'マイカフェ', level: 3, revenue: 5400, popularity: 3, isOwn: true },
    { id: '1', name: 'カフェA', level: 2, revenue: 3200, popularity: 2 },
    { id: '2', name: 'カフェB', level: 4, revenue: 7800, popularity: 4 },
    { id: '3', name: 'カフェC', level: 1, revenue: 1500, popularity: 1 },
    { id: '4', name: 'カフェD', level: 5, revenue: 9200, popularity: 5 },
    { id: '5', name: 'カフェE', level: 3, revenue: 4600, popularity: 3 },
    { id: '6', name: 'カフェF', level: 2, revenue: 2800, popularity: 2 },
    { id: '7', name: 'カフェG', level: 4, revenue: 6500, popularity: 4 },
    { id: '8', name: 'カフェH', level: 1, revenue: 1200, popularity: 1 },
  ]

  return (
    <div className={`flex h-screen flex-col ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <header
        className={`border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}
      >
        <div className="flex items-center justify-between px-6 py-2">
          <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Caffèrot
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAlertOpen(!isAlertOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded transition-colors relative ${
                isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="通知"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* 未読バッジ */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={onToggleDark}
              className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
                isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => {}}
              className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
                isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Settings"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <CafeView
          myCafe={myCafe}
          nearbyCafes={nearbyCafes}
          isDark={isDark}
          onCafeClick={(cafe) => {
            console.log('Clicked cafe:', cafe.name)
          }}
          onNavigateToCafferots={onNavigateToCafferots}
        />
      </main>

      {/* プレイヤーステータス（左上） */}
      <PlayerStats
        cafeName="マイカフェ"
        level={3}
        revenue={5400}
        revenuePerSecond={12}
        popularity={3}
        cafferotCount={0}
        isDark={isDark}
      />

      {/* チャットログ（左下） */}
      <ChatLog isDark={isDark} />

      {/* スコアボード（右下） */}
      <Scoreboard players={playerScores} isDark={isDark} />

      {/* 通知パネル */}
      <NotificationPanel isDark={isDark} isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  )
}

export default CafeScreen
