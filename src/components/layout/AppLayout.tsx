import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export const AppLayout = memo(function AppLayout() {
  return (
    <div className="relative min-h-svh bg-[#fbfbf7] text-stone-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
})
