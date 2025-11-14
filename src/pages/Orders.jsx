// src/pages/Orders.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, MapPin, CreditCard, CheckCircle, Truck, RotateCcw, XCircle } from 'lucide-react';

export default function Orders() {
  const orders = [
    {
      id: "#CMD-2025-1001",
      date: "10 nov. 2025",
      status: "Livré",
      statusColor: "text-green-600 bg-green-50",
      items: 3,
      total: "12,450 DA",
      shipping: "Livraison standard",
      payment: "Carte bancaire"
    },
    {
      id: "#CMD-2025-0982",
      date: "28 oct. 2025",
      status: "En cours",
      statusColor: "text-blue-600 bg-blue-50",
      items: 1,
      total: "3,200 DA",
      shipping: "Livraison express",
      payment: "À la livraison"
    },
    {
      id: "#CMD-2025-0945",
      date: "15 oct. 2025",
      status: "Annulé",
      statusColor: "text-red-600 bg-red-50",
      items: 2,
      total: "8,750 DA",
      shipping: "Retrait en point relais",
      payment: "Carte bancaire"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Livré": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "En cours": return <Truck className="w-5 h-5 text-blue-600" />;
      case "Annulé": return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Mes commandes
        </h1>
        <p className="text-gray-600 mt-1">
          Retrouvez l'historique et le statut de vos commandes.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucune commande</h3>
          <p className="text-gray-600 mt-2">
            Vous n'avez pas encore passé de commande.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition"
          >
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{order.id}</h2>
                  <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 flex items-center gap-1">
                      <Truck className="w-4 h-4" /> Mode de livraison
                    </p>
                    <p className="font-medium text-gray-900 mt-1">{order.shipping}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 flex items-center gap-1">
                      <CreditCard className="w-4 h-4" /> Paiement
                    </p>
                    <p className="font-medium text-gray-900 mt-1">{order.payment}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 flex items-center gap-1">
                      <Package className="w-4 h-4" /> {order.items} article{order.items > 1 ? 's' : ''}
                    </p>
                    <p className="font-bold text-gray-900 mt-1">{order.total}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
                  >
                    Voir les détails →
                  </Link>
                  {order.status === "Annulé" && (
                    <button className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                      <RotateCcw className="w-4 h-4" /> Réessayer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/profile"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          ← Retour à mon profil
        </Link>
      </div>
    </div>
  );
}