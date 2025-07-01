import api from "../api";

// Untuk mengambil comments berdasarkan slug post
export const getCommentsApi = (slug) => api.get(`/comments/posts/${slug}`);

// Untuk membuat comment baru berdasarkan slug post
export const createCommentApi = (slug, data) =>
  api.post(`/comments/posts/${slug}`, data);

// Update dan delete tetap menggunakan ID
export const updateCommentApi = (id, data) => api.put(`/comments/${id}`, data);
export const deleteCommentApi = (id) => api.delete(`/comments/${id}`);
