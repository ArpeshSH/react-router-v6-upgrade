import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";
import { apiSlice } from "../api/apiSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
  devTools: APP_ENV !== "production"
});

setupListeners(store.dispatch);

export default store;
