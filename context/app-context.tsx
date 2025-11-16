'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

interface Notification {
  id: string
  type: 'booking_confirmation' | 'booking_reminder' | 'rating_request' | 'priest_update'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface AppContextType {
  toasts: Toast[]
  notifications: Notification[]
  unreadCount: number
  currentUser: { id: string; name: string; role: 'user' | 'priest' | 'admin' } | null
  showToast: (type: Toast['type'], message: string, duration?: number) => void
  removeToast: (id: string) => void
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  setCurrentUser: (user: AppContextType['currentUser']) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentUser, setCurrentUser] = useState<AppContextType['currentUser']>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const showToast = useCallback((type: Toast['type'], message: string, duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, type, message, duration }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const value: AppContextType = {
    toasts,
    notifications,
    unreadCount,
    currentUser,
    showToast,
    removeToast,
    markNotificationAsRead,
    clearAllNotifications,
    setCurrentUser,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
