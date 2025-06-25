import api from "../api";

export const registerApi = (userData) => api.post("/register", userData);

export const loginApi = (userData) => api.post("/login", userData);

export const logoutApi = () => api.post("/logout");

export const getMeApi = () => api.get("/me");
