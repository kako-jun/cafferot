import type { Cafferot } from '../types'

const STORAGE_KEY = 'cafferot'

interface StorageData {
  darkMode: boolean
  cafferots: Cafferot[]
}

const DEFAULT_DATA: StorageData = {
  darkMode: false,
  cafferots: [],
}

function load(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_DATA }
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_DATA, ...parsed }
  } catch {
    return { ...DEFAULT_DATA }
  }
}

function save(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function getDarkMode(): boolean {
  return load().darkMode
}

export function setDarkMode(value: boolean): void {
  const data = load()
  data.darkMode = value
  save(data)
}

export function getCafferots(): Cafferot[] {
  return load().cafferots
}

export function setCafferots(cafferots: Cafferot[]): void {
  const data = load()
  data.cafferots = cafferots
  save(data)
}
