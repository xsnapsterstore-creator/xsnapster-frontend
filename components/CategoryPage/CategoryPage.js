import React from "react";
import Product from "../Product/Product";
import SubCategoryChips from "./SubCategoryChips";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchSubCategoriesProduct } from "../API/api";
import { motion } from "framer-motion";

const CategoryPage = ({ category, productName, SubCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(productName);
  const router = useRouter();
  const { category_name, sub_category_name } = router.query;

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

  const title = {
    cars: "Fast & Curious",
    anime: "Hentai...But Not Really",
    "black-and-white-aesthetics": "Fifty Shades of Frames",
    gym: "Hard & Heavy",
    sports: "Sweaty & Wild",
    "for-him": "Big Boys Collection",
    "for-her": "She Wants It All",
    movies: "Rated Frames Only",
    "music-album": "Moan & Groan Records",
    marvel: "Super Hard Heroes",
  };

  const subtitle = {
    cars: "Because people come for speed... and curosity",
    anime: "Instant clickbait frames, not fantasies",
    "black-and-white-aesthetics": "No whips, only frames in grayscale",
    gym: "Weights? Or something else? You decide",
    sports: "Messi dripping, not what you imagined",
    "for-him": "Because size does matter... in Frames",
    "for-her": "Frames, not boyfriends",
    movies: "Popcorn included? Nope, Just Aesthetics",
    "music-album": "You'll still hang Drake next to your bed",
    marvel: "Not the kind of heroes you thought... they just save your walls",
  };

  // useEffect(() => {
  //   setProducts(productName);
  // }, [sub_category_name]);

  return (
    <div>
      <div>
        <h1 className="text-[25px] font-semibold text-center mt-4">
          {" "}
          {/* {CategName[category] || "Category Not Found"} */}
          {title[router.query.category_name] || "Subtitle Not Found"}
        </h1>
        {/* <h2 className="text-center text-[10px] text-red-500 font-semibold">{title[category] || "Subtitle Not Found"}</h2> */}
        <h3 className="text-center text-[12px] text-black">
          {subtitle[router.query.category_name] || "Subtitle Not Found"}
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
                width={70}
                height={70}
                unoptimized
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((prod) => <Product key={prod.id} product={prod} category_name={category_name} />)
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
