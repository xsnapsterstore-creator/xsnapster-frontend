import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Category_Story = ({ category }) => {
  const router = useRouter()
  return (
    <div className='pt-[97px]'>
      <div className='mt-3 ml-2'>
        <p className='text-sm font-medium text-gray-700'>
          Buy with <bold className='text-red-500'>x</bold>Snapster
          <bold className='text-red-500'>Live</bold> Sale Now !
        </p>
      </div>
      <div className='overflow-x-auto scrollbar-hide mt-3'>
        <div className='flex items-center gap-0.5 px-1 snap-x snap-mandatory'>
          {category.map((item, index) => (
            <Link
              href={`/categories/${item.slug}`}
              key={item.id}
              className='flex flex-col w-[110px] h-[150px] items-center flex-shrink-0 snap-start cursor-pointer'
            >
              {/* Story Circle */}
              <div className='p-[2.5px] w-[90px] h-[90px] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400'>
                <Image
                  src={item.image_links[0]}
                  alt={item.name}
                  width={85}
                  height={85}
                  sizes='85px'
                  quality={75}
                  priority={index < 4} // only first few visible
                  className='rounded-full h-[85px] w-[85px] object-cover border-2 border-white'
                />
              </div>

              {/* Title */}
              <p className='mt-1 text-[12px] font-medium text-center text-gray-700'>
                {item.name}
              </p>

              <span className='text-[9px] text-red-500'>{item.one_liner}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category_Story
