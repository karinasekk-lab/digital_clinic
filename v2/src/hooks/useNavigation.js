import { useState } from 'react'

export const useNavigation = () => {
  const [activeTab, setActiveTab] = useState('home') // home, records, doctors, pharmacy, profile
  const [screenStack, setScreenStack] = useState(['home'])
  const [screenParams, setScreenParams] = useState({})

  const push = (screenName, params = {}) => {
    setScreenStack(prev => [...prev, screenName])
    if (params) {
      setScreenParams(prev => ({ ...prev, [screenName]: params }))
    }
  }

  const pop = () => {
    if (screenStack.length > 1) {
      setScreenStack(prev => prev.slice(0, -1))
    }
  }

  const popTo = (screenName) => {
    const index = screenStack.indexOf(screenName)
    if (index >= 0) {
      setScreenStack(prev => prev.slice(0, index + 1))
    }
  }

  const reset = (screenName) => {
    setScreenStack([screenName])
    setScreenParams({})
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setScreenStack([tab])
    setScreenParams({})
  }

  const currentScreen = screenStack[screenStack.length - 1]
  const currentParams = screenParams[currentScreen] || {}

  return {
    activeTab,
    switchTab,
    currentScreen,
    currentParams,
    push,
    pop,
    popTo,
    reset,
    screenStack
  }
}
