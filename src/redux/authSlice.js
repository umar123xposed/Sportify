/* eslint-disable */
// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    user: {},
  },
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
      console.log(action.payload, "what is thsi");

      // state[config.storageTokenKeyName] =
      // action.payload[config.storageTokenKeyName];

      // localStorage.setItem(
      //   config.storageTokenKeyName,
      //   JSON.stringify( action.payload.accessToken )
      // );
      //
    },

    handleLogout: (state , action) => {
      state.authSlice = {};
      state.user = null;
      state.role = null
    },
    handleRole: (state, action) => {
      state.role = action.payload;
    },

    handleAuth: (state, action) => {
      state.user.accessToken = action?.payload?.accessToken;
      state.user.refreshToken = action?.payload?.refreshToken;
    },
  },
});

export const {
  handleRole,
  handleLogin,
  handleLogout,
  handleUserDetails,
  handleAuth,
  handleSave,
} = authSlice.actions;

export default authSlice.reducer;
