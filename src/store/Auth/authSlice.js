// src/store/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerApi,
  loginApi,
  logoutApi,
  getMeApi,
} from "../../services/Auth/authService";
import toast from "react-hot-toast";

// Async actions
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerApi(data);
      toast.success("Registrasi berhasil");
      return res.data.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registrasi gagal");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      toast.success("Login berhasil");
      return res.data.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login gagal");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      toast.success("Logout berhasil");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout gagal");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeApi();
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
