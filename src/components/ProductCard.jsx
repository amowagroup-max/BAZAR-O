import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, title, price, originalPrice, image, badge, category }) {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-xl shadow p-3 hover:shadow-xl transition bg-white cursor-pointer w-[170px] h-[270px] flex flex-col"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* FIXED IMAGE HEIGHT */}
      <div className="w-full h-[120px] flex justify-center items-center overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="max-h-full object-contain"
        />
      </div>

      {badge && (
        <div className="bg-red-600 text-white text-[10px] px-2 py-1 rounded mt-1 inline-block">
          {badge}
        </div>
      )}

      {/* FIXED TITLE HEIGHT */}
      <h2 className="text-sm font-semibold mt-2 line-clamp-2 h-[38px]">
        {title}
      </h2>

      <div className="flex items-center gap-2 mt-auto">
        <p className="text-gray-900 font-bold text-sm">{price} دج</p>
        {originalPrice && (
          <p className="line-through text-gray-500 text-xs">{originalPrice} دج</p>
        )}
      </div>
    </div>
  );
}

