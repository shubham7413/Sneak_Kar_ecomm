import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./providers/AuthProvider";
import TokenProvider from "./providers/TokenProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <TokenProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </TokenProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
