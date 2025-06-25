// ** Redux Imports
/* eslint-disable */
import rootReducer from "./rootReducer"
import { configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,

  // Optionally, you can blacklist/whitelist specific reducers
  // whitelist: ['someReducer'],
  // blacklist: ['someReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
