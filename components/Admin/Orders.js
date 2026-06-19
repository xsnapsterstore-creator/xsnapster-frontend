import React from 'react'
import { fetchTotalOrders } from '../API/api'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Orders = () => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('en-US', { month: 'long' })
  )
  const [openOrderId, setOpenOrderId] = useState(null)
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const toggleOrder = id => {
    setOpenOrderId(prev => (prev === id ? null : id))
  }

  const statusStyles = {
    CONFIRMED: 'bg-amber-100 text-green-700',
    DELIVERED: 'bg-green-100 text-green-700',
    SHIPPED: 'bg-blue-100 text-blue-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    CANCELLED: 'bg-red-100 text-red-700'
  }

  useEffect(() => {
    async function fetchData () {
      const res = await fetchTotalOrders()
      setData(res)
      setFilteredData(res) // initialize filtered data
    }
    fetchData()
  }, [])

  useEffect(() => {
    let result = [...data]

    if (year) {
      result = result.filter(item => {
        const currYear = new Date(item.created_at).getUTCFullYear()
        return currYear === Number(year)
      })
    }

    if (month) {
      result = result.filter(item => {
        const currMonth = new Date(item.created_at).getUTCMonth() + 1
        return currMonth === Number(month)
      })
    }

    setFilteredData(result)
  }, [year, month, data])

  return (
    <div className='p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Total Orders: {data?.length || ''}
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Manage and track customer orders
          </p>
        </div>

        <button className='px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition'>
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4'>
        <input
          type='text'
          placeholder='Search by Order ID / Customer'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black'
        />

        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg text-sm'
        >
          <option value=''>All Years</option>
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg text-sm'
        >
          <option value=''>All Months</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-100 text-gray-600'>
            <tr>
              <th className='text-left px-5 py-3 font-medium'>Order ID</th>
              <th className='text-left px-5 py-3 font-medium'>Customer</th>
              <th className='text-left px-5 py-3 font-medium'>Date</th>
              <th className='text-left px-5 py-3 font-medium'>Amount</th>
              <th className='text-left px-5 py-3 font-medium'>Status</th>
              <th className='text-right px-5 py-3 font-medium'>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData?.map(order => {
              const isOpen = openOrderId === order.id

              return (
                <React.Fragment key={order.id}>
                  {/* MAIN ROW */}
                  <tr className='border-t bg-white hover:bg-gray-50 transition-colors'>
                    <td className='px-5 py-4 font-semibold text-gray-900'>
                      #{order.id}
                    </td>

                    <td className='px-5 py-4'>
                      <p className='font-medium text-gray-800'>{order.email}</p>
                      <p className='text-xs text-gray-500'>
                        Payment: {order.payment_method}
                      </p>
                    </td>

                    <td className='px-5 py-4 text-gray-600'>
                      {order.created_at.split('T')[0]}
                    </td>

                    <td className='px-5 py-4 font-semibold text-gray-900'>
                      ₹{order.total_cost}
                    </td>

                    <td className='px-5 py-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className='px-5 py-4 text-right'>
                      <button
                        onClick={() => toggleOrder(order.id)}
                        className='text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-800 transition'
                      >
                        {isOpen ? 'Hide Items ▲' : 'View Items ▼'}
                      </button>
                    </td>
                  </tr>

                  {/* DROPDOWN ROW */}
                  <tr>
                    <td colSpan={6} className='p-0'>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen
                            ? 'max-h-[1000px] opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className='bg-gray-50 px-6 py-5 space-y-4 border-t'>
                          <p className='text-sm font-semibold text-gray-700'>
                            Ordered Items ({order.items.length})
                          </p>

                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className='flex items-center justify-between gap-6 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition'
                            >
                              {/* Product Info */}
                              <div className='flex gap-4 items-center'>
                                <Image
                                  src={item.image}
                                  width={60}
                                  height={60}
                                  className='rounded-md border'
                                  alt={item.title}
                                />

                                <div>
                                  <p className='font-medium text-gray-800 w-[350px]'>
                                    {item.title.length > 35
                                      ? item.title.slice(0, 125) + '…'
                                      : item.title}
                                  </p>

                                  <p className='text-xs text-gray-500'>
                                    Qty: {item.quantity} •{' '}
                                    {item.ordered_dimension}
                                  </p>

                                  <p className='text-xs text-gray-400'>
                                    Product ID: {item.product_id}
                                  </p>
                                </div>
                              </div>

                              {/* Category */}
                              <div className='text-sm text-gray-600'>
                                <p>{item.category}</p>
                                <p className='text-xs text-gray-400'>
                                  {item.subcategory}
                                </p>
                              </div>

                              {/* Price */}
                              <div className='text-right'>
                                <p className='font-semibold text-gray-900'>
                                  ₹{item.ordered_price * item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
