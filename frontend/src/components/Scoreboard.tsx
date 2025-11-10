interface PlayerScore {
  id: string
  name: string
  level: number
  revenue: number
  popularity: number
  isOwn?: boolean
}

interface ScoreboardProps {
  players: PlayerScore[]
  isDark: boolean
}

function Scoreboard({ players, isDark }: ScoreboardProps) {
  // スコア順にソート
  const sortedPlayers = [...players].sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-lg backdrop-blur-sm">
        {/* スコア一覧 */}
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-gray-600 text-gray-400'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                <th className="px-3 py-2 text-left font-semibold">順位</th>
                <th className="px-3 py-2 text-left font-semibold">プレイヤー</th>
                <th className="px-3 py-2 text-right font-semibold">Lv</th>
                <th className="px-3 py-2 text-right font-semibold">売上</th>
                <th className="px-3 py-2 text-right font-semibold">人気</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr
                  key={player.id}
                  className={`border-b transition-colors ${
                    player.isOwn
                      ? isDark
                        ? 'bg-blue-900/20 border-blue-700/50'
                        : 'bg-blue-100/30 border-blue-300/50'
                      : isDark
                        ? 'border-gray-600/50 hover:bg-gray-700/20'
                        : 'border-gray-300/50 hover:bg-gray-100/30'
                  }`}
                >
                  <td
                    className={`px-3 py-2 font-bold ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                          ? 'text-gray-400'
                          : index === 2
                            ? 'text-orange-600'
                            : isDark
                              ? 'text-gray-400'
                              : 'text-gray-600'
                    }`}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                  </td>
                  <td
                    className={`px-3 py-2 font-medium ${
                      player.isOwn
                        ? isDark
                          ? 'text-blue-300'
                          : 'text-blue-700'
                        : isDark
                          ? 'text-gray-200'
                          : 'text-gray-900'
                    }`}
                  >
                    {player.name}
                    {player.isOwn && (
                      <span className="ml-1 text-xs opacity-70">(You)</span>
                    )}
                  </td>
                  <td
                    className={`px-3 py-2 text-right ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {player.level}
                  </td>
                  <td
                    className={`px-3 py-2 text-right font-semibold ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    ¥{player.revenue.toLocaleString()}
                  </td>
                  <td
                    className={`px-3 py-2 text-right ${
                      isDark ? 'text-yellow-400' : 'text-yellow-600'
                    }`}
                  >
                    {'★'.repeat(Math.min(player.popularity, 5))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
