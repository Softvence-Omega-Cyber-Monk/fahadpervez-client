import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./BaseApi";
import { categoryApi } from "../store/Slices/categoryApi";
import productSlice from "../store/Slices/ProductSlice/productSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        product: productSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApi.middleware, categoryApi.middleware);
    }
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store