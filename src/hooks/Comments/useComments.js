import { useSelector } from "react-redux";

export default function useComments() {
  const { comments, loading, error, pagination } = useSelector(
    (state) => state.comments
  );

  return {
    comments,
    loading,
    error,
    pagination,
  };
}
