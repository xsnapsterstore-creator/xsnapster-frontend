import React from 'react'

const offers = [
  {
    id: 1,
    title: 'A4 Size Frame Offer',
    description: 'Buy2Get1',
    condition:
      'Offer applies when you add 3 A4 size frames and then apply valid coupon.',
    discount: '₹399 OFF'
  },
  {
    id: 2,
    title: '13x19 Size Frame Offer',
    description: 'Buy2Get1',
    condition:
      'Offer applies when you add 3 A3 size frames and then apply valid coupon.',
    discount: '₹599 OFF'
  },
  {
    id: 4,
    title: 'Poster Offer',
    description: 'Buy5Get5',
    condition:
      'Offer applies when you add 10 Posters and then apply valid coupon.',
    discount: '₹645 OFF'
  },
  {
    id: 5,
    title: 'A4 Size Frame Offer',
    description: 'Buy4Get3',
    condition:
      'Offer applies when you add 7 A4 size frames and then apply valid coupon.',
    discount: '₹1197 OFF'
  },
  {
    id: 6,
    title: '13x19 Size Frame Offer',
    description: 'Buy4Get3',
    condition:
      'Offer applies when you add 7 A3 size frames and then apply valid coupon.',
    discount: '₹1797 OFF'
  },
  {
    id: 8,
    title: 'Poster Offer',
    description: 'Buy10Get15',
    condition:
      'Offer applies when you add 25 Posters and then apply valid coupon.',
    discount: '₹1935 OFF'
  },
  {
    id: 9,
    title: 'A4 Size Frame Offer',
    description: 'Buy6Get5',
    condition:
      'Offer applies when you add 11 A4 size frames and then apply valid coupon.',
    discount: '₹1995 OFF'
  },
  {
    id: 10,
    title: '13x19 Size Frame Offer',
    description: 'Buy6Get5',
    condition:
      'Offer applies when you add 11 A3 size frames and then apply valid coupon.',
    discount: '₹2995 OFF'
  },
]

const OfferPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-10 pt-[120px] md:pt-[120px]'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>
        🎉 Available Offers
      </h1>

      {/* 📱 Mobile Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        {offers.map(offer => (
          <div
            key={offer.id}
            className='bg-white rounded-2xl shadow p-4 space-y-3'
          >
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-gray-800'>{offer.title}</h2>
              <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium'>
                {offer.discount}
              </span>
            </div>

            <div className='flex justify-start items-center gap-3'>
              <p className='text-sm font-semibold'>COUPON CODE:</p>
              <span className='px-2 py-1 border border-dashed rounded-lg text-sm transition uppercase text-red-600'>
                {offer.description}
              </span>
            </div>

            <p className='text-gray-500 text-xs'>{offer.condition}</p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className='mt-6 text-xs md:text-sm text-red-500'>
        * Coupons are applied at checkout if eligible. T&C apply.
      </div>
    </div>
  )
}

export default OfferPage
