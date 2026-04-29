export default function Coupons ({
  listCoupons,
  onApplyCoupon,
  selectedCoupon,
  status
}) {
  const getStyle = couponCode => {
    if (couponCode === selectedCoupon) {
      if (status === 'success') {
        return 'border-green-500 text-green-600 bg-green-50'
      }
      if (status === 'error') {
        return 'border-red-500 text-red-600 bg-red-50'
      }
    }

    return 'border-gray-400 text-gray-800 hover:bg-black hover:text-white'
  }

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h2 className='text-lg font-semibold mb-4 text-gray-800'>
        Available Offers
      </h2>

      <div className='flex flex-col gap-4'>
        {listCoupons.map(coupon => (
          <div
            key={coupon.id}
            className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition'
          >
            {/* LEFT CONTENT */}
            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-gray-800'>
                {coupon.code}
              </span>
              <p className='text-xs text-gray-500 mt-1'>
                Applicable on {coupon.required_qty} items of the same size in
                cart.
              </p>
            </div>

            {/* RIGHT ACTION */}
            <button
              onClick={() => onApplyCoupon(coupon.code)}
              className={`px-4 py-2 border border-dashed rounded-xl text-sm font-medium transition-all duration-200 
            ${
              getStyle(coupon.code) ||
              'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
