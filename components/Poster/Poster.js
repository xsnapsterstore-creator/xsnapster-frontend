import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const banners = [
  '/anime_mob.png',
  '/car_mob.png',
  '/forher_mob.png',
  '/movie_mob.png',
  '/bw_mob.png'
]

const desktopBanners = [
  '/anime_desk.png',
  '/car_desk.png',
  '/forher_desk.png',
  '/movie_desk.png',
  '/bw_desk.png'
]

export default function Poster ({ categories }) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)
  const touchStartX = useRef(0)

  const min = 0
  const max = categories?.length - 1 || 0
  const temp = Math.floor(Math.random() * (max - min + 1) + min) || 0
  const link = categories[temp]?.slug || 'cars'

  const startAutoSlide = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length)
    }, 3000)
  }

  useEffect(() => {
    startAutoSlide()
    return () => clearInterval(intervalRef.current)
  }, [])

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % banners.length)
    startAutoSlide() // reset timer
  }

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + banners.length) % banners.length)
    startAutoSlide() // reset timer
  }

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = e => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (diff > 50) nextSlide() // swipe left
    if (diff < -50) prevSlide() // swipe right
  }

  return (
    <div
      className='relative w-full overflow-hidden shadow-lg'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {/* For Mobile Screen */}
      <div className='overflow-hidden md:hidden'>
        <div
          className='flex transition-transform duration-700 ease-in-out'
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((src, index) => (
            <div
              key={index}
              className='relative min-w-full flex-shrink-0 h-[480px]'
            >
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                sizes='100vw'
                className='object-cover'
                priority={index === 0} // only first image is LCP
              />
            </div>
          ))}
        </div>
      </div>

      {/* For Desktop Screen */}
      <div
        className='hidden md:flex transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {desktopBanners.map((src, index) => (
          <div key={index} className='relative min-w-full h-[650px]'>
            <Image
              src={src}
              alt={`Homepage promotional banner ${index + 1}`}
              fill
              sizes='100vw'
              priority={index === 0}
              className='object-cover'
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent' />

      {/* Content */}
      <div className='absolute left-5 md:left-14 top-1/2 -translate-y-1/2 text-white'>
        <h2 className='text-lg md:text-3xl font-bold'>
          Elevate Your Walls with <bold className='text-red-500'>X</bold>
          SNAPSTER
        </h2>
        <p className='text-xs md:text-sm mt-2 text-gray-200'>
          This is your sign to stop living with boring walls.
        </p>

        <Link href={`/categories/${link}`}>
          <button className='mt-4 px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold'>
            Shop Now
          </button>
        </Link>
      </div>

      {/* Desktop Arrows */}
      <button
        onClick={prevSlide}
        className='hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full items-center justify-center hover:bg-black'
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className='hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full items-center justify-center hover:bg-black'
      >
        ❯
      </button>

      {/* Dots */}
      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              startAutoSlide()
            }}
            className={`h-2 w-2 rounded-full ${
              current === index ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
