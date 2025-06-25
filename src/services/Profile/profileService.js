import api from "../api";

export const getProfileApi = () => api.get("/profile");
export const updateProfileApi = (data) => api.put("/profile", data);
export const deleteAccountApi = (data) => api.delete("/profile", { data });
