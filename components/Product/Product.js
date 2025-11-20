import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Button } from "@mui/material";
import { useState } from "react";

const Product = ({ product, category_name }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const category = category_name
    ? category_name.trim().replace(/\s+/g, "-").toLowerCase()
    : "";
  const subcategory = product?.subcategory
    ? product.subcategory.trim().replace(/\s+/g, "-").toLowerCase()
    : "";

  return (
    <div className="relative cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden w-[165px] lg:w-[200px] m-auto">
      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-lg z-10">
        Sale
      </span>

      {/* Product Image */}
      <div
        onClick={() => {
          window.location.href = `/categories/${category}/${subcategory}/${product.id}`;
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
      <div className="p-3 flex flex-col items-center">
        <h1
          onClick={() => {
            window.location.href = `/categories/${category}/${subcategory}/${product.id}`;
          }}
          className="text-[12px] md:text-sm font-medium text-gray-800 line-clamp-2 h-[36px]"
        >
          {product.title}
        </h1>

        {/* Price Section */}
        <div
          onClick={() => {
            window.location.href = `/categories/${category}/${subcategory}/${product.id}`;
          }}
          className="w-full"
        >
          <div className="flex items-center justify-start gap-2 mt-1">
            <p className="text-red-600 font-bold text-base">399 Rs.</p>
            <p className="line-through text-gray-400 text-xs">799 Rs.</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Inclusive of all taxes</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between lg:gap-6 mt-2 w-full">
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
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
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
