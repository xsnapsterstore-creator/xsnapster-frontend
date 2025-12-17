import React from "react";
import Product from "../Product/Product";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Product_Categories = ({ categProd }) => {
  return (
    <div className="">
      <div className="">
        <h2 className="text-[30px] font-bold tracking-wide text-center">
          #TRENDINGNOW!
        </h2>
      </div>
      <div className="flex flex-col gap-10">
        {categProd.map((category) => (
          <div className={``} key={category.id}>
            {/* Category Title */}
            <h2 className="text-[20px] text-center font-semibold">
              {category.category_name}
            </h2>
            <div className="w-7 h-1 bg-red-400 mx-auto rounded-full mb-5"></div>

            {category.products.length === 0 && (
              <div className="flex items-center justify-center">
                <h1 className="text-gray-400 text-lg text-center">
                  No Trending Products
                </h1>
              </div>
            )}

            {/* Products inside category */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-2 md:flex gap-3 md:m-2">
                {category.products.map((prod) => (
                  <Product
                    key={prod.id}
                    product={prod}
                    category_name={category.category_name}
                  />
                ))}
              </div>
            </motion.div>
            <div className="flex justify-center items-center mt-5 mb-5">
              <ExpandMoreIcon
              className=""
                onClick={() =>
                  (window.location.href = `/categories/${category.category_name
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`)
                }
                sx={{ color: "black", fontSize: "35px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product_Categories;
