'use client'

import { Modal } from '@/components/modal'
import { AlertCircle } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  confirmVariant?: 'default' | 'destructive'
  onConfirm: () => void
  onClose: () => void
  isLoading?: boolean
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  confirmVariant = 'default',
  onConfirm,
  onClose,
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText={confirmText}
      confirmVariant={confirmVariant}
    >
      <div className="flex gap-3 items-start">
        <AlertCircle size={24} className="text-primary shrink-0 mt-0.5" />
        <p className="text-foreground">{message}</p>
      </div>
    </Modal>
  )
}
