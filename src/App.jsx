// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart"; // ✅ غيّرها إلى Cart (بحرف C كبير) إذا كان الملف كذلك
import Profile from "./pages/Profile";
import AdSidebar from "./components/AdSidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Products from "./pages/Products";
import Deals from "./pages/Deals";
import ProductDetail from "./pages/ProductDetail"; // ← أضف هذا السطر
import ResetPassword from './pages/ResetPassword'; // ✅
import Checkout from "./pages/Checkout";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-16">
        <aside className="hidden md:block w-64 flex-shrink-0 px-4 py-6">
          <AdSidebar />
        </aside>

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* ← أضف هذا السطر */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}
