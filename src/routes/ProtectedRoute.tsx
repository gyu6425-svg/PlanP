import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { isJwtExpired } from '../services/jwt'

export function ProtectedRoute() {
  const location = useLocation()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const isAuthenticated = Boolean(accessToken && !isJwtExpired(accessToken))

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
