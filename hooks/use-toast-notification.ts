import { useAppContext } from '@/context/app-context'

export function useToastNotification() {
  const { showToast } = useAppContext()

  return {
    success: (message: string) => showToast('success', message),
    error: (message: string) => showToast('error', message),
    info: (message: string) => showToast('info', message),
    warning: (message: string) => showToast('warning', message),
  }
}
