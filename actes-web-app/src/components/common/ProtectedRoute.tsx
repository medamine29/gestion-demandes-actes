import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/index.ts';

interface ProtectedRouteProps {
  Element: React.FC,
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Element, redirectTo = '/' }) => {

  const token = useTypedSelector((state) => state.auth.token)

  // if not online redirect to home
  if (!token) return <Navigate to={redirectTo} />;

  // If authenticated, render the dashboard
  return <Element />;
};

export default ProtectedRoute
