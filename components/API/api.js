const API_URL = 'https://api.xsnapster.store/v1'

// Request OTP Api
export const requestOTP = async email => {
  const res = await fetch(`${API_URL}/auth/request-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ identifier: email })
  })
  return res
}

// Verify OTP
export const verifyOTP = async (email, otp) => {
  const res = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ identifier: email, otp })
  })
  return res
}

//Fetch Categories API
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/category/`, {
    method: 'GET'
  })
  return res
}

//Fetch Sub-Categories by Category ID API
export const fetchSubCategories = async id => {
  const res = await fetch(`${API_URL}/subcategory/${id}`, {
    method: 'GET'
  })
  return res
}

//Fetch All Sub0Categories API
export const fetchAllSubCategories = async () => {
  const res = await fetch(`${API_URL}/subcategory/`, {
    method: 'GET'
  })
  return res
}

// Fetch Products by Sub-Categories
export const fetchSubCategoriesProduct = async id => {
  const res = await fetch(`${API_URL}/products/subcategory/${id}`, {
    method: 'GET'
  })
  return res
}

// Fetch Product by ID
export const fetchProduct = async id => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET'
  })
  return res
}

// Fetch Homepage Products
export const fetchHomepage = async id => {
  const res = await fetch(`${API_URL}/products/top-viewed`, {
    method: 'GET'
  })
  return res
}

// ---------------------------------------------
//        Secure API's (Protected Routes)
//----------------------------------------------

// Refresh Token
export async function refreshAccessToken () {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include' // <-- IMPORTANT (send refresh_token cookie)
    })

    if (!res.ok) {
      console.log('Refresh failed:', res.status)
      return null
    }

    const data = await res.json()

    if (data?.access_token) {
      localStorage.setItem('access_token', data.access_token)
      return data.access_token
    }

    return null
  } catch (err) {
    console.log('Refresh error:', err)
    return null
  }
}

// Secure Fetch API
export async function secureFetch (url, options = {}) {
  let accessToken = localStorage.getItem('access_token')

  // Build request headers
  const headers = {
    ...(options.headers || {}),
    Authorization: accessToken ? `Bearer ${accessToken}` : ''
  }

  // First API request
  let res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include' // <-- FIXED
  })

  if (res.status !== 401) return res // Access token is valid
  // Try to refresh token
  const newToken = await refreshAccessToken()

  if (!newToken) {
    console.log('❌ User must login again (no new token)')
    Promise.resolve().then(() => {
      localStorage.clear()
    })
    window.location.href = '/login'
    return null
  }

  // Retry request with new token
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${newToken}`
    },
    credentials: 'include'
  })
}

// ---------------------------------------------
//        Admin API's
//----------------------------------------------

// Add Categories API
export const AddCategories = async data => {
  const formData = new FormData()
  formData.append('category_name', data.category)
  formData.append('category_one_liner', data.categoryOneLiner)
  data.subCategories.map(item => formData.append('subcategory_names', item))
  formData.append('images', data.categoryImage)
  const res = await secureFetch('/subcategory/', {
    method: 'POST',
    body: formData
  })
  return res
}

// Add Sub-Categories API
export const AddSubCategories = async data => {
  const formData = new FormData()
  formData.append('category_id', Number(data.category))
  data.subCategories.map(item => formData.append('subcategory_names', item))
  const res = await secureFetch('/subcategory/', {
    method: 'POST',
    body: formData
  })

  return res
}

// Adding Product
export const addProduct = async data => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('one_liner', data.one_liner)
  formData.append('category_id', Number(data.category_id))
  formData.append('subcategory_id', Number(data.subcategory_id))
  formData.append('price', Number(data.price))
  formData.append('discounted_price', Number(data.discounted_price))
  data.dimensions.forEach(size => {
    formData.append('dimensions', size)
  })
  data.images.forEach(img => {
    formData.append('images', img)
  })
  const res = await secureFetch('/products/', {
    method: 'POST',
    body: formData
  })
  return res
}

// Edit Product API
export const EditProductDetails = async (data, id) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('one_liner', data.one_liner)
  formData.append('description', data.description)
  formData.append('category_id', data.category_id)
  formData.append('subcategory_id', data.subcategory_id)
  formData.append('is_active', data.is_active)
  const res = await secureFetch(`/products/${id}`, {
    method: 'PUT',
    body: formData
  })
  return res
}

// Delete Product by ID
export const deleteProduct = async id => {
  const res = await secureFetch(`/products/${id}`, {
    method: 'DELETE'
  })
  return res
}

export const fetchTotalOrders = async () => {
  try {
    const res = await secureFetch(`/user/orders/admin`, {
      method: 'GET'
    })
    if (!res) return null

    if (!res.ok) {
      const err = await res.json().catch(() => null)
      console.error('💥 Profile fetch error:', err)
      return null
    }
    return await res.json()
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

// ---------------------------------------------
//        User API's
//----------------------------------------------

// Fetch User's Address
export const fetchUserAddress = async () => {
  const res = await secureFetch('/addresses/', { method: 'GET' })

  if (!res) return null
  return res.json()
}

// Add User's Address
export const addUserAddress = async (data, defaultAddress) => {
  const formData = {
    name: data.name,
    address_line:
      data.house + ',' + ' ' + data.landmark + ',' + ' ' + data.street,
    city: data.city,
    state: data.state,
    zip_code: data.pincode,
    is_default: defaultAddress,
    address_type: data.address_type,
    phone_number: data.phone
  }
  try {
    const res = await secureFetch('/addresses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('💥 Server Validation Error:', err)
    }
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

//Delete User's Address
export const deleteUserAddress = async data => {
  try {
    const res = await secureFetch(`/addresses/${data}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('💥 Server Validation Error:', err)
    }
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

//Delete User's Address
export const updateUserAddress = async data => {
  const formData = {
    name: data.form.name,
    address_line:
      data.form.house +
      ',' +
      ' ' +
      data.form.landmark +
      ',' +
      ' ' +
      data.form.street,
    city: data.form.city,
    state: data.form.state,
    zip_code: data.form.pincode,
    is_default: data.data.is_default,
    address_type: data.form.address_type,
    phone_number: data.form.phone
  }
  try {
    const res = await secureFetch(`/addresses/${data.data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('💥 Server Validation Error:', err)
    }
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

//Fetch User's Profile
export const fetchUserProfile = async () => {
  try {
    const res = await secureFetch(`/user/profile`, {
      method: 'GET'
    })
    if (!res) return null

    if (!res.ok) {
      const err = await res.json().catch(() => null)
      console.error('💥 Profile fetch error:', err)
      return null
    }
    return await res.json()
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

//Logout User's Profile
export const logOutUserProfile = async () => {
  const access_token = localStorage.getItem('access_token')
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      credentials: 'include'
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('💥 Server Validation Error:', err)
      return
    }
    Promise.resolve().then(() => {
      localStorage.clear()
    })
    window.location.href = '/'
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

// User's Order API
export const UserOrder = async items => {
  try {
    const res = await secureFetch('/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('💥 Server Validation Error:', err)
    }
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

// User's Verify Payment API
export const verifyUserPayment = async data => {
  try {
    const res = await secureFetch('/payments/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = res
      console.error('💥 Server Validation Error:', err)
    }
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

//Fetch User's Order
export const fetchUserOrder = async () => {
  try {
    const res = await secureFetch(`/user/orders`, {
      method: 'GET'
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('💥 Server Validation Error:', err)
    }
    return res
  } catch (e) {
    console.error('Network/Parse Error:', e)
  }
}

export const ListCoupons = async () => {
  try {
    const res = await secureFetch(`/coupons/available`, {
      method: 'GET'
    })
    if (!res.ok) {
      const err = await res.json()
      return err
    }
    return await res.json()
  } catch (e) {
    return e
  }
}

export const AddCoupons = async data => {
  console.log("This is the Data:", data)
  try {
    const res = await secureFetch(`/admin/coupons/bogo`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json()
      return err
    }
  } catch (e) {
    return e
  }
}
