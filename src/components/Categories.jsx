import React from "react";

const categories = [
  { id: 1, name: "Peinture", icon: "🎨" },
  { id: 2, name: "Décoration", icon: "🏠" },
  { id: 3, name: "Outils", icon: "🛠️" },
  { id: 4, name: "Électricité", icon: "💡" },
  { id: 5, name: "Plomberie", icon: "🚰" },
  { id: 6, name: "Jardinage", icon: "🌿" },
];

export default function Categories() {
  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Catégories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer bg-white shadow-md p-4 rounded-xl flex flex-col items-center hover:bg-yellow-400 hover:text-black transition"
          >
            <div className="text-4xl">{cat.icon}</div>
            <p className="mt-2 font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
