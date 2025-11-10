// カフェロット
export interface Cafferot {
  id: string
  name: string
  imageData: string // Base64 or URL
  audioData?: string
  createdAt: string
  authorId: string
  adoptionCount: number
  value: number
}

// カフェ
export interface Cafe {
  id: string
  ownerId: string
  name: string
  level: number
  displayedCafferots: Cafferot[]
}

// カフェステータス
export interface CafeStats {
  revenue: number // 売上
  customerFrequency: number // 来店頻度
  regularCustomers: number // 常連客数
  popularity: number // 人気度
}

// ビューポート
export interface Viewport {
  x: number // パン位置 X
  y: number // パン位置 Y
  zoom: number // ズームレベル
}

// モード
export type Mode = 'edit' | 'play'
