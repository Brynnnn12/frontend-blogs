import { useSelector } from "react-redux";

export default function useComments() {
  const { comment, loading, error, pagination } = useSelector(
    (state) => state.comments
  );

  return {
    comment,
    loading,
    error,
    pagination,
  };
}
