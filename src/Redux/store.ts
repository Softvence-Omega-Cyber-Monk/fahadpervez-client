import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./BaseApi";
// import { categoryApi } from "../store/Slices/categoryApi";
import productSlice from "../store/Slices/ProductSlice/productSlice";
import authReducer from "../store/Slices/AuthSlice/authSlice";
import { persistStore, persistReducer,  REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE, FLUSH  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSlice from "../store/Slices/CartSlice/cartSlice";
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        // [categoryApi.reducerPath]: categoryApi.reducer,
        product: productSlice,
        auth:persistedAuthReducer,
        cart:cartSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }).concat(baseApi.middleware);
    }
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store

// export const store = createStore(persistedReducer)
export const persistor= persistStore(store)