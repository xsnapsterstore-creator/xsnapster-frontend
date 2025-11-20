import React from "react";
import cars from "./../../public/bmw.jpeg";
import anime from "./../../public/anime.jpeg";
import blackandwhite from "./../../public/blackandwhite.jpeg";
import forher from "./../../public/forher.jpeg";
import forhim from "./../../public/forhim.jpeg";
import cricket from "./../../public/cricket.jpeg";
import gym from "./../../public/gym.jpeg";
import marvel from "./../../public/marvel.jpeg";
import movies from "./../../public/movies.jpeg";
import music from "./../../public/music.jpeg";
import Image from "next/image";

const Categories = () => {
  const category = [
    {
      categoryId: 1,
      categoryName: "Cars",
      subtitle: "Fast & Curious",
      slug: "cars",
      img: cars,
      color: "bg-blue-100",
    },
    {
      categoryId: 2,
      categoryName: "Anime",
      subtitle: "Hentai...But Not Really",
      slug: "anime",
      img: anime,
      color: "bg-red-100",
    },
    {
      categoryId: 3,
      categoryName: "Black & White Aesthetics",
      subtitle: "Fifty Shades of Frames",
      slug: "black-and-white-aesthetics",
      img: blackandwhite,
      color: "bg-gray-100",
    },
    {
      categoryId: 4,
      categoryName: "Gym",
      subtitle: "Hard & Heavy",
      slug: "gym",
      img: gym,
      color: "bg-green-100",
    },
    {
      categoryId: 5,
      categoryName: "Marvel",
      subtitle: "Super Hard Heroes",
      slug: "marvel",
      img: marvel,
      color: "bg-pink-100",
    },
    {
      categoryId: 6,
      categoryName: "Movies",
      subtitle: "Rated Frames Only",
      slug: "movies",
      img: movies,
      color: "bg-yellow-100",
    },
    {
      categoryId: 7,
      categoryName: "Music Album",
      subtitle: "Moan & Groan Records",
      slug: "music-album",
      img: music,
      color: "bg-purple-100",
    },
    {
      categoryId: 8,
      categoryName: "Sports",
      subtitle: "Sweaty & Wild",
      slug: "sports",
      img: cricket,
      color: "bg-orange-100",
    },
    {
      categoryId: 9,
      categoryName: "For Her",
      subtitle: "She Wants It All",
      slug: "for-her",
      img: forher,
      color: "bg-pink-100",
    },
    {
      categoryId: 10,
      categoryName: "For Him",
      subtitle: "Big Boys Collection",
      slug: "for-him",
      img: forhim,
      color: "bg-blue-100",
    },
  ];
  return (
    <div className="pt-[95px] px-3 pb-3">
      <h1 className="text-2xl font-semibold text-center mt-4 mb-4">
        Shop by Category
      </h1>
      <hr />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5 justify-center">
        {category.map((categProd, index) => (
          <div
            onClick={() => {
              window.location.href = `/categories/${categProd.slug}`;
            }}
            key={index}
            className={`${categProd.color} shadow-md rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300`}
          >
            {/* Category Image */}
            <div className="w-[150px] h-[220px] flex items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={categProd.img}
                alt={categProd.categoryName}
                width={160}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Category Name */}
            <div className="mt-4 text-center">
              <h2 className="text-base font-semibold text-gray-800">
                {categProd.categoryName}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
