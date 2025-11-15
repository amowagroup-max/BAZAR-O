import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ModernAdSlider from "../components/ModernAdSlider";
import ProductCard from "../components/ProductCard";
import HorizontalProductStrip from "../components/HorizontalProductStrip";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, old_price, discount, image_url, category");

      if (!error) setProducts(data || []);
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold animate-pulse text-gray-600">
        Chargement des produits...
      </div>
    );

  const formatted = products.map((p) => ({
    id: p.id,
    title: p.name,
    price: p.price,
    originalPrice: p.old_price,
    image: p.image_url,
    badge: p.discount > 0 ? `-${p.discount}%` : null,
    category: p.category,
  }));

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen font-sans">
      <Navbar />

      <div className="w-full max-w-[1450px] mx-auto px-3 md:px-6">

        {/* HERO SECTION */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Slider */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10">
            <ModernAdSlider />
          </div>

          {/* Side Banners */}
          <div className="hidden lg:flex flex-col gap-4">
            <img src="/ads/side1.jpg" className="rounded-3xl shadow-xl hover:scale-[1.02] duration-300" />
            <img src="/ads/side2.jpg" className="rounded-3xl shadow-xl hover:scale-[1.02] duration-300" />
          </div>
        </div>

        {/* ICON STRIP */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
          {[
            ["🚚", "Livraison rapide"],
            ["💳", "Paiement sécurisé"],
            ["⭐", "Qualité supérieure"],
            ["🎁", "Offres quotidiennes"],
            ["📦", "Emballage soigné"],
            ["💬", "Support 24/7"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="bg-white shadow-lg p-4 rounded-2xl flex flex-col items-center text-sm font-semibold hover:shadow-2xl duration-300 cursor-pointer"
            >
              <span className="text-3xl">{icon}</span>
              <span className="mt-1 text-gray-700">{label}</span>
            </div>
          ))}
        </div>

        {/* FLASH SALE SECTION */}
        <section className="mt-10 bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-3xl shadow-2xl text-white">
          <h2 className="text-2xl font-extrabold mb-4 tracking-wide">🔥 Promotions exceptionnelles — Offre limitée</h2>
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <HorizontalProductStrip products={formatted.slice(0, 10)} />
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🆕 Nouveautés</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {formatted.slice(10, 22).map((p) => (
              <div 
                key={p.id} 
                className="transform hover:-translate-y-1 hover:shadow-2xl duration-300 rounded-2xl"
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </section>

        {/* PREMIUM CATEGORIES */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">📂 Catégories principales</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {["Peintures", "Produits de nettoyage", "Matériaux de construction", "Outils électriques", "Maison", "Jardin"].map((cat) => (
              <div
                key={cat}
                className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:bg-gray-50 text-center font-bold text-gray-700 cursor-pointer hover:scale-[1.05] duration-300"
              >
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">🏆 Meilleures ventes</h2>
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <HorizontalProductStrip products={formatted.slice(5, 15)} />
          </div>
        </section>

        {/* LUXURY PROMO BANNER */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl">
          <img src="/ads/big-sale.jpg" className="w-full" />
        </div>

        {/* YOU MAY ALSO LIKE */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">✨ Suggestions pour vous</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {formatted.map((p) => (
              <div 
                key={p.id} 
                className="hover:-translate-y-1 duration-300 hover:shadow-2xl rounded-2xl"
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
