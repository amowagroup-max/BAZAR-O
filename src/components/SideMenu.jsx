import React, { useEffect } from "react";
import {
  User,
  ShoppingBag,
  Baby,
  Watch,
  Monitor,
  Home,
  Dumbbell,
  Percent,
  X,
} from "lucide-react";

export default function SideMenu({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const categories = [
    { name: "Nettoyage & Soins", icon: Baby },       // 👶 → نظافة وعناية (خصوصًا للأطفال/بشرة)
    { name: "Alimentation", icon: Home },            // 🏠 → طبخ/منزل → مناسب للمواد الغذائية
    { name: "Construction", icon: Dumbbell },        // 💪 → قوة/تشييد — أفضل رمز متوفر
    { name: "Décoration & Finition", icon: Watch },  // ⌚ → دقة/إتقان → يُستخدم في جوميا للفئات الراقية
    { name: "Meubles", icon: Home },                 // 🏠 → واضح
    { name: "Outils & Équipements", icon: Dumbbell },// 💪 → أدوات/رياضة/قوة
    { name: "Papeterie & Bureau", icon: Watch },     // ⌚ → دقة/تنظيم
    { name: "Électroménager", icon: Monitor },       // 💻 → إلكترونيات → أنسب متوفر
    { name: "Produits Saisonniers", icon: ShoppingBag }, // 🛍️ → تسوق/عروض موسمية
    { name: "Promotions", icon: Percent },           // % → كما في الأصل
  ];

  return (
    <>
      {/* خلفية شفافة عند فتح القائمة */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 z-40 ${
          isOpen ? "opacity-60 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* القائمة من اليمين */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 
          bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a]
          text-white z-50 transform transition-transform duration-500
          ease-[cubic-bezier(0.77,0,0.175,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* الرأس */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-400 tracking-wide">
            Catégories
          </h3>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="text-white hover:text-yellow-400 transition-transform duration-300 hover:rotate-90"
          >
            <X size={22} />
          </button>
        </div>

        {/* القائمة */}
        <nav className="p-4">
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="flex items-center gap-3 px-3 py-2 rounded-md
                border border-transparent
                hover:border-yellow-500
                hover:bg-[#1c1c1c]
                hover:text-yellow-400
                transition-all duration-300 ease-out transform hover:scale-[1.03]"
              >
                <cat.icon
                  size={18}
                  className="text-white opacity-85 transition-colors duration-300"
                />
                <span className="font-medium tracking-wide">{cat.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}