import { useState, useEffect } from 'react'
import SaveDiscardButtons from '../components/SaveDiscardButtons'
import type { Cafferot } from '../types'

type CafferotType = 'mine' | 'adopted' | 'community'

interface CafferotsScreenProps {
  isDark: boolean
  onBack: () => void
  onToggleDark: () => void
}

function CafferotsScreen({
  isDark,
  onBack,
  onToggleDark,
}: CafferotsScreenProps) {
  const [selectedType, setSelectedType] = useState<CafferotType>('mine')
  const [cafferots, setCafferots] = useState<Cafferot[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedCafferot, setSelectedCafferot] = useState<Cafferot | null>(null)
  const [deletingCafferot, setDeletingCafferot] = useState<Cafferot | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false)

  // LocalStorageからカフェロットを読み込む
  useEffect(() => {
    const loadCafferots = () => {
      setLoading(true)
      try {
        const saved = localStorage.getItem('cafferots')
        if (saved) {
          setCafferots(JSON.parse(saved))
        }
      } catch (error) {
        console.error('Failed to load cafferots:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCafferots()
  }, [])

  // セーブボタン: LocalStorageに保存
  const handleSave = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem('cafferots', JSON.stringify(cafferots))
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // 変更を破棄
  const handleDiscard = () => {
    setShowDiscardConfirm(false)
    const saved = localStorage.getItem('cafferots')
    if (saved) {
      setCafferots(JSON.parse(saved))
    }
    setHasUnsavedChanges(false)
  }

  // ファイルアップロード
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const newCafferots: Cafferot[] = []

      for (const file of Array.from(files)) {
        // 画像ファイルのみ受け入れる
        if (!file.type.startsWith('image/')) continue

        // Base64に変換
        const imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        const cafferot: Cafferot = {
          id: crypto.randomUUID(),
          name: file.name,
          imageData,
          createdAt: new Date().toISOString(),
          authorId: 'local-user',
          adoptionCount: 0,
          value: 0,
        }

        newCafferots.push(cafferot)
      }

      const updated = [...cafferots, ...newCafferots]
      setCafferots(updated)
      localStorage.setItem('cafferots', JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to upload files:', error)
    } finally {
      setUploading(false)
    }
  }

  // ファイル削除の確認ダイアログを表示
  const handleDeleteClick = (cafferot: Cafferot) => {
    setDeletingCafferot(cafferot)
  }

  // ファイル削除を実行
  const handleDeleteConfirm = () => {
    if (!deletingCafferot) return

    const updated = cafferots.filter((c) => c.id !== deletingCafferot.id)
    setCafferots(updated)
    localStorage.setItem('cafferots', JSON.stringify(updated))

    if (selectedCafferot?.id === deletingCafferot.id) {
      setSelectedCafferot(null)
    }
    setDeletingCafferot(null)
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ja-JP')
  }

  const getCafferotTypeLabel = (type: CafferotType): string => {
    const labels = {
      mine: '自作',
      adopted: '採用済み',
      community: 'コミュニティ',
    }
    return labels[type]
  }

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <header className={`border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-blue-200 bg-blue-50'}`}>
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span>Caffèrot</span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>-</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>カフェロット管理</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
                isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
                isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* タブ */}
        <div className={`flex items-center border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-1">
            {(['mine', 'adopted', 'community'] as CafferotType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  selectedType === type
                    ? isDark
                      ? 'border-b-2 border-blue-500 text-blue-400'
                      : 'border-b-2 border-blue-500 text-blue-600'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {getCafferotTypeLabel(type)}
              </button>
            ))}
          </div>
          <button
            onClick={onBack}
            className={`px-4 py-3 transition-colors ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
            }`}
            title="閉じる"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex">
        {/* カフェロット一覧 */}
        <div className={`w-96 border-r ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex flex-col`}>
          {/* 検索・フィルター領域 */}
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <svg
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="検索..."
                className={`w-full pl-10 pr-3 py-2 rounded border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* カフェロット一覧（スクロール可能） */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {cafferots.map((cafferot) => (
                  <div
                    key={cafferot.id}
                    onClick={() => setSelectedCafferot(cafferot)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCafferot?.id === cafferot.id
                        ? isDark
                          ? 'bg-blue-900/50 border border-blue-500'
                          : 'bg-blue-50 border border-blue-500'
                        : isDark
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* サムネイル */}
                      <img
                        src={cafferot.imageData}
                        alt={cafferot.name}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                          {cafferot.name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(cafferot.createdAt)}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteClick(cafferot)
                        }}
                        className={`p-1 rounded transition-colors flex-shrink-0 ${
                          isDark
                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20'
                            : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                        }`}
                        title="削除"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* アップロード領域（一番下） */}
          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <label
              className={`block w-full px-4 py-6 text-center rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                isDark
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600'
                  : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
                disabled={uploading}
              />
              <svg
                className={`w-6 h-6 mx-auto mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {uploading ? 'アップロード中...' : 'カフェロットを追加'}
              </span>
            </label>
          </div>
        </div>

        {/* プレビューエリア */}
        <div className="flex-1 overflow-y-auto">
          {selectedCafferot ? (
            <div className="p-8">
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedCafferot.name}
              </h2>
              <div className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                作成日: {formatDate(selectedCafferot.createdAt)} | 採用数: {selectedCafferot.adoptionCount} | 価値: {selectedCafferot.value}
              </div>

              <div className="flex justify-center">
                <img
                  src={selectedCafferot.imageData}
                  alt={selectedCafferot.name}
                  className="max-w-full max-h-[600px] rounded-lg shadow-lg"
                />
              </div>

              {selectedCafferot.audioData && (
                <div className="flex justify-center mt-6">
                  <audio controls className="w-full max-w-md">
                    <source src={selectedCafferot.audioData} />
                    お使いのブラウザは音声の再生に対応していません。
                  </audio>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>カフェロットを選択してプレビュー</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 削除確認ダイアログ */}
      {deletingCafferot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div
            className={`p-6 rounded-lg shadow-xl max-w-md w-full ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">削除の確認</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-semibold">{deletingCafferot.name}</span> を削除しますか？
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingCafferot(null)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteConfirm}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  isDark
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 変更を破棄の確認ダイアログ */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div
            className={`p-6 rounded-lg shadow-xl max-w-md w-full ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">変更を破棄しますか？</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              未保存の変更がすべて失われます。この操作は取り消せません。
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                キャンセル
              </button>
              <button
                onClick={handleDiscard}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  isDark
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                破棄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* セーブ/アンドゥボタン */}
      <SaveDiscardButtons
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        isDark={isDark}
        onSave={handleSave}
        onDiscard={() => setShowDiscardConfirm(true)}
      />
    </div>
  )
}

export default CafferotsScreen
