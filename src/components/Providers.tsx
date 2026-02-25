'use client'

import { ReactNode } from 'react'
import { CallbackProvider } from '@/context/CallbackContext'
import { FloatingCallback } from './FloatingCallback'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CallbackProvider>
      {children}
      <FloatingCallback />
    </CallbackProvider>
  )
}
