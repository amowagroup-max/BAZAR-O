// src/pages/Deals.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Clock,
  Tag,
  ShoppingCart,
  Heart,
  ChevronDown
} from 'lucide-react';

// بيانات وهمية للعروض
const deals = [
  {
    id: 1,
    name: "Smartphone Xiaomi Redmi Note 12",
    price: "22,900 DA",
    oldPrice: "29,000 DA",
    discount: "21% OFF",
    timeLeft: "02:15:33",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=Xiaomi+Note12",
    inStock: true,
    tags: ["Offre du jour", "Livraison rapide"]
  },
  {
    id: 2,
    name: "Écouteurs Sans Fil JBL Tune 510BT",
    price: "3,490 DA",
    oldPrice: "5,200 DA",
    discount: "33% OFF",
    timeLeft: "05:42:18",
    image: "https://placehold.co/300x300/f1f5f9/475569?text=JBL+Tune",
    inStock: true,
    tags: ["Flash Sale"]
  },
  {
    id: 3,
    name: "Robe d'été imprimée - Taille L",
    price: "2,800 DA",
    oldPrice: "4,000 DA",
    discount: "30% OFF",
    timeRequired: "Achetez 2, obtenez 20% de plus",
    image: "https://placehold.co/300x300/f8fafc/334155?text=Robe+Été",
    inStock: true,
    tags: ["Mode Femme"]
  },
  {
    id: 4,
    name: "Aspirateur Robot Eufy RoboVac",
    price: "16,500 DA",
    oldPrice: "24,000 DA",
    discount: "31% OFF",
    timeLeft: "11:20:05",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=Eufy+Robot",
    inStock: false,
    tags: ["Épuisé"]
  }
];

const categories = [
  { name: "Offres du jour", icon: Flame },
  { name: "Flash Sales", icon: Clock },
  { name: "Meilleures ventes", icon: Tag },
  { name: "Nouveautés", icon: Flame }
];

export default function Deals() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* العنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-500" />
          🔥 Offres Spéciales
        </h1>
        <p className="text-gray-600 mt-1">
          Profitez de nos meilleures offres du jour — disponibles pour une durée limitée !
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* القسم الأيسر: التصنيفات */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Catégories</h2>
            <div className="space-y-2">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition ${
                      i === 0 
                        ? 'bg-yellow-100 text-yellow-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${i === 0 ? 'text-yellow-600' : 'text-gray-500'}`} />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* مؤقت العرض (للمزيد من التفاعل) */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 flex items-center gap-1">
                ⏳ Offre du jour
              </h3>
              <div className="grid grid-cols-3 gap-1 mt-2 text-center">
                {['02', '15', '33'].map((time, i) => (
                  <div key={i} className="bg-red-600 text-white rounded py-1">
                    <div className="text-lg font-bold">{time}</div>
                    <div className="text-xs">{i === 0 ? 'Hrs' : i === 1 ? 'Min' : 'Sec'}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-700 mt-2">
                Termine dans : 02h 15m 33s
              </p>
            </div>
          </div>
        </div>

        {/* القسم الأيمن: العروض */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {deals.map(deal => (
              <div 
                key={deal.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {deal.discount}
                  </div>
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 h-10">
                    {deal.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg text-gray-900">{deal.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {deal.oldPrice}
                    </span>
                  </div>

                  {/* عداد الوقت أو شرط العرض */}
                  {deal.timeLeft ? (
                    <div className="flex items-center text-xs text-red-600 mb-2">
                      <Clock className="w-3 h-3 mr-1" />
                      Se termine dans : {deal.timeLeft}
                    </div>
                  ) : deal.timeRequired ? (
                    <div className="text-xs text-blue-600 mb-2">
                      {deal.timeRequired}
                    </div>
                  ) : null}

                  {/* الوسوم */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {deal.tags.map(tag => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          tag === "Épuisé" 
                            ? "bg-red-100 text-red-800" 
                            : tag.includes("Livraison") 
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* أزرار */}
                  <div className="flex gap-2">
                    <button
                      disabled={!deal.inStock}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-sm font-medium transition ${
                        deal.inStock
                          ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {deal.inStock ? "Acheter" : "Indisponible"}
                    </button>
                    <Link
                      to={`/product/${deal.id}`}
                      className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA دعائي */}
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-black">
              🔥 Vous avez manqué une offre ?
            </h3>
            <p className="text-black/80 mt-2">
              Inscrivez-vous à nos alertes pour ne plus jamais rater une promotion !
            </p>
            <button className="mt-4 px-6 py-2.5 bg-black text-yellow-400 font-bold rounded-md hover:bg-gray-900 transition">
              Activer les alertes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}