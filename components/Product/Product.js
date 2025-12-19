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

  return (
    <div className="relative cursor-pointer rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden w-[175px] md:w-[200px] m-auto">
      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-lg z-10">
        Sale
      </span>
      <span
        className={`absolute top-2 right-2 rounded-lg z-10 cursor-pointer 
    flex items-center justify-center
    transition-all duration-300
    ${added ? "bg-green-500" : "bg-[#333333]"}
  `}
        style={{ padding: "7px 9px" }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addToCart(pro));
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
        }}
      >
        {added ? (
          <ShoppingCartIcon sx={{ fontSize: "13px", color: "#fff" }} />
        ) : (
          <AddShoppingCartIcon sx={{ fontSize: "12px", color: "#fff" }} />
        )}
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
        <div className="w-full mt-2 flex justify-between items-end">
          <div>
            <select
              value={sizeOpt}
              onChange={(e) => setSizeOpt(e.target.value)}
              className="border w-[70px] md:w-[85px] rounded-md px-1 "
            >
              {product.dimensions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

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
        </div>

        {/* Action Buttons */}
        {/* <div className="flex items-center justify-between lg:gap-6 m-2 w-full">
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
              fontSize: "9px",
              padding: "8px 6px",
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
              fontSize: "9px",
              padding: "8px 6px",
            }}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              BuyNow(product.id);
            }}
          >
            Buy Now
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Product;
