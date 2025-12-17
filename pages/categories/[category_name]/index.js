import React from "react";
import { CategoryID } from "@/components/Data/data";
import { useRouter } from "next/router";
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import { fetchSubCategories, fetchSubCategoriesProduct } from "@/components/API/api";

const CategoryName = ({ sub_category, products }) => {
  const router = useRouter();
  const { category_name } = router.query;

  return (
    <div className="pt-[85px]">
      <div className="m-1 md:m-3">
        <CategoryPage
          category={category_name}
          productName={products}
          SubCategory={sub_category}
        />
      </div>
    </div>
  );
};

export default CategoryName;

export async function getServerSideProps({ params }) {
  const { category_name } = params;
  const res = await fetchSubCategories(CategoryID[category_name]);
  const data = await res.json();
  const prod = await fetchSubCategoriesProduct(data[0]?.id);
  const prodData = await prod.json();

  return {
    props: {
      sub_category: data || [],
      products: prodData || [],
    },
  };
}
