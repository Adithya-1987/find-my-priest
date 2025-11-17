'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  confirmVariant?: 'default' | 'destructive'
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  confirmVariant = 'default',
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-card rounded-2xl border border-border max-w-md w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="font-serif text-xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>

        {onConfirm && (
          <div className="flex gap-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-lg">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className={`flex-1 rounded-lg ${
                confirmVariant === 'destructive'
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
