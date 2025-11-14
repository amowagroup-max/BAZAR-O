// src/pages/Home.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import ModernAdSlider from "../components/ModernAdSlider";
import ProductCard from "../components/ProductCard";
import HorizontalProductStrip from "../components/HorizontalProductStrip";

export default function Home() {
  const mockData = {
    flashDeals: [
      { title: "TV 55\" Smart", price: "2500", originalPrice: "4000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/2726/1.jpg?2874", badge: "خصم 38%" },
      { title: "Mixer 1000W", price: "8500", originalPrice: "12000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/18/2984/1.jpg?8389", badge: "خصم 29%" },
      { title: "Machine à Café", price: "6200", originalPrice: "8500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/21/7756/1.jpg?0982", badge: "خصم 27%" },
      { title: "Set Outils PRO", price: "7800", originalPrice: "11000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/4185/1.jpg?8055", badge: "خصم 29%" },
      { title: "Micro-Ondes", price: "3800", originalPrice: "5000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/38/5725/1.jpg?4890", badge: "خصم 24%" }
    ],
    trending: [
      { title: "Plante Artificielle", price: "2400", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/26/2575/1.jpg?6894", badge: "ترند" },
      { title: "Horloge Murale", price: "3200", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/6626/1.jpg?1650", badge: "ترند" },
      { title: "Pistolet à Colle", price: "1800", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/2175/1.jpg?6772", badge: "ترند" },
      { title: "TV OLED 55\"", price: "2800", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/7865/1.jpg?9491", badge: "ترند" },
      { title: "Ensemble Cuisine", price: "8500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/3456/1.jpg?1122", badge: "ترند" }
    ],
    bestSellers: [
      { title: "TCL Google TV", price: "3500", originalPrice: "4500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/2726/1.jpg?2874" },
      { title: "Mixer Multifonction", price: "12000", originalPrice: "15000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/18/2984/1.jpg?8389" },
      { title: "Machine à Café", price: "6800", originalPrice: "8500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/75/8185/1.jpg?2808" },
      { title: "Set Outils 100 Pièces", price: "9500", originalPrice: "12000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/4185/1.jpg?8055" },
      { title: "Plante Artificielle", price: "2400", originalPrice: "3000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/26/2575/1.jpg?6894" }
    ],
    newArrivals: [
      { title: "Lampe LED Moderne", price: "1500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/2726/1.jpg?2874", badge: "جديد" },
      { title: "Robot Cuisine Pro", price: "22000", originalPrice: "28000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/18/2984/1.jpg?8389", badge: "جديد" },
      { title: "Micro-Ondes Slim", price: "3900", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/38/5725/1.jpg?4890", badge: "جديد" },
      { title: "Horloge Digitale", price: "2800", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/6626/1.jpg?1650", badge: "جديد" },
      { title: "Set Vaisselle Luxe", price: "6500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/3456/1.jpg?1122", badge: "جديد" }
    ],
    related: [
      { title: "Machine à Café", price: "8000", originalPrice: "8500", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/21/7756/1.jpg?0982" },
      { title: "Capsules Café", price: "1658", originalPrice: "2000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/7865/1.jpg?9491" },
      { title: "Filtres Melitta", price: "720", originalPrice: "800", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/4185/1.jpg?8055" },
      { title: "Réservoir Eau", price: "7000", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/38/5725/1.jpg?4890" },
      { title: "Adaptateur H1", price: "5090", originalPrice: "5150", image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/2726/1.jpg?2874" }
    ]
  };

  return (
    <div className="bg-white">
      <Navbar />
      <ModernAdSlider />

      {/* 🔴 بنر شحن مجاني — مساحة صغيرة */}
      <div className="py-1 px-2 bg-[#E50012] text-center text-xs font-bold text-white">
        🚚 Livraison gratuite dans 48h sur les commandes supérieures à 5000 DA !
      </div>

      {/* قسم "آخر بحث" — مسافة صغيرة */}
      <section className="py-2 px-2 bg-[#FFF8E6]">
        <h2 className="text-lg font-bold mb-1">🔍 Dernière Recherche</h2>
        <HorizontalProductStrip products={mockData.flashDeals} />
      </section>

      {/* 🔴 بنر خصومات — مساحة صغيرة */}
      <div className="py-2 px-2 bg-gradient-to-r from-[#E50012] to-[#A0000D] text-center text-sm font-extrabold text-white">
        🔥 SOLDES JUSQU'À -70% — Profitez-en avant la fin des stocks !
      </div>

      {/* قسم "عروض اليوم" — شبكة ضيقة */}
      <section className="py-2 px-2">
        <h2 className="text-lg font-bold mb-1">⚡ Offres du Jour</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
          {mockData.flashDeals.map((p, i) => (
            <ProductCard key={`flash-${i}`} {...p} />
          ))}
        </div>
      </section>

      {/* 🔴 بنر توصيل سريع — مساحة صغيرة */}
      <div className="py-2 px-2 bg-[#FF001A] text-center text-xs font-bold text-white">
        📦 Livraison rapide partout en Algérie — Commandez maintenant !
      </div>

      {/* قسم "الأكثر مبيعًا" — سلايدر أفقي */}
      <section className="py-2 px-2 bg-gray-50">
        <h2 className="text-lg font-bold mb-1">🏆 Les Plus Vendus</h2>
        <HorizontalProductStrip products={mockData.bestSellers} />
      </section>

      {/* قسم "جديدنا" — شبكة ضيقة */}
      <section className="py-2 px-2">
        <h2 className="text-lg font-bold mb-1">🆕 Nouveautés</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
          {mockData.newArrivals.map((p, i) => (
            <ProductCard key={`new-${i}`} {...p} />
          ))}
        </div>
      </section>

      {/* 🔴 بنر boutiques — مساحة صغيرة */}
      <div className="py-2 px-2 bg-[#E50012] text-center text-xs font-bold text-yellow-200">
        💡 Découvrez nos boutiques officielles : Lenovo, Samsung, TCL & plus encore !
      </div>

      {/* قسم "منتجات مرتبطة" — سلايدر أفقي */}
      <section className="py-2 px-2 bg-blue-50">
        <h2 className="text-lg font-bold mb-1">📦 Produits Associés</h2>
        <HorizontalProductStrip products={mockData.related} />
      </section>

      {/* قسم "اكتشف المزيد" — شبكة ضيقة */}
      <section className="py-2 px-2">
        <h2 className="text-lg font-bold mb-1">🔎 Découvrez davantage</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
          {mockData.trending.concat(mockData.bestSellers).slice(0, 12).map((p, i) => (
            <ProductCard key={`more-${i}`} {...p} />
          ))}
        </div>
      </section>

      {/* 🔴 بنر أمان — مساحة صغيرة */}
      <div className="py-2 px-2 bg-[#D00010] text-center text-xs font-semibold text-white">
        🛍️ Achetez en toute sécurité — Retours faciles et garantie de satisfaction !
      </div>

    </div>
  );
}