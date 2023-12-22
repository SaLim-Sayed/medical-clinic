import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./features/alertSlice";
import userSlice from "./features/userSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistUserConfig = {
  key: "user",
  storage,
};
const persistedUser = persistReducer(persistUserConfig, userSlice);

const store = configureStore({
  reducer: {
    alerts: alertSlice,
    user: persistedUser,
  },
});

export default store;

export const persister = persistStore(store);
