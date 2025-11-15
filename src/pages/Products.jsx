import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom"; // أضف هذا السطر

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // أنشئ دالة التنقل

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, old_price, discount, category, image_url");
      if (error) {
        console.error("Supabase Error:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">تحميل المنتجات...</div>;

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-bold mb-8">Liste des produits</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">لا توجد منتجات متوفرة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition border flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/product/${p.id}`)} // هنا التنقل عند الضغط
            >
              <img
                src={p.image_url || "/placeholder.jpg"}
                alt={p.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-700 mb-2">{p.description}</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-yellow-600">{p.price} DA</span>
                {p.old_price &&
  Number(p.old_price) > Number(p.price) && (
    <span className="text-gray-400 line-through text-base">
      {p.old_price} DA
    </span>
  )
}

              </div>
              {p.discount > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm mb-1">خصم {p.discount}%</span>
              )}
              <p className="text-gray-400 text-xs">{p.category}</p>
              {/* أزل زر السلة نهائيًا */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
