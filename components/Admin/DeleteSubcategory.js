import React from 'react'
import { useState, useEffect } from 'react'
import {
  DeleteSub_category,
  fetchCategories,
  fetchSubCategories
} from '../API/api'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'

const DeleteSubcategory = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState('')
  const [loading, setLoading] = useState(false)

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
      } catch (error) {
        console.error('Error fetching subcategories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSubCategoriesData()
  }, [category])

  async function DeleteSubcateg () {
    const res = await DeleteSub_category(subCategory)
    const data = await res.json()
    if (res.ok) {
      alert(data.message)
      setCategory('')
      setSubCategory('')
      setCategories([])
    } else {
      alert(data.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='max-w-7xl mx-auto bg-sky-200 backdrop-blur-lg rounded-3xl p-10'
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className='bg-sky-100 w-96 shadow-md p-5 rounded-xl flex flex-col gap-4 m-auto'
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

        <Button variant='contained' onClick={DeleteSubcateg}>
          Delete
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default DeleteSubcategory
