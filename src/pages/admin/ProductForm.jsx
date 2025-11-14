import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Plus, X, Trash2, Save, ArrowLeft, Printer, MoreVertical } from 'lucide-react';

const ProductForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { id } = useParams(); // إذا كان هناك ID، فهذا تعديل، وإلا إضافة

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    images: [],
    variants: [],
    category: '',
    type: 'product', // service or product
    sale_price: '',
    cost_price: '',
    tax_included: true,
    available_quantity: 0,
  });

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: Date.now().toString(),
          color: '#ffffff',
          size: '',
          stock: 0,
        },
      ],
    }));
  };

  const removeVariant = (id) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));
  };

  const updateVariant = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      ),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2),
      file,
      url: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    alert(id ? 'Produit mis à jour avec succès!' : 'Produit enregistré avec succès!');
    navigate('/admin/products');
  };

  return (
    <div dir="ltr" className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200 font-inter">
      {/* تطبيق الخط الفرنسي افتراضيًا */}
      <style jsx>{`
        body, html, [dir="ltr"] {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Header Bar (مثل Odoo) */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {id ? 'Modifier le produit' : 'Ajouter un produit'}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Printer size={18} className="ml-2" />
            Imprimer
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            <Save size={18} className="ml-2" />
            {id ? 'Enregistrer' : 'Créer'}
          </button>
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Tabs (مثل Odoo) */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-6">
          <button className="py-2 px-4 border-b-2 border-blue-500 font-medium text-blue-700">
            Informations générales
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
            Ventes
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
            Achats
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
            Stock
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
            Comptabilité
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image principale
            </label>
            <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-yellow-500">
              {formData.images.length > 0 ? (
                <img
                  src={formData.images[0]?.url}
                  alt="product"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <Upload size={24} className="text-gray-400" />
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="electronics">Électronique</option>
                  <option value="fashion">Mode Femme</option>
                  <option value="home">Mode Homme</option>
                  <option value="appliances">Électroménager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix de vente (DA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formData.sale_price}
                  onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix d'achat (DA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="product">Produit</option>
                  <option value="service">Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantité disponible
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.available_quantity}
                  onChange={(e) => setFormData({ ...formData, available_quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>

        {/* Variants */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Variants</h3>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              <Plus size={16} className="ml-1" />
              Ajouter un variant
            </button>
          </div>

          {formData.variants.length === 0 ? (
            <div className="p-4 border border-gray-200 rounded-md text-center text-gray-500">
              Aucun variant ajouté.
            </div>
          ) : (
            <div className="space-y-4">
              {formData.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">Variant #{variant.id.slice(-4)}</h4>
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Couleur
                      </label>
                      <input
                        type="color"
                        value={variant.color}
                        onChange={(e) =>
                          updateVariant(variant.id, 'color', e.target.value)
                        }
                        className="w-full h-10 border border-gray-300 rounded-md"
                      />
                      <div
                        className="mt-1 w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: variant.color }}
                      ></div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Taille / Capacité
                      </label>
                      <input
                        type="text"
                        value={variant.size}
                        onChange={(e) =>
                          updateVariant(variant.id, 'size', e.target.value)
                        }
                        placeholder="Ex: L, 500ml"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariant(variant.id, 'stock', parseInt(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            {id ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;