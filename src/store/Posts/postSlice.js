import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getPostsApi,
  getPostBySlugApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from "../../services/Posts/postService";

// Async thunks
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getPostsApi(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data posts"
      );
    }
  }
);

export const getPostBySlug = createAsyncThunk(
  "posts/getPostBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await getPostBySlugApi(slug);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data post"
      );
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPostApi(postData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal membuat post"
      );
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ slug, postData }, { rejectWithValue }) => {
    try {
      const response = await updatePostApi(slug, postData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengupdate post"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await deletePostApi(slug);
      return { slug, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus post"
      );
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  success: false,
  pagination: {
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data || action.payload;
        state.pagination = action.payload.pagination || state.pagination;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Gagal mengambil data posts");
      }) // Get Post By Slug
      .addCase(getPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(getPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Gagal mengambil data post");
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload.data || action.payload);
        state.success = true;
        state.error = null;
        toast.success("Post berhasil dibuat!");
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        toast.error(action.payload || "Gagal membuat post");
      })

      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload.data || action.payload;
        const index = state.posts.findIndex(
          (post) => post.slug === updatedPost.slug
        );
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        state.currentPost = updatedPost;
        state.success = true;
        state.error = null;
        toast.success("Post berhasil diperbarui!");
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        toast.error(action.payload || "Gagal mengupdate post");
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post.slug !== action.payload.slug
        );
        state.error = null;
        toast.success("Post berhasil dihapus!");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Gagal menghapus post");
      });
  },
});

export const { resetPostState, clearError, clearCurrentPost } =
  postSlice.actions;
export default postSlice.reducer;
