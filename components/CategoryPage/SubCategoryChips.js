import React from "react";
import { useRouter } from "next/router";

const SubCategoryChips = ({ SubCategory, selected, onSelect }) => {
  const router = useRouter();
  const { sub_category_name } = router.query;

  return (
    <div>
      <div>
        {SubCategory.length > 0 && (
          <div className="hide-scrollbar mt-1 flex items-center gap-3 overflow-x-auto py-3">
            {SubCategory.map((cat) => {
              const isActive =
                sub_category_name === cat.slug ||
                (!sub_category_name && cat.slug === "all");

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelect(cat)}
                  className={[
                    "font-nunito rounded-[120px] h-[28px] text-[12px] flex justify-center items-center font-medium px-3 py-3 whitespace-nowrap border transition-all border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 hover:cursor-pointer",
                    isActive
                      ? "bg-red-500 text-white border-red-500"
                      : "text-black bg-transparent border-default hover:bg-red-500 hover:border-red-500",
                  ].join(" ")}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategoryChips;
