import React from "react";
import Product from "../Product/Product";
import { motion } from "framer-motion";

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
          <div
            className={`bg-red-50 p-2 shadow rounded-xl m-2`}
            key={category.id}
          >
            {/* Category Title */}
            <h2 className="text-[20px]  text-center font-semibold mb-3">
              {category.category_name}
            </h2>

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
              <div className="grid grid-cols-2 md:flex gap-3">
                {category.products.map((prod) => (
                  <Product key={prod.id} product={prod} category_name={category.category_name} />
                ))}
              </div>
            </motion.div>
            <div className="flex justify-center items-center mt-5 mb-5">
              <button
                onClick={() =>
                  (window.location.href = `/categories/${category.category_name
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`)
                }
                className=" text-gray-800 hover:cursor-pointer bg-sky-300 drop-shadow-lg text-[13px] shadow py-2 px-3 rounded"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product_Categories;
