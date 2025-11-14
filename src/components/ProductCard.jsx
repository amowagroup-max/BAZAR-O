import React from "react";

export default function ProductCard({ title, price, originalPrice, image }) {
  return (
    <div
      className="bg-white rounded-xl p-2 text-center 
      shadow-sm hover:shadow-md transition-all duration-300 
      hover:border-yellow-500 hover:border-2"
    >
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover rounded-lg mb-2"
      />

      <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
      
      <div className="mt-1">
        <span className="text-base font-bold text-gray-900">{price} DA</span>
        {originalPrice && originalPrice > price && (
          <span className="text-xs text-gray-500 line-through ml-1">
            {originalPrice} DA
          </span>
        )}
      </div>
    </div>
  );
}