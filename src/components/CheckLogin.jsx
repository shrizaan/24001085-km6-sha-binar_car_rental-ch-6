import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

export function CheckLogin() {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : <Outlet />;
}
