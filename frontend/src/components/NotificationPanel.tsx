import { useState } from 'react'

interface Notification {
  id: string
  type: 'cafferot_adopted' | 'level_up' | 'visitor' | 'new_cafferot'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
}

interface NotificationPanelProps {
  isDark: boolean
  isOpen: boolean
  onClose: () => void
}

function NotificationPanel({ isDark, isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'cafferot_adopted',
      title: 'カフェロットが採用されました',
      message: 'カフェBがあなたの「コーヒーくん」を採用しました',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
    },
    {
      id: '2',
      type: 'level_up',
      title: 'レベルアップ！',
      message: 'カフェレベルが3に上がりました',
      timestamp: new Date(Date.now() - 600000),
      isRead: false,
    },
    {
      id: '3',
      type: 'visitor',
      title: '来店通知',
      message: 'カフェAがあなたのカフェを訪れました',
      timestamp: new Date(Date.now() - 900000),
      isRead: true,
    },
    {
      id: '4',
      type: 'new_cafferot',
      title: '新着カフェロット',
      message: 'カフェDが新しいカフェロットを投稿しました',
      timestamp: new Date(Date.now() - 1200000),
      isRead: true,
    },
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'cafferot_adopted':
        return '💰'
      case 'level_up':
        return '⬆️'
      case 'visitor':
        return '👋'
      case 'new_cafferot':
        return '🆕'
      default:
        return '📢'
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return `${diff}秒前`
    if (diff < 3600) return `${Math.floor(diff / 60)}分前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`
    return `${Math.floor(diff / 86400)}日前`
  }

  if (!isOpen) return null

  return (
    <>
      {/* 背景オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* 通知パネル */}
      <div
        className={`fixed top-16 right-4 w-96 max-h-[80vh] rounded-lg shadow-2xl z-50 overflow-hidden ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}
      >
        {/* ヘッダ */}
        <div
          className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              通知
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  isDark
                    ? 'text-blue-400 hover:bg-gray-700'
                    : 'text-blue-600 hover:bg-gray-100'
                }`}
              >
                すべて既読
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-1 rounded transition-colors ${
                isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 通知一覧 */}
        <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
          {notifications.length === 0 ? (
            <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="text-4xl mb-2">🔔</div>
              <div className="text-sm">通知はありません</div>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                  notification.isRead
                    ? isDark
                      ? 'border-gray-700 hover:bg-gray-700/50'
                      : 'border-gray-100 hover:bg-gray-50'
                    : isDark
                      ? 'bg-blue-900/20 border-gray-700 hover:bg-blue-900/30'
                      : 'bg-blue-50 border-gray-100 hover:bg-blue-100'
                }`}
              >
                <div className="flex gap-3">
                  <div className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4
                        className={`font-semibold text-sm ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p
                      className={`text-xs mb-1 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {notification.message}
                    </p>
                    <div
                      className={`text-xs ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    >
                      {getRelativeTime(notification.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default NotificationPanel
