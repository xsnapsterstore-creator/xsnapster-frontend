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
    <div className='flex justify-start items-center overflow-auto gap-2 p-3'>
      {listCoupons
        .filter(coupon => coupon.is_active)
        .map(coupon => (
          <button
            key={coupon.id}
            onClick={() => onApplyCoupon(coupon.code)}
            className={`px-2.5 py-2 border border-dashed rounded-lg text-sm font-medium transition ${getStyle(
              coupon.code
            )}`}
          >
            {coupon.code}
          </button>
        ))}
    </div>
  )
}
