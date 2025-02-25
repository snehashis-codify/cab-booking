import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/lib/features/users/userSlice";
import mapReducer from "@/lib/features/maps/mapSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
