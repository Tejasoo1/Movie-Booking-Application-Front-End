import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationsAndTheaters: [],
  currLocation: "Mumbai",
  currDates: [],
  selectedTime: "",
  selectedTheater: {},
  NoOfSeats: 2,
  selectedDate: "",
};

const locationsAndTheatersSlice = createSlice({
  name: "locations&Theaters",
  initialState,
  reducers: {
    updateLocations(state, action) {
      state.locationsAndTheaters = action.payload;
    },

    updateCurrLocation(state, action) {
      state.currLocation = action.payload;
    },

    updatesCurrDates(state, action) {
      state.currDates = action.payload;
    },

    updateTime(state, action) {
      state.selectedTime = action.payload;
    },

    updateTheater(state, action) {
      state.selectedTheater = action.payload;
    },

    updateSeatNo(state, action) {
      state.NoOfSeats = action.payload;
    },

    updateSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  updateLocations,
  updateCurrLocation,
  updatesCurrDates,
  updateTime,
  updateTheater,
  updateSeatNo,
  updateSelectedDate,
} = locationsAndTheatersSlice.actions;

export default locationsAndTheatersSlice.reducer;
