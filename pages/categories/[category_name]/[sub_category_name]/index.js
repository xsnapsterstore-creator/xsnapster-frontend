import CategoryPage from "@/components/CategoryPage/CategoryPage";
import React from "react";
import { useRouter } from "next/router";
import { CategoryID } from "@/components/Data/data";
import {
  fetchSubCategories,
  fetchSubCategoriesProduct,
} from "@/components/API/api";

const SubCategory = ({ sub_category, products }) => {
  const router = useRouter();
  const { category_name, sub_category_name } = router.query;

  return (
    <div className="pt-[80px]">
      <div className="m-3">
        <CategoryPage
          category={category_name}
          productName={products}
          SubCategory={sub_category}
        />
      </div>
    </div>
  );
};

export default SubCategory;

export async function getServerSideProps({ params }) {
  const { category_name, sub_category_name } = params;
  const res = await fetchSubCategories(CategoryID[category_name]);
  const data = await res.json();
  
  const cat = data.find((cat) => cat.slug === sub_category_name);
  const prod = await fetchSubCategoriesProduct(cat?.id);
  const prodData = await prod.json();

  return {
    props: {
      sub_category: data || [],
      products: prodData || [],
    },
  };
}
