// src/pages/Home.jsx
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
    return <div className="text-center py-10">جاري تحميل المنتجات...</div>;

  // إعادة تهيئة فورمات المنتج
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* SLIDER الرئيسي */}
      <div className="mt-2">
        <ModernAdSlider />
      </div>

      {/* Mini Banners */}
      <div className="grid grid-cols-3 gap-2 p-3">
        <img src="/ads/free-delivery.jpg" className="rounded-xl" />
        <img src="/ads/flash-sale.jpg" className="rounded-xl" />
        <img src="/ads/coupons.jpg" className="rounded-xl" />
      </div>

      {/* Flash Sales */}
      <section className="mt-3 bg-[#FFE8E8] p-3 rounded-xl mx-3">
        <h2 className="text-lg font-bold mb-2">🔥 تخفيضات اليوم (Flash Sale)</h2>
        <HorizontalProductStrip products={formatted.slice(0, 10)} />
      </section>

      {/* New Arrivals */}
      <section className="mt-6 px-3">
  <div className="max-w-[800px] mx-auto px-2">
    <h2 className="text-lg font-bold mb-2">🆕 أحدث المنتجات</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {formatted.slice(10, 22).map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  </div>
</section>


      {/* Categories */}
      <section className="mt-6 px-3">
        <h2 className="text-lg font-bold mb-3">📂 التصنيفات</h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white p-3 rounded-xl shadow text-center">دهانات</div>
          <div className="bg-white p-3 rounded-xl shadow text-center">مواد التنظيف</div>
          <div className="bg-white p-3 rounded-xl shadow text-center">معدات البناء</div>
          <div className="bg-white p-3 rounded-xl shadow text-center">الأدوات الكهربائية</div>
        </div>
      </section>

      {/* Best Selling */}
      <section className="mt-6 px-3">
        <h2 className="text-lg font-bold mb-2">🏆 الأكثر مبيعًا</h2>
        <HorizontalProductStrip products={formatted.slice(5, 15)} />
      </section>

      {/* Large Promo Banner */}
      <div className="mt-6 px-3">
        <img src="/ads/big-sale.jpg" className="rounded-2xl shadow" />
      </div>

      {/* Recommended */}
      <section className="mt-6 px-3">
        <h2 className="text-lg font-bold mb-2">✨ قد يعجبك أيضًا</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
          {formatted.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 p-4 bg-black text-white text-center">
        Ⓒ 2025 Mon Boutique — جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
