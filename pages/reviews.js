import ReviewCarousel from '@/components/Reviews/review'
import StaticPageSEO from '@/components/SEO/StaticPageSEO'
import React from 'react'

const Reviews = () => {
  const data = {
    title: 'Reviews | XSNAPSTER',
    desc: 'Do not just take our word for it—see how our premium frames are glowing up walls everywhere. Read real reviews from the XSNAPSTER community. Spoilers: They love us.',
    keyword:
      'XSNAPSTER reviews, customer testimonials, premium frame ratings, photo frame quality reviews, is XSNAPSTER legit, wall decor feedback, OnlyFrames fans.',
    url: 'https://www.xsnapster.store/reviews'
  }
  return (
    <>
      <StaticPageSEO data={data} />
      <div className='pt-[120px]'>
        <ReviewCarousel />
      </div>
    </>
  )
}

export default Reviews
