import { MapSliceState } from "@/types/map";
import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SessionToken } from "@mapbox/search-js-core";
const initialState: MapSliceState = {
  latitude: null,
  longitude: null,
  addressList: [],
  error: null,
  loadingAddressList: false,
};
export const fetchAddressList = createAsyncThunk(
  "map/fetchAddressList",
  async (args: { sourceAddress: string }, thunkAPI) => {
    const { sourceAddress } = args;
    const token = new SessionToken();
    try {
      const response = await axiosInstance.get(
        `/search/searchbox/v1/suggest?q=${sourceAddress}&session_token=${token.id}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&limit=8&country=IN`
      );

      return {
        addressList: response.data.suggestions,
      };
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("Failed to fetch data");
    }
  }
);

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    getLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddressList.pending, (state) => {
        state.loadingAddressList = true;
        state.addressList = [];
      })
      .addCase(fetchAddressList.fulfilled, (state, action) => {
        state.loadingAddressList = false;
        state.addressList = action.payload?.addressList;
      })
      .addCase(fetchAddressList.rejected, (state, action) => {
        state.loadingAddressList = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});
export const { getLocation } = mapSlice.actions;
export default mapSlice.reducer;
