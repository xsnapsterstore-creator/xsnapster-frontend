import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  deleteProduct,
  fetchCategories,
  fetchSubCategories,
  fetchSubCategoriesProduct,
} from "../API/api";
import { CircularProgress } from "@mui/material";

const ActiveProducts = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: null,
  });

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        setLoading(true);
        const res = await fetchCategories();
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllCategories();
  }, []);

  useEffect(() => {
    async function fetchSubCategoriesData() {
      if (!category) {
        setSubCategories([]);
        return;
      }

      try {
        setLoading(true);
        const res = await fetchSubCategories(category);
        const data = await res.json();
        setSubCategories(data);
        setProduct([]);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubCategoriesData();
  }, [category]);

  useEffect(() => {
    async function fetchSubCategoriesProductData() {
      if (!subCategory) {
        setSubCategories([]);
        return;
      }

      try {
        setLoading(true);
        const res = await fetchSubCategoriesProduct(subCategory);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubCategoriesProductData();
  }, [subCategory]);

  async function handleDelete(id) {
    const res = await deleteProduct(id);
    const data = await res.json();
    alert(data.message)
  }

  return (
    <div className="min-h-screen">
      <div className="w-full bg-green-100 p-5 rounded-2xl shadow-2xl">
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50 backdrop-blur-sm">
            <CircularProgress />
          </div>
        )}
        {/* Category selectors */}
        <div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-sky-100 shadow-md max-w-[250px] m-auto p-5 rounded-xl flex flex-col gap-4"
          >
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subcategory"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Sub-Category
              </label>
              <select
                id="subcategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!category || loading}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">
                  {loading
                    ? "Loading..."
                    : category
                    ? "Select Sub-Category"
                    : "Select Category First"}
                </option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>

        {/* Confirmation to Delete The Product */}
        {confirmDelete.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Product
              </h3>
              <p className="text-sm text-gray-600 mb-5">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setConfirmDelete({ open: false, id: null })}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    handleDelete(confirmDelete.id);
                    setConfirmDelete({ open: false, id: null });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product list */}
        <div className="mt-5">
          <div className="flex flex-col gap-4 w-full">
            {product.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between gap-6 bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                {/* Title */}
                <div className="w-1/5">
                  <h2 className="text-xs font-semibold text-gray-800">
                    {prod.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Product ID: {prod.id}
                  </p>
                  <p className="text-sm text-gray-500">View Count: {prod.view_count}</p>
                </div>

                {/* Description */}
                <div className="w-1/3 text-sm text-gray-600 flex flex-col gap-1">
                  <p className="font-medium text-gray-700">{prod.one_liner}</p>
                  <p className="line-clamp-2 text-xs text-gray-500">
                    {prod.description}
                  </p>
                </div>

                {/* Category */}
                <div className="w-1/6 text-xs text-gray-600">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {prod.category}
                  </p>
                  <p>
                    <span className="font-semibold">Sub-Category:</span>{" "}
                    {prod.subcategory}
                  </p>
                </div>

                {/* Image */}
                <div className="w-24 h-24">
                  <img
                    src={prod.image_link}
                    alt={prod.title}
                    className="w-full h-full object-cover rounded-md shadow-sm"
                  />
                </div>

                {/* Price */}
                <div className="w-1/6 text-sm">
                  <p className="font-semibold text-gray-800">₹{prod.price}</p>
                  {prod.discounted_price && (
                    <p className="text-red-500 line-through text-xs">
                      ₹{prod.discounted_price}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded shadow hover:bg-red-600"
                    onClick={() =>
                      setConfirmDelete({ open: true, id: prod.id })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProducts;
