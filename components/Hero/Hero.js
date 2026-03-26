import React from "react";
import Product_Categories from "../Product_Categories/Product_Categories";
import Poster from "../Poster/Poster";
import OfferPopup from "../Poster/Offer";

const Hero = ({ products, categories }) => {
  return (
    <div>
      <OfferPopup />
      <Poster categories={categories} />
      <Product_Categories categProd={products} />
    </div>
  );
};

export default Hero;
