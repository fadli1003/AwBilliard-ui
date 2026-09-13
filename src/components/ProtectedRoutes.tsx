import { Navigate, Outlet } from 'react-router-dom';
import { useUserQuery } from '@/hooks/useAuthQueries';
import { useAuthStore } from '@/stores/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  allowedPermission?: string;
}

export const ProtectedRoute = ({ allowedRoles, allowedPermission }: ProtectedRouteProps) => {
  // 1. Selalu panggil kustom hooks di paling atas
  const { isLoading } = useUserQuery();
  const { user, hasRole, hasPermission } = useAuthStore();

  // 2. Tampilkan loading state jika TanStack Query masih fetching session awal
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading Session...</div>;
  }

  // 3. Early returns untuk otorisasi
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/403" replace />;
  }

  if (allowedPermission && !hasPermission(allowedPermission)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};