// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./Slices/counterSlice/counterSlice";
// import formReducer from "./Slices/FormSlice/FormSlice";
// import productReducer from "./Slices/ProductSlice/productSlice";
// import { productApi } from "./Slices/productApi";
// import { categoryApi } from "./Slices/categoryApi";
// import authReducer from "./Slices/AuthSlice/authSlice"
// // Added to ensure RTK-Query middleware is correctly registered
// const store = configureStore({
//   reducer: {
//     [productApi.reducerPath]: productApi.reducer,
//     [categoryApi.reducerPath]: categoryApi.reducer,
//     counter: counterReducer,
//     form: formReducer,
//     product: productReducer,
//     auth:authReducer
//     // cart: cartReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(productApi.middleware, categoryApi.middleware),
// });

// // Define RootState and AppDispatch types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
