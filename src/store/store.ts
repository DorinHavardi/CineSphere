import { configureStore, createImmutableStateInvariantMiddleware, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/auth.slice";
import moviesReducer from "./reducers/movies.slice";
import systemReducer from "./reducers/system.slice";
import tvShowsReducer from "./reducers/tvShows.slice";

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const getSerializableMiddleware = () =>
    createSerializableStateInvariantMiddleware({
        ignoredActions: ["persist/PERSIST"]
    });


export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        movies: moviesReducer,
        tvShows: tvShowsReducer,
        system: systemReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['persist/PERSIST'],
            // Ignore these field paths in all actions and states
            ignoredPaths: ['auth']
        },
        immutableCheck: true,
    })
        .concat([
            getSerializableMiddleware(),
            createImmutableStateInvariantMiddleware(),
        ])
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;