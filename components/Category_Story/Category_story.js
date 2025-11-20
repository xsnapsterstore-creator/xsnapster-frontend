import React from "react";
import Image from "next/image";

const Category_Story = ({ category }) => {
  const Categ_array = [
    {
      id: 1,
      title: "Cars",
      subtitle: "Fast & Curious",
      img: "/bmw_1.webp",
      slug: "cars",
    },
    {
      id: 2,
      title: "Anime",
      subtitle: "Hentai...But Not Really",
      img: "/anime.jpeg",
      slug: "anime",
    },
    {
      id: 3,
      title: "B&W Aesthetics",
      subtitle: "BBF (Big Black Frames)",
      img: "/blackandwhite.jpeg",
      slug: "black-and-white-aesthetics",
    },
    {
      id: 4,
      title: "Gym",
      subtitle: "Hard & Heavy",
      img: "/gym.jpeg",
      slug: "gym",
    },
    {
      id: 5,
      title: "Marvel",
      subtitle: "Super Hard Heroes",
      img: "/marvel.jpeg",
      slug: "marvel",
    },
    {
      id: 6,
      title: "Movies",
      subtitle: "Rated Frame Only",
      img: "/movies.jpeg",
      slug: "movies",
    },
    {
      id: 7,
      title: "Music Album",
      subtitle: "Moan & Groan Records",
      img: "/music.jpeg",
      slug: "music-album",
    },
    {
      id: 8,
      title: "Sports",
      subtitle: "Sweaty & Wild",
      img: "/cricket.jpeg",
      slug: "sports",
    },
    {
      id: 9,
      title: "For Her",
      subtitle: "She Wants It All",
      img: "/forher.jpeg",
      slug: "for-her",
    },
    {
      id: 10,
      title: "For Him",
      subtitle: "Big Boys Collection",
      img: "/forhim.jpeg",
      slug: "for-him",
    },
  ];
  return (
    <div className="pt-[95px]">
      <div className="mt-3 ml-3">
        <p className="text-sm font-medium text-gray-700">
          Buy with <bold className="text-red-500">x</bold>Snapster
          <bold className="text-red-500">Live</bold> Sale Now !
        </p>
      </div>
      <div className="overflow-x-auto scrollbar-hide mt-3">
        <div className="flex items-center gap-2 px-3 snap-x snap-mandatory">
          {category.map((item) => (
            <div
              onClick={() => {
                window.location.href = `/categories/${item.slug}`;
              }}
              key={item.id}
              className="flex flex-col w-[110px] h-[150px] items-center flex-shrink-0 snap-start cursor-pointer"
            >
              {/* Story Circle */}
              <div className="p-[2px] w-[90px] h-[90px] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400">
                <img
                  src={item.image_links}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="rounded-full h-[85px] object-cover border-2 border-white"
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
