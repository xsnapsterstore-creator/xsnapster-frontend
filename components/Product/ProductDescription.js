import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import HardwareIcon from "@mui/icons-material/Hardware";
import StraightenIcon from "@mui/icons-material/Straighten";

const ProductDescription = ({ prodDesc }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const prodQuality = [
    {
      img: <Grid3x3Icon />,
      head: "Frame Material",
      para: "Fiberwood",
    },
    {
      img: <CropPortraitIcon />,
      head: "Frame Style",
      para: "Flat (For Posters) / Box (For Art)",
    },
    {
      img: <CropPortraitIcon />,
      head: "Glass Material",
      para: "Acrylic",
    },
    {
      img: <StraightenIcon />,
      head: "Glass Depth",
      para: "2 mm",
    },
    {
      img: <CropPortraitIcon />,
      head: "Backboard Material",
      para: "MDF / Wood (For Canvas)",
    },
    {
      img: <StraightenIcon />,
      head: "Backboard Depth",
      para: "4 mm",
    },
    {
      img: <CropOriginalIcon />,
      head: "Print Material",
      para: "200 GSM Art Paper / 260 GSM Canvas",
    },
    {
      img: <HardwareIcon />,
      head: "Hanging Equipment",
      para: "Sawtooth Hook",
    },
  ];

  const prodSpecs = [
    {
      img: "/premium.webp",
      head: "Premium Quality Frames",
      para: "Fiber wood frames for durability and protection",
    },
    {
      img: "/vibrant.webp",
      head: "Vibrant Prints",
      para: "Vibrant colors with UV-resistant inks and High-resolution, fade-resistant prints",
    },
    {
      img: "/new.webp",
      head: "New Frames / Prints Every Time",
      para: "We prepare your items after you place the order; that means all items are made from scratch",
    },
    {
      img: "/protective.webp",
      head: "Protective Features",
      para: "Easy to clean shatterproof acrylic glass in front",
    },
  ];

  return (
    <div className="grid grid-cols-1 max-w-6xl mx-auto p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300"
      >
        {/* Question */}
        <button
          onClick={() => toggle(0)}
          className="flex justify-between items-center w-full text-left cursor-pointer"
        >
          <motion.h3
            className="text-[15px] lg:text-[20px] font-semibold text-gray-900"
            whileHover={{ scale: 1.02 }}
          >
            Product Features
          </motion.h3>

          <motion.span
            animate={{ rotate: openIndex === 0 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-600 text-2xl font-bold select-none"
          >
            +
          </motion.span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 0 && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 overflow-hidden"
            >
              <div className="">
                <div className="grid grid-cols-2 gap-3 mt-1 items-start justify-center">
                  {prodQuality.map((prod, index) => (
                    <div key={index} className="">
                      <div className="flex items-center gap-2">
                        <div>{prod.img}</div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {prod.head}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-xs ml-8">{prod.para}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300"
      >
        {/* Question */}
        <button
          onClick={() => toggle(1)}
          className="flex justify-between items-center w-full text-left cursor-pointer"
        >
          <motion.h3
            className="text-[15px] lg:text-[20px] font-semibold text-gray-900"
            whileHover={{ scale: 1.02 }}
          >
            Product Details
          </motion.h3>

          <motion.span
            animate={{ rotate: openIndex === 1 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-600 text-2xl font-bold select-none"
          >
            +
          </motion.span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 1 && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 overflow-hidden"
            >
              <p className="text-[14px] text-gray-700 leading-relaxed">
                This isn't just a frame — it's a statement, a flex, a whole
                personality upgrade for your wall. Designed for the bold, the
                aesthetic, and the ones who know good vibes don't come cheap…
                but they do come framed.
                <br /> Whether your mood is cars, anime, gym, black & white
                aesthetic, or “I want something that screams me” — we've got the
                perfect visual addiction for you.
                <br />
                <br />
                Transform your walls into a piece of art with our Premium
                Aesthetic Photo Frame, crafted for people who love minimal,
                clean, and modern décor. Whether it's your bedroom, living room,
                office, workspace, or studio—this frame adds depth, personality,
                and aesthetic vibes to every corner.
                <br />
                <br /> Designed and manufactured by{" "}
                <bold className="font-semibold">
                  <span className="text-red-500">X</span>SNAPSTER
                </bold>
                , this frame blends premium material, HD-quality prints, and
                long-lasting durability to give you the perfect décor piece that
                never goes out of style.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300"
      >
        {/* Question */}
        <button
          onClick={() => toggle(2)}
          className="flex justify-between items-center w-full text-left cursor-pointer"
        >
          <motion.h3
            className="text-[15px] lg:text-[20px] font-semibold text-gray-900"
            whileHover={{ scale: 1.02 }}
          >
            Product Quality
          </motion.h3>

          <motion.span
            animate={{ rotate: openIndex === 2 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-600 text-2xl font-bold select-none"
          >
            +
          </motion.span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 2 && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 overflow-hidden"
            >
              <div>
                <div className="md:grid md:grid-cols-2 flex flex-col gap-3 mt-1 items-start justify-center">
                  {prodSpecs.map((prod, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center h-[80px] gap-3"
                    >
                      <div>
                        <Image
                          className="md:w-[80px] w-[70px]"
                          src={prod.img}
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1 w-[250px] lg:w-[350px]">
                        <h3 className="font-semibold text-gray-800 text-md">
                          {prod.head}
                        </h3>
                        <p className="text-gray-600 text-xs">{prod.para}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300"
      >
        {/* Question */}
        <button
          onClick={() => toggle(3)}
          className="flex justify-between items-center w-full text-left cursor-pointer"
        >
          <motion.h3
            className="text-[15px] lg:text-[20px] font-semibold text-gray-900"
            whileHover={{ scale: 1.02 }}
          >
            Product Specification
          </motion.h3>

          <motion.span
            animate={{ rotate: openIndex === 3 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-600 text-2xl font-bold select-none"
          >
            +
          </motion.span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 3 && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 overflow-hidden"
            >
              <div className="mt-5">
                <div>
                  <h2 className="font-bold">Specification</h2>
                </div>
                <div className="mt-2">
                  <div>
                    <ul className="list-disc ml-5 text-[14px] md:text-[15px]">
                      <li>
                        200 GSM Art Board Matte Paper / 350 GSM Poly-cotton
                        inkjet canvas
                      </li>
                      <li>
                        Width : 0.75-inch (For A2) / 0.5 inch (A3, A4) wide
                        fiberwood frames for edge
                      </li>
                      <li>
                        Style & Depth : Box Frame (Starting from 0.75 inch)
                      </li>
                      <li>
                        2-mm thick acrylic glass for strength and maximum
                        shatter resistance
                      </li>
                      <li>Strong MDF Back board for long life and support</li>
                      <li>Comes with hanging equipment attached</li>
                      <li>Made in India ❤️</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductDescription;
