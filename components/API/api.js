// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://3.110.216.212:8000/v1";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.xsnapster.store/v1";

// Request OTP Api
export const requestOTP = async (email) => {
  const res = await fetch(`${API_URL}/auth/request-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: email }),
  });
  return res;
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  const res = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: email, otp: otp }),
  });
  return res;
};

// Add Categories API
export const AddCategories = async (data) => {
  const formData = new FormData();
  formData.append("category_name", data.category);
  formData.append("category_one_liner", data.categoryOneLiner);
  data.subCategories.map((item) => formData.append("subcategory_names", item));
  formData.append("images", data.categoryImage);
  const res = await fetch(`${API_URL}/subcategory/`, {
    method: "POST",
    body: formData,
  });
  return res;
};

// Add Sub-Categories API
export const AddSubCategories = async (data) => {
  const formData = new FormData();
  formData.append("category_id", Number(data.category));
  data.subCategories.map((item) => formData.append("subcategory_names", item));
  const res = await fetch(`${API_URL}/subcategory/`, {
    method: "POST",
    body: formData,
  });

  return res;
};

//Fetch Categories API
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/category/`, {
    method: "GET",
  });
  return res;
};

//Fetch Sub-Categories API
export const fetchSubCategories = async (id) => {
  const res = await fetch(`${API_URL}/subcategory/${id}`, {
    method: "GET",
  });
  return res;
};

// Fetch Products by Sub-Categories
export const fetchSubCategoriesProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/subcategory/${id}`, {
    method: "GET",
  });
  return res;
};

// Fetch Product by ID
export const fetchProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "GET",
  });
  return res;
};

// Fetch Homepage Products
export const fetchHomepage = async (id) => {
  const res = await fetch(`${API_URL}/products/top-viewed`, {
    method: "GET",
  });
  return res;
};

// Adding Product
export const addProduct = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("one_liner", data.one_liner);
  formData.append("category_id", Number(data.category_id));
  formData.append("subcategory_id", Number(data.subcategory_id));
  formData.append("price", Number(data.price));
  data.images.forEach((img) => {
    formData.append("images", img);
  });
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    body: formData,
  });
  return res;
};
