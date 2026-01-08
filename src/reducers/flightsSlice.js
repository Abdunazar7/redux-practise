import { createSlice } from "@reduxjs/toolkit";

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    nextFlightId: 1,
  },
  reducers: {
    addFlight: (state, action) => {
      state.flights.push({
        id: state.nextFlightId,
        ...action.payload,
      });
      state.nextFlightId += 1;
    },
  },
});

export const { addFlight } = flightsSlice.actions;
export default flightsSlice.reducer;
