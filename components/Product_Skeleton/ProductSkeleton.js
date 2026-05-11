export default function ProductCardSkeleton() {
    return (
      <div className='relative rounded-lg shadow overflow-hidden w-[175px] md:w-[200px] m-auto'>
  
        {/* Badge */}
        <div className='absolute top-2 left-2 md:left-4 z-10'>
          <div className='shimmer w-8 h-5 rounded-lg' />
        </div>
  
        {/* Image */}
        <div className='shimmer w-[175px] md:w-[200px] h-[200px]' />
  
        {/* Info */}
        <div className='p-2 flex flex-col items-center bg-gray-100 gap-2'>
  
          {/* Title lines */}
          <div className='w-full flex flex-col gap-1.5'>
            <div className='shimmer h-3 w-full rounded' />
            <div className='shimmer h-3 w-3/4 rounded' />
          </div>
  
          {/* Price row */}
          <div className='w-full flex items-end gap-2'>
            <div className='shimmer h-4 w-10 rounded' />
            <div className='shimmer h-3 w-8 rounded' />
            <div className='shimmer h-2.5 w-16 rounded' />
          </div>
  
          {/* Button */}
          <div className='shimmer w-full h-[30px] rounded-lg' />
        </div>
      </div>
    )
  }