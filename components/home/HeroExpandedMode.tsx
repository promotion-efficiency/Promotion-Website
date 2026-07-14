'use client'

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

type HeroExpandedModeContextValue = {
  heroExpanded: boolean
  setHeroExpanded: Dispatch<SetStateAction<boolean>>
}

const HeroExpandedModeContext = createContext<HeroExpandedModeContextValue | null>(null)

export function HeroExpandedModeProvider({ children }: { children: ReactNode }) {
  const [heroExpanded, setHeroExpanded] = useState(false)

  return (
    <HeroExpandedModeContext.Provider value={{ heroExpanded, setHeroExpanded }}>
      {children}
    </HeroExpandedModeContext.Provider>
  )
}

export function useHeroExpandedMode() {
  const context = useContext(HeroExpandedModeContext)
  if (!context) {
    throw new Error('useHeroExpandedMode must be used within HeroExpandedModeProvider')
  }
  return context
}
