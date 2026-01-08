import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUserIds: [],
    nextUserId: 1,
    editingUser: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: state.nextUserId,
        flightId: null,
        ...action.payload,
      });
      state.nextUserId += 1;
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      state.selectedUserIds = state.selectedUserIds.filter(
        (id) => id !== action.payload
      );
    },

    startEditUser: (state, action) => {
      state.editingUser = action.payload;
    },

    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        Object.assign(user, data);
      }
      state.editingUser = null;
    },

    toggleUser: (state, action) => {
      const id = action.payload;
      state.selectedUserIds.includes(id)
        ? (state.selectedUserIds = state.selectedUserIds.filter(
            (i) => i !== id
          ))
        : state.selectedUserIds.push(id);
    },

    assignFlightToUsers: (state, action) => {
      const flightId = action.payload;
      state.users.forEach((u) => {
        if (state.selectedUserIds.includes(u.id)) {
          u.flightId = flightId;
        }
      });
      state.selectedUserIds = [];
    },
  },
});

export const {
  addUser,
  deleteUser,
  startEditUser,
  updateUser,
  toggleUser,
  assignFlightToUsers,
} = userSlice.actions;

export default userSlice.reducer;
