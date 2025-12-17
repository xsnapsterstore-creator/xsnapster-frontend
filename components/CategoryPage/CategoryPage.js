import React from "react";
import Product from "../Product/Product";
import SubCategoryChips from "./SubCategoryChips";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchSubCategoriesProduct } from "../API/api";
import { motion } from "framer-motion";
import { CategoryTitle } from "../Data/data";
import { CategorySubtitle } from "../Data/data";

const CategoryPage = ({ category, productName, SubCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(productName);
  const router = useRouter();
  const { category_name, sub_category_name } = router.query;
  let subCateg = SubCategory;

  const handleSubCategorySelect = async (cat) => {
    setLoading(true);
    setSelectedCategory(cat.slug);

    await router.push(`/categories/${category}/${cat.slug}`, undefined, {
      shallow: true,
      scroll: false,
    });

    try {
      const res = await fetchSubCategoriesProduct(cat.id);
      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.log(
        "This error comes in while fetching products for sub-category."
      );
      // Optionally revert to initial products on error
      setProducts(productName);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    subCateg.map((item) => {
      if (item.slug === sub_category_name) {
        handleSubCategorySelect(item);
      }
    });
  }, [sub_category_name]);

  return (
    <div>
      <div>
        <h1 className="text-[25px] font-semibold text-center mt-5">
          {" "}
          {CategoryTitle[router.query.category_name] || "Subtitle Not Found"}
        </h1>
        <div className="w-12 h-1 bg-red-400 mx-auto rounded-full mb-2"></div>
        <h3 className="text-center italic text-[12px] pb-2 text-black">
          {CategorySubtitle[router.query.category_name] || "Subtitle Not Found"}
        </h3>
        <hr />
      </div>
      <div>
        <SubCategoryChips
          SubCategory={SubCategory}
          selected={selectedCategory}
          onSelect={handleSubCategorySelect}
        />
      </div>
      {loading ? (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="relative">
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <Image
                src={"/loading.webp"}
                alt="Loading..."
                width={100}
                height={100}
                unoptimized
                className="opacity-25"
              />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3 md:mt-5">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((prod) => (
                  <Product
                    key={prod.id}
                    product={prod}
                    category_name={category_name}
                  />
                ))
              ) : (
                <div className="col-span-full h-[60vh] flex items-center justify-center">
                  <h1 className="text-gray-400 text-lg">No Products Found</h1>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryPage;
