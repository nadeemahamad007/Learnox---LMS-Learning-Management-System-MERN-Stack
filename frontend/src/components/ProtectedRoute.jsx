import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowRoles }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <p className="status-message">Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowRoles?.length && !allowRoles.includes(user?.role)) {
    return <Navigate to="/courses" replace />;
  }

  return children;
}

export default ProtectedRoute;
