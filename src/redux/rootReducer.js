// ** Reducers Imports
/* eslint-disable */
import authSlice from "./authSlice"
import {  combineReducers  } from "@reduxjs/toolkit";
import  profileSlice from "./profileSlice";

const rootReducer = combineReducers({
  authSlice,
  profileSlice,
});

// please note that ths is not actuattly // const rootReducer = { navbar , layout , authSlice }; //


export default rootReducer
