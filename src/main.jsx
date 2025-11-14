import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom"; // ✅ مستورد

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ غلف CartProvider ب BrowserRouter */}
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);




