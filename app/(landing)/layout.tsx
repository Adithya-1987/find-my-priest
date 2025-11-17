import { AppProvider } from '@/context/app-context'
import { ToastContainer } from '@/components/toast-container'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      {children}
      <ToastContainer />
    </AppProvider>
  )
}
