import { useState } from 'react'
import { AddCoupons } from '../API/api'

export default function AddCoupon () {
  const [form, setForm] = useState({
    code: '',
    type: 'BOGO_SAME_DIMENSION',
    description: '',
    is_active: true,
    valid_from: '',
    valid_until: '',
    min_order_amount: '',
    usage_limit: '',
    per_user_usage_limit: '',
    buy_quantity: 0,
    get_free_quantity: 0,
    discount_percentage: null,
    max_discount_cap: null
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await AddCoupons(form)
    console.log('Submit Coupon:', res)
  }

  return (
    <div className='max-w-3xl mx-auto p-4 md:p-6 bg-gray-50 rounded-2xl shadow'>
      <h2 className='text-xl md:text-2xl font-semibold mb-4'>Add New Coupon</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Code */}
        <input
          type='text'
          name='code'
          placeholder='Coupon Code (e.g. SAVE20)'
          value={form.code}
          onChange={handleChange}
          className='w-full border rounded-lg p-2'
          required
        />

        {/* Type */}
        <select
          name='type'
          value={form.type}
          onChange={handleChange}
          className='w-full border rounded-lg p-2'
        >
          <option value='BOGO_SAME_DIMENSION'>BOGO (Same Dimension)</option>
          <option value='PERCENTAGE'>Percentage Discount</option>
        </select>

        {/* Description */}
        <textarea
          name='description'
          placeholder='Description'
          value={form.description}
          onChange={handleChange}
          className='w-full border rounded-lg p-2'
        />

        {/* Active */}
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='is_active'
            checked={form.is_active}
            onChange={handleChange}
          />
          Active
        </label>

        {/* Dates */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <input
            type='datetime-local'
            name='valid_from'
            value={form.valid_from}
            onChange={handleChange}
            className='border rounded-lg p-2'
          />
          <input
            type='datetime-local'
            name='valid_until'
            value={form.valid_until}
            onChange={handleChange}
            className='border rounded-lg p-2'
          />
        </div>

        {/* Limits */}
        <div className='grid grid-cols-2 gap-3'>
          <input
            type='number'
            name='min_order_amount'
            placeholder='Min Order Amount'
            value={form.min_order_amount}
            onChange={handleChange}
            className='border rounded-lg p-2'
          />
          <input
            type='number'
            name='usage_limit'
            placeholder='Total Usage Limit'
            value={form.usage_limit}
            onChange={handleChange}
            className='border rounded-lg p-2'
          />
          <input
            type='number'
            name='per_user_usage_limit'
            placeholder='Per User Limit'
            value={form.per_user_usage_limit}
            onChange={handleChange}
            className='border rounded-lg p-2'
          />
        </div>

        {/* Conditional Fields */}

        {/* BOGO */}
        {form.type === 'BOGO_SAME_DIMENSION' && (
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <p>Buy Quantity</p>
              <input
                type='number'
                name='buy_quantity'
                placeholder='Buy Quantity'
                value={form.buy_quantity}
                onChange={handleChange}
                className='border rounded-lg p-2'
              />
            </div>
            <div>
              <p>Free Quantity</p>
              <input
                type='number'
                name='get_free_quantity'
                placeholder='Free Quantity'
                value={form.get_free_quantity}
                onChange={handleChange}
                className='border rounded-lg p-2'
              />
            </div>
          </div>
        )}

        {/* Percentage */}
        {form.type === 'PERCENTAGE' && (
          <div className='grid grid-cols-2 gap-3'>
            <input
              type='number'
              name='discount_percentage'
              placeholder='Discount %'
              value={form.discount_percentage}
              onChange={handleChange}
              className='border rounded-lg p-2'
            />
            <input
              type='number'
              name='max_discount_cap'
              placeholder='Max Discount Cap'
              value={form.max_discount_cap}
              onChange={handleChange}
              className='border rounded-lg p-2'
            />
          </div>
        )}

        {/* Submit */}
        <button
          type='submit'
          className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition'
        >
          Create Coupon
        </button>
      </form>
    </div>
  )
}
