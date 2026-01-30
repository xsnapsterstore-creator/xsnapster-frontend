"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const reviews = [
  {
    name: "Rahul Singh",
    review: "Excellent product quality, shipping was fast too!",
    image: "/bmw_1.webp",
  },
  {
    name: "Priya Sharma",
    review: "Customer support was very helpful and polite!",
    image: "/bmw_desktop.png",
  },
  {
    name: "Amit Verma",
    review: "Amazing experience, highly recommended!",
    image: "/bmw_3.webp",
  },
  {
    name: "Harsh Sharma",
    review: "Customer support was very helpful and polite!",
    image: "/defender_desktop.png",
  },
  {
    name: "Avinash Verma",
    review: "Amazing experience, highly recommended!",
    image: "/defender_2.webp",
  },
  {
    name: "Aryan Patel",
    review: "Good value for money. Will shop again.",
    image: "/ferrari_2.webp",
  },
  {
    name: "Harsh Sharma",
    review: "Customer support was very helpful and polite!",
    image: "/ferrari_desktop.png",
  },
  {
    name: "Avinash Verma",
    review: "Amazing experience, highly recommended!",
    image: "/ferrari_1.webp",
  },
  {
    name: "Aryan Patel",
    review: "Good value for money. Will shop again.",
    image: "/porsche_desktop.png",
  },
  {
    name: "Aryan Patel",
    review: "Good value for money. Will shop again.",
    image: "/porsche_2.webp",
  },
];

export default function ReviewCarousel() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <h1 className="text-[35px] font-extrabold">Reviews</h1>
        <p className="text-red-500 text-sm md:text-base animate-pulse">
          What People Say
        </p>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </motion.div>
      <div className="w-full flex">
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
          className=""
        >
          {reviews.map((item, i) => (
            <div
              key={i}
              className="relative m-3 shadow-lg rounded-lg md:h-[160px] h-[110px]"
            >
              <Image
                src={item.image}
                width={200}
                height={250}
                alt={item.name}
                className="object-cover opacity-5 rounded-xl border h-[100%] w-[100%]"
              />
              <p className="absolute inset-0 flex items-center justify-center text-center text-[10px] px-3">
                Your Wall + Our Frame + You? We Want Proof.
              </p>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="w-full flex">
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="right"
          className=""
        >
          {reviews.map((item, i) => (
            <div
              key={i}
              className="relative m-3 shadow-lg rounded-lg md:h-[160px] h-[110px]"
            >
              <Image
                src={item.image}
                width={200}
                height={250}
                alt={item.name}
                className="object-cover opacity-5 rounded-xl border h-[100%] w-[100%]"
              />
              <p className="absolute inset-0 flex items-center justify-center text-center text-[10px] px-3">
                Your Wall + Our Frame + You? We Want Proof.
              </p>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center items-center gap-4 py-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-[200px] w-[170px] relative overflow-hidden rounded-xl m-auto bg-gray-200"
          >
            <div className="absolute inset-0 skeleton-shimmer" />
            <p className="absolute inset-0 flex items-center justify-center text-center text-[10px] px-2">
              Show Us Your Wall Wearing Our Frame
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
