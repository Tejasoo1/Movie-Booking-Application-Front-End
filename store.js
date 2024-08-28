import { configureStore } from '@reduxjs/toolkit';
import locationsAndTheatersReducer from './src/components/locationsAndTheatersSlice';
import movieReducer from './src/components/movieSlice';
import seatsReducer from './src/components/seatsSlice';
import userReducer from './src/components/userSlice';

const store = configureStore({
  reducer: {
    locationAndTheater: locationsAndTheatersReducer,
    movies: movieReducer,
    seatsAndBookingInfo: seatsReducer,
    userInfo: userReducer,
  },
});

export default store;
