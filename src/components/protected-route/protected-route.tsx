import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isInit, isLoading } = useSelector((state) => state.user);
  const loc = useLocation();

  if (isLoading || !isInit) return <Preloader />;

  if (
    user &&
    ['/login', '/register', '/forgot-password', '/reset-password'].includes(
      loc.pathname
    )
  ) {
    return <Navigate to={loc?.state?.from?.pathname || '/'} replace />;
  }

  if (
    !user &&
    !['/login', '/register', '/forgot-password', '/reset-password'].includes(
      loc.pathname
    )
  ) {
    return <Navigate to='/login' state={{ from: loc }} replace />;
  }

  return <>{children}</>;
};
