import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their correct dashboard
    switch (user.role) {
      case 'Admin':
        return <Navigate to="/admin" replace />;
      case 'Donor':
        return <Navigate to="/donor" replace />;
      case 'Recipient':
        return <Navigate to="/recipient" replace />;
      case 'Logistics':
        return <Navigate to="/logistics" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}
