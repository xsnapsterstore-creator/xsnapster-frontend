import React from "react";
import { useRouter } from "next/router";
import ProductDetailsPage from "@/components/ProductDetails/Product_Details";
import { fetchProduct } from "@/components/API/api";

const ProductId = ({ product }) => {
  const router = useRouter();
  const { category_name, sub_category_name, product_id } = router.query;

  return (
    <div className="pt-[95px]">
      <div className="m-3">
        <ProductDetailsPage prod={product} />
      </div>
    </div>
  );
};

export default ProductId;

export async function getServerSideProps({ params }) {
  const { category_name, sub_category_name, product_id } = params;
  const res = fetchProduct(product_id);
  const data = await (await res).json();

  return {
    props: {
      product: data || [],
    },
  };
}
