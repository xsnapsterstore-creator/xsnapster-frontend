import React from 'react'
import { useState, useEffect } from 'react'
import {
  fetchSubCategories,
  fetchCategories,
  EditProductDetails
} from '../API/api'
import { Button } from '@mui/material'
const EditProduct = ({ edit, onClose }) => {
  const product = edit?.data
  const [form, setForm] = useState({
    title: '',
    one_liner: '',
    description: '',
    category_id: 0,
    subcategory_id: 0,
    is_active: true,
    image_link: ''
  })
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [showCategory, setShowCategory] = useState(false)

  useEffect(() => {
    if (!product) return
    setForm({
      title: product.title ?? '',
      one_liner: product.one_liner ?? '',
      description: product.description ?? '',
      category_id: Number(product.category_id || 0),
      subcategory_id: Number(product.subcategory_id || 0),
      is_active: !!product.is_active,
      image_link: product.image_link ?? ''
    })
  }, [product])

  async function GetCategories () {
    const res = await fetchCategories()
    const data = await res.json()
    setShowCategory(true)
    setCategories(data)
  }

  useEffect(() => {
    if (!form.category_id) {
      setSubCategories([])
      return
    }
    async function fetchSubCategoriesData () {
      const res = await fetchSubCategories(form.category_id)
      const data = await res.json()
      setSubCategories(data)
    }
    fetchSubCategoriesData()
  }, [form.category_id])

  async function handleSubmit () {
    if (!form.category_id || !form.subcategory_id) {
      alert('Select the Category & Sub-Category')
      return
    }
    const res = await EditProductDetails(form, edit?.data?.id)
    const data = await res.json();
    alert(data.message);
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4'>
      <div className='bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[calc(100vh-2rem)] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>
              Edit Product
            </h2>
            <p className='text-xs text-gray-500 mt-0.5'>
              ID: {edit?.data?.id ?? '-'}
            </p>
          </div>

          <button
            type='button'
            className='px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200'
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto'>
          {/* Left: image + meta */}
          <div className='md:col-span-1'>
            <div className='w-full aspect-square bg-gray-50 rounded-xl border flex items-center justify-center overflow-hidden'>
              {form.image_link ? (
                <img
                  src={form.image_link}
                  alt={form.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='text-sm text-gray-400'>No image</span>
              )}
            </div>

            <div className='mt-4 space-y-3'>
              <div className='flex items-center justify-between bg-gray-50 border rounded-xl px-3 py-2'>
                <div>
                  <p className='text-xs font-semibold text-gray-700'>Active</p>
                  <p className='text-[11px] text-gray-500'>Visible on store</p>
                </div>
                <button
                  type='button'
                  className={`w-12 h-7 rounded-full relative transition ${
                    form.is_active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  onClick={() =>
                    setForm(f => ({ ...f, is_active: !f.is_active }))
                  }
                >
                  <span
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition ${
                      form.is_active ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Product Category */}
              <div className='text-xs text-gray-600 bg-gray-50 border rounded-xl p-3'>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Category</span>
                  <span>{edit?.data?.category ?? '-'}</span>
                </div>
                <div className='flex justify-between mt-1'>
                  <span className='font-semibold'>Subcategory</span>
                  <span>{edit?.data?.subcategory ?? '-'}</span>
                </div>
              </div>

              {/* For Changing the Category */}
              <Button onClick={GetCategories} variant='contained'>
                Select Category
              </Button>
              {showCategory && (
                <div className='text-xs text-gray-600 bg-gray-50 border rounded-xl p-3 mt-4'>
                  <div className='flex justify-between'>
                    <span className='font-semibold'>Category</span>
                    <select
                      value={form.category_id}
                      onChange={e =>
                        setForm(f => ({ ...f, category_id: Number(e.target.value), subcategory_id: 0 }))
                      }
                    >
                      <option value=''>Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex justify-between mt-1'>
                    <span className='font-semibold'>Subcategory</span>
                    <select
                      id='subcategory'
                      value={form.subcategory_id}
                      onChange={e =>
                        setForm(f => ({ ...f, subcategory_id: Number(e.target.value) }))
                      }
                    >
                      <option value=''>Select</option>
                      {subCategories.map(sub => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: form fields */}
          <div className='md:col-span-2 space-y-4'>
            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1'>
                Title
              </label>
              <input
                className='w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder='Product title'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1'>
                One-liner
              </label>
              <input
                className='w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={form.one_liner}
                onChange={e =>
                  setForm(f => ({ ...f, one_liner: e.target.value }))
                }
                placeholder='Short tagline'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                rows={8}
                className='w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={form.description}
                onChange={e =>
                  setForm(f => ({ ...f, description: e.target.value }))
                }
                placeholder='Full product description...'
              />
            </div>

            {/* Footer actions */}
            <div className='flex items-center justify-end gap-3 pt-2'>
              <button
                type='button'
                className='px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200'
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type='button'
                className='px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
