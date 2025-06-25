import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import AuthProvider from "./components/Layouts/Protected/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
