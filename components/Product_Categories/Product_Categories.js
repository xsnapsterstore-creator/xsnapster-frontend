import React from "react";
import Product from "../Product/Product";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

const Product_Categories = ({ categProd }) => {
  return (
    <div className="mt-5">
      <div className="">
        <h1 className="text-[30px] font-bold tracking-wide text-center">
          #TRENDINGNOW!
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {categProd.map((category) => (
          <div key={category.id}>
            {/* Category Title */}
            <h2 className="text-[20px] text-center font-semibold">
              {category.category_name}
            </h2>
            <div className="w-7 h-1 bg-red-400 mx-auto rounded-full mb-5"></div>

            {category.products.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-gray-400 text-lg text-center">
                  No Trending Products
                </p>
              </div>
            )}

            {/* Products inside category */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-2 md:flex gap-2 md:m-2">
                {category.products.map((prod) => (
                  <Product
                    key={prod.id}
                    product={prod}
                    category_name={category.category_name}
                  />
                ))}
              </div>
            </motion.div>
            <Link
              href={`/categories/${category.category_name
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="flex justify-center items-center mt-3 mb-5"
            >
              <ExpandMoreIcon
                className=""
                
                sx={{ color: "black", fontSize: "35px" }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product_Categories;
