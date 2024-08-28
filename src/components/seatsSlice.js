import { createSlice } from "@reduxjs/toolkit";

let initialRows = [
  {
    section: "Rs. 550 Premium",
    seatsInfo: [
      {
        rowName: "M",
        seatNos: Array.from({ length: 11 }, (_, i) => ({
          category: "Rs. 550 Premium",
          rowName: "M",
          no: 11 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "L",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 550 Premium",
          rowName: "L",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "K",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 550 Premium",
          rowName: "K",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
    ],
  },
  {
    section: "Rs. 350 EXECUTIVE",
    seatsInfo: [
      {
        rowName: "J",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "J",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "I",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "I",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "H",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "H",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "G",
        seatNos: Array.from({ length: 24 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "G",
          no: 24 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "F",
        seatNos: Array.from({ length: 24 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "F",
          no: 24 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "E",
        seatNos: Array.from({ length: 24 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "E",
          no: 24 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "D",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "D",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "C",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "C",
          no: 20 - i,
          booked: false,
          soldOut: true,
        })),
      },
    ],
  },
  {
    section: "Rs. 350 Normal",
    seatsInfo: [
      {
        rowName: "B",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 Normal",
          rowName: "B",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "A",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 Normal",
          rowName: "A",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
    ],
  },
];

const initialState = {
  rows: initialRows,
  updatedRows: {},
  totalCost: 0,
  bookedMovie: {},
  totalTickets: 0,
  seatsPageData: {},
  seatObjs: [],
};

const seatsSlice = createSlice({
  name: "seatsAndBookingInfo",
  initialState,
  reducers: {
    updateTheater(state, action) {
      state.rows = action.payload;
    },

    updateUpdatedRows(state, action) {
      state.updatedRows = action.payload;
    },

    updateTotalCost(state, action) {
      state.totalCost = action.payload;
    },

    updateBookedMovie(state, action) {
      state.bookedMovie = action.payload;
    },

    updateTotalTickets(state, action) {
      state.totalTickets = action.payload;
    },

    updateSeatsPageData(state, action) {
      state.seatsPageData = action.payload;
    },

    updateSeatObjs(state, action) {
      state.seatObjs = action.payload;
    },
  },
});

export const {
  updateTheater,
  updateUpdatedRows,
  updateTotalCost,
  updateBookedMovie,
  updateTotalTickets,
  updateSeatsPageData,
  updateSeatObjs,
} = seatsSlice.actions;

export default seatsSlice.reducer;
