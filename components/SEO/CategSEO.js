import React from 'react'
import Head from 'next/head'

const CategSEO = ({ product, category, route }) => {
  const keyword = category.map(cat => {
    return ' ' + cat.name + ' ' + 'Frames and Posters'
  })
  const key =
    route?.sub_category_name
      ?.replaceAll('-', ' ')
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ') ||
    route?.category_name
      ?.replaceAll('-', ' ')
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  const tempURL =
    route.category_name && route.sub_category_name
      ? `${route.category_name}/${route.sub_category_name}`
      : `${route.category_name}`
  const title = `${key} Frames & Posters online in India | XSNAPSTER`
  const Desc = `Elevate your walls with our premium ${key} photo frames and posters. From minimalist frames to viral art prints, transform your homes and offices today. Shop at XSNAPSTER.`
  const url = `https://www.xsnapster.store/categories/${tempURL}`
  return (
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
      <meta name='twitter:image' content={"https://www.xsnapster.store/logo.svg"} />

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={Desc} />
      <meta property='og:site_name' content='XSNAPSTER' />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            numberOfItems: product.length,
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            itemListElement: product.map((pro, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: pro?.title,
                image: pro?.image_link,
                url: `https://www.xsnapster.store/categories/${pro?.category
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}/${pro?.subcategory
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}/${pro?.id}`,
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'INR',
                  price: pro?.discounted_price || pro?.price,
                  availability: 'https://schema.org/InStock'
                }
              }
            }))
          })
        }}
      />
    </Head>
  )
}

export default CategSEO
