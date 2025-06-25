import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  resetPostState,
  clearError,
  clearCurrentPost,
} from "../../store/Posts/postSlice";

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, currentPost, loading, error, success, pagination } =
    useSelector((state) => state.posts);

  const handleGetPosts = useCallback(
    (params = {}) => {
      return dispatch(getPosts(params));
    },
    [dispatch]
  );
  const handleGetPostBySlug = useCallback(
    (slug) => {
      return dispatch(getPostBySlug(slug));
    },
    [dispatch]
  );

  const handleCreatePost = useCallback(
    (postData) => {
      return dispatch(createPost(postData));
    },
    [dispatch]
  );
  const handleUpdatePost = useCallback(
    (slug, postData) => {
      return dispatch(updatePost({ slug, postData }));
    },
    [dispatch]
  );

  const handleDeletePost = useCallback(
    (slug) => {
      return dispatch(deletePost(slug));
    },
    [dispatch]
  );

  const handleResetState = useCallback(() => {
    dispatch(resetPostState());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearCurrentPost = useCallback(() => {
    dispatch(clearCurrentPost());
  }, [dispatch]);
  return {
    posts,
    currentPost,
    loading,
    error,
    success,
    pagination,
    getPosts: handleGetPosts,
    getPostBySlug: handleGetPostBySlug,
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    resetState: handleResetState,
    clearError: handleClearError,
    clearCurrentPost: handleClearCurrentPost,
  };
};
