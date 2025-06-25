import { useSelector } from "react-redux";

export default function useCategory() {
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  return {
    categories,
    loading,
    error,
  };
}
