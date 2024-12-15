import { Navigate, Outlet } from 'react-router-dom';

import LoadingSpinner from '@components/loading-spinner';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';

function LoginRoute() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <LoadingSpinner height="100dvh" />;

  if (user) {
    dispatch(changeTransitionDirection('none'));
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
}

export default LoginRoute;
