import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./reducers/counterSlice";
import usersReducer from "./reducers/userSlice";
import flightsReducer from "./reducers/flightsSlice";
import { api } from "./services/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    flights: flightsReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
