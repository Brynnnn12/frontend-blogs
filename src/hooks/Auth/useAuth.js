// src/hooks/useAuth.js
import { useSelector } from "react-redux";

export default function useAuth() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  return {
    user,
    isAuthenticated,
    loading,
    error,
  };
}
