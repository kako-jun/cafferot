import { useState, useRef, useEffect } from 'react'
import type { Cafe } from '../types'

interface CafeViewProps {
  myCafe: Cafe
  nearbyCafes: Cafe[]
  isDark: boolean
  onCafeClick?: (cafe: Cafe) => void
  onNavigateToCafferots?: () => void
}

export function CafeView({ myCafe, nearbyCafes, isDark, onCafeClick, onNavigateToCafferots }: CafeViewProps) {
  const [hoveredCafe, setHoveredCafe] = useState<string | null>(null)
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // ホイールでズーム
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const delta = e.deltaY * -0.001
      const newZoom = Math.min(Math.max(0.5, viewport.zoom + delta), 3)

      setViewport(prev => ({ ...prev, zoom: newZoom }))
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [viewport.zoom])

  // マウスドラッグでパン
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // 左クリックのみ
    setIsPanning(true)
    setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return
    setViewport(prev => ({
      ...prev,
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    }))
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  const handleMouseLeave = () => {
    setIsPanning(false)
  }

  // カフェクリック時の自動ズーム
  const handleCafeClick = (cafe: Cafe, positionIndex: number) => {
    if (selectedCafe?.id === cafe.id) {
      // 同じカフェをクリック → ズームアウト
      setSelectedCafe(null)
      setViewport({ x: 0, y: 0, zoom: 1 })
      return
    }

    const container = containerRef.current
    if (!container) return

    const pos = positions[positionIndex]
    const targetZoom = 2.8

    // カフェの位置を画面中央に持ってくる計算
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const cafeScreenX = (pos.x / 100) * containerWidth
    const cafeScreenY = (pos.y / 100) * containerHeight

    const targetX = containerWidth / 2 - cafeScreenX * targetZoom
    const targetY = containerHeight / 2 - cafeScreenY * targetZoom

    setSelectedCafe(cafe)
    setViewport({ x: targetX, y: targetY, zoom: targetZoom })
    onCafeClick?.(cafe)
  }

  // ESCキーでズームアウト
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCafe) {
        setSelectedCafe(null)
        setViewport({ x: 0, y: 0, zoom: 1 })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCafe])

  // 放射状の配置を計算（中心から外側へ、上下左右も含む）
  const positions = [
    { x: 50, y: 50 }, // 中心: 自分のカフェ
    // 内側の円（近い）- 斜め4方向
    { x: 30, y: 30 },
    { x: 70, y: 30 },
    { x: 30, y: 70 },
    { x: 70, y: 70 },
    // 内側の円（近い）- 上下左右4方向
    { x: 50, y: 30 }, // 上
    { x: 50, y: 70 }, // 下
    { x: 30, y: 50 }, // 左
    { x: 70, y: 50 }, // 右
    // 外側の円（遠い）- 斜め4方向
    { x: 15, y: 15 },
    { x: 85, y: 15 },
    { x: 15, y: 85 },
    { x: 85, y: 85 },
    // 外側の円（遠い）- 上下左右4方向
    { x: 50, y: 10 }, // 上
    { x: 50, y: 90 }, // 下
    { x: 10, y: 50 }, // 左
    { x: 90, y: 50 }, // 右
  ]

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* 背景 */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-radial from-gray-700 via-gray-800 to-gray-900'
            : 'bg-gradient-radial from-amber-50 via-orange-50 to-orange-100'
        }`}
      />

      {/* 右上: カフェロット一覧ボタン + ズーム表示 */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {onNavigateToCafferots && (
          <button
            onClick={onNavigateToCafferots}
            className={`w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition-colors ${
              isDark
                ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            } border cursor-pointer`}
            title="カフェロット一覧"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        )}
        <button
          onClick={() => setViewport({ x: 0, y: 0, zoom: 1 })}
          className={`px-4 py-2 rounded-lg shadow-lg text-sm transition-colors ${
            isDark
              ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          } border cursor-pointer`}
          title="クリックして100%にリセット"
        >
          {Math.round(viewport.zoom * 100)}%
        </button>
      </div>

      {/* パン・ズーム可能なコンテンツ */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: '0 0',
          transition: isPanning ? 'none' : selectedCafe ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.1s ease-out',
        }}
      >
        {/* グリッド線（オプション） */}
        <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, ${isDark ? '#ffffff' : '#000000'} 20%, ${isDark ? '#ffffff' : '#000000'} 21%, transparent 21%),
                           radial-gradient(circle at 50% 50%, transparent 0%, transparent 40%, ${isDark ? '#ffffff' : '#000000'} 40%, ${isDark ? '#ffffff' : '#000000'} 41%, transparent 41%),
                           radial-gradient(circle at 50% 50%, transparent 0%, transparent 60%, ${isDark ? '#ffffff' : '#000000'} 60%, ${isDark ? '#ffffff' : '#000000'} 61%, transparent 61%)`,
        }}></div>
      </div>

      {/* 接続線（自分のカフェから近隣カフェへ） */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nearbyCafes.slice(0, positions.length - 1).map((cafe, index) => (
          <line
            key={`line-${cafe.id}`}
            x1="50%"
            y1="50%"
            x2={`${positions[index + 1].x}%`}
            y2={`${positions[index + 1].y}%`}
            stroke={isDark ? '#4B5563' : '#D97706'}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
          />
        ))}
      </svg>

      {/* 自分のカフェ（中心） */}
      <div
        className="absolute"
        style={{
          left: `${positions[0].x}%`,
          top: `${positions[0].y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`relative cursor-pointer transition-transform hover:scale-110 ${
            hoveredCafe === myCafe.id ? 'z-20' : 'z-10'
          }`}
          onMouseEnter={() => setHoveredCafe(myCafe.id)}
          onMouseLeave={() => setHoveredCafe(null)}
          onClick={(e) => {
            e.stopPropagation()
            handleCafeClick(myCafe, 0)
          }}
        >
          {/* カフェ本体 */}
          <div
            className={`w-32 h-32 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 ${
              isDark
                ? 'bg-gradient-to-br from-blue-900 to-blue-700 border-blue-500'
                : 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-800'
            }`}
          >
            {/* ズームしていない時の表示 */}
            {viewport.zoom < 2 && (
              <>
                <div className="text-3xl mb-1">☕</div>
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-amber-900'}`}>
                  {myCafe.name}
                </div>
                <div className={`text-xs ${isDark ? 'text-blue-200' : 'text-amber-800'}`}>
                  Lv.{myCafe.level}
                </div>
              </>
            )}

            {/* ズーム時の詳細表示 */}
            {viewport.zoom >= 2 && selectedCafe?.id === myCafe.id && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                {/* 展示カフェロット */}
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded border ${
                        isDark ? 'bg-gray-700 border-gray-600' : 'bg-amber-300 border-amber-700'
                      } flex items-center justify-center text-xs`}
                    >
                      {i < myCafe.displayedCafferots.length ? '🖼️' : ''}
                    </div>
                  ))}
                </div>

                {/* カフェ名とレベル */}
                <div className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-amber-900'}`}>
                  ☕ {myCafe.name}
                </div>
                <div className={`text-xs mb-2 ${isDark ? 'text-blue-200' : 'text-amber-800'}`}>
                  Lv.{myCafe.level}
                </div>

                {/* 統計情報 */}
                <div className={`text-xs space-y-0.5 ${isDark ? 'text-white' : 'text-amber-900'}`}>
                  <div>あなたのカフェ</div>
                  <div>展示中: {myCafe.displayedCafferots.length}体</div>
                </div>

                {/* アクションボタン */}
                <div className="mt-2 flex gap-1">
                  <button
                    className={`px-2 py-1 text-xs rounded ${
                      isDark
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'bg-amber-600 hover:bg-amber-500 text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      // TODO: 編集画面へ
                    }}
                  >
                    編集
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded ${
                      isDark
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-gray-600 hover:bg-gray-500 text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCafe(null)
                      setViewport({ x: 0, y: 0, zoom: 1 })
                    }}
                  >
                    戻る
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ホバー時の詳細 (ズームしていない時のみ) */}
          {hoveredCafe === myCafe.id && viewport.zoom < 2 && (
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-3 rounded-lg shadow-xl z-30 ${
                isDark ? 'bg-gray-800 border border-gray-600 text-gray-200' : 'bg-white border border-gray-300 text-gray-900'
              }`}
            >
              <div className="font-semibold text-sm mb-2">{myCafe.name} (あなたのカフェ)</div>
              <div className="text-xs space-y-1">
                <div>レベル: {myCafe.level}</div>
                <div>展示中: {myCafe.displayedCafferots.length}体</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 近隣のカフェ（放射状配置） */}
      {nearbyCafes.slice(0, positions.length - 1).map((cafe, index) => {
        const pos = positions[index + 1]
        const distance = Math.sqrt(Math.pow(pos.x - 50, 2) + Math.pow(pos.y - 50, 2))
        const size = distance < 30 ? 'w-24 h-24' : 'w-20 h-20' // 距離に応じてサイズ変更

        return (
          <div
            key={cafe.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`relative cursor-pointer transition-all hover:scale-110 ${
                hoveredCafe === cafe.id ? 'z-20' : ''
              }`}
              onMouseEnter={() => setHoveredCafe(cafe.id)}
              onMouseLeave={() => setHoveredCafe(null)}
              onClick={(e) => {
                e.stopPropagation()
                handleCafeClick(cafe, index + 1)
              }}
            >
              {/* カフェ本体 */}
              <div
                className={`${size} rounded-full shadow-lg flex flex-col items-center justify-center border-2 ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500'
                    : 'bg-gradient-to-br from-orange-300 to-orange-500 border-orange-700'
                }`}
              >
                {/* ズームしていない時の表示 */}
                {viewport.zoom < 2 && (
                  <>
                    <div className={distance < 30 ? 'text-2xl' : 'text-xl'}>🏪</div>
                    <div className={`text-xs font-semibold truncate max-w-full px-1 ${isDark ? 'text-gray-200' : 'text-orange-900'}`}>
                      {cafe.name}
                    </div>
                  </>
                )}

                {/* ズーム時の詳細表示 */}
                {viewport.zoom >= 2 && selectedCafe?.id === cafe.id && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2">
                    {/* 展示カフェロット */}
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded border ${
                            isDark ? 'bg-gray-600 border-gray-500' : 'bg-orange-200 border-orange-600'
                          } flex items-center justify-center text-xs`}
                        >
                          {i < cafe.displayedCafferots.length ? '🖼️' : ''}
                        </div>
                      ))}
                    </div>

                    {/* カフェ名とレベル */}
                    <div className={`text-xs font-bold mb-0.5 ${isDark ? 'text-white' : 'text-orange-900'}`}>
                      🏪 {cafe.name}
                    </div>
                    <div className={`text-xs mb-1 ${isDark ? 'text-gray-300' : 'text-orange-800'}`}>
                      Lv.{cafe.level}
                    </div>

                    {/* 統計情報 */}
                    <div className={`text-xs space-y-0.5 ${isDark ? 'text-white' : 'text-orange-900'}`}>
                      <div>展示中: {cafe.displayedCafferots.length}体</div>
                    </div>

                    {/* アクションボタン */}
                    <div className="mt-1 flex gap-1">
                      <button
                        className={`px-2 py-0.5 text-xs rounded ${
                          isDark
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-green-600 hover:bg-green-500 text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: 採用処理
                        }}
                      >
                        採用
                      </button>
                      <button
                        className={`px-2 py-0.5 text-xs rounded ${
                          isDark
                            ? 'bg-blue-600 hover:bg-blue-500 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: 訪問処理
                        }}
                      >
                        訪問
                      </button>
                      <button
                        className={`px-2 py-0.5 text-xs rounded ${
                          isDark
                            ? 'bg-gray-600 hover:bg-gray-500 text-white'
                            : 'bg-gray-600 hover:bg-gray-500 text-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCafe(null)
                          setViewport({ x: 0, y: 0, zoom: 1 })
                        }}
                      >
                        戻る
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ホバー時の詳細 (ズームしていない時のみ) */}
              {hoveredCafe === cafe.id && viewport.zoom < 2 && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 p-3 rounded-lg shadow-xl z-30 ${
                    isDark ? 'bg-gray-800 border border-gray-600 text-gray-200' : 'bg-white border border-gray-300 text-gray-900'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{cafe.name}</div>
                  <div className="text-xs space-y-1">
                    <div>レベル: {cafe.level}</div>
                    <div>展示中: {cafe.displayedCafferots.length}体</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}
