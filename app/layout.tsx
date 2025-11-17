import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProvider } from '@/context/app-context'
import { ToastContainer } from '@/components/toast-container'
import { Navbar } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Find My Priest - Connect with Verified Priests',
  description: 'Book authentic ceremonies with verified priests in your area',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
