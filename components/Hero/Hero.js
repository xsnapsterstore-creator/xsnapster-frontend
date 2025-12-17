import React from "react";
import Product_Categories from "../Product_Categories/Product_Categories";
import Poster from "../Poster/Poster";

const Hero = ({ products }) => {
  return (
    <div>
      <Poster />
      <Product_Categories categProd={products} />
    </div>
  );
};

export default Hero;
