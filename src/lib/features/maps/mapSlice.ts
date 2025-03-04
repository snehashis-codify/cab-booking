import { AdressListObj, MapSliceState } from "@/types/map";
import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SessionToken } from "@mapbox/search-js-core";
const initialState: MapSliceState = {
  sourceCords: {
    latitude: null,
    longitude: null,
  },
  destinationCords: {
    latitude: null,
    longitude: null,
  },

  addressList: [],
  coordinates: [],
  distance: 0,
  duration: 0,
  error: null,
  loadingAddressList: false,
  loadingMapdatabyId: false,
  loadingRouteDirection: false,
};
export const fetchAddressList = createAsyncThunk(
  "map/fetchAddressList",
  async (args: { address: string }, thunkAPI) => {
    const { address } = args;
    const token = new SessionToken();
    try {
      const response = await axiosInstance.get(
        `/search/searchbox/v1/suggest?q=${address}&session_token=${token.id}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&limit=8&country=IN`
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
export const fetchMapdataByAddress = createAsyncThunk(
  "map/fetchMapdataByAddress",
  async (args: { mapboxId: string; addressType: string }, thunkAPI) => {
    const { addressType, mapboxId } = args;
    const token = new SessionToken();
    try {
      const response = await axiosInstance.get(
        `/search/searchbox/v1/retrieve/${mapboxId}?session_token=${token}&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
      );

      return {
        addressType: addressType,
        retriveMapIdData: response.data.features,
      };
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("Failed to fetch data");
    }
  }
);

export const getDirectionRoute = createAsyncThunk(
  "map/getDirectionRoute",
  async (
    args: {
      sourceLat: number;
      sourceLong: number;
      destLat: number;
      destLong: number;
    },
    thunkAPI
  ) => {
    const { sourceLat, sourceLong, destLat, destLong } = args;
    try {
      const response = await axiosInstance.get(
        `/directions/v5/mapbox/driving/${sourceLong},${sourceLat};${destLong},${destLat}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
      );
      return {
        distance: response.data.routes[0].distance,
        duration: response.data.routes[0].duration,
        coordinates: response.data.routes[0].geometry.coordinates,
      };
    } catch (error) {
      console.error(error);
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
      state.sourceCords.latitude = latitude;
      state.sourceCords.longitude = longitude;
    },
    resetAddressList: (state) => {
      state.addressList = [];
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
        state.addressList = action.payload?.addressList.reduce(
          (
            acc: Array<AdressListObj>,
            curr: {
              full_address?: string;
              name: string;
              address?: string;
              mapbox_id: string;
            }
          ) => {
            if (curr.mapbox_id) {
              acc.push({
                mapbox_id: curr.mapbox_id,
                address: curr.full_address ? curr.full_address : curr.name,
              });
            }
            return acc;
          },
          []
        );
      })
      .addCase(fetchAddressList.rejected, (state, action) => {
        state.loadingAddressList = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(fetchMapdataByAddress.pending, (state) => {
        state.loadingMapdatabyId = true;
      })
      .addCase(fetchMapdataByAddress.fulfilled, (state, action) => {
        state.loadingMapdatabyId = false;
        const getCoords = action.payload?.retriveMapIdData.reduce(
          (
            acc: { latitude: number; longitude: number },
            curr: {
              properties: { mapbox_id: string };
              geometry: { coordinates: Array<number> };
            }
          ) => {
            if (curr.properties.mapbox_id) {
              acc.latitude = curr.geometry.coordinates[1];
              acc.longitude = curr.geometry.coordinates[0];
            }
            return acc;
          },
          {}
        );
        switch (action.payload?.addressType) {
          case "source":
            state.sourceCords.latitude = getCoords.latitude;
            state.sourceCords.longitude = getCoords.longitude;
            break;
          case "destination":
            state.destinationCords.latitude = getCoords.latitude;
            state.destinationCords.longitude = getCoords.longitude;
            break;
          default:
            break;
        }
        state.addressList = [];
      })
      .addCase(fetchMapdataByAddress.rejected, (state, action) => {
        state.loadingMapdatabyId = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(getDirectionRoute.pending, (state) => {
        state.loadingRouteDirection = true;
        state.distance = 0;
        state.coordinates = [];
      })
      .addCase(getDirectionRoute.fulfilled, (state, action) => {
        state.loadingRouteDirection = false;
        state.distance = action.payload?.distance * 0.001;
        state.duration = action.payload?.duration / 60;
        state.coordinates = action.payload?.coordinates;
      })
      .addCase(getDirectionRoute.rejected, (state, action) => {
        state.loadingRouteDirection = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});
export const { getLocation, resetAddressList } = mapSlice.actions;
export default mapSlice.reducer;
