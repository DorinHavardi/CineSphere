import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer
    }
});

export const persistor = persistStore(store);