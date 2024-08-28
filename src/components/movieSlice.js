import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieDetails: [],
  selectedMovie: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateMovieDetails(state, action) {
      state.movieDetails = action.payload;
    },

    updateSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    },
  },
});

export const { updateMovieDetails, updateSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
