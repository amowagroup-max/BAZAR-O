// src/pages/OrderDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  Phone, 
  CreditCard, 
  Truck, 
  Clock, 
  CheckCircle, 
  RotateCcw, 
  ArrowLeft 
} from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams(); // يأخذ :id من الرابط

  // بيانات وهمية — يمكن ربطها لاحقًا بـ API
  const order = {
    id: id || "#CMD-2025-1001",
    date: "10 nov. 2025",
    status: "Livré",
    statusColor: "bg-green-100 text-green-800",
    items: [
      {
        id: 1,
        name: "HiBREW Adaptateur H1 pour Nespresso",
        price: "5,090",
        quantity: 1,
        image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/43/2726/1.jpg?2874"
      },
      {
        id: 2,
        name: "Mixer Multifonction 1000W",
        price: "7,000",
        quantity: 1,
        image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/18/2984/1.jpg?8389"
      },
      {
        id: 3,
        name: "Horloge Murale en Bois",
        price: "350",
        quantity: 2,
        image: "https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/6626/1.jpg?1650"
      }
    ],
    shipping: {
      method: "Livraison standard",
      address: "12 Rue des Oliviers, Alger Centre",
      city: "Alger",
      postalCode: "16000",
      phone: "+213 6 12 34 56 78"
    },
    payment: {
      method: "Carte bancaire",
      total: "12,790 DA",
      shippingFee: "340 DA"
    }
  };

  const getStatusInfo = () => {
    switch (order.status) {
      case "Livré":
        return { text: "Votre commande a été livrée avec succès.", icon: <CheckCircle className="w-5 h-5 text-green-600" /> };
      case "En cours":
        return { text: "Votre commande est en cours de préparation.", icon: <Truck className="w-5 h-5 text-blue-600" /> };
      case "Annulé":
        return { text: "Cette commande a été annulée.", icon: <RotateCcw className="w-5 h-5 text-red-600" /> };
      default:
        return { text: "Statut inconnu.", icon: <Clock className="w-5 h-5 text-gray-500" /> };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* زر العودة */}
      <div className="mb-6">
        <Link 
          to="/orders" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à mes commandes
        </Link>
      </div>

      {/* العنوان */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Commande {order.id}
        </h1>
        <p className="text-gray-600 mt-1">{order.date}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* القسم الأيسر: ملخص الطلب */}
        <div className="lg:col-span-2 space-y-6">
          {/* حالة الطلب */}
          <div className={`p-4 rounded-lg border ${order.status === "Livré" ? "border-green-200 bg-green-50" : order.status === "En cours" ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"}`}>
            <div className="flex items-start gap-3">
              {statusInfo.icon}
              <div>
                <p className="font-medium text-gray-900">{order.status}</p>
                <p className="text-sm text-gray-700 mt-1">{statusInfo.text}</p>
              </div>
            </div>
          </div>

          {/* المنتجات */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Articles commandés</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Qté: {item.quantity}</span>
                      <span className="font-bold text-gray-900">{item.price} DA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* القسم الأيمن: معلومات إضافية */}
        <div className="space-y-6">
          {/* معلومات التوصيل */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Livraison
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium text-gray-900">{order.shipping.address}, {order.shipping.city} {order.shipping.postalCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium text-gray-900">{order.shipping.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="font-medium text-gray-900">{order.shipping.method}</p>
              </div>
            </div>
          </div>

          {/* معلومات الدفع */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Paiement
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Méthode</p>
                <p className="font-medium text-gray-900">{order.payment.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frais de livraison</p>
                <p className="font-medium text-gray-900">{order.payment.shippingFee}</p>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">{order.payment.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* دعم */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">Besoin d'aide ?</h3>
            <p className="text-sm text-gray-700 mt-1">
              Contactez notre service client pour toute question.
            </p>
            <button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition">
              Contacter le support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}