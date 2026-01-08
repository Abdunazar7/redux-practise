import { createSlice } from "@reduxjs/toolkit";

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    nextFlightId: 1,
    editingFlight: null,
  },
  reducers: {
    addFlight: (state, action) => {
      state.flights.push({
        id: state.nextFlightId,
        ...action.payload,
      });
      state.nextFlightId += 1;
    },

    deleteFlight: (state, action) => {
      state.flights = state.flights.filter((f) => f.id !== action.payload);
    },

    startEditFlight: (state, action) => {
      state.editingFlight = action.payload;
    },

    updateFlight: (state, action) => {
      const { id, data } = action.payload;
      const flight = state.flights.find((f) => f.id === id);
      if (flight) {
        Object.assign(flight, data);
      }
      state.editingFlight = null;
    },
  },
});

export const { addFlight, deleteFlight, startEditFlight, updateFlight } =
  flightsSlice.actions;

export default flightsSlice.reducer;
