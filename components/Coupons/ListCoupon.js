import ClearIcon from '@mui/icons-material/Clear'
export default function Coupons ({
  listCoupons,
  onApplyCoupon,
  onCancelCoupon,
  selectedCoupon,
  onSuccessfullApply,
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
      {/* ... heading unchanged ... */}
      <div className='flex flex-col gap-4'>
        {listCoupons.map(coupon => {
          const isSelected = coupon.code === selectedCoupon
          return (
            <div
              key={coupon.id}
              className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition'
            >
              {/* LEFT CONTENT — unchanged */}
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-800'>
                  {coupon.code}
                </span>
                <p className='text-xs text-gray-500 mt-1'>
                  Applicable on {coupon.required_qty} items of the same size in
                  cart.
                </p>
              </div>

              <div className='flex items-center gap-2 shrink-0 pl-2'>
                <button
                  type='button'
                  onClick={() => onApplyCoupon(coupon.code)}
                  disabled={isSelected && status === 'success'}
                  className={`px-3 py-2 border border-dashed rounded-xl text-xs font-medium transition-all duration-200 ${getStyle(
                    coupon.code
                  )}`}
                >
                  {isSelected && status === 'success' ? 'Applied' : 'Apply'}
                </button>
                {isSelected && onCancelCoupon && (
                  <button
                    type='button'
                    onClick={() => onCancelCoupon()}
                    className='text-xs font-medium text-gray-500 bg-white hover:bg-gray-100 transition'
                  >
                    <ClearIcon fontSize='small' />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
