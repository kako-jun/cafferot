import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { websocketService } from '../../services/websocketService'
import type { Cafferot } from '../../types'

export const RealtimeGallery = () => {
  const [cafferots, setCafferots] = useState<Cafferot[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // WebSocket接続
    websocketService.connect()

    // 接続状態の監視
    const checkConnection = setInterval(() => {
      setConnected(websocketService.isConnected())
    }, 1000)

    // 新しいカフェロットを受信
    const handleNewCafferot = (cafferot: Cafferot) => {
      console.log('Received new cafferot:', cafferot)
      setCafferots(prev => [cafferot, ...prev])
    }

    websocketService.on('NEW_CAFFEROT', handleNewCafferot)

    return () => {
      clearInterval(checkConnection)
      websocketService.off('NEW_CAFFEROT', handleNewCafferot)
      websocketService.disconnect()
    }
  }, [])

  const handleTestPublish = () => {
    const testCafferot: Cafferot = {
      id: crypto.randomUUID(),
      name: 'テストカフェロット',
      imageData: '',
      createdAt: new Date().toISOString(),
      authorId: 'test-user',
      adoptionCount: 0,
      value: 0,
    }

    websocketService.publishCafferot(testCafferot)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* ヘッダー */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            リアルタイムギャラリー
          </h1>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 ${
                connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}
              />
              {connected ? 'Connected' : 'Disconnected'}
            </div>
            <button
              onClick={handleTestPublish}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              テスト投稿
            </button>
          </div>
        </div>

        {/* カフェロットグリッド */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {cafferots.map(cafferot => (
              <motion.div
                key={cafferot.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 p-4">
                  {cafferot.imageData ? (
                    <img
                      src={cafferot.imageData}
                      alt={cafferot.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-bold text-gray-800">
                    {cafferot.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>採用数: {cafferot.adoptionCount}</p>
                    <p>価値: {cafferot.value}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(cafferot.createdAt).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  <button className="mt-3 w-full rounded bg-purple-600 py-2 text-sm text-white hover:bg-purple-700">
                    採用する
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 空の状態 */}
        {cafferots.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-400">
            <p>まだカフェロットが投稿されていません</p>
          </div>
        )}
      </div>
    </div>
  )
}
