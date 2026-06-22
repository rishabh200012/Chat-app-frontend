import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import errorReducer from "./errorMiddleware/errorSlice.ts";

import createWebStorage from "redux-persist/es/storage/createWebStorage";

import { persistReducer, persistStore } from "redux-persist";

const storage = createWebStorage("local");

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    error: errorReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
