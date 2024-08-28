import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  signInData: {},
  bookingHistory: [],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },

    updateSignInDetails(state, action) {
      state.signInData = action.payload;
    },

    updateBookingHistory(state, action) {
      state.bookingHistory.push(action.payload);
    },
  },
});

export const {
  updateAuthentication,
  updateSignInDetails,
  updateBookingHistory,
} = userSlice.actions;

export default userSlice.reducer;
