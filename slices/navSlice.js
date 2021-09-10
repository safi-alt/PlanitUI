import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  user: null,
  guide: null,
  guideLocation: null,
  startTrip: null,
  order: null,
  payment: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setGuide: (state, action) => {
      state.guide = action.payload;
    },
    setGuideLocation: (state, action) => {
      state.guideLocation = action.payload;
    },
    setStartTrip: (state, action) => {
      state.startTrip = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const {
  setDestination,
  setOrigin,
  setTravelTimeInformation,
  setUser,
  setGuide,
  setGuideLocation,
  setStartTrip,
  setOrder,
  setPayment,
} = navSlice.actions;

// Slectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectUser = (state) => state.nav.user;
export const selectGuide = (state) => state.nav.guide;
export const selectGuideLocation = (state) => state.nav.guideLocation;
export const selectStartTrip = (state) => state.nav.startTrip;
export const selectOrder = (state) => state.nav.order;
export const selectPayment = (state) => state.nav.payment;

export default navSlice.reducer;
