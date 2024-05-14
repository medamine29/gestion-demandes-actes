import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../store/index.ts';

interface ProtectedRouteProps {
  Element: React.FC
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Element }) => {

  const token = useTypedSelector((state) => state.auth.token)

  // if not online redirect to home
  if (!token) return <Navigate to="/" />;

  // If authenticated, render the dashboard
  return <Element />;
};

export default ProtectedRoute
