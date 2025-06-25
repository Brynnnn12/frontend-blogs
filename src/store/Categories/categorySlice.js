import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  getCategoryByslugApi,
} from "../../services/Categories/categoryService";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  categories: [],
  category: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  },
  loading: false,
  error: null,
  success: false,
};

// Async actions
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getCategoriesApi(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const getCategoryBySlug = createAsyncThunk(
  "categories/getCategoryBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await getCategoryByslugApi(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Category not found"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await createCategoryApi(categoryData);
      toast.success("Category created successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ slug, data }, { rejectWithValue }) => {
    try {
      const response = await updateCategoryApi(slug, data);
      toast.success("Category updated successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await deleteCategoryApi(slug);
      toast.success("Category deleted successfully");
      return { ...response.data, slug }; // Include slug for easier state update
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

// Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.categories = [];
      state.pagination = initialState.pagination;
    },
    resetCategoryState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.category = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data || [];
        state.pagination = {
          currentPage: action.payload.page || 1,
          totalPages: action.payload.totalPages || 1,
          totalItems: action.payload.total || 0,
          perPage: action.payload.limit || 10,
        };
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Category
      .addCase(getCategoryBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.category = null;
      })
      .addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload.data);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.map((cat) =>
          cat.slug === action.payload.slug ? action.payload : cat
        );
        if (state.category?.slug === action.payload.slug) {
          state.category = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.filter(
          (cat) => cat.slug !== action.payload.slug
        );
        if (state.category?.slug === action.payload.slug) {
          state.category = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategories, resetCategoryState, resetError } =
  categorySlice.actions;

export default categorySlice.reducer;
