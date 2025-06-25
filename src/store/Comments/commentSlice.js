import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsApi,
  createCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from "../../services/Comments/commentService";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  comments: [],
  comment: null,
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
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getCommentsApi(params);
      return response.data.data; // Sesuaikan dengan struktur response API
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await createCommentApi(commentData);
      toast.success("Comment created successfully");
      return response.data.data; // Sesuaikan dengan struktur response API
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create comment");
      return rejectWithValue(
        error.response?.data?.message || "Failed to create comment"
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, commentData }, { rejectWithValue }) => {
    try {
      const response = await updateCommentApi(id, commentData);
      toast.success("Comment updated successfully");
      return response.data.data; // Sesuaikan dengan struktur response API
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update comment");
      return rejectWithValue(
        error.response?.data?.message || "Failed to update comment"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCommentApi(id);
      toast.success("Comment deleted successfully");
      return { id }; // Return id for deletion from state
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments(state) {
      state.comments = [];
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
    resetCommentState(state) {
      state.comment = null;
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
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        // Asumsi response API: { comments: [...], pagination: {...} }
        if (
          action.payload &&
          action.payload.comments &&
          action.payload.pagination
        ) {
          state.comments = action.payload.comments;
          state.pagination = action.payload.pagination;
        } else if (Array.isArray(action.payload)) {
          // Fallback jika response hanya array comments
          state.comments = action.payload;
          // Maintain pagination state atau set default
          state.pagination = {
            currentPage: 1,
            totalPages: 1,
            totalItems: action.payload.length,
            perPage: 10,
          };
        } else {
          // Fallback untuk response kosong atau format tidak dikenal
          state.comments = [];
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
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.comments.push(action.payload);
        }
        state.success = true;
        state.error = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const index = state.comments.findIndex(
            (comment) => comment.id === action.payload.id
          );
          if (index !== -1) {
            state.comments[index] = action.payload;
          }
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetComments, resetCommentState, clearError } =
  commentSlice.actions;
export default commentSlice.reducer;
