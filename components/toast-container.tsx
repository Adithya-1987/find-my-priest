'use client'

import { useAppContext } from '@/context/app-context'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ToastContainer() {
  const { toasts, removeToast } = useAppContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />
      default:
        return <Info size={20} className="text-blue-600" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto flex items-start gap-3 p-4 rounded-lg border ${getBgColor(toast.type)} shadow-lg`}
        >
          {getIcon(toast.type)}
          <p className="flex-1 text-sm text-foreground">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
