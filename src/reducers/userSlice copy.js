import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUserIds: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        ...action.payload,
        flightId: null,
      });
    },

    toggleUser: (state, action) => {
      const id = action.payload;
      if (state.selectedUserIds.includes(id)) {
        state.selectedUserIds = state.selectedUserIds.filter((u) => u !== id);
      } else {
        state.selectedUserIds.push(id);
      }
    },

    assignFlightToUsers: (state, action) => {
      const flightId = action.payload;

      state.users.forEach((user) => {
        if (state.selectedUserIds.includes(user.id)) {
          user.flightId = flightId;
        }
      });

      state.selectedUserIds = [];
    },
  },
});

export const { addUser, toggleUser, assignFlightToUsers } = userSlice.actions;

export default userSlice.reducer;
