// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Success from "./Success";
import Cancel from "./Cancel";
import { ProductProvider } from "./ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider >
    <App />
  </ProductProvider>
);
