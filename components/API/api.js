// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://3.110.216.212:8000/v1";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.xsnapster.store/v1";

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
    // credentials: "include",
    body: JSON.stringify({ identifier: email, otp }),
  });

  if (!res.ok) {
    const error = await res.json();
    return error || "OTP verification failed";
  }
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

// Delete Product by ID
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
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

// ---------------------------------------------
//            Secure API's
//----------------------------------------------

//Refresh Token
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("access_token");
  console.log("Step 6");

  if (!refreshToken) return null;
  console.log("Step 7");

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    console.log("Step 8");

    if (!res.ok) return null;
    console.log("Step 9");

    const data = await res.json();
    console.log("This is the data:", data);
    localStorage.setItem("access_token", data.access_token);
    console.log("Step 10");

    return data.access_token;
  } catch (err) {
    return null;
  }
}

// Secure API's
export async function secureFetch(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");
  console.log("Step 2");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  console.log("Step 3");
  // First try
  let res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  console.log("Step 4");
  if (res.status !== 401) return res; // valid response
  console.log("Step 5");

  // Token expired → refresh
  const newToken = await refreshAccessToken();
  console.log("Step 11");

  if (!newToken) {
    console.log("❌ User must login again");
    return null;
  }
  console.log("Step 12");

  // Retry request with new token
  return await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${newToken}`,
    },
  });
}

//Fetch User's Address
export const fetchUserAddress = async () => {
  console.log("Step 1");
  const res = await secureFetch("/addresses/", { method: "GET" });

  if (!res) return null;
  return res.json();
};
