// カフェロット（Pydanticモデルと同期）
export interface Cafferot {
  id: string
  name: string
  imageData: string // Base64 or URL
  audioData?: string
  createdAt: string // ISOString
  authorId: string
  adoptionCount: number // 採用数
  value: number // 価値
}
