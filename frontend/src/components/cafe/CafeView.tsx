import { motion } from 'framer-motion'
import type { Cafe, Cafferot } from '../../types'

interface CafeViewProps {
  cafe: Cafe
}

export const CafeView = ({ cafe }: CafeViewProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-amber-100 to-orange-50">
      {/* 展示壁（上部固定） */}
      <div className="absolute left-0 top-0 h-32 w-full border-b-4 border-amber-800 bg-gradient-to-b from-amber-200 to-amber-100">
        <div className="flex h-full items-center justify-center gap-6 p-4">
          {cafe.displayedCafferots.length > 0 ? (
            cafe.displayedCafferots.map(cafferot => (
              <CafferotFrame key={cafferot.id} cafferot={cafferot} />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              カフェロットを展示してください
            </p>
          )}
        </div>
      </div>

      {/* カフェ内部 */}
      <div className="absolute left-0 top-32 h-[calc(100%-8rem)] w-full p-8">
        <div className="flex h-full items-end gap-8">
          {/* カウンター */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-48 w-72 rounded-t-xl bg-gradient-to-b from-amber-700 to-amber-900 p-4 shadow-2xl"
          >
            <div className="flex h-full flex-col justify-between text-white">
              <h3 className="text-lg font-bold">☕ {cafe.name}</h3>
              <div className="text-sm">
                <p>レベル: {cafe.level}</p>
                <p>展示中: {cafe.displayedCafferots.length}</p>
              </div>
            </div>
          </motion.div>

          {/* テーブルエリア */}
          <div className="flex flex-1 flex-wrap items-end justify-start gap-6">
            <Table />
            <Table />
            <Table />
          </div>
        </div>
      </div>

      {/* ステータス表示（右下） */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-white/90 p-4 shadow-lg">
        <h4 className="mb-2 font-bold">カフェステータス</h4>
        <div className="space-y-1 text-sm">
          <p>売上: 準備中</p>
          <p>来店頻度: 準備中</p>
          <p>常連客: 準備中</p>
        </div>
      </div>
    </div>
  )
}

// カフェロットフレームコンポーネント
const CafferotFrame = ({ cafferot }: { cafferot: Cafferot }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex h-20 w-20 items-center justify-center rounded border-4 border-amber-600 bg-white shadow-lg"
    >
      {cafferot.imageData ? (
        <img
          src={cafferot.imageData}
          alt={cafferot.name}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="text-center text-xs text-gray-400">
          {cafferot.name}
        </div>
      )}
    </motion.div>
  )
}

// テーブルコンポーネント
const Table = () => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 w-24 rounded-lg bg-amber-600 shadow-md"
    />
  )
}
