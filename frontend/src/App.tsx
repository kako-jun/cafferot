import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import CafeScreen from './screens/CafeScreen'
import CafferotsScreen from './screens/CafferotsScreen'
import CafeDetailScreen from './screens/CafeDetailScreen'
import type { Cafe } from './types'

type Screen = 'cafe' | 'cafferots' | 'cafeDetail'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [currentScreen, setCurrentScreen] = useState<Screen>('cafe')
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)
  const [isOwnCafe, setIsOwnCafe] = useState(false)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark))
  }, [isDark])

  const handleCafeClick = (cafe: Cafe, isOwn: boolean) => {
    setSelectedCafe(cafe)
    setIsOwnCafe(isOwn)
    setCurrentScreen('cafeDetail')
  }

  const handleBackFromDetail = () => {
    setSelectedCafe(null)
    setCurrentScreen('cafe')
  }

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'cafeDetail' && selectedCafe ? (
        <CafeDetailScreen
          key="cafeDetail"
          cafe={selectedCafe}
          isDark={isDark}
          isOwn={isOwnCafe}
          onClose={handleBackFromDetail}
        />
      ) : currentScreen === 'cafferots' ? (
        <CafferotsScreen
          key="cafferots"
          isDark={isDark}
          onBack={() => setCurrentScreen('cafe')}
          onToggleDark={() => setIsDark(!isDark)}
        />
      ) : (
        <CafeScreen
          key="cafe"
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onNavigateToCafferots={() => setCurrentScreen('cafferots')}
          onCafeClick={handleCafeClick}
        />
      )}
    </AnimatePresence>
  )
}

export default App
