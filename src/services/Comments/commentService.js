import api from "../api";

export const getCommentsApi = (params) => api.get("/comments", { params });
export const createCommentApi = (data) => api.post("/comments", data);
export const updateCommentApi = (id, data) => api.put(`/comments/${id}`, data);
export const deleteCommentApi = (id) => api.delete(`/comments/${id}`);
