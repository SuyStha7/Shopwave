import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService.js";

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (inputValues, thunkAPI) => {
      try {
        const response = await productService.createProduct(inputValues);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  const initialState = {
    products: [],
    status: "idle",
    error: null,
  };

  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // add product
        .addCase(addProduct.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.products = action.payload;
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
    },
  });
  
  export default productSlice.reducer;
  