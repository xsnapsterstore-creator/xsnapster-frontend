import React from "react";
import { fetchCategories } from "@/components/API/api";

const Categories = ({ categories }) => {
  return (
    <div className="pt-[115px] px-3 pb-3">
      <h1 className="text-2xl font-semibold text-center mt-4 mb-4">
        Shop by Category
      </h1>
      <hr />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5 justify-center">
        {categories.map((categProd, index) => (
          <div
            onClick={() => {
              window.location.href = `/categories/${categProd.slug}`;
            }}
            key={index}
            className={`bg-red-100 shadow-md rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300`}
          >
            {/* Category Image */}
            <div className="w-[150px] h-[220px] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={categProd.image_links[0]}
                alt={categProd.name}
                width={160}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Category Name */}
            <div className="mt-4 text-center">
              <h2 className="text-base font-semibold text-gray-800">
                {categProd.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

export async function getServerSideProps({ params }) {
  const res = await fetchCategories();
  const data = await res.json();

  return {
    props: {
      categories: data || [],
    },
  };
}
