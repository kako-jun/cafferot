// カフェロットのモチーフカテゴリ
export type CafferotCategory = 'coffee' | 'bean' | 'sweets' | 'parfait' | 'other'

// 味覚パラメータ（0-100）
export interface FlavorProfile {
  bitterness: number // 苦み
  acidity: number // 酸味
  sweetness: number // 甘み
  body: number // コク
}

// カフェロット（Pydanticモデルと同期）
export interface Cafferot {
  id: string
  name: string
  category: CafferotCategory // モチーフカテゴリ
  imageData: string // Base64 or URL
  audioData?: string
  flavorProfile: FlavorProfile // 味覚パラメータ
  createdAt: string // ISOString
  authorId: string
  adoptionCount: number // 採用数
  value: number // 価値
}
