import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getProfileApi,
  updateProfileApi,
  deleteAccountApi,
} from "../../services/Profile/profileService";

// Async thunks
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfileApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data profil"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateProfileApi(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengupdate profil"
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await deleteAccountApi(passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus akun"
      );
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
  accountDeleteSuccess: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.accountDeleteSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Toast notification untuk get profile error
        toast.error(action.payload || "Gagal mengambil data profil");
      }) // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data || action.payload;
        state.success = true;
        state.error = null;
        // Toast notification untuk success
        toast.success("Profil berhasil diperbarui!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        // Toast notification untuk error
        toast.error(action.payload || "Gagal mengupdate profil");
      }) // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.accountDeleteSuccess = false;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.accountDeleteSuccess = true;
        state.error = null;
        // Toast notification untuk delete success
        toast.success("Akun berhasil dihapus!");
        // Redirect ke login page setelah delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.accountDeleteSuccess = false;
        // Toast notification untuk error
        toast.error(action.payload || "Gagal menghapus akun");
      });
  },
});

export const { resetProfileState, clearError } = profileSlice.actions;
export default profileSlice.reducer;
