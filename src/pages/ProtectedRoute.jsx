// src/pages/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace />;
}
