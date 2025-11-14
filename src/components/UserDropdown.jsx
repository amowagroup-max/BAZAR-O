// src/components/UserDropdown.jsx
import React, { useState } from 'react';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 flex items-center gap-1 text-gray-800 hover:text-gray-900"
        aria-label="Menu utilisateur"
      >
        👤 Mon Compte
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-[#FFF8E1] border border-gray-300 rounded-lg shadow-lg z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1">
            <a 
              href="/profile" 
              className="block px-4 py-2 text-gray-800 hover:bg-[#FFECB3] hover:text-gray-900 transition-colors"
            >
              📝 Mon Profil
            </a>
            <a 
              href="/orders" 
              className="block px-4 py-2 text-gray-800 hover:bg-[#FFECB3] hover:text-gray-900 transition-colors"
            >
              📦 Mes Commandes
            </a>
            <a 
              href="/wishlist" 
              className="block px-4 py-2 text-gray-800 hover:bg-[#FFECB3] hover:text-gray-900 transition-colors"
            >
              ❤️ Favoris
            </a>
            <a 
              href="/logout" 
              className="block px-4 py-2 text-gray-800 hover:bg-[#FFECB3] hover:text-gray-900 transition-colors border-t border-gray-200 mt-1"
            >
              🔑 Déconnexion
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;