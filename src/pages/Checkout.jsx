import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import { MapPin, Phone, User, Home, Send } from "lucide-react";
import { formatPrice } from "../utils/price";

export default function Checkout() {

  const { cart } = useCart();

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
    wilaya: "",
    ccp_name: "",
    ccp_number: "",
    ccp_key: "",
    ccp_post: ""
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 1200;
  const total = subtotal + shipping;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Paiement à la livraison
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORMULAIRE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Informations Client */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informations du client
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Fullname */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <User size={16} /> Nom complet
                </label>
                <input
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="input-style"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <Phone size={16} /> Téléphone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="05XXXXXXXX"
                  className="input-style"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="font-semibold text-sm flex items-center gap-1">
                  <Home size={16} /> Adresse complète
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Exemple : Cité 200 logements, Bt 12..."
                  className="input-style"
                />
              </div>

              {/* Wilaya */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <MapPin size={16} /> Wilaya
                </label>

                <select
                  name="wilaya"
                  value={form.wilaya}
                  onChange={handleChange}
                  className="input-style"
                >
                  <option value="">Sélectionner votre wilaya</option>
                  <option value="Alger">Alger</option>
                  <option value="Oran">Oran</option>
                  <option value="Blida">Blida</option>
                  <option value="Sétif">Sétif</option>
                </select>
              </div>

            </div>
          </div>

          {/* Paiement CCP */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Paiement par CCP
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Remplissez ces informations si vous souhaitez payer par CCP.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* CCP Name */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <User size={16} /> Nom & Prénom (CCP)
                </label>
                <input
                  name="ccp_name"
                  value={form.ccp_name}
                  onChange={handleChange}
                  placeholder="Nom du propriétaire"
                  className="input-style"
                />
              </div>

              {/* CCP Number */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <Send size={16} /> Numéro CCP
                </label>
                <input
                  name="ccp_number"
                  value={form.ccp_number}
                  onChange={handleChange}
                  placeholder="Exemple : 12345678"
                  className="input-style"
                />
              </div>

              {/* CCP Key */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <Send size={16} /> Clé CCP
                </label>
                <input
                  name="ccp_key"
                  value={form.ccp_key}
                  onChange={handleChange}
                  placeholder="Exemple : 12"
                  className="input-style"
                />
              </div>

              {/* Post office */}
              <div>
                <label className="font-semibold text-sm flex items-center gap-1">
                  <MapPin size={16} /> Bureau de poste
                </label>
                <input
                  name="ccp_post"
                  value={form.ccp_post}
                  onChange={handleChange}
                  placeholder="Exemple : Alger Centre"
                  className="input-style"
                />
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition flex items-center justify-center">
            <Send className="w-5 h-5 mr-2" />
            Confirmer la commande
          </button>
        </div>

        {/* Résumé */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Résumé de la commande
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between text-gray-700">
                <span>Total Produits</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* CSS */}
      <style>
        {`
        .input-style {
          width: 100%;
          margin-top: 4px;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
        }
        .input-style:focus {
          border-color: #fbbf24;
          box-shadow: 0 0 4px rgba(251, 191, 36, 0.6);
        }
        `}
      </style>

    </div>
  );
}
