import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Category_Story = ({ category }) => {
  const router = useRouter();
  return (
    <div className="pt-[82px]">
      <div className="mt-3 ml-2">
        <p className="text-sm font-medium text-gray-700">
          Buy with <bold className="text-red-500">x</bold>Snapster
          <bold className="text-red-500">Live</bold> Sale Now !
        </p>
      </div>
      <div className="overflow-x-auto scrollbar-hide mt-3">
        <div className="flex items-center gap-1 px-3 snap-x snap-mandatory">
          {category.map((item) => (
            <div
              onClick={() => {
                router.push(`/categories/${item.slug}`);
              }}
              key={item.id}
              className="flex flex-col w-[110px] h-[150px] items-center flex-shrink-0 snap-start cursor-pointer"
            >
              {/* Story Circle */}
              <div className="p-[2.5px] w-[90px] h-[90px] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400">
                <Image
                  src={item.image_links[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  loading="lazy"
                  quality={75}
                  className="rounded-full h-[85px] w-[85px] object-cover border-2 border-white"
                />
              </div>

              {/* Title Below */}
              <p className="mt-1 text-[12px] font-medium text-center text-gray-700">
                {item.name}
              </p>
              <span className="text-[9px] text-red-500">{item.one_liner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category_Story;
