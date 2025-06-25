import api from "../api";

export const getRolesApi = (params) => api.get("/roles", { params });
export const createRoleApi = (data) => api.post("/roles", data);
export const updateRoleApi = (id, data) => api.put(`/roles/${id}`, data);
export const deleteRoleApi = (id) => api.delete(`/roles/${id}`);
