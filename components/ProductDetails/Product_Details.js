import { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import HardwareIcon from "@mui/icons-material/Hardware";
import StraightenIcon from "@mui/icons-material/Straighten";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Link from "next/link";
import ProductDescription from "../Product/ProductDescription";
import ShareIcon from "@mui/icons-material/Share";
import { useRouter } from "next/router";

export default function ProductDetailsPage({ prod }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [buyAdded, setBuyAdded] = useState(false);
  const [prodQuantity, setProdQuantity] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [sizeOpt, setSizeOpt] = useState(prod.dimensions[0]);
  const selectedPricing = prod.dimension_pricing[sizeOpt];
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

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
    dimensions: sizeOpt,
    price: selectedPricing.price,
    discounted_price: selectedPricing.discounted_price,
  };

  async function BuyNow() {
    dispatch(addToCart({ ...product, quantity: prodQuantity }));
    const userID = localStorage.getItem("userID");
    setBuyAdded(true);
    setTimeout(() => setBuyAdded(false), 1200);
    if (!userID) {
      router.push("/login");
    } else {
      router.push("/address");
    }
  }

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

  const categSlug = prod.category.toLowerCase().replace(/\s+/g, "-");
  const subCategSlug = prod.subcategory.toLowerCase().replace(/\s+/g, "-");
  const shareUrl = `https://xsnapster.store/categories/${categSlug}/${subCategSlug}/${prod.id}`;

  const handleShare = () => {
    if (navigator.share) {
      const message = `💥 Check out this Premium Aesthetic Frame from XSNAPSTER !
  
  🖼️ : ${prod.title}
  
  👇 View it here:
  ${shareUrl}`;

      navigator.share({
        title: prod.title,
        text: message,
      });
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div>
      {/* Product Routing */}
      <div className="pt-[10px] max-w-6xl lg:flex lg:justify-start lg:items-start lg:gap-5 mx-auto ">
        <div className="m-3 flex justify-start items-center gap-1">
          <Link
            href={"/"}
            className="text-[13px] hover:text-red-600 hover:cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href={"/categories"}
            className="text-[13px] hover:text-red-600 hover:cursor-pointer"
          >
            Categories
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${categSlug}`}
            className="text-[13px] hover:text-red-600 hover:cursor-pointer"
          >
            {prod.category}
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${categSlug}/${subCategSlug}`}
            className="text-[13px] hover:text-red-600 hover:cursor-pointer"
          >
            {prod.subcategory}
          </Link>
          <span>/</span>
          <button className="text-[13px] hover:text-red-600 hover:cursor-pointer">
            {prod.title.substring(0, 10) + "..."}
          </button>
        </div>
      </div>

      {/* Product Image / Description / Quality Field */}
      <div className="pt-[2px] max-w-6xl lg:flex lg:justify-start lg:items-start lg:gap-5 mx-auto px-3">
        {/* Image Slider */}
        <div
          {...handlers}
          className="relative w-full md:w-1/2 mx-auto overflow-hidden rounded-xl lg:sticky lg:top-0 h-fit"
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
                  <Image
                    src={src}
                    alt={`${prod.title} ${index + 1}`}
                    width={600}
                    height={400}
                    loading="lazy"
                    quality={75}
                    onClick={() => setFullscreenImage(src)}
                    className="object-cover cursor-pointer w-full h-[450px] md:h-[600px]"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="hidden cursor-pointer md:block absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700/70 text-white px-3 py-2 rounded-r"
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            onClick={handleNext}
            className="hidden cursor-pointer md:block absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700/70 text-white px-3 py-2 rounded-l"
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
            <Image
              src={fullscreenImage}
              alt="preview"
              loading="lazy"
              width={400}
              height={300}
              quality={75}
              className="max-w-[90%] max-h-[100%] rounded-lg shadow-xl animate-fadeIn"
              onClick={(e) => e.stopPropagation()} // prevents closing when clicking image
            />
          </div>
        )}

        {/* Product Info */}
        <div className="lg:h-screen lg:w-full lg:overflow-y-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="m-2 md:mt-0 text-left">
              <h1 className="text-[14px] md:text-[16px] text-gray-700 tracking-wide">
                {prod.title}
              </h1>
              <h2 className="text-[11px] animate-pulse text-red-600 mt-2">
                {prod.one_liner}
              </h2>
            </div>
          </motion.div>

          <div className="m-2">
            <div className="flex justify-between items-end gap-4">
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-end gap-2 justify-center">
                  {/* Sale Price */}
                  <p className="text-[20px] md:text-[25px] font-semibold text-green-600">
                    ₹{selectedPricing.discounted_price ?? selectedPricing.price}
                  </p>

                  {/* Strike-through original price only if discount exists */}
                  {selectedPricing.discounted_price && (
                    <p className="text-gray-500 text-[13px] md:text-[15px] line-through">
                      ₹{selectedPricing.price}
                    </p>
                  )}
                </div>
                <div className="text-gray-500 text-[10px] md:text-[12px]">
                  <p>Price incl. of all taxes</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className="flex items-center gap-0.5 cursor-pointer"
                  onClick={handleShare}
                >
                  <ShareIcon sx={{ fontSize: "14px" }} fontSize="small" />
                  <span className="text-[14px] text-gray-700 underline font-semibold">
                    Share
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end mt-3 m-2 border-b pb-3">
            <label
              htmlFor="size"
              className="font-semibold text-[15px] text-gray-800"
            >
              Please select a size.
            </label>

            <select
              value={sizeOpt}
              onChange={(e) => setSizeOpt(e.target.value)}
              className="border w-[100px] md:w-[145px] rounded-md px-1 py-1"
            >
              {prod.dimensions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex flex-col gap-5 m-2 mt-5 border-b pb-6">
            {/* Quantity + Add to Cart + Buy Now */}
            <div className="flex flex-col gap-2">
              {/* Add to Cart */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart({ ...product, quantity: prodQuantity }));
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200);
                }}
                className={`px-8 py-2 w-full rounded-lg shadow-md text-lg transition ${
                  added
                    ? "bg-black text-white"
                    : "bg-gray-900 hover:bg-gray-700 text-white"
                }`}
              >
                {added ? "Added to Cart" : "Add To Cart"}
              </button>

              {/* Buy Now Button */}
              <div className="">
                {/* Buy Now */}
                <button
                  onClick={BuyNow}
                  className="px-8 py-2 w-full rounded-lg shadow-md text-lg transition bg-gray-900 hover:bg-gray-700 text-white"
                >
                  {buyAdded ? "Please Wait" : "Buy Now"}
                </button>
              </div>
            </div>

            {/* Offer  */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 md:p-5">
              {/* Heading */}
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <span className="text-lg">🎁</span>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 tracking-wide">
                  Special Quantity Offers
                </h3>
              </div>

              {/* Offers */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg py-2 px-3 border shadow-sm">
                  <p className="text-xs font-medium text-gray-700">
                    Buy <span className="font-semibold text-gray-900">3</span>
                  </p>
                  <p className="text-xs text-red-600 animate-pulse font-semibold">
                    Get 1 Free
                  </p>
                </div>

                <div className="bg-white rounded-lg py-2 px-3 border shadow-sm">
                  <p className="text-xs font-medium text-gray-700">
                    Buy <span className="font-semibold text-gray-900">6</span>
                  </p>
                  <p className="text-xs text-red-600 animate-pulse font-semibold">
                    Get 2 Free
                  </p>
                </div>

                <div className="bg-white rounded-lg py-2 px-3 border shadow-sm">
                  <p className="text-xs font-medium text-gray-700">
                    Buy <span className="font-semibold text-gray-900">9</span>
                  </p>
                  <p className="text-xs text-red-600 animate-pulse font-semibold">
                    Get 3 Free
                  </p>
                </div>
              </div>
            </div>

            {/* Razorpay Verification Image */}
            <div>
              <Image
                src="/Razorpay.png"
                alt="Secure Payment"
                width={500}
                height={500}
                className="w-full mx-auto"
              />
            </div>
          </div>

          <div className="mt-5">
            <ProductDescription prodDesc={prod.description} />
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

          <div className="flex flex-col md:flex-row gap-2 justify-center mt-4 pb-2">
            <div>
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
    </div>
  );
}
