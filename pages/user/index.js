import React from "react";
import Image from "next/image";

const UserPage = () => {
  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
          {/* Illustration */}
          <div className="w-64 h-64 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Not Found"
              height={100}
              width={100}
              className="w-full h-full object-contain opacity-90"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6">
            Oops! Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-center mt-3 max-w-md text-sm md:text-base">
            The page you're looking for doesn’t exist or has been moved. Please
            check the URL or go back to the homepage.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 text-sm font-medium bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
            >
              Go Back
            </button>

            <a
              href="/"
              className="px-5 py-2 cursor-pointer rounded-xl text-white text-sm font-medium bg-black shadow-md hover:bg-gray-900 active:scale-95 transition"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
