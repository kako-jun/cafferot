import { motion } from 'framer-motion'
import { Cafe } from '../types'

interface CafeDetailScreenProps {
  cafe: Cafe
  isDark: boolean
  isOwn: boolean
  onClose: () => void
}

function CafeDetailScreen({ cafe, isDark, isOwn, onClose }: CafeDetailScreenProps) {
  return (
    <motion.div
      className={`w-full h-screen flex items-center justify-center ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-full h-full max-w-[600px] max-h-[500px] flex flex-col p-8 rounded-lg shadow-2xl border-4 ${
          isDark
            ? isOwn
              ? 'bg-gradient-to-br from-blue-900 to-blue-700 border-blue-500'
              : 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500'
            : isOwn
              ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-800'
              : 'bg-gradient-to-br from-orange-300 to-orange-500 border-orange-700'
        }`}
        initial={{ scale: 0.5, borderRadius: '50%' }}
        animate={{ scale: 1, borderRadius: '0.5rem' }}
        exit={{ scale: 0.5, borderRadius: '50%' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className={`text-lg font-bold ${isDark ? 'text-white' : isOwn ? 'text-amber-900' : 'text-orange-900'}`}>
              {isOwn ? '☕' : '🏪'} {cafe.name}
            </div>
            <div className={`text-sm ${isDark ? isOwn ? 'text-blue-200' : 'text-gray-300' : isOwn ? 'text-amber-800' : 'text-orange-800'}`}>
              Lv.{cafe.level} {isOwn && '- あなたのカフェ'}
            </div>
          </div>
          <button
            className={`px-3 py-1 text-sm rounded ${
              isDark
                ? 'bg-gray-600 hover:bg-gray-500 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-white'
            }`}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* カウンターメニュー（10体展示） */}
        <div className="flex-1 flex flex-col justify-center">
          <div className={`text-xs mb-2 ${isDark ? 'text-gray-400' : isOwn ? 'text-amber-700' : 'text-orange-700'}`}>
            カウンターメニュー
          </div>

          {/* 横長: 上段5体 + 下段5体 */}
          <div className="hidden landscape:block">
            <div className="flex gap-2 mb-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`top-${i}`}
                  className={`w-14 h-14 rounded border-2 ${
                    isDark
                      ? isOwn
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-600 border-gray-500'
                      : isOwn
                        ? 'bg-amber-200 border-amber-700'
                        : 'bg-orange-200 border-orange-600'
                  } flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer`}
                >
                  {i < cafe.displayedCafferots.length ? '🖼️' : ''}
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className={`w-14 h-14 rounded border-2 ${
                    isDark
                      ? isOwn
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-600 border-gray-500'
                      : isOwn
                        ? 'bg-amber-200 border-amber-700'
                        : 'bg-orange-200 border-orange-600'
                  } flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer`}
                >
                  {i + 5 < cafe.displayedCafferots.length ? '🖼️' : ''}
                </div>
              ))}
            </div>
          </div>

          {/* 縦長: 左列5体 + 右列5体 */}
          <div className="landscape:hidden flex gap-2 justify-center">
            <div className="flex flex-col gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`left-${i}`}
                  className={`w-14 h-14 rounded border-2 ${
                    isDark
                      ? isOwn
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-600 border-gray-500'
                      : isOwn
                        ? 'bg-amber-200 border-amber-700'
                        : 'bg-orange-200 border-orange-600'
                  } flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer`}
                >
                  {i < cafe.displayedCafferots.length ? '🖼️' : ''}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`right-${i}`}
                  className={`w-14 h-14 rounded border-2 ${
                    isDark
                      ? isOwn
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-600 border-gray-500'
                      : isOwn
                        ? 'bg-amber-200 border-amber-700'
                        : 'bg-orange-200 border-orange-600'
                  } flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer`}
                >
                  {i + 5 < cafe.displayedCafferots.length ? '🖼️' : ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* フッター: アクションボタン */}
        <div className="mt-4 flex landscape:flex-row portrait:flex-col gap-2 justify-center">
          {isOwn ? (
            <button
              className={`px-4 py-2 text-sm rounded ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
              onClick={() => {
                // TODO: 編集画面へ
              }}
            >
              メニュー編集
            </button>
          ) : (
            <>
              <button
                className={`px-4 py-2 text-sm rounded ${
                  isDark
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-green-600 hover:bg-green-500 text-white'
                }`}
                onClick={() => {
                  // TODO: 採用処理
                }}
              >
                採用する
              </button>
              <button
                className={`px-4 py-2 text-sm rounded ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
                onClick={() => {
                  // TODO: 訪問処理
                }}
              >
                訪問
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CafeDetailScreen
