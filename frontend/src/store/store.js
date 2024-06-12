import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import productReducer from "./features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productReducer,
  },
});
