// src/components/HorizontalProductStrip.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalProductStrip = ({ title, products, className = "" }) => {
  // نكرر المنتجات مرتين لخلق تأثير "لا نهاية"
  const duplicatedProducts = [...products, ...products];

  return (
    <div className={`bg-[#FBE60E] rounded-lg shadow-sm p-4 ${className} w-full relative`}>
      {/* ✅ الطبقة البيضاء — أضيق من الحافة الصفراء */}
      <div className="absolute inset-4 bg-white rounded-lg border border-gray-200 opacity-95 z-0 pointer-events-none"></div>

      {/* ✅ المحتوى — فوق الطبقة البيضاء */}
      <div className="relative z-10 px3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <Link 
            to="/products" 
            className="text-orange-500 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
          >
            Voir plus <span>→</span>
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex space-x-4 pb-4 animate-scroll ml-[-2rem]">
            {duplicatedProducts.map((product, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 ${
                  index === 0 ? "ml-[-1rem]" : ""
                }`}
              >
                <div className="relative h-32 bg-gray-100">
                  <img 
                    src={product.image || "/placeholder.jpg"} 
                    alt={product.name || "Produit"} 
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="mt-2 flex items-center gap-1">
                    {product.oldPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {product.oldPrice} DA
                      </span>
                    )}
                    <span className="font-bold text-green-600">
                      {product.price} DA
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductStrip;