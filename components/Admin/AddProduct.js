import React from "react";
import { useState, useEffect } from "react";
import { addProduct, fetchCategories, fetchSubCategories } from "../API/api";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [prodTitle, setProdTitle] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodDescription, setProdDescription] = useState("");
  const [prodOneLiner, setProdOneLiner] = useState("");
  const [loading, setLoading] = useState(false);

  const [prodImage, setProdImage] = useState(Array(5).fill(null)); // store files
  const [previewUrls, setPreviewUrls] = useState(Array(5).fill(null)); // store image preview URLs

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
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubCategoriesData();
  }, [category]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update image files
    setProdImage((prevImages) => {
      const updated = [...prevImages];
      updated[index - 1] = file;
      return updated;
    });

    // Create a preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrls((prevUrls) => {
      const updated = [...prevUrls];
      updated[index - 1] = preview;
      return updated;
    });
  };

  async function ProdSubmit(e) {
    e.preventDefault();
    if (
      !category ||
      !subCategory ||
      !prodTitle ||
      !prodDescription ||
      !prodOneLiner ||
      !prodPrice ||
      !prodImage[0] ||
      !prodImage[1] ||
      !prodImage[2] ||
      !prodImage[3] ||
      !prodImage[4]
    ) {
      alert("Please fill all the fields and upload all images.");
      return;
    }
    setLoading(true);

    const data = {
      title: prodTitle,
      description: prodDescription,
      one_liner: prodOneLiner,
      category_id: Number(category),
      subcategory_id: Number(subCategory),
      price: Number(prodPrice),
      images: prodImage,
    };

    try {
      const res = await addProduct(data);
      if (res.ok) {
        alert("Product Added Successfully");
        setProdTitle("");
        setProdOneLiner("");
        setProdDescription("");
        setProdPrice(0)

      } else {
        alert("Error in Product uploading");
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen px-10">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50 backdrop-blur-sm">
          <CircularProgress />
        </div>
      )}

      {/* Animated Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-sky-200 backdrop-blur-lg shadow-2xl rounded-3xl p-10"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Add New Product
        </h1>

        <form onSubmit={ProdSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Title */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-sky-100 shadow-md p-5 rounded-xl"
            >
              <label
                htmlFor="product_title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Title
              </label>
              <input
                onChange={(e) => setProdTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                type="text"
                id="product_title"
              />
            </motion.div>

            {/* Product Description */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-sky-100 shadow-md p-5 rounded-xl"
            >
              <label
                htmlFor="product_description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Description
              </label>
              <textarea
                onChange={(e) => setProdDescription(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                rows="4"
                required
              />
            </motion.div>

            {/* Category & Subcategory */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-sky-100 shadow-md p-5 rounded-xl flex flex-col gap-4"
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

            {/* One-liner */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-sky-100 shadow-md p-5 rounded-xl"
            >
              <label
                htmlFor="product_oneliner"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product One Liner
              </label>
              <textarea
                onChange={(e) => setProdOneLiner(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                rows="2"
                required
              />
            </motion.div>

            {/* Product Images */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-sky-100 shadow-md p-5 rounded-xl col-span-2"
            >
              <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                Product Images
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <label
                      htmlFor={`product_images_${num}`}
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Image {num}
                    </label>
                    <input
                      onChange={(e) => handleImageChange(e, num)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      type="file"
                      accept="image/*"
                      id={`product_images_${num}`}
                    />
                    {previewUrls[num - 1] && (
                      <motion.img
                        src={previewUrls[num - 1]}
                        alt={`Preview ${num}`}
                        className="w-24 h-24 object-cover rounded-lg mt-3 shadow-lg border border-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Price */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-sky-100 shadow-md p-5 rounded-xl"
            >
              <label
                htmlFor="product_price"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Price (₹)
              </label>
              <input
                onChange={(e) => setProdPrice(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                type="number"
                id="product_price"
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all"
            >
              {loading ? "Submitting..." : "Submit Product"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
