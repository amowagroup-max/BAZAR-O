// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Share2,
  MapPin,
  Truck,
  RotateCcw,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// ✅ دالة تنسيق السعر (متوافقة مع الجزائر)
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) return '0 DA';
  return new Intl.NumberFormat('fr-DZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' DA';
};

// ✅ بيانات المنتج — السعر كأرقام فقط
const product = {
  id: 101,
  name: "Smartphone Samsung Galaxy S24 Ultra",
  shortDesc: "Le flagship ultime avec caméra 200MP, S Pen intégré et écran Dynamic AMOLED 2X.",
  price: 149900,     // ← رقم ✅
  oldPrice: 165000,   // ← رقم ✅
  discount: "9% OFF",
  rating: 4.8,
  reviews: 247,
  inStock: true,
  images: [
    "https://placehold.co/600x600/e2e8f0/64748b?text=Galaxy+S24+Front",
    "https://placehold.co/600x600/f1f5f9/475569?text=Galaxy+S24+Back",
    "https://placehold.co/600x600/f8fafc/334155?text=S24+Camera",
    "https://placehold.co/600x600/e2e8f0/64748b?text=S24+Side"
  ],
  colors: [
    { name: "Titanium Noir", code: "#1e293b" },
    { name: "Titanium Gris", code: "#94a3b8" },
    { name: "Vert Phantom", code: "#0d9488" }
  ],
  sizes: ["128 Go", "256 Go", "512 Go", "1 To"],
  description: `
    <p><strong>Écran :</strong> 6.8" Dynamic AMOLED 2X, 120Hz, 1750 nits</p>
    <p><strong>Processeur :</strong> Snapdragon 8 Gen 3</p>
    <p><strong>RAM :</strong> 12 Go</p>
    <p><strong>Batterie :</strong> 5000 mAh, charge rapide 45W</p>
    <p><strong>Caméra :</strong> Quadruple : 200MP (principale) + 12MP (ultra grand angle) + 10MP (téléobjectif 3x) + 10MP (téléobjectif 5x)</p>
    <p><strong>Autres :</strong> S Pen intégré, résistance IP68, Android 14 avec One UI 6.1</p>
  `,
  tags: ["Nouveau", "Meilleure vente", "Livraison gratuite"],
  seller: "BAZARO Officiel"
};

// تعليقات وهمية
const reviews = [
  {
    id: 1,
    author: "Karim D.",
    date: "2 nov. 2025",
    rating: 5,
    title: "Excellent smartphone, qualité photo incroyable !",
    comment: "Je l'utilise depuis 2 semaines et je suis bluffé par la qualité des photos, surtout en faible luminosité. La batterie tient facilement une journée complète."
  },
  {
    id: 2,
    author: "Fatima Z.",
    date: "28 oct. 2025",
    rating: 4,
    title: "Très bon, mais un peu cher",
    comment: "Produit de haute qualité, design élégant. Seul bémol : le prix reste élevé, même avec la réduction."
  }
];

// منتجات ذات صلة
const relatedProducts = [
  { id: 102, name: "Étui Samsung S24 Ultra", price: 2500, image: "https://placehold.co/150x150/f1f5f9/475569?text=Étui" },
  { id: 103, name: "Chargeur Rapide 45W", price: 3200, image: "https://placehold.co/150x150/f8fafc/334155?text=Chargeur" },
  { id: 104, name: "Verre Trempé S24 Ultra", price: 1200, image: "https://placehold.co/150x150/e2e8f0/64748b?text=Verre" }
];

export default function ProductDetail() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,       // ✅ رقم
      oldPrice: product.oldPrice, // ✅ رقم (اختياري)
      image: product.images[selectedImage],
      color: product.colors[selectedColor].name,
      size: product.sizes[selectedSize],
    });

    // إشعار نجاح
    alert("✅ Article ajouté au panier !");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* رابط العودة */}
      <div className="mb-4">
        <Link 
          to="/products" 
          className="flex items-center gap-1 text-gray-600 hover:text-yellow-600 font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> Retour aux produits
        </Link>
      </div>

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* القسم الأيسر: الصور */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          {/* الصورة الرئيسية */}
          <div className="relative mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                {product.discount}
              </div>
            )}
          </div>

          {/* معرض الصور المصغرة */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button 
              onClick={prevImage}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                  idx === selectedImage ? 'border-yellow-500' : 'border-gray-200'
                }`}
              >
                <img src={img} alt={`Vue ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
            <button 
              onClick={nextImage}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* القسم الأيمن: التفاصيل */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* المعلومات الأساسية */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {product.seller}
              </span>
              {product.tags.map(tag => (
                <span 
                  key={tag}
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    tag === "Nouveau" ? "bg-green-100 text-green-800" :
                    tag === "Meilleure vente" ? "bg-purple-100 text-purple-800" :
                    "bg-blue-100 text-blue-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.shortDesc}</p>

            <div className="flex items-center gap-1 mb-4">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600 ml-1">({product.reviews} avis)</span>
            </div>

            {/* ✅ عرض السعر باستخدام formatPrice */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
          </div>

          {/* الخيارات */}
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === idx ? 'border-yellow-500 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.code }}
                    aria-label={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.colors[selectedColor].name}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Stockage</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(idx)}
                    className={`px-3 py-2 text-sm rounded-md border ${
                      selectedSize === idx
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-800 font-medium'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
                <div className="flex items-center border border-gray-300 rounded-md w-24">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {product.inStock ? (
                <div className="flex-1 self-end">
                  <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> En stock • Livraison sous 24h
                  </p>
                </div>
              ) : (
                <div className="flex-1 self-end">
                  <p className="text-sm text-red-600 font-medium">
                    Indisponible temporairement
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition ${
                product.inStock
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition">
              <Heart className="w-5 h-5" />
              Favoris
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition">
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

      {/* الوصف والتقييمات */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* وصف المنتج */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div 
            className="text-gray-700 space-y-4"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* التقييمات */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Avis ({product.reviews})</h2>
            <button 
              onClick={() => setShowReviews(!showReviews)}
              className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
            >
              {showReviews ? 'Masquer' : 'Voir tous'}
            </button>
          </div>

          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
            <div className="flex items-center gap-1 my-1">
              {renderStars(product.rating)}
            </div>
            <div className="text-sm text-gray-600">{product.reviews} avis</div>
          </div>

          {!showReviews && reviews.slice(0, 1).map(review => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="font-medium">{review.author}</div>
                <div className="text-gray-500 text-sm">{review.date}</div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {renderStars(review.rating)}
              </div>
              <div className="font-medium text-gray-900">{review.title}</div>
              <div className="text-gray-700 text-sm">{review.comment}</div>
            </div>
          ))}

          {showReviews && (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-medium">{review.author}</div>
                    <div className="text-gray-500 text-sm">{review.date}</div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <div className="font-medium text-gray-900">{review.title}</div>
                  <div className="text-gray-700 text-sm">{review.comment}</div>
                </div>
              ))}
              <button className="w-full py-2.5 border border-dashed border-gray-400 rounded-md text-gray-600 hover:bg-gray-50">
                + Écrire un avis
              </button>
            </div>
          )}
        </div>
      </div>

      {/* منتجات ذات صلة */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Tag className="w-6 h-6 text-yellow-500" />
          Produits associés
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {relatedProducts.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{item.name}</h3>
                <p className="font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>
                <button 
                  onClick={() => {
                    addToCart({ ...item, image: item.image });
                    alert("✅ Ajouté !");
                  }}
                  className="mt-2 w-full py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
                >
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