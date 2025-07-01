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
  getMyPosts,
} from "../../store/Posts/postSlice";

export const usePosts = () => {
  const dispatch = useDispatch();

  // Tambahkan myPosts ke destructuring
  const { posts, myPosts, currentPost, loading, error, success, pagination } =
    useSelector((state) => state.posts);

  const handleGetPosts = useCallback(
    (params = {}) => {
      return dispatch(getPosts(params));
    },
    [dispatch]
  );

  //my Posts
  const handleGetMyPosts = useCallback(
    (params = {}) => {
      return dispatch(getMyPosts({ ...params, myPosts: true }));
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
    myPosts, // Tambahkan myPosts ke return object
    currentPost,
    loading,
    error,
    success,
    pagination,
    getPosts: handleGetPosts,
    getMyPosts: handleGetMyPosts,
    getPostBySlug: handleGetPostBySlug,
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    resetState: handleResetState,
    clearError: handleClearError,
    clearCurrentPost: handleClearCurrentPost,
  };
};
