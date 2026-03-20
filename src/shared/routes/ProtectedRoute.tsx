import { Navigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { JSX } from "react"

interface ProtectedRouteProps {
  children: JSX.Element
  requireAdmin?: boolean
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) return null

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute