import React from 'react'

const offers = [
  {
    id: 1,
    title: 'A4 Size Frame Offer',
    description: 'Buy 2 Get 1 Free',
    condition:
      'Offer applies when you add 3 A4 size frames (auto-applied at checkout).',
    discount: '₹399 OFF'
  },
  {
    id: 2,
    title: 'A3 Size Frame Offer',
    description: 'Buy 2 Get 1 Free',
    condition:
      'Offer applies when you add 3 A3 size frames (auto-applied at checkout).',
    discount: '₹599 OFF'
  },
  {
    id: 3,
    title: 'A2 Size Frame Offer',
    description: 'Buy 2 Get 1 Free',
    condition:
      'Offer applies when you add 3 A2 size frames (auto-applied at checkout).',
    discount: '₹799 OFF'
  },
  {
    id: 4,
    title: 'Poster Offer',
    description: 'Buy 5 Get 5 Free',
    condition:
      'Offer applies when you add 10 Posters (auto-applied at checkout).',
    discount: '₹645 OFF'
  },
  {
    id: 5,
    title: 'A4 Size Frame Offer',
    description: 'Buy 4 Get 3 Free',
    condition:
      'Offer applies when you add 7 A4 size frames (auto-applied at checkout).',
    discount: '₹1197 OFF'
  },
  {
    id: 6,
    title: 'A3 Size Frame Offer',
    description: 'Buy 4 Get 3 Free',
    condition:
      'Offer applies when you add 7 A3 size frames (auto-applied at checkout).',
    discount: '₹1797 OFF'
  },
  {
    id: 7,
    title: 'A2 Size Frame Offer',
    description: 'Buy 4 Get 3 Free',
    condition:
      'Offer applies when you add 7 A2 size frames (auto-applied at checkout).',
    discount: '₹2397 OFF'
  },
  {
    id: 8,
    title: 'Poster Offer',
    description: 'Buy 10 Get 15 Free',
    condition:
      'Offer applies when you add 25 Posters (auto-applied at checkout).',
    discount: '₹1935 OFF'
  },
  {
    id: 9,
    title: 'A4 Size Frame Offer',
    description: 'Buy 6 Get 5 Free',
    condition:
      'Offer applies when you add 11 A4 size frames (auto-applied at checkout).',
    discount: '₹1995 OFF'
  },
  {
    id: 10,
    title: 'A3 Size Frame Offer',
    description: 'Buy 6 Get 5 Free',
    condition:
      'Offer applies when you add 11 A3 size frames (auto-applied at checkout).',
    discount: '₹2995 OFF'
  },
  {
    id: 11,
    title: 'A2 Size Frame Offer',
    description: 'Buy 6 Get 5 Free',
    condition:
      'Offer applies when you add 11 A2 size frames (auto-applied at checkout).',
    discount: '₹3995 OFF'
  }
]

const OfferPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-10 pt-[110px] md:pt-[110px]'>
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

            <p className='text-gray-600 text-sm'>{offer.description}</p>

            <p className='text-gray-500 text-xs'>{offer.condition}</p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className='mt-6 text-xs md:text-sm text-red-500'>
        * Offers are automatically applied at checkout if eligible. T&C apply.
      </div>
    </div>
  )
}

export default OfferPage
