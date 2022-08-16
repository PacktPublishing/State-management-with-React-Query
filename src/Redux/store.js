import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./countSlice";

export default configureStore({
  reducer: {
    counter: countReducer,
  },
});
