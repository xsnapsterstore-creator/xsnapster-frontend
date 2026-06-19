import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  deleteProduct,
  fetchCategories,
  fetchSubCategories,
  fetchSubCategoriesProduct
} from '../API/api'
import { CircularProgress } from '@mui/material'
import EditProduct from './EditProduct'

const ActiveProducts = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState([])
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: null
  })
  const [editProduct, setEditProduct] = useState({ open: false, data: null })

  useEffect(() => {
    async function fetchAllCategories () {
      try {
        setLoading(true)
        const res = await fetchCategories()
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllCategories()
  }, [])

  useEffect(() => {
    async function fetchSubCategoriesData () {
      if (!category) {
        setSubCategories([])
        return
      }

      try {
        setLoading(true)
        const res = await fetchSubCategories(category)
        const data = await res.json()
        setSubCategories(data)
        setProduct([])
      } catch (error) {
        console.error('Error fetching subcategories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSubCategoriesData()
  }, [category])

  useEffect(() => {
    async function fetchSubCategoriesProductData () {
      if (!subCategory) {
        setSubCategories([])
        return
      }

      try {
        setLoading(true)
        const res = await fetchSubCategoriesProduct(subCategory)
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching subcategories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSubCategoriesProductData()
  }, [subCategory])

  async function handleDelete (id) {
    const res = await deleteProduct(id)
    const data = await res.json()
    alert(data.message)
  }

  async function handleEdit (prod) {
    setEditProduct({ open: true, data: prod })
  }

  return (
    <div className='min-h-screen'>
      <div className='w-full bg-green-100 p-5 rounded-2xl'>
        {/* Loading Overlay */}
        {loading && (
          <div className='fixed inset-0 flex items-center justify-center bg-white/70 z-50 backdrop-blur-sm'>
            <CircularProgress />
          </div>
        )}
        {/* Category selectors */}
        <div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='bg-sky-100 shadow-md max-w-[250px] m-auto p-5 rounded-xl flex flex-col gap-4'
          >
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Product Category
              </label>
              <select
                id='category'
                value={category}
                onChange={e => {
                  setCategory(e.target.value)
                  setSubCategory('')
                }}
                className='w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
              >
                <option value=''>Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor='subcategory'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Product Sub-Category
              </label>
              <select
                id='subcategory'
                value={subCategory}
                onChange={e => setSubCategory(e.target.value)}
                disabled={!category || loading}
                className='w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
              >
                <option value=''>
                  {loading
                    ? 'Loading...'
                    : category
                    ? 'Select Sub-Category'
                    : 'Select Category First'}
                </option>
                {subCategories.map(sub => (
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
          <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-xl w-80'>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                Delete Product
              </h3>
              <p className='text-sm text-gray-600 mb-5'>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>

              <div className='flex justify-end gap-3'>
                <button
                  className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
                  onClick={() => setConfirmDelete({ open: false, id: null })}
                >
                  Cancel
                </button>

                <button
                  className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                  onClick={() => {
                    handleDelete(confirmDelete.id)
                    setConfirmDelete({ open: false, id: null })
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product */}
        {editProduct.open && (
          <EditProduct
            edit={editProduct}
            onClose={() => setEditProduct({ open: false, data: null })}
          />
        )}

        {/* Product List */}
        <div className='mt-5'>
          <div className='flex flex-col gap-3 w-full'>
            {product.map(prod => (
              <div
                key={prod.id}
                className='flex items-center gap-5 bg-white px-5 py-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200'
              >
                {/* Image */}
                <div className='w-16 h-16 flex-shrink-0'>
                  <img
                    src={prod.image_link}
                    alt={prod.title}
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>

                {/* Title + ID */}
                <div className='w-[22%] min-w-0'>
                  <h2 className='text-sm font-semibold text-gray-800 truncate'>
                    {prod.title}
                  </h2>
                  <p className='text-xs text-gray-400 mt-0.5'>ID: {prod.id}</p>
                  <p className='text-xs text-gray-500 mt-1 truncate'>
                    {prod.one_liner}
                  </p>
                </div>

                {/* Category */}
                <div className='w-[18%] min-w-0'>
                  <span className='inline-block text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-full'>
                    {prod.category}
                  </span>
                  {prod.subcategory && (
                    <span className='inline-block text-xs bg-gray-100 text-gray-500 font-medium px-2.5 py-1 rounded-full mt-1.5'>
                      {prod.subcategory}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className='w-[14%]'>
                  <p className='text-sm font-bold text-gray-900'>
                    ₹{prod.discounted_price}
                  </p>
                  {prod.price && (
                    <div className='flex items-center gap-1.5 mt-0.5'>
                      <p className='text-xs text-gray-400 line-through'>
                        ₹{prod.price}
                      </p>
                      <span className='text-xs text-emerald-600 font-medium'>
                        {Math.round(
                          ((prod.price - prod.discounted_price) / prod.price) *
                            100
                        )}
                        % off
                      </span>
                    </div>
                  )}
                </div>

                {/* View Count */}
                <div className='w-[12%]'>
                  <div className='flex items-center gap-1.5'>
                    <svg
                      className='w-3.5 h-3.5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                    <p className='text-sm font-semibold text-gray-700'>
                      {prod.view_count}
                    </p>
                  </div>
                  <p className='text-xs text-gray-400 mt-0.5 ml-5'>views</p>
                </div>

                {/* Stock Status — optional placeholder */}
                <div className='flex-1'>
                  <span className='inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600'>
                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block'></span>
                    Active
                  </span>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2 flex-shrink-0'>
                  <button
                    onClick={() => handleEdit(prod)}
                    className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all'
                  >
                    <svg
                      className='w-3 h-3'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setConfirmDelete({ open: true, id: prod.id })
                    }
                    className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-red-500 border border-red-200 rounded-lg hover:bg-red-50 active:scale-95 transition-all'
                  >
                    <svg
                      className='w-3 h-3'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveProducts
