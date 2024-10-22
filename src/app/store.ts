import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userAPI } from "../features/users/userAPI";
import { loginAPI } from "../features/login/loginAPI";
import { blogsAPI } from "../features/blogs/blogsAPI";
import userSlice from "../features/users/userSlice";


// persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // only user will be persisted
}

// combine reducers
const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [blogsAPI.reducerPath]: blogsAPI.reducer,
    user: userSlice,
});

// add persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(userAPI.middleware).concat(userAPI.middleware).concat(userAPI.middleware,
        loginAPI.middleware,
        blogsAPI.middleware,
    ),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch