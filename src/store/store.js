// store.js

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import postalReducer from "./postalSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    postal : postalReducer
  },
});