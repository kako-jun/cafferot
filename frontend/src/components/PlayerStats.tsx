interface PlayerStatsProps {
  cafeName: string
  level: number
  revenue: number
  revenuePerSecond: number
  popularity: number
  cafferotCount: number
  isDark: boolean
}

function PlayerStats({
  cafeName,
  level,
  revenue,
  revenuePerSecond,
  popularity,
  cafferotCount,
  isDark,
}: PlayerStatsProps) {
  return (
    <div className="fixed top-16 left-4 z-50">
      <div className="rounded-lg backdrop-blur-sm p-4 min-w-64">
        {/* カフェ名 */}
        <div className="mb-3">
          <h2
            className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            ☕ {cafeName}
          </h2>
          <div
            className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Level {level}
          </div>
        </div>

        {/* 売上（大きく表示） */}
        <div className="mb-2">
          <div
            className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            総売上
          </div>
          <div
            className={`text-2xl font-bold ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}
          >
            ¥{revenue.toLocaleString()}
          </div>
        </div>

        {/* 稼ぐ速度 */}
        <div className="mb-3">
          <div
            className={`text-sm ${
              isDark ? 'text-green-300' : 'text-green-700'
            }`}
          >
            +¥{revenuePerSecond.toLocaleString()}/秒
          </div>
        </div>

        {/* その他の情報 */}
        <div
          className={`space-y-1 text-xs ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          <div className="flex justify-between">
            <span>人気度:</span>
            <span className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>
              {'★'.repeat(popularity)}
              {'☆'.repeat(5 - popularity)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>展示中:</span>
            <span className="font-semibold">{cafferotCount}体</span>
          </div>
        </div>

        {/* 経験値バー（オプション） */}
        <div className="mt-3">
          <div
            className={`text-xs mb-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            経験値
          </div>
          <div
            className={`h-2 rounded-full overflow-hidden ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <div
              className={`h-full transition-all duration-300 ${
                isDark ? 'bg-blue-500' : 'bg-blue-600'
              }`}
              style={{ width: '65%' }}
            />
          </div>
          <div
            className={`text-xs mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            650/1000 EXP
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerStats
