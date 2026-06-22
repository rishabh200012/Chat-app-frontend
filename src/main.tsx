import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { StrictMode } from "react";

import { Provider } from "react-redux";

import { store, persistor } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
