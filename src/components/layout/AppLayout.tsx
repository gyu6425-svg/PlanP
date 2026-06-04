import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastProvider } from '../ui/toast'
import { Footer } from './Footer'
import { Header } from './Header'

export const AppLayout = memo(function AppLayout() {
  return (
    <ToastProvider>
      <div className="relative min-h-svh bg-[#fbfbf7] text-stone-900">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
})
