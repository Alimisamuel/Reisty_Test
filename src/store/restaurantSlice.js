import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetch from "../axios/custom";

export const getRestuarents = createAsyncThunk("products/get", async () => {
  const response = await axiosFetch.get(
    "/restaurantmanagement/owner/all_restaurants"
  );
  const result = response?.data;
  return result;
});

const userRestaurant = createSlice({
  name: "restaurants",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestuarents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getRestuarents.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getRestuarents.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default userRestaurant.reducer;
