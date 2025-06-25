/* eslint-disable */
// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    upgradePrice: "",
    upgradeSport: "",
    profile: {
      type: "Basic",
      price: null,
      sport: null,
      profileInformation: {
        profile_type: null,
        profile_detail: null,
        social: [
          {
            type: null,
            link: null,
          },
        ],
        picture: null,
        phone: null,
        nick_name: null,
        gender: null,
        full_name: null,
        dob: null,
      },
    },
  },

  reducers: {
    handleUpgradePrice: (state, action) => {
      state.upgradePrice = action.payload;
    },
    handleSportName: (state, action) => {
      state.upgradeSport = action.payload;
    },
    handleProfile: (state, action) => {
      state.profile = action.payload;
      console.log(action.payload, "what is thsi");
    },

    handlePackageType: (state, action) => {
      state.profile.PackageName = action.payload;
     // console.log(action.payload, "what is thsi");
    },

    handleProfileType: (state, action) => {
      console.log(state.profile, "hammad");
      console.log(action.payload, "what is thsi");
      state.profile.type = action.payload.type;
      state.profile.price = action.payload.price;
    },

    handleSportType: (state, action) => {
      state.profile.sport = action.payload;
    },

    handleCreateBasicProfile: (state, action) => {
      console.log(state.profile, "hammad");
      console.log(action.payload, "what is thsi");
      state.profile.basicProfile = action.payload;
    },

    handleAtheleteInfo: (state, action) => {
      console.log(state.profile, "hammad");
      console.log(action.payload, "what is thsi");
      state.profile.basicProfile.profile_detail.advanced = {
        ...state.profile.basicProfile.profile_detail.advanced,
        ...action.payload,
      };
    },
    handleAddQR: (state, action) => {
      console.log(action.payload, "what is payload")
      state.qr = action.payload
    },
    handleAddQuantity: (state, action) => {
      console.log(action.payload, "what is Quant")
      state.quantity = action.payload
    },

    handleClearProfile: (state, action) => {
      state.profile = {
        profile: {
          type: "Basic",
          price: null,
          sport: null,
          profileInformation: {
            profile_type: null,
            profile_detail: null,
            social: [
              {
                type: null,
                link: null,
              },
            ],
            picture: null,
            phone: null,
            nick_name: null,
            gender: null,
            full_name: null,
            dob: null,
          },
        },
      };
    },
    handleClearProfiles: (state, action) => {
      state.profile.basicProfile = null;
    },
    setCoachAction: (state, action) => {
      state.coachAction = action.payload;
    },
    setOrganizationType: (state, action) => {
      state.organizationType = action.payload;
    },
    setPurchaseId: (state, action) => {
      state.purchaseId = action.payload;
    },
    setPaymentMethodId: (state, action) => {
      state.paymentMethodId = action.payload;
    },
    setClubName: (state, action) => {
      state.clubName = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setCode: (state, action) => {
      state.Code = action.payload;
    },
    setLocation:(state, action)=>{
      state.Location= action.payload;
    },
    setPhoneNumbers:(state, action)=>{
      state.PhoneNumbers= action.payload;
    },
    setCitys:(state, action)=>{
      state.Citys= action.payload
    },
    setCountrys:(state, action)=>{
      state.Countrys= action.payload
    },
    setPrice:(state, action)=>{
      state.Price= action.payload
    },
    setPackageName:(state, action)=>{
      state.PackageName= action.payload
    }
  },
});

export const {
  handleProfile,
  handleProfileType,
  handleCreateBasicProfile,
  handleAtheleteInfo,
  handleClearProfiles,
  handleAddQuantity,
  handleAddQR,
  handleClearProfile,
  handleSportType,
  setCoachAction,
  setOrganizationType,
  setPurchaseId,
  setPaymentMethodId,
  setClubName,
  setFullName,
  setPhone,
  handlePackageType,
  setCode,
  setLocation,
  setPhoneNumbers,
  setCountrys,
  setCitys,
  setPrice,
  setPackageName,
  handleSportName,
  handleUpgradePrice
} = profileSlice.actions;

export default profileSlice.reducer;
