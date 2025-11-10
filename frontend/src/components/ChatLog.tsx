import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: string
  type: 'system' | 'player' | 'achievement' | 'trade'
  playerName?: string
  message: string
  timestamp: Date
}

interface ChatLogProps {
  isDark: boolean
}

function ChatLog({ isDark }: ChatLogProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      message: 'ようこそCaffèrotへ！',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      type: 'player',
      playerName: 'カフェA',
      message: 'こんにちは！',
      timestamp: new Date(Date.now() - 50000),
    },
    {
      id: '3',
      type: 'achievement',
      message: 'カフェレベルが3に上がりました！',
      timestamp: new Date(Date.now() - 40000),
    },
    {
      id: '4',
      type: 'trade',
      message: 'カフェBがあなたのカフェロットを採用しました',
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: '5',
      type: 'player',
      playerName: 'カフェD',
      message: '素敵なカフェですね！',
      timestamp: new Date(Date.now() - 20000),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Enterキーでメッセージ送信
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'player',
        playerName: 'あなた',
        message: inputValue.trim(),
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputValue('')
    }
  }

  // メッセージの色分け
  const getMessageColor = (type: ChatMessage['type']) => {
    if (isDark) {
      switch (type) {
        case 'system':
          return 'text-yellow-400'
        case 'achievement':
          return 'text-green-400'
        case 'trade':
          return 'text-blue-400'
        case 'player':
          return 'text-white'
        default:
          return 'text-gray-300'
      }
    } else {
      switch (type) {
        case 'system':
          return 'text-yellow-700'
        case 'achievement':
          return 'text-green-700'
        case 'trade':
          return 'text-blue-700'
        case 'player':
          return 'text-gray-900'
        default:
          return 'text-gray-700'
      }
    }
  }

  const getPlayerNameColor = () => {
    return isDark ? 'text-cyan-400' : 'text-cyan-700'
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96">
      {/* チャットログ */}
      <div
        className={`rounded-lg backdrop-blur-sm mb-2 transition-opacity ${
          isInputFocused ? 'opacity-100' : 'opacity-80'
        }`}
      >
        <div className="max-h-64 overflow-y-auto p-2 space-y-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-xs leading-relaxed ${getMessageColor(msg.type)}`}
            >
              {msg.type === 'player' && msg.playerName && (
                <span className={`font-bold ${getPlayerNameColor()}`}>
                  {msg.playerName}:{' '}
                </span>
              )}
              {msg.type === 'system' && (
                <span className="font-bold">[System] </span>
              )}
              {msg.type === 'achievement' && (
                <span className="font-bold">★ </span>
              )}
              {msg.type === 'trade' && (
                <span className="font-bold">💰 </span>
              )}
              <span>{msg.message}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力欄 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="メッセージを入力... (Enter で送信)"
          className={`w-full px-3 py-2 text-xs rounded-lg backdrop-blur-sm transition-all ${
            isDark
              ? 'bg-gray-900/60 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500'
              : 'bg-white/60 text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-blue-500'
          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      </div>
    </div>
  )
}

export default ChatLog
