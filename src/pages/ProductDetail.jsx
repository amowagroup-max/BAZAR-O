// src/pages/ProductDetail.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext"; // ⬅️ إضافة مهمة
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  MapPin,
  Heart,
  Share2
} from "lucide-react";

const formatPrice = (price) => {
  if (typeof price !== "number" || isNaN(price)) return "0 DA";
  return new Intl.NumberFormat("fr-DZ", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " DA";
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart(); // ⬅️ الآن السلة تشتغل
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, price, old_price, discount, category, image_url, stock, category_id"
        )
        .eq("id", Number(id))
        .single();
      if (error) console.error("خطأ في جلب المنتج:", error);

      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10">تحميل...</div>;
  if (!product)
    return (
      <div className="text-center mt-10 text-red-600">
        المنتج غير موجود أو حدث خطأ!
        <Link to="/products" className="block text-blue-600 mt-4">
          العودة لقائمة المنتجات
        </Link>
      </div>
    );

  // gallery يجب أن تكون مصفوفة صور — إن لم تكن موجودة نستخدم image_url فقط
let images = [];

// 1️⃣ إن كانت هناك صور في "gallery"
if (Array.isArray(product.gallery) && product.gallery.length > 0) {
  images = product.gallery;
}
// 2️⃣ إن كانت هناك صورة واحدة فقط "image_url"
else if (product.image_url) {
  images = [product.image_url];
}
// 3️⃣ صورة افتراضية عند عدم وجود أي صورة
else {
  images = ["/placeholder.jpg"];
}


  const renderStars = (rating) => (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </span>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link
          to="/products"
          className="flex items-center gap-1 text-gray-600 hover:text-yellow-600 font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> العودة للمنتجات
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* الصور */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-96 object-contain mb-4 rounded"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 rounded overflow-hidden border-2 ${
                  idx === selectedImage ? "border-yellow-500" : "border-gray-200"
                }`}
              >
                <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* التفاصيل */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">({product.rating}/5)</span>
          </div>

          <div className="flex items-baseline gap-2">
          <span className="font-bold text-yellow-600">
          {formatPrice(product.price)}
          </span>

  {/* عرض السعر المشطوب فقط إذا كان فيه تخفيض فعلي */}
  {product.old_price &&
    Number(product.old_price) > Number(product.price) && (
      <span className="text-gray-400 line-through text-sm">
        {formatPrice(product.old_price)}
      </span>
    )}
</div>


          <span className="text-green-700">
            {product.stock > 0 ? `متوفر (${product.stock})` : "غير متوفر"}
          </span>

          <div className="mt-1 text-xs text-gray-400">
            التصنيف: {product.category || "غير محدد"} | رقم التصنيف: {product.category_id || "-"}
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-3 my-6">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={product.stock === 0}
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image_url,
                  quantity: 1,
                })
              
              } // ⬅️ السلة الآن تشتغل
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? "غير متوفر" : "Ajouter au panier"}
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded font-medium hover:bg-gray-50 transition">
              <Heart className="w-5 h-5" />
              Favoris
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded font-medium hover:bg-gray-50 transition">
              <Share2 className="w-5 h-5" />
              Partager
            </button>
          </div>

          {/* الضمانات */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-sm">Livraison gratuite</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span className="text-sm">Retour gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Garantie 2 ans</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-sm">Disponible en magasin</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* وصف المنتج */}
<div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">وصف المنتج</h2>
  <p className="text-gray-700 leading-relaxed">{product.description}</p>
</div>

      {/* منتجات مرتبطة */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Tag className="w-6 h-6 text-yellow-500" />
          منتجات مرتبطة
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((img, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <img src={img} alt="منتج مرتبط" className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
                  {product.name}
                </h3>
                <p className="font-bold text-gray-900 mt-1">{formatPrice(product.price)}</p>
                <button className="mt-2 w-full py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700">
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
