'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CallbackContextType {
  isOpen: boolean
  openCallback: () => void
  closeCallback: () => void
}

const CallbackContext = createContext<CallbackContextType | undefined>(undefined)

export function CallbackProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openCallback = () => setIsOpen(true)
  const closeCallback = () => setIsOpen(false)

  return (
    <CallbackContext.Provider value={{ isOpen, openCallback, closeCallback }}>
      {children}
    </CallbackContext.Provider>
  )
}

export function useCallback() {
  const context = useContext(CallbackContext)
  if (context === undefined) {
    throw new Error('useCallback must be used within a CallbackProvider')
  }
  return context
}
