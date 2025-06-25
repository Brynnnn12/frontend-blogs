import { useSelector } from "react-redux";

export default function useRoles() {
  const { roles, loading, error, pagination } = useSelector(
    (state) => state.roles
  );

  return {
    roles,
    loading,
    error,
    pagination,
  };
}
