import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import routes from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.ts";
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routes} />
       </PersistGate>
      <Toaster richColors />
    </Provider>
  </StrictMode>
);
