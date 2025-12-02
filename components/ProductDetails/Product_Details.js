import { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ArrowDownwardRounded } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Button } from "@mui/material";

export default function ProductDetailsPage({ prod }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [sizeOpt, setSizeOpt] = useState(prod.dimensions[0]);
  const selectedPricing = prod.dimension_pricing[sizeOpt];

  const product = {
    id: prod.id,
    title: prod.title,
    one_liner: prod.one_liner,
    description: prod.description,
    slug: prod.slug,
    image_link: prod.image_links[0],
    category: prod.category,
    subcategory: prod.subcategory,
    is_active: prod.is_active,
    dimensions: prod.dimensions,
    price: prod.price,
    discounted_price: prod.discounted_price,
  };
  const today = new Date();

  // Helper function to format date like "Oct 7"
  const formatDate = (dateObj) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}`;
  };

  // Create copies of `today` and add days properly
  const shippedStart = new Date(today);
  shippedStart.setDate(today.getDate() + 1);

  const shippedEnd = new Date(today);
  shippedEnd.setDate(today.getDate() + 2);

  const deliveredStart = new Date(today);
  deliveredStart.setDate(today.getDate() + 6);

  const deliveredEnd = new Date(today);
  deliveredEnd.setDate(today.getDate() + 7);

  // ✅ For image slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const total = prod?.image_links?.length || 0;
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    const total = prod?.image_links?.length || 0;
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true, // allows mouse dragging too
  });

  return (
    <div className="pt-[20px] max-w-6xl lg:flex lg:justify-center lg:items-start lg:gap-5 mx-auto px-4">
      {/* Image Slider */}
      <div
        {...handlers}
        className="relative w-full md:w-1/2 mx-auto overflow-hidden rounded-xl"
      >
        {/* Slide Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {prod.image_links.map((src, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                style={{ flex: "0 0 100%" }}
              >
                <img
                  src={src}
                  alt={`${prod.title} ${index + 1}`}
                  width={600}
                  height={400}
                  onClick={() => setFullscreenImage(src)}
                  className="object-cover cursor-pointer w-full h-[400px] md:h-[600px]"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700/70 text-white px-3 py-2 rounded-r"
        >
          <ArrowBackIosNewIcon />
        </button>
        <button
          onClick={handleNext}
          className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700/70 text-white px-3 py-2 rounded-l"
        >
          <ArrowForwardIosIcon />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {prod.image_links.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Image Full Screen */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking image
          />
        </div>
      )}

      {/* Product Info */}
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mt-5 text-left">
            <h1 className="text-[25px] font-semibold">{prod.title}</h1>
            <h2 className="text-[18px] animate-pulse text-red-600 italic">
              {prod.one_liner}
            </h2>
            <p className="text-gray-600 text-[15px] mt-1 max-w-2xl">
              {prod.description}
            </p>
          </div>
        </motion.div>

        <div className="mt-2">
          <div className="flex items-baseline gap-4">
            {/* Sale Price */}
            <p className="text-3xl font-semibold text-green-600 mt-2">
              ₹{selectedPricing.discounted_price ?? selectedPricing.price}
            </p>

            {/* Strike-through original price only if discount exists */}
            {selectedPricing.discounted_price && (
              <p className="text-gray-500 line-through">
                ₹{selectedPricing.price}
              </p>
            )}
          </div>
          <div className="text-gray-500 text-xs">
            <p>Taxes included. Shipping calculated at checkout</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5 border-b pb-3">
          <label htmlFor="size" className="font-semibold text-gray-800">
            Size
          </label>

          <select
            value={sizeOpt}
            onChange={(e) => setSizeOpt(e.target.value)}
            className="border w-[100px] md:w-[145px] rounded-md px-1 py-1"
          >
            {product.dimensions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-3 border-b pb-3">
          <div>
            <div>
              <p className="font-semibold">Frame Mega Deals</p>
            </div>
            <div className="mt-2 space-y-3 font-medium text-white">
              {/* Offer 1 */}
              <div className="relative bg-gradient-to-r from-gray-900 to-black border border-yellow-500 rounded-[12px] flex justify-between items-center px-4 py-2 shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                <p className="text-white text-[13px]">
                  Buy 2 Frames Get →{" "}
                  <span className="text-red-600 text-[15px] animate-pulse font-semibold">
                    1 Frame Free
                  </span>
                </p>
                {/* Ticket cutouts */}
                <div className="absolute -left-[6px] w-[12px] h-[12px] bg-white rounded-full top-1/2 -translate-y-1/2"></div>
                <div className="absolute -right-[6px] w-[12px] h-[12px] bg-white rounded-full top-1/2 -translate-y-1/2"></div>
              </div>

              {/* Offer 2 (Most Popular) */}
              <div className="relative bg-gradient-to-r from-gray-900 to-black border border-yellow-500 rounded-[12px] flex justify-between items-center px-4 py-2 shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                <p className="text-white text-[13px]">
                  Buy 6 Frames Get →{" "}
                  <span className="text-red-600 text-[15px] animate-pulse font-semibold">
                    2 Frames Free
                  </span>
                </p>
                <span className="bg-white text-black text-[8px] ml-2 px-2 py-[2px] rounded font-semibold">
                  Most Popular
                </span>
                <div className="absolute -left-[6px] w-[12px] h-[12px] bg-white rounded-full top-1/2 -translate-y-1/2"></div>
                <div className="absolute -right-[6px] w-[12px] h-[12px] bg-white rounded-full top-1/2 -translate-y-1/2"></div>
              </div>

              {/* Offer 3 */}
              <div className="relative bg-gradient-to-r from-gray-900 to-black border border-yellow-500 rounded-[12px] flex justify-between items-center px-4 py-2 shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                <p className="text-white text-[13px]">
                  Buy 9 Frames Get →{" "}
                  <span className="text-red-600 text-[15px] animate-pulse font-semibold">
                    3 Frames Free
                  </span>
                </p>
                <div className="absolute -left-[6px] w-[12px] h-[12px] bg-white rounded-full top-1/2 -translate-y-1/2"></div>
                <div className="absolute -right-[6px] w-[12px] h-[12px] bg-white rounded-full top-1/2 -translate-y-1/2"></div>
              </div>

              {/* Replacement info */}
              <div className="relative bg-gradient-to-r from-gray-900 to-black border border-yellow-500 rounded-[12px] flex justify-between items-center px-4 py-2 shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                <p className="text-white text-[13px]">
                  Free 7 Days{" "}
                  <span className="text-amber-400 font-semibold">
                    Replacement
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col justify-center mt-5 rounded-2xl p-3 bg-gray-400">
        <div>
          <p className="text-center">Looking for a custom frame</p>
        </div>
        <div className="flex justify-center items-center">
          <ArrowDownwardRounded />
        </div>
        <div>
          <input
            type="file"
            placeholder="Upload Your Image"
            className="border px-3 py-2 rounded-lg w-full md:w-1/2"
          />
        </div>
      </div> */}

        <div className=" gap-4 justify-center mt-3">
          <div className="flex lg:justify-start items-center gap-5">
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(product));
                setAdded(true);
                setTimeout(() => setAdded(false), 1200);
              }}
              sx={{
                fontSize: "12px",
                padding: "8px 8px",
                transition: "all 0.25s ease",
                backgroundColor: added ? "#22c55e" : "",
              }}
              className="cursor-pointer"
            >
              {added ? "Added to Cart" : "Add To Cart"}
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              sx={{
                fontSize: "12px",
                padding: "8px 8px",
              }}
              className="cursor-pointer"
            >
              Buy Now
            </Button>
          </div>
          <div className="">
            <Image
              src="/Razorpay.png"
              alt="Product"
              className="w-full"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-center mt-5">
          <div>
            <div>
              <Image
                src="/payment_gateway.png"
                alt="Product"
                width={500}
                height={500}
                className="w-full"
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="h-[110px] w-[100px]">
                <div className="bg-black h-[50px] w-[50px] m-auto p-3 rounded-full">
                  <ShoppingBagIcon className="text-white" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold">Ordered</p>
                  <span className="text-[12px]">{formatDate(today)}</span>
                </div>
              </div>
              <div>
                <HorizontalRuleIcon />
              </div>
              <div className="h-[110px] w-[100px]">
                <div className="bg-black h-[50px] w-[50px] m-auto p-3 rounded-full">
                  <LocalShippingIcon className="text-white" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold">Shipped</p>
                  <span className="text-[12px]">
                    {formatDate(shippedStart)} - {formatDate(shippedEnd)}
                  </span>
                </div>
              </div>
              <div>
                <HorizontalRuleIcon />
              </div>
              <div className="h-[110px] w-[100px]">
                <div className="bg-black h-[50px] w-[50px] m-auto p-3 rounded-full">
                  <LocationOnIcon className="text-white" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold">Delivered</p>
                  <span className="text-[12px]">
                    {formatDate(deliveredStart)} - {formatDate(deliveredEnd)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
