// src/components/Layouts/Protected/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Jika loading masih true, jangan tampilkan apa pun
  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
