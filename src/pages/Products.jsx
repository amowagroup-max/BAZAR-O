import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Supabase Error:", error);
      } else {
        console.log("Products:", data);
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Liste des Produits</h1>

      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>Prix : {p.price}</p>
          <p>Description : {p.description}</p>
        </div>
      ))}
    </div>
  );
}
