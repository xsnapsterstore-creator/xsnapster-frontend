import { useState, useEffect } from "react";
import Image from "next/image";

const banners = [
  "/bmw_1.webp",
  "/defender_1.webp",
  "/bmw_2.webp",
  "/defender_2.webp",
  "/ferrari_1.webp",
  "/bmw_3.webp",
  "/ferrari_2.webp",
];

export default function Poster() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((src, index) => (
          <div key={index} className="min-w-full h-[480px] md:h-[600px]">
            <Image
              width={100}
              height={100}
              src={src}
              loading="lazy"
              quality={75}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 text-white max-w-xs md:max-w-lg">
        <h2 className="text-xl md:text-3xl font-bold leading-tight">
          Premium Frames & Offers
        </h2>
        <p className="text-xs md:text-sm mt-2 text-gray-200">
          This is your sign to stop living with boring walls.
        </p>

        <button className="mt-4 px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
