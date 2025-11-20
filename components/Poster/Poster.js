import React from "react";

const Poster = () => {
  return (
    <div className="p-2">
      <div className="w-full p-[8px] rounded-[10px]  flex items-center justify-center bg-black text-white">
        <div className="p-[2px]">
          <h2 className="text-[15px] font-semibold text-red-500 text-center animate-pulse">
            Not that kind of site... but your walls will still get lucky.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Poster;
