// src/components/PureImageSlider.jsx
import { useState, useEffect } from "react";

export default function PureImageSlider() {
  const images = [
    "https://scontent.falg7-6.fna.fbcdn.net/v/t39.30808-6/480702446_1168246425094105_6778952893082794391_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=9QvsG90H_wAQ7kNvwGmVYe8&_nc_oc=Adn5SNz_zOMSxPs7iT8L3lBEGXOufP3x1kScD9RryjTQKgQ686kEarusX5vvEUyMCVM&_nc_zt=23&_nc_ht=scontent.falg7-6.fna&_nc_gid=DJYgSmxJJhcploFL04pdDg&oh=00_AfjVshNm3pBdGSCWkvYFP1Jeo8C4J0MviDeLzpwaaCb8mg&oe=69208A7F",
    "https://scontent.falg7-6.fna.fbcdn.net/v/t39.30808-6/488600952_993754842880671_6088575747716362163_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=p-_3ou0BvF0Q7kNvwHRtfgx&_nc_oc=Adk4khG6x1lcfIlxmeJgi6nuFtYTNM-OCPJcNOhw_o0x_A1oz-BgIOG0mzeqi5F4_mo&_nc_zt=23&_nc_ht=scontent.falg7-6.fna&_nc_gid=S3TAmFSK07-rDm11EmYZ6g&oh=00_AfiEZnsP7aDwNeT3-wQgG-_MIxcu-2pG7GyMMRD8eH9Bsw&oe=69208A85",
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
