import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import BlockchainProvider from "./context/BlockchainContext";
import App from "./App";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlockchainProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlockchainProvider>
  </React.StrictMode>
);
