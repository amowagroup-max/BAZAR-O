// src/pages/Profile.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Edit3, Package, Clock, CheckCircle } from 'lucide-react';

export default function Profile() {
  // بيانات المستخدم (يمكن ربطها لاحقًا بـ API)
  const [user, setUser] = useState({
    name: "Ahmed Benali",
    email: "ahmed.benali@example.com",
    phone: "+213 6 12 34 56 78",
    address: "12 Rue des Oliviers, Alger Centre, Alger",
    city: "Alger",
    postalCode: "16000"
  });

  const [isEditing, setIsEditing] = useState(false);

  // طلبيات وهمية (للاختبار)
  const orders = [
    { id: "#CMD-2025-1001", date: "10 nov. 2025", status: "Livré", items: 3, total: "12,450 DA" },
    { id: "#CMD-2025-0982", date: "28 oct. 2025", status: "En cours", items: 1, total: "3,200 DA" },
    { id: "#CMD-2025-0945", date: "15 oct. 2025", status: "Annulé", items: 2, total: "8,750 DA" },
  ];

  const handleSave = () => {
    // هنا يمكنك إرسال البيانات إلى API
    console.log("Données sauvegardées:", user);
    setIsEditing(false);
    alert("✅ Vos informations ont été mises à jour avec succès !");
  };

  const handleCancel = () => {
    // إعادة التحميل من الـ state الأصلي (أو من API)
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* العنوان */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-6 h-6" />
          Mon Profil
        </h1>
        <p className="text-gray-600 mt-1">
          Gérez vos informations personnelles et consultez vos commandes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* القسم الأيسر: المعلومات الشخصية */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              Informations personnelles
            </h2>
          </div>

          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <textarea
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md transition flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" /> Enregistrer
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Nom complet</p>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="font-medium text-gray-900">{user.address}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  <Edit3 className="w-4 h-4" /> Modifier mes informations
                </button>
              </div>
            )}
          </div>
        </div>

        {/* القسم الأيمن: الطلبيات الأخيرة */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Mes dernières commandes
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" /> {order.date}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === "Livré" ? "bg-green-100 text-green-800" :
                    order.status === "En cours" ? "bg-blue-100 text-blue-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-600">{order.items} article{order.items > 1 ? 's' : ''}</span>
                  <span className="font-semibold text-gray-900">{order.total}</span>
                </div>
                <Link
                  to={`/orders/${order.id}`}
                  className="mt-3 inline-block text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  Voir les détails →
                </Link>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
            <Link
              to="/orders"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Voir toutes mes commandes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}