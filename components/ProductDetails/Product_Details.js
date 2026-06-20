import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import Link from 'next/link'
import ProductDescription from '../Product/ProductDescription'
import IosShareIcon from '@mui/icons-material/IosShare'
import { useRouter } from 'next/router'

export default function ProductDetailsPage ({ prod }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const [buyAdded, setBuyAdded] = useState(false)
  const [prodQuantity, setProdQuantity] = useState(1)
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [sizeOpt, setSizeOpt] = useState(prod.dimensions[0])
  const selectedPricing = prod.dimension_pricing[sizeOpt]
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = i => setOpenIndex(prev => (prev === i ? null : i))

  const product = {
    id: prod.id,
    title: prod.title,
    one_liner: prod.one_liner,
    description: prod.description,
    slug: prod.slug,
    image_link: prod.image_links[0],
    category: prod.category,
    subcategory: prod.subcategory,
    is_active: prod.is_active,
    dimensions: sizeOpt,
    price: selectedPricing.price,
    discounted_price: selectedPricing.discounted_price
  }

  async function BuyNow () {
    dispatch(addToCart({ ...product, quantity: prodQuantity }))
    const userID = localStorage.getItem('userID')
    setBuyAdded(true)
    setTimeout(() => setBuyAdded(false), 1200)
    if (!userID) {
      router.push('/login')
    } else {
      router.push('/address')
    }
  }

  const today = new Date()

  // Helper function to format date like "Oct 7"
  const formatDate = dateObj => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}`
  }

  // Create copies of `today` and add days properly
  const shippedStart = new Date(today)
  shippedStart.setDate(today.getDate() + 1)

  const shippedEnd = new Date(today)
  shippedEnd.setDate(today.getDate() + 2)

  const deliveredStart = new Date(today)
  deliveredStart.setDate(today.getDate() + 6)

  const deliveredEnd = new Date(today)
  deliveredEnd.setDate(today.getDate() + 7)

  // ✅ For image slider
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    const total = prod?.image_links?.length || 0
    if (total === 0) return
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1))
  }

  const handleNext = () => {
    const total = prod?.image_links?.length || 0
    if (total === 0) return
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1))
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true // allows mouse dragging too
  })

  const categSlug = prod.category.toLowerCase().replace(/\s+/g, '-')
  const subCategSlug = prod.subcategory.toLowerCase().replace(/\s+/g, '-')
  const shareUrl = `https://www.xsnapster.store/categories/${categSlug}/${subCategSlug}/${prod.id}`

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        text: shareUrl
      })
    } else {
      alert('Sharing is not supported on this device.')
    }
  }

  return (
    <>
      <div className='max-w-6xl mx-auto px-4 py-6'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap'>
          <Link href='/' className='hover:text-gray-700 transition'>
            Home
          </Link>
          <span>/</span>
          <Link href='/categories' className='hover:text-gray-700 transition'>
            Categories
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${categSlug}`}
            className='hover:text-gray-700 transition'
          >
            {prod.category}
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${categSlug}/${subCategSlug}`}
            className='hover:text-gray-700 transition'
          >
            {prod.subcategory}
          </Link>
          <span>/</span>
          <span className='text-gray-600 font-medium truncate max-w-[140px]'>
            {prod.title}
          </span>
        </div>

        {/* Main Layout */}
        <div className='flex flex-col lg:flex-row gap-8 items-start'>
          {/* ── Left: Image Slider ── */}
          <div {...handlers} className='w-full lg:w-1/2 lg:sticky lg:top-6'>
            {/* Main Image */}
            <div className='relative md:w-[450px] w-fit m-auto rounded-2xl overflow-hidden bg-gray-50'>
              <div
                className='flex transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {prod.image_links.map((src, index) => (
                  <div
                    key={index}
                    className='w-full flex-shrink-0'
                    style={{ flex: '0 0 100%' }}
                  >
                    <Image
                      src={src}
                      alt={`${prod.title} ${index + 1}`}
                      width={600}
                      height={500}
                      priority={index === 0}
                      onClick={() => setFullscreenImage(src)}
                      className='w-full h-[420px] md:h-[500px] object-cover cursor-zoom-in'
                    />
                  </div>
                ))}
              </div>

              {/* Share */}
              <button
                onClick={handleShare}
                className='absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow transition'
              >
                <IosShareIcon fontSize='small' className='text-gray-700' />
              </button>

              {/* Arrows */}
              <button
                onClick={handlePrev}
                className='hidden md:flex absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full transition'
              >
                <ArrowBackIosNewIcon
                  fontSize='small'
                  className='text-gray-700'
                />
              </button>
              <button
                onClick={handleNext}
                className='hidden md:flex absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full transition'
              >
                <ArrowForwardIosIcon
                  fontSize='small'
                  className='text-gray-700'
                />
              </button>
            </div>

            {/* Dots */}
            <div className='flex justify-center gap-2 mt-4'>
              {prod.image_links.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gray-900 w-6 h-2'
                      : 'bg-gray-300 w-2 h-2'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className='w-full lg:w-1/2 flex flex-col gap-5'>
            {/* Title */}
            <div>
              <p className='text-xs uppercase tracking-widest text-indigo-500 font-medium mb-1'>
                {prod.category} · {prod.subcategory}
              </p>
              <h1 className='text-xl md:text-2xl font-semibold text-gray-900 leading-snug'>
                {prod.title}
              </h1>
              <p className='text-xs text-red-500 mt-1.5'>{prod.one_liner}</p>
            </div>

            {/* Price */}
            <div className='flex items-end gap-3'>
              <p className='text-3xl font-bold text-gray-900'>
                ₹{selectedPricing.discounted_price ?? selectedPricing.price}
              </p>
              {selectedPricing.discounted_price && (
                <>
                  <p className='text-base text-gray-400 line-through pb-0.5'>
                    ₹{selectedPricing.price}
                  </p>
                  <span className='text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full pb-0.5'>
                    {Math.round(
                      ((selectedPricing.price -
                        selectedPricing.discounted_price) /
                        selectedPricing.price) *
                        100
                    )}
                    % off
                  </span>
                </>
              )}
            </div>
            <p className='text-xs text-gray-400 -mt-4'>
              Inclusive of all taxes
            </p>

            {/* Size Selector */}
            <div className='flex items-center justify-between gap-4 mt-1'>
              <label className='text-md font-medium text-gray-700'>
                Select Size
              </label>
              <select
                value={sizeOpt}
                onChange={e => setSizeOpt(e.target.value)}
                className='border border-gray-200 bg-gray-50 text-sm rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-gray-300 transition'
              >
                {prod.dimensions.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col gap-3'>
              <button
                onClick={e => {
                  e.stopPropagation()
                  dispatch(addToCart({ ...product, quantity: prodQuantity }))
                  setAdded(true)
                  setTimeout(() => setAdded(false), 1200)
                }}
                className={`w-full py-3 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-900 hover:bg-gray-700 text-white'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={BuyNow}
                className='w-full py-3 rounded-xl text-sm font-semibold border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200'
              >
                {buyAdded ? 'Please wait…' : 'Buy Now'}
              </button>
            </div>

            {/* Offers */}
            <div className='bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-4'>
              {/* Frame Offers */}
              <div>
                <div className='flex items-center gap-2 mb-2.5'>
                  <span>🎁</span>
                  <p className='text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Frame Offers
                  </p>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  {[
                    { buy: 2, free: 1 },
                    { buy: 4, free: 3 },
                    { buy: 6, free: 5 }
                  ].map(({ buy, free }) => (
                    <div
                      key={buy}
                      className='bg-cyan-100 rounded-lg py-2 text-center'
                    >
                      <p className='text-xs text-gray-600'>
                        Buy{' '}
                        <span className='font-bold text-gray-900'>{buy}</span>
                      </p>
                      <p className='text-xs font-semibold text-red-500'>
                        Get {free} Free
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Poster Offers */}
              <div>
                <div className='flex items-center gap-2 mb-2.5'>
                  <span>🎁</span>
                  <p className='text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Poster Offers
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  {[{ buy: 5, free: 5 }].map(({ buy, free }) => (
                    <div
                      key={buy}
                      className='bg-blue-100 rounded-lg py-2 text-center'
                    >
                      <p className='text-xs text-gray-600'>
                        Buy{' '}
                        <span className='font-bold text-gray-900'>{buy}</span>
                      </p>
                      <p className='text-xs font-semibold text-red-500'>
                        Get {free} Free
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Razorpay Badge */}
            <Image
              src='/Razorpay.png'
              alt='Secure Payment via Razorpay'
              width={500}
              height={500}
              className='w-full'
            />

            {/* Delivery Timeline */}
            <div className='border border-gray-100 bg-gray-50 rounded-xl p-3'>
              <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4'>
                Estimated Delivery
              </p>
              <div>
                <div className='flex justify-between items-center'>
                  <div className='h-[110px] w-[100px]'>
                    <div className='bg-black h-[50px] w-[50px] m-auto p-3 rounded-full'>
                      <ShoppingBagIcon className='text-white' />
                    </div>
                    <div className='text-center mt-2'>
                      <p className='text-[15px] font-semibold'>Ordered</p>
                      <span className='text-[12px]'>{formatDate(today)}</span>
                    </div>
                  </div>
                  <div>
                    <HorizontalRuleIcon />
                  </div>
                  <div className='h-[110px] w-[100px]'>
                    <div className='bg-black h-[50px] w-[50px] m-auto p-3 rounded-full'>
                      <LocalShippingIcon className='text-white' />
                    </div>
                    <div className='text-center mt-2'>
                      <p className='text-[15px] font-semibold'>Shipped</p>
                      <span className='text-[12px]'>
                        {formatDate(shippedStart)} - {formatDate(shippedEnd)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <HorizontalRuleIcon />
                  </div>
                  <div className='h-[110px] w-[100px]'>
                    <div className='bg-black h-[50px] w-[50px] m-auto p-3 rounded-full'>
                      <LocationOnIcon className='text-white' />
                    </div>
                    <div className='text-center mt-2'>
                      <p className='text-[15px] font-semibold'>Delivered</p>
                      <span className='text-[12px]'>
                        {formatDate(deliveredStart)} -{' '}
                        {formatDate(deliveredEnd)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='border-t border-gray-100 pt-3'>
              <ProductDescription prodDesc={prod.description} />
            </div>
          </div>
        </div>

        {/* Fullscreen Image Overlay */}
        {fullscreenImage && (
          <div
            className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-5'
            onClick={() => setFullscreenImage(null)}
          >
            <button
              className='absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition'
              onClick={() => setFullscreenImage(null)}
            >
              ✕
            </button>
            <Image
              src={fullscreenImage}
              alt='Full preview'
              width={800}
              height={600}
              className='max-w-full max-h-[95vh] rounded-xl object-cover'
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  )
}
