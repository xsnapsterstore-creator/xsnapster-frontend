import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useState } from "react";
import { useRouter } from "next/router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Product = ({ product, category_name }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [sizeOpt, setSizeOpt] = useState(product.dimensions[0]);
  const [open, setOpen] = useState(false);
  const selectedPricing = product.dimension_pricing[sizeOpt];
  const pro = {
    category: product.category,
    dimensions: sizeOpt,
    discounted_price: selectedPricing.discounted_price,
    price: selectedPricing.price,
    id: product.id,
    image_link: product.image_link,
    one_liner: product.one_liner,
    quantity: 1,
    slug: product.slug,
    subcategory: product.subcategory,
    title: product.title,
    view_count: product.view_count,
  };

  const category = category_name
    ? category_name.trim().replace(/\s+/g, "-").toLowerCase()
    : "";
  const subcategory = product?.subcategory
    ? product.subcategory.trim().replace(/\s+/g, "-").toLowerCase()
    : "";

  async function BuyNow(id) {
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/login");
      return;
    }
    console.log("THis is Prod ID:", pro);
  }

  const FrameSize = {
    A4: "8.27 x 11.69 inches",
    A3: "11.7 x 16.5 inches",
    A2: "16.5 x 23.4 inches",
    Poster: "11.7 x 16.5 inches",
  };

  return (
    <div className="relative cursor-pointer rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden w-[175px] md:w-[200px] m-auto">
      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-lg z-10">
        Sale
      </span>

      {/* Product Image */}
      <div
        onClick={() => {
          router.push(`/categories/${category}/${subcategory}/${product.id}`);
        }}
        className="overflow-hidden rounded-t-lg"
      >
        <Image
          src={product.image_link}
          alt={product.title}
          width={100}
          height={100}
          priority
          fetchPriority="high"
          quality={75}
          className="object-cover w-[175px] md:w-[200px] h-[200px] transform group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-2 flex flex-col items-center bg-gray-100">
        <h1
          onClick={() => {
            router.push(`/categories/${category}/${subcategory}/${product.id}`);
          }}
          className="text-[11px] md:text-[12px] font-medium text-gray-800 line-clamp-2 h-[36px]"
        >
          {product.title}
        </h1>

        {/* Price & Size Section */}
        <div className="w-full flex-col justify-between items-end">
          {/* Price Section */}
          <div className="flex items-end gap-1 justify-start">
            {/* Sale Price */}
            <p className="text-red-600 font-bold text-[14px] lg:text-[16px]">
              ₹{selectedPricing.discounted_price ?? selectedPricing.price}
            </p>

            {/* Strike-through original price only if discount exists */}
            {selectedPricing.discounted_price && (
              <p className="line-through text-gray-700 text-[10px] lg:text-[12px]">
                ₹{selectedPricing.price}
              </p>
            )}
          </div>

          <div className="mt-1">
            <button
              onClick={() => setOpen(true)}
              className="py-1.5 w-full rounded-lg shadow-md text-[10px] transition bg-gray-900 hover:bg-gray-700 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Size Selector */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Please select the size
          </h3>

          <p className="text-gray-700 text-[12px]">{FrameSize[sizeOpt]}</p>

          <div className="mt-4 flex gap-3">
            {product.dimensions.map((size) => (
              <button
                value={size}
                onClick={(e) => setSizeOpt(e.target.value)}
                className={`py-1.5 px-2.5 rounded-lg shadow-md text-[10px] transition border
                  ${
                    sizeOpt === size
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-black border-gray-500 hover:bg-gray-200"
                  }
                `}
                key={size}
              >
                {size}
              </button>
            ))}

            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(pro));
                setAdded(true);
                setTimeout(() => setAdded(false), 1200);
                setOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-black text-white cursor-pointer"
            >
              {added ? "Added" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
