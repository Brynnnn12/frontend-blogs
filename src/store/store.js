import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import categoryReducer from "./Categories/categorySlice";
import roleReducer from "./Roles/roleSlice";
import commentReducer from "./Comments/commentSlice";
import profileReducer from "./Profile/profileSlice";
import postReducer from "./Posts/postSlice";

/**
 * Ini Adalah contoh konfigurasi store Redux menggunakan Redux Toolkit.
 */
export default configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    categories: categoryReducer,
    roles: roleReducer,
    comments: commentReducer,
    profile: profileReducer,
    posts: postReducer,
  },
});
