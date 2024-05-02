import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContext from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenContext from "./context/TokenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeContext>
      <TokenContext>
        <App />
      </TokenContext>
    </ThemeContext>
    <ToastContainer />
  </BrowserRouter>
);
