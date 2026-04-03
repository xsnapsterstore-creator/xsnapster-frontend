import React from 'react'
import { fetchCategories } from '@/components/API/api'
import Head from 'next/head'

const Categories = ({ categories }) => {
  const keyword = categories.map(cat => {
    return ' ' + cat.name + ' ' + 'Frames and Posters'
  })
  const title =
    'Frames & Posters Categories | XSNAPSTER | Your Wall Deserves Better'
  const Desc = `Explore our categories of premium photo frames and posters. From minimalist frames to viral art prints, transform your homes and offices today. Shop at XSNAPSTER.`
  const url = 'https://www.xsnapster.store/categories/'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='UTF-8' />
        <meta name='language' content='en' />
        <meta name='author' content='XSNAPSTER' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='index, follow' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_US' />

        <meta name='description' content={Desc} />
        <meta name='keywords' content={keyword} />
        <link rel='canonical' href={url} />

        <meta property='og:title' content={title} />
        <meta property='og:description' content={Desc} />
        <meta property='og:url' content={url} />
        <meta
          property='og:image'
          content={'https://www.xsnapster.store/logo.svg'}
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/svg' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:image'
          content={'https://www.xsnapster.store/logo.svg'}
        />

        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={Desc} />
        <meta property='og:site_name' content='XSNAPSTER' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              numberOfItems: categories.length,
              itemListOrder: 'https://schema.org/ItemListOrderAscending',
              itemListElement: categories.map((pro, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Product Categories',
                  name: pro?.name,
                  image: pro?.image_links[0],
                  url: `https://www.xsnapster.store/categories/${pro?.name
                    ?.toLowerCase()
                    .replace(/\s+/g, '-')}`
                }
              }))
            })
          }}
        />
      </Head>
      <div className='pt-[105px] px-3 pb-3'>
        <h1 className='text-xl font-semibold text-center mt-4 mb-2'>
          Shop by Category
        </h1>
        <div className='w-10 h-1 bg-red-400 mx-auto rounded-full mb-5'></div>
        <hr />

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5 justify-center'>
          {categories.map((categProd, index) => (
            <div
              onClick={() => {
                window.location.href = `/categories/${categProd.slug}`
              }}
              key={index}
              className={`bg-red-100 shadow-md rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300`}
            >
              {/* Category Image */}
              <div className='w-[150px] h-[220px] flex items-center justify-center overflow-hidden rounded-xl'>
                <img
                  src={categProd.image_links[0]}
                  alt={categProd.name}
                  width={160}
                  height={200}
                  className='object-contain'
                />
              </div>

              {/* Category Name */}
              <div className='mt-4 text-center'>
                <h2 className='text-base font-semibold text-gray-800'>
                  {categProd.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories

export async function getServerSideProps ({ params }) {
  const res = await fetchCategories()
  const data = await res.json()

  return {
    props: {
      categories: data || []
    }
  }
}
