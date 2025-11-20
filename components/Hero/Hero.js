import React from "react";
import Product_Categories from "../Product_Categories/Product_Categories";

const Hero = ({ products }) => {
  return (
    <div>
      <Product_Categories categProd={products} />
    </div>
  );
};

export default Hero;
