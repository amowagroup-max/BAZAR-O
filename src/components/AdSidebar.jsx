// src/components/AdSidebar.jsx
import React from "react";

export default function AdSidebar() {
  return (
    <div className="space-y-6 bg-[#FBE60E] p-4 min-h-screen h-full">
      {/* Annonce image */}
      <div className="rounded-lg overflow-hidden shadow border border-yellow-300">
        <img
          src="https://dz.jumia.is/cms/00000000000_BF25/1/TD/st.gif" // ✅ بدون مسافات
          alt="Annonce"
          className="w-full h-auto"
          onError={(e) => {
            e.target.style.display = 'none'; // إخفاء الصورة إذا فشلت
          }}
        />
      </div>
      
      {/* Annonce 1 */}
      <div className="bg-white rounded-lg shadow p-4 border border-yellow-300">
        <h3 className="font-bold text-gray-900 mb-2">🎯 Offre spéciale</h3>
        <p className="text-sm text-gray-700 mb-3">
          Réduction de 20% sur toutes les décorations en plâtre !
        </p>
        <button 
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-2 px-4 rounded transition"
        >
          Découvrir l’offre
        </button>
      </div>

      {/* Annonce 2 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-yellow-200">
        <h3 className="font-bold text-gray-900 mb-2">📦 Livraison rapide</h3>
        <p className="text-sm text-gray-700">
          Recevez votre commande sous 48 heures dans toutes les wilayas.
        </p>
      </div>
    </div>
  );
}