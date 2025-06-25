import api from "../api";

export const getCategoriesApi = (params) => api.get("/categories", { params });
export const getCategoryByslugApi = (slug) => api.get(`/categories/${slug}`);
export const createCategoryApi = (data) => api.post("/categories", data);
export const updateCategoryApi = (slug, data) =>
  api.put(`/categories/${slug}`, data);
export const deleteCategoryApi = (slug) => api.delete(`/categories/${slug}`);
