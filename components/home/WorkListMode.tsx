'use client'

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

type WorkListModeContextValue = {
  listMode: boolean
  setListMode: Dispatch<SetStateAction<boolean>>
}

const WorkListModeContext = createContext<WorkListModeContextValue | null>(null)

export function WorkListModeProvider({ children }: { children: ReactNode }) {
  const [listMode, setListMode] = useState(false)

  return (
    <WorkListModeContext.Provider value={{ listMode, setListMode }}>
      {children}
    </WorkListModeContext.Provider>
  )
}

export function useWorkListMode() {
  const context = useContext(WorkListModeContext)
  if (!context) {
    throw new Error('useWorkListMode must be used within WorkListModeProvider')
  }
  return context
}
