import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/index.css";

import { AppProvider } from "./Components/Contexts/AppContext";
import App from "./Components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
