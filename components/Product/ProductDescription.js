import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Grid3x3Icon from '@mui/icons-material/Grid3x3'
import CropPortraitIcon from '@mui/icons-material/CropPortrait'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import HardwareIcon from '@mui/icons-material/Hardware'
import StraightenIcon from '@mui/icons-material/Straighten'
import img1 from './../../public/ProdFeat1.png'
import img2 from './../../public/ProdFeat2.png'
import img3 from './../../public/ProdFeat3.png'
import img4 from './../../public/ProdFeat4.jpg'

const ProductDescription = ({ prodDesc }) => {
  const [openIndex, setOpenIndex] = useState(0)
  const toggle = i => {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  const sizeChart = [
    {
      img: <CropPortraitIcon />,
      head: 'A4 Size',
      para: 'Fiberwood'
    },
    {
      img: <CropPortraitIcon />,
      head: '13x19 inches',
      para: 'Fiberwood'
    },
    {
      img: <CropOriginalIcon />,
      head: 'Poster (13x19)',
      para: '300 GSM Paper'
    }
  ]

  const prodQuality = [
    {
      img: <Grid3x3Icon />,
      head: 'Frame Material',
      para: 'Fiberwood'
    },
    {
      img: <CropPortraitIcon />,
      head: 'Frame Style',
      para: 'Flat'
    },
    {
      img: <CropPortraitIcon />,
      head: 'Glass Material',
      para: 'Acrylic'
    },
    {
      img: <StraightenIcon />,
      head: 'Glass Depth',
      para: '2 mm'
    },
    {
      img: <CropPortraitIcon />,
      head: 'Backboard Material',
      para: 'Synthetic Wooden'
    },
    {
      img: <StraightenIcon />,
      head: 'Backboard Depth',
      para: '15 mm'
    },
    {
      img: <CropOriginalIcon />,
      head: 'Print Material',
      para: '300 GSM Paper'
    },
    {
      img: <HardwareIcon />,
      head: 'Hanging Equipment',
      para: 'Sawtooth Hook'
    }
  ]

  return (
    <div className='grid grid-cols-1 max-w-6xl mx-auto p-2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='bg-white border rounded-sm cursor-pointer border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300'
      >
        {/* Question */}
        <div
          onClick={() => toggle(0)}
          className='flex justify-between items-center w-full text-left cursor-pointer'
        >
          <motion.h2
            className='text-[15px] font-semibold text-gray-900'
            whileHover={{ scale: 1.02 }}
          >
            Product Quality
          </motion.h2>

          <motion.span
            animate={{ rotate: openIndex === 0 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className='text-red-600 text-2xl font-bold select-none'
          >
            +
          </motion.span>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 0 && (
            <motion.div
              key='content'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className='mt-3 overflow-hidden'
            >
              <div>
                <div className='grid grid-cols-2 gap-3 mt-1'>
                  <img
                    className='w-full h-full rounded-xl'
                    src={img1.src}
                    width={80}
                    height={80}
                  />
                  <img
                    className='w-full h-full rounded-xl'
                    src={img2.src}
                    width={80}
                    height={80}
                  />
                  <img
                    className='w-full h-full rounded-xl'
                    src={img3.src}
                    width={80}
                    height={80}
                  />
                  <img
                    className='w-full h-full rounded-xl'
                    src={img4.src}
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='bg-white border rounded-sm cursor-pointer border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300'
      >
        {/* Question */}
        <div
          onClick={() => toggle(1)}
          className='flex justify-between items-center w-full text-left cursor-pointer'
        >
          <motion.h2
            className='text-[15px] font-semibold text-gray-900'
            whileHover={{ scale: 1.02 }}
          >
            Product Features
          </motion.h2>

          <motion.span
            animate={{ rotate: openIndex === 1 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className='text-red-600 text-2xl font-bold select-none'
          >
            +
          </motion.span>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 1 && (
            <motion.div
              key='content'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className='mt-3 overflow-hidden'
            >
              <div className=''>
                <ul className='grid grid-cols-2 gap-3 mt-1 items-start justify-center'>
                  {prodQuality.map((prod, index) => (
                    <div key={index} className=''>
                      <div className='flex items-center gap-2'>
                        <div>{prod.img}</div>
                        <li className='font-semibold text-gray-800 text-sm'>
                          {prod.head}
                        </li>
                      </div>
                      <span className='text-gray-600 text-xs ml-8'>
                        {prod.para}
                      </span>
                    </div>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='bg-white border rounded-sm cursor-pointer border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300'
      >
        {/* Question */}
        <div
          onClick={() => toggle(2)}
          className='flex justify-between items-center w-full text-left cursor-pointer'
        >
          <motion.h2
            className='text-[15px] font-semibold text-gray-900'
            whileHover={{ scale: 1.02 }}
          >
            Size Chart
          </motion.h2>

          <motion.span
            animate={{ rotate: openIndex === 2 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className='text-red-600 text-2xl font-bold select-none'
          >
            +
          </motion.span>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 2 && (
            <motion.div
              key='content'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className='mt-3 overflow-hidden'
            >
              <div className=''>
                <ul className='grid grid-cols-2 gap-3 mt-1 items-start justify-center'>
                  {sizeChart.map((prod, index) => (
                    <div key={index} className=''>
                      <div className='flex items-center gap-2'>
                        <div>{prod.img}</div>
                        <li className='font-semibold text-gray-800 text-sm'>
                          {prod.head}
                        </li>
                      </div>
                      <span className='text-gray-600 text-xs ml-8'>
                        {prod.para}
                      </span>
                    </div>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='bg-white border rounded-sm cursor-pointer border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300'
      >
        {/* Question */}
        <div
          onClick={() => toggle(3)}
          className='flex justify-between items-center w-full text-left cursor-pointer'
        >
          <motion.h2
            className='text-[15px] font-semibold text-gray-900'
            whileHover={{ scale: 1.02 }}
          >
            Product Details
          </motion.h2>

          <motion.span
            animate={{ rotate: openIndex === 3 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className='text-red-600 text-2xl font-bold select-none'
          >
            +
          </motion.span>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 3 && (
            <motion.div
              key='content'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className='mt-3 overflow-hidden'
            >
              <p className='text-[14px] text-gray-700 leading-relaxed'>
                {prodDesc}
                <br />
                <br />
                This isn't just a frame — it's a statement, a flex, a whole
                personality upgrade for your wall. Designed for the bold, the
                aesthetic, and the ones who know good vibes don't come cheap…
                but they do come framed.
                <br /> Whether your mood is cars, anime, gym, black & white
                aesthetic, or “I want something that screams me” — we've got the
                perfect visual addiction for you.
                <br />
                <br />
                Transform your walls into a piece of art with our Premium
                Aesthetic Photo Frame & Posters, crafted for people who love
                minimal, clean, and modern décor. Whether it's your bedroom,
                living room, office, workspace, or studio—this frame adds depth,
                personality, and aesthetic vibes to every corner.
                <br />
                <br /> Designed and manufactured by{' '}
                <bold className='font-semibold'>
                  <span className='text-red-500'>X</span>SNAPSTER
                </bold>
                , this frame blends premium material, HD-quality prints, and
                long-lasting durability to give you the perfect décor piece that
                never goes out of style.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='bg-white border rounded-sm cursor-pointer border-gray-200 shadow-md p-3 hover:shadow-lg hover:scale-[1.0] transition-all duration-300'
      >
        {/* Question */}
        <div
          onClick={() => toggle(4)}
          className='flex justify-between items-center w-full text-left cursor-pointer'
        >
          <motion.h2
            className='text-[15px] font-semibold text-gray-900'
            whileHover={{ scale: 1.02 }}
          >
            Product Specification
          </motion.h2>

          <motion.span
            animate={{ rotate: openIndex === 4 ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className='text-red-600 text-2xl font-bold select-none'
          >
            +
          </motion.span>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {openIndex === 4 && (
            <motion.div
              key='content'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className='mt-3 overflow-hidden'
            >
              <div className=''>
                <div className=''>
                  <div>
                    <ul className='list-disc ml-5 text-[14px] text-gray-600'>
                      <li>300 GSM Paper</li>
                      <li>
                        Width : 1.00-inch (For A4) / 1.00-inch (For 13x19
                        inches) wide fiberwood frames for edge
                      </li>
                      <li>
                        Style & Depth : Box Frame (Starting from 0.50 inch)
                      </li>
                      <li>
                        2-mm thick acrylic sheet for strength and maximum
                        shatter resistance
                      </li>
                      <li>
                        Strong Synthetic Wooden Back board for long life and
                        support
                      </li>
                      <li>Comes with hanging equipment attached</li>
                      <li>Made in India ❤️</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProductDescription
