import { Navigate, Outlet } from 'react-router-dom';

import LoadingSpinner from '@components/loading-spinner';
import { useAppSelector } from '@store/hooks';

function ProtectedRoute() {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <LoadingSpinner height="100dvh" />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
