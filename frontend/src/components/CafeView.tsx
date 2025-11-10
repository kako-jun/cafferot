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

  // 放射状の配置を計算（中心から外側へ）
  const positions = [
    { x: 50, y: 50 }, // 中心: 自分のカフェ
    // 内側の円（近い）
    { x: 30, y: 30 },
    { x: 70, y: 30 },
    { x: 30, y: 70 },
    { x: 70, y: 70 },
    // 外側の円（遠い）
    { x: 15, y: 15 },
    { x: 85, y: 15 },
    { x: 15, y: 85 },
    { x: 85, y: 85 },
    { x: 50, y: 10 },
    { x: 50, y: 90 },
    { x: 10, y: 50 },
    { x: 90, y: 50 },
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
          transition: isPanning ? 'none' : 'transform 0.1s ease-out',
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
          onClick={() => onCafeClick?.(myCafe)}
        >
          {/* カフェ本体 */}
          <div
            className={`w-32 h-32 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 ${
              isDark
                ? 'bg-gradient-to-br from-blue-900 to-blue-700 border-blue-500'
                : 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-800'
            }`}
          >
            <div className="text-3xl mb-1">☕</div>
            <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-amber-900'}`}>
              {myCafe.name}
            </div>
            <div className={`text-xs ${isDark ? 'text-blue-200' : 'text-amber-800'}`}>
              Lv.{myCafe.level}
            </div>
          </div>

          {/* ホバー時の詳細 */}
          {hoveredCafe === myCafe.id && (
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
              onClick={() => onCafeClick?.(cafe)}
            >
              {/* カフェ本体 */}
              <div
                className={`${size} rounded-full shadow-lg flex flex-col items-center justify-center border-2 ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500'
                    : 'bg-gradient-to-br from-orange-300 to-orange-500 border-orange-700'
                }`}
              >
                <div className={distance < 30 ? 'text-2xl' : 'text-xl'}>🏪</div>
                <div className={`text-xs font-semibold truncate max-w-full px-1 ${isDark ? 'text-gray-200' : 'text-orange-900'}`}>
                  {cafe.name}
                </div>
              </div>

              {/* ホバー時の詳細 */}
              {hoveredCafe === cafe.id && (
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
