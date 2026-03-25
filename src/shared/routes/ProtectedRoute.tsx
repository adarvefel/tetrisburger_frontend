import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireAdmin?: boolean;
  requireEmployee?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireEmployee = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isEmployee, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireEmployee && !isEmployee) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;