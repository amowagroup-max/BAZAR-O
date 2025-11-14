// src/components/Button.jsx
export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-black hover:text-yellow-400 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
