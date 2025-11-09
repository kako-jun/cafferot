import type { Cafferot } from './cafferot'

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
