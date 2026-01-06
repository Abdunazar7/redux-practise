import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    add: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, reset, add } = counterSlice.actions;
export default counterSlice.reducer;
