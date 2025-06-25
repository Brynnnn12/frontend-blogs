import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRolesApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
} from "../../services/Roles/roleService";

import toast from "react-hot-toast";

// Initial state
const initialState = {
  roles: [],
  role: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  },
  success: false,
  loading: false,
  error: null,
};

// Async actions
export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getRolesApi(params);
      return response.data.data; // Sesuaikan dengan struktur response API
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch roles"
      );
    }
  }
);
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const response = await createRoleApi(roleData);
      toast.success("Role created successfully");
      return response.data.data; // Sesuaikan dengan struktur response API
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create role");
      return rejectWithValue(
        error.response?.data?.message || "Failed to create role"
      );
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, roleData }, { rejectWithValue }) => {
    try {
      const response = await updateRoleApi(id, roleData);
      toast.success("Role updated successfully");
      return response.data.data; // Sesuaikan dengan struktur response API
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role"
      );
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoleApi(id);
      toast.success("Role deleted successfully");
      return { id }; // Return id for deletion from state
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete role");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete role"
      );
    }
  }
);

// Slice
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    resetRoles(state) {
      state.roles = [];
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 10,
      };
      state.success = false;
      state.loading = false;
      state.error = null;
    },
    resetRoleState(state) {
      state.role = null;
      state.success = false;
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        // Asumsi response API: { roles: [...], pagination: {...} }
        if (
          action.payload &&
          action.payload.roles &&
          action.payload.pagination
        ) {
          state.roles = action.payload.roles;
          state.pagination = action.payload.pagination;
        } else if (Array.isArray(action.payload)) {
          // Fallback jika response hanya array roles
          state.roles = action.payload;
          // Maintain pagination state atau set default
          state.pagination = {
            currentPage: 1,
            totalPages: 1,
            totalItems: action.payload.length,
            perPage: 10,
          };
        } else {
          // Fallback untuk response kosong atau format tidak dikenal
          state.roles = [];
          state.pagination = {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            perPage: 10,
          };
        }
        state.success = true;
        state.error = null;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.roles.push(action.payload);
        }
        state.success = true;
        state.error = null;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const index = state.roles.findIndex(
            (role) => role.id === action.payload.id
          );
          if (index !== -1) {
            state.roles[index] = action.payload;
          }
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(
          (role) => role.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRoles, resetRoleState, clearError } = roleSlice.actions;
export default roleSlice.reducer;
