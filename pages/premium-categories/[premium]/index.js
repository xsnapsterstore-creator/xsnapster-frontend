import React from "react";
import { useRouter } from "next/router";
import PremiumCategory from "@/components/Premium/PremiumCategoryPage/PremiumCategory";

const PremiumCateg = ({ products }) => {
  return (
    <div className="">
      <div>
        <PremiumCategory productName={products} />
      </div>
    </div>
  );
};

export default PremiumCateg;

export async function getServerSideProps({ params }) {
  const { category_name } = params;
  // const prod = await fetchSubCategoriesProduct(data[0]?.id);
  // const prodData = await prod.json();
  const prodData = [];

  return {
    props: {
      products: prodData || [],
    },
  };
}
