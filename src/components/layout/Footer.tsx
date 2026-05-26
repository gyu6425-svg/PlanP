import { Map } from 'lucide-react'
import { memo } from 'react'
import { useLocation } from 'react-router-dom'

export const Footer = memo(function Footer() {
  const location = useLocation()

  if (
    location.pathname === '/' ||
    location.pathname === '/survey' ||
    location.pathname === '/survey/result' ||
    /^\/[^/]+\/survey(\/result)?$/.test(location.pathname) ||
    /^\/[^/]+\/food\//.test(location.pathname) ||
    /^\/[^/]+\/stay\//.test(location.pathname) ||
    /^\/[^/]+\/tour\//.test(location.pathname)
  ) {
    return null
  }

  return (
    <footer className="border-t border-stone-200 px-4 py-8">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Plan P MVP architecture starter</span>
        <span className="inline-flex items-center gap-2">
          <Map size={16} aria-hidden="true" />
          P형도 부담 없이 고르는 여행 계획
        </span>
      </div>
    </footer>
  )
})
