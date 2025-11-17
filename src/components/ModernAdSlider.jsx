// src/components/PureImageSlider.jsx
import { useState, useEffect } from "react";

export default function PureImageSlider() {
  const images = [
    "https://condor.dz/product-category/tv-image-et-son/gaming/",
    "https://scontent.falg6-1.fna.fbcdn.net/v/t39.30808-6/477039813_601456455988498_8827776879702323137_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=4T8S1nwo7JAQ7kNvwEzmVu3&_nc_oc=Adnor81iNR0J_Qh3HS1w-I0tjbhnF-56TJI4RzFno3RakZ0A4x7QCzplCdFdxvao6Gk&_nc_zt=23&_nc_ht=scontent.falg6-1.fna&_nc_gid=p22nrc16it9N_h7DUMQktA&oh=00_Afiulv5dv1rydsXFOXq5PCDeFzCbGZu0C7svlVYR-pNAZw&oe=691750BC",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src.trim()}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-contain p-4 md:p-8"
          />
        </div>
      ))}
    </section>
  );
}
