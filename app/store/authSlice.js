import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  email: typeof window !== "undefined" ? localStorage.getItem("email") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
      }
    },
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload, meta }) => {
        state.token = payload.token;
        state.email = meta.arg.originalArgs; 
        if (typeof window !== "undefined") {
          localStorage.setItem("token", payload.token);
          localStorage.setItem("email", meta.arg.originalArgs);
        }
      }
    );
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
