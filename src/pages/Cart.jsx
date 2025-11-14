// src/pages/Cart.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Truck,
  RotateCcw,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// دالة مساعدة لتنسيق السعر بالطريقة الجزائرية: 1 200 DA
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0 DA';
  }
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' DA';
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [coupon, setCoupon] = useState('');

  // ✅ حسابات السعر المُصلحة: السعر يُعامل كرقم دائمًا
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0; // يمكنك تفعيل القسائم لاحقًا
  const shipping = subtotal > 10000 ? 0 : 1200;
  const total = subtotal - discount + shipping;

  // منتجات مقترحة (upsell)
  const suggestions = [
    { id: 201, name: "Verre Trempé S24 Ultra", price: 1200, image: "https://placehold.co/100x100/f1f5f9/475569?text=Verre" },
    { id: 202, name: "Étui en Silicone", price: 2500, image: "https://placehold.co/100x100/f8fafc/334155?text=Étui" },
    { id: 203, name: "Chargeur Rapide 45W", price: 3200, image: "https://placehold.co/100x100/e2e8f0/64748b?text=Chargeur" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Mon Panier ({cart.length} article{cart.length !== 1 ? 's' : ''})
        </h1>
        <p className="text-gray-600 mt-1">
          Vérifiez vos articles avant de passer à la caisse.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">
            Il semble que vous n'avez ajouté aucun produit à votre panier.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition"
          >
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* القسم الأيسر: المنتجات */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-700 mt-1">
                      {item.color && `${item.color} • `}{item.size}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        {/* ✅ عرض السعر باستخدام الدالة المُنسّقة */}
                        <div className="font-bold text-gray-900">{formatPrice(item.price)}</div>
                        {item.oldPrice && (
                          <div className="text-sm text-gray-500 line-through mt-1">
                            {typeof item.oldPrice === 'number' 
                              ? formatPrice(item.oldPrice) 
                              : item.oldPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="self-start p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* قسم القسائم */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Code promo</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Entrez votre code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                  Appliquer
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Vous avez un code promo ? Entrez-le ici pour bénéficier d'une réduction.
              </p>
            </div>
          </div>

          {/* القسم الأيمن: الملخص */}
          <div className="space-y-6">
            {/* ملخص الطلب */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé de la commande</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Réduction</span>
                  <span className="font-medium text-green-600">- {formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Gratuit' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Passer à la caisse
              </button>

              <div className="mt-4 text-center">
                <Link to="/products" className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                  ← Continuer vos achats
                </Link>
              </div>
            </div>

            {/* الضمانات */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Pourquoi acheter chez nous ?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Livraison gratuite</div>
                    <div className="text-sm text-gray-600">Dès 10 000 DA d'achat</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Retour gratuit</div>
                    <div className="text-sm text-gray-600">Sous 15 jours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Paiement sécurisé</div>
                    <div className="text-sm text-gray-600">CB, CIB, Cash+...</div>
                  </div>
                </div>
              </div>
            </div>

            {/* منتجات مقترحة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Vous aimerez aussi</h3>
              <div className="space-y-4">
                {suggestions.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-700">{formatPrice(item.price)}</div>
                    </div>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">
                      Ajouter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}