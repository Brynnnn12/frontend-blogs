import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice"; // Import your authSlice
import categoryReducer from "./Categories/categorySlice"; // Import your categorySlice

/**
 * Ini Adalah contoh konfigurasi store Redux menggunakan Redux Toolkit.
 */
export default configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer, // Assuming you have an authReducer define
    categories: categoryReducer, // Assuming you have a categoryReducer defined
  },
});
