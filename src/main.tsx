// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import routes from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster} from "sonner";
import { PrimeReactProvider } from 'primereact/api';
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Provider store={store}>
       <PrimeReactProvider>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
        <Toaster richColors />
       </PrimeReactProvider>
    </Provider>
  // {/* </StrictMode> */}
);
