import api from "../api";

// Get all posts
export const getPostsApi = async (params = {}) => {
  const response = await api.get("/posts", { params });
  return response.data;
};

// Get MY Post

export const getMyPostsApi = async (params = {}) => {
  const response = await api.get("/posts/my-posts", { params });
  return response.data;
};

// Get post by slug
export const getPostBySlugApi = async (slug) => {
  const response = await api.get(`/posts/${slug}`);
  return response.data;
};

// Create new post with FormData for file upload
export const createPostApi = async (formData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update post by slug with FormData for file upload
export const updatePostApi = async (slug, formData) => {
  const response = await api.put(`/posts/${slug}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete post by slug
export const deletePostApi = async (slug) => {
  const response = await api.delete(`/posts/${slug}`);
  return response.data;
};
