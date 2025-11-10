import { useState, useEffect } from 'react'
import CafeScreen from './screens/CafeScreen'
import CafferotsScreen from './screens/CafferotsScreen'

type Screen = 'cafe' | 'cafferots'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [currentScreen, setCurrentScreen] = useState<Screen>('cafe')

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark))
  }, [isDark])

  if (currentScreen === 'cafferots') {
    return (
      <CafferotsScreen
        isDark={isDark}
        onBack={() => setCurrentScreen('cafe')}
        onToggleDark={() => setIsDark(!isDark)}
      />
    )
  }

  return (
    <CafeScreen
      isDark={isDark}
      onToggleDark={() => setIsDark(!isDark)}
      onNavigateToCafferots={() => setCurrentScreen('cafferots')}
    />
  )
}

export default App
