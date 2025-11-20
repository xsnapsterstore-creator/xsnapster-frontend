"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Rahul Singh",
    review: "Excellent product quality, shipping was fast too!",
    image: "/user1.jpg",
  },
  {
    name: "Priya Sharma",
    review: "Customer support was very helpful and polite!",
    image: "/user2.jpg",
  },
  {
    name: "Amit Verma",
    review: "Amazing experience, highly recommended!",
    image: "/user3.jpg",
  },
  {
    name: "Neha Patel",
    review: "Good value for money. Will shop again.",
    image: "/user4.jpg",
  },
  {
    name: "Honey Singh",
    review: "Excellent product quality, shipping was fast too!",
    image: "/user1.jpg",
  },
  {
    name: "Harsh Sharma",
    review: "Customer support was very helpful and polite!",
    image: "/user2.jpg",
  },
  {
    name: "Avinash Verma",
    review: "Amazing experience, highly recommended!",
    image: "/user3.jpg",
  },
  {
    name: "Aryan Patel",
    review: "Good value for money. Will shop again.",
    image: "/user4.jpg",
  },
];

export default function ReviewCarousel() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className="overflow-hidden w-full py-10">
      <div className="overflow-x-auto scrollbar-hide w-full flex">
        <motion.div
          className="flex lg:gap-20 gap-10 m-5"
          animate={{ x: [0, -width] }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
        >
          {reviews.map((item, i) => (
            <div
              key={i}
              className="min-w-[200px] max-w-[250px] bg-red-100 shadow-lg rounded-xl flex flex-col items-center text-center"
            >
              <Image
                src="/bmw_2.webp"
                width={200}
                height={250}
                alt={item.name}
                className="object-cover rounded-xl mb-2 border"
              />
              <p className="text-gray-700 text-xs italic m-1">
                "{item.review}"
              </p>
              <h4 className="font-semibold text-sm m-1 text-gray-900">
                {item.name}
              </h4>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
