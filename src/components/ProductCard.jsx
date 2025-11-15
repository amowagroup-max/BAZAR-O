import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, title, price, originalPrice, image, badge, category }) {
  const navigate = useNavigate();

  return (
    <div
  className="border rounded-lg shadow p-2 hover:shadow-lg transition bg-white cursor-pointer max-w-[150px]"
  onClick={() => navigate(`/product/${id}`)}
>
  <img
    src={image}
    alt={title}
    className="w-full h-32 object-cover rounded-md"
  />

  {badge && (
    <div className="bg-red-600 text-white text-[10px] px-2 py-1 rounded mt-1 inline-block">
      {badge}
    </div>
  )}

  <h2 className="text-sm font-semibold mt-2 line-clamp-2">{title}</h2>

  <div className="flex items-center gap-2 mt-1">
    <p className="text-gray-900 font-bold text-sm">{price} دج</p>
    {originalPrice && (
      <p className="line-through text-gray-500 text-xs">{originalPrice} دج</p>
    )}
  </div>

  <div className="mt-2 text-center bg-blue-600 text-white py-1 rounded-md text-xs">
    عرض التفاصيل
  </div>
</div>
  );
}
