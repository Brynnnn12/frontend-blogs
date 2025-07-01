// src/components/Layouts/Protected/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Show toast and redirect if not authenticated
  if (!isAuthenticated) {
    // Customize message based on route
    let message = "Silakan login terlebih dahulu untuk mengakses halaman ini";

    if (location.pathname.includes("/blog/")) {
      message = "Silakan login untuk membaca artikel lengkap";
    } else if (location.pathname.includes("/dashboard")) {
      message = "Akses dashboard memerlukan login terlebih dahulu";
    }

    // Show toast message
    toast.error(message, {
      icon: "🔒",
    });

    return <Navigate to="/login" replace />;
  }

  return children;
}
