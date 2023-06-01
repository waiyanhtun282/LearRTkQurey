import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import slice from "./services/slice";
import { contactApi } from "./api/contactApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,

    auth: slice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,contactApi.middleware),
});