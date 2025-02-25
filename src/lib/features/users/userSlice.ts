import { CredentialArgs, sliceState } from "@/types/user";
import { auth } from "@/utils/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialState: sliceState = {
  userId: "",
  name: "",
  email: "",
  loadingSignup: false,
  loadingSignin: false,
  error: null,
};

export const handleSignup = createAsyncThunk(
  "user/signup",
  async (args: CredentialArgs, thunkAPI) => {
    const { email, password, navigate } = args;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      return {
        userId: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
      };
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("Failed to login");
    }
  }
);

export const handleSignin = createAsyncThunk(
  "user/signin",
  async (args: CredentialArgs, thunkAPI) => {
    const { email, password, navigate } = args;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      return {
        userId: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
      };
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("Failed to login");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const { userId, name, email } = action.payload;
      state.userId = userId;
      state.name = name;
      state.email = email;
    },
    removeUser(state) {
      state.userId = initialState.userId;
      state.name = initialState.name;
      state.email = initialState.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignup.pending, (state) => {
        state.loadingSignup = true;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.loadingSignup = false;
        state.name = action.payload?.name;
        state.userId = action.payload?.userId;
        state.email = action.payload?.email;
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.loadingSignup = false;
        state.error = action.error.message;
      })
      .addCase(handleSignin.pending, (state) => {
        state.loadingSignin = true;
      })
      .addCase(handleSignin.fulfilled, (state, action) => {
        state.loadingSignin = false;
        state.name = action.payload?.name;
        state.userId = action.payload?.userId;
        state.email = action.payload?.email;
      })
      .addCase(handleSignin.rejected, (state, action) => {
        state.loadingSignin = false;
        state.error = action.error.message;
      });
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
