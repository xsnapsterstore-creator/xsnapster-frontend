import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const Product = ({ product, category_name }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [sizeOpt, setSizeOpt] = useState(product.dimensions[0]);
  const selectedPricing = product.dimension_pricing[sizeOpt];
  const pro = {
    category: product.category,
    dimensions: sizeOpt,
    discounted_price: selectedPricing.price,
    price: product.price,
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

  return (
    <div className="relative cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden w-[165px] lg:w-[200px] m-auto">
      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-lg z-10">
        Sale
      </span>

      {/* Product Image */}
      <div
        onClick={() => {
          router.push(`/categories/${category}/${subcategory}/${product.id}`);
        }}
        className="overflow-hidden rounded-t-2xl"
      >
        <img
          src={product.image_link}
          alt={product.title}
          width={100}
          height={100}
          className="object-cover w-[165px] lg:w-[200px] h-[200px] transform group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-2 flex flex-col items-center">
        <h1
          onClick={() => {
            router.push(`/categories/${category}/${subcategory}/${product.id}`);
          }}
          className="text-[12px] md:text-sm font-medium text-gray-800 line-clamp-2 h-[36px]"
        >
          {product.title}
        </h1>

        {/* Price Section */}
        <div className="w-full mt-2 flex justify-start gap-3 items-center">
          <div>
            <select
              value={sizeOpt}
              onChange={(e) => setSizeOpt(e.target.value)}
              className="border w-[70px] md:w-[85px] rounded-md px-1 py-1"
            >
              {product.dimensions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Price Section */}
          <div className="flex flex-col items-start justify-start">
            {/* Sale Price */}
            <p className="text-red-600 font-bold text-base">
              ₹{selectedPricing.discounted_price ?? selectedPricing.price}
            </p>

            {/* Strike-through original price only if discount exists */}
            {selectedPricing.discounted_price && (
              <p className="line-through text-gray-700 text-xs">
                ₹{selectedPricing.price}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between lg:gap-6 m-2 w-full">
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(pro));
              setAdded(true);
              setTimeout(() => setAdded(false), 1200); // reset after 1.2s
            }}
            sx={{
              fontSize: "7px",
              padding: "8px 9px",
              transition: "all 0.25s ease",
              backgroundColor: added ? "#22c55e" : "", // temporary green color
            }}
            className="cursor-pointer"
          >
            {added ? "Added" : "Add To Cart"}
          </Button>

          <Button
            color="primary"
            size="small"
            variant="contained"
            sx={{
              fontSize: "7px",
              padding: "8px 11px",
            }}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              BuyNow(product.id);
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
