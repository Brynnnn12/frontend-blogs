// services/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // ganti sesuai API kamu
  withCredentials: true, // ini penting agar cookie ikut dikirim
});

export default api;
