import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./reducers/counterSlice";
import usersReducer from "./reducers/userSlice";
import flightsReducer from "./reducers/flightsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    flights: flightsReducer,
  },
});
