import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { AddCategories, fetchCategories, AddSubCategories } from "../API/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [categoryOneLiner, setCategoryOneLiner] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [subCategories, setSubCategories] = useState([""]);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([""]);
  const [loading, setLoading] = useState(false);

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, ""]);
  };

  const handleSubCategoryChange = (index, value) => {
    const newSubCategories = [...subCategories];
    newSubCategories[index] = value;
    setSubCategories(newSubCategories);
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...subCategories];
    updated.splice(index, 1);
    setSubCategories(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);

    // Generate image preview
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Adding Categories and Sub-Categories both
  const AddToProdCategory = async () => {
    setLoading(true);
    const data = {
      category,
      categoryOneLiner,
      subCategories,
      categoryImage,
    };
    if (!category || !categoryOneLiner || !categoryImage) {
      alert("Please fill all the fields");
      return;
    }
    const res = await AddCategories(data);
    if (res.status === 400) alert("Category already exists");
    if (res.status === 500) alert("Something went wrong");
    if (res.status === 200) alert("Category added successfully");
    setCategory("");
    setCategoryOneLiner("");
    setSubCategories([""]);
    setCategoryImage(null);
    setLoading(false);
  };

  // Adding Sub-Categories only
  const AddToProdSubCategory = async () => {
    setLoading(true);
    const data = {
      category,
      subCategories,
    };
    if (!category || !subCategories) {
      alert("Please fill all the fields");
      return;
    }
    const res = await AddSubCategories(data);
    if (res.status === 400) alert("Sub-Category already exists");
    if (res.status === 500) alert("Something went wrong");
    if (res.status === 200) alert("Sub-Category added successfully");
    setCategory("");
    setCategoryOneLiner("");
    setSubCategories([""]);
    setLoading(false);
  };

  const fetchSubCategory = async () => {
    try {
      setOpenSubCategory(!openSubCategory);
      const res = await fetchCategories();
      const data = await res.json();
      setCategoryData(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-8">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
          <CircularProgress />
        </div>
      )}

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Product Category Section */}
        {!openSubCategory && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-amber-200">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
              Add Product Category & Sub-Category
            </h2>

            {/* Category Form Container */}
            <div className="flex flex-col gap-5">
              {/* Category Name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                  htmlFor="category"
                  className="font-semibold text-sm text-gray-800 w-full sm:w-[140px]"
                >
                  Category Name
                </label>
                <input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>

              {/* Category Image Upload */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                  htmlFor="categoryImage"
                  className="font-semibold text-sm text-gray-800 w-full sm:w-[140px]"
                >
                  Category Image
                </label>
                <input
                  id="categoryImage"
                  type="file"
                  name="categoryImage"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-amber-50 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 cursor-pointer"
                />
              </div>

              {/* Image Preview */}
              {previewUrl && (
                <div className="flex justify-center sm:justify-center mt-2">
                  <img
                    src={previewUrl}
                    alt="Category Preview"
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border border-gray-300 shadow-md"
                  />
                </div>
              )}

              {/* One Liner */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label
                  htmlFor="categoryOneLiner"
                  className="font-semibold text-sm text-gray-800 w-full sm:w-[140px]"
                >
                  Category One-Liner
                </label>
                <textarea
                  id="categoryOneLiner"
                  rows={2}
                  value={categoryOneLiner}
                  onChange={(e) => setCategoryOneLiner(e.target.value)}
                  placeholder="Enter short description"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>

              {/* Dynamic Subcategories */}
              <div className="mt-4 bg-amber-100 rounded-xl p-4 sm:p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-700 text-center sm:text-left">
                  Sub-Categories
                </h3>
                {subCategories.map((sub, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-3"
                  >
                    <label className="font-medium text-xs text-gray-800 w-full sm:w-[120px] text-center sm:text-left">
                      Sub-Category {index + 1}
                    </label>
                    <input
                      value={sub}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                      placeholder="Enter sub-category name"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                    {subCategories.length > 1 && (
                      <button
                        onClick={() => handleRemoveSubCategory(index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleAddSubCategory}
                  variant="contained"
                  sx={{
                    fontSize: "12px",
                    background: "black",
                    alignSelf: "center",
                    marginTop: "8px",
                  }}
                >
                  Add More Sub-Category
                </Button>
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-5">
                <Button
                  onClick={AddToProdCategory}
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex justify-center items-center mt-4">
          {openSubCategory ? (
            <Button
              onClick={() => setOpenSubCategory(!openSubCategory)}
              variant="contained"
              sx={{
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Add Product Category & Sub-Category
            </Button>
          ) : (
            <Button
              onClick={fetchSubCategory}
              variant="contained"
              sx={{
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Add Sub-Category Only
            </Button>
          )}
        </div>

        {/* Sub-Category Section */}
        {openSubCategory && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-sky-200 mt-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Add Sub-Categories
            </h2>

            <div className="flex flex-col gap-4">
              {/* Category Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                  htmlFor="category"
                  className="font-semibold text-sm text-gray-800 w-full sm:w-[150px]"
                >
                  Product Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-sky-50 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                >
                  <option value="">Select Category</option>
                  {categoryData.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Categories */}
              <div className="flex flex-col gap-3 bg-sky-100 p-4 rounded-xl">
                {subCategories.map((sub, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-3"
                  >
                    <label className="font-medium text-xs text-gray-800 w-full sm:w-[120px] text-center sm:text-left">
                      Sub-Category {index + 1}
                    </label>
                    <input
                      value={sub}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                      placeholder="Enter sub-category name"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                    />
                    {subCategories.length > 1 && (
                      <button
                        onClick={() => handleRemoveSubCategory(index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleAddSubCategory}
                  variant="contained"
                  sx={{
                    fontSize: "12px",
                    background: "black",
                    alignSelf: "center",
                    marginTop: "8px",
                  }}
                >
                  Add More Sub-Category
                </Button>
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-5">
                <Button
                  onClick={AddToProdSubCategory}
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
