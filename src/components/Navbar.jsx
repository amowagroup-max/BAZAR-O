// src/components/Navbar.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, User, Search } from "lucide-react";
import SideMenu from "./SideMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.length;
  const userMenuRef = useRef(null);

  // التحقق من حالة تسجيل الدخول
  const isAuthenticated = !!localStorage.getItem("authToken");

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md"
      role="banner"
    >
      {/* شريط واحد فقط — يحتوي على كل العناصر في مستوى واحد */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* يسار: زر Boutique + قائمة المستخدم + سلة التسوق */}
        <div className="flex items-center gap-4">
          {/* زر "Boutique" */}
          <Link
            to="/products"
            className="flex items-center gap-1 bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Boutique
          </Link>

          {/* قائمة المستخدم */}
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated ? (
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-medium text-white hover:text-yellow-400 transition"
                aria-label="Menu utilisateur"
                aria-expanded={userMenuOpen}
              >
                <User className="w-5 h-5" />
                Mon compte
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm font-medium text-white hover:text-yellow-400 transition"
              >
                <User className="w-5 h-5" />
                Se connecter
              </Link>
            )}

            {isAuthenticated && userMenuOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-black text-white font-medium rounded-md shadow-lg py-2 z-50 border border-gray-700"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2.5 hover:bg-gray-800 transition"
                  onClick={() => setUserMenuOpen(false)}
                >
                  👤 Mon profil
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2.5 hover:bg-gray-800 transition"
                  onClick={() => setUserMenuOpen(false)}
                >
                  📦 Mes commandes
                </Link>
                <hr className="my-1 border-gray-700 opacity-50" />
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-gray-300 hover:bg-gray-800 transition"
                >
                  🔑 Déconnexion
                </button>
              </div>
            )}
          </div>

          {/* سلة التسوق */}
          <Link 
            to="/cart" 
            className="relative cursor-pointer p-1"
          >
            <ShoppingCart className="w-5 h-5 text-white hover:text-yellow-400 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-[10px] px-[5px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* وسط: شريط البحث الطويل */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des produits, marques ou catégories..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-700"
              aria-label="Recherche"
            />
          </div>
        </div>

        {/* يمين: شعار BAZARO الكبير + أيقونة القائمة */}
<div className="flex items-center gap-2">
  {/* شعار BAZARO — كبير ومميز */}
  <Link to="/" className="relative">
  <img
    src="/logo.png"
    alt="BAZARO Logo"
    className="h-20 w-auto object-contain drop-shadow-md cursor-pointer"
  />
</Link>
  
  {/* أيقونة القائمة الجانبية */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="p-1 rounded-full hover:bg-gray-800 transition"
    aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
  >
    <Menu className="w-6 h-6 text-white hover:text-yellow-400" />
  </button>
</div>
      </div>

      {/* القائمة الجانبية */}
      <SideMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
}
