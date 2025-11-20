import React from "react";
import AddCategory from "@/components/Admin/AddCategory";
import AddProduct from "@/components/Admin/AddProduct";
import ActiveProducts from "@/components/Admin/ActiveProducts";
import { useState } from "react";

const XsnapsterUser = () => {
  const [activeTab, setActiveTab] = useState("product");

  return (
    <div className="pt-[95px]">
      <div className="m-3">
        <div className="m-1">
          <h1 className="text-[30px] font-semibold tracking-wide text-center">
            <span className="text-red-500">X</span>SNAPSTER Product Listing
          </h1>
        </div>

        {/* ===== Toggle Buttons ===== */}
        <div className="flex justify-center gap-5 mt-6">
          <button
            onClick={() => setActiveTab("category")}
            className={`lg:px-5 lg:py-2 py-2 px-4 text-xs font-medium rounded-lg transition-all ${
              activeTab === "category"
                ? "bg-black text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Add Category
          </button>

          <button
            onClick={() => setActiveTab("product")}
            className={`lg:px-5 lg:py-2 py-2 px-4 text-xs font-medium rounded-lg transition-all ${
              activeTab === "product"
                ? "bg-black text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Add Product
          </button>

          <button
            onClick={() => setActiveTab("price")}
            className={`lg:px-5 lg:py-2 py-2 px-4 text-xs font-medium rounded-lg transition-all ${
              activeTab === "price"
                ? "bg-black text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Active Products
          </button>
        </div>

        {/* ===== Conditional Rendering ===== */}
        <div className="mt-8">
          {activeTab === "product" && <AddProduct />}
          {activeTab === "category" && <AddCategory />}
          {activeTab === "price" && <ActiveProducts />}
        </div>
      </div>
    </div>
  );
};

export default XsnapsterUser;
