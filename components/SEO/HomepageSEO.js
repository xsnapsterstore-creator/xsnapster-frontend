import React from 'react'
import Head from 'next/head'

const HomepageSEO = ({ products, category }) => {
  const keyword =
    'Trending Frames & Posters in India, Aesthetic Frames & Posters, XSNAPSTER, XSNAPSTER Frames, Frames under 399, Posters under 99, Car Frames & Posters, Anime Frames & Posters, aesthetic wall decor India, Pinterest room decor India, acrylic photo frames India'
  const prod = products.map(pro => {
    return pro.products[0]
  })
  const finalProd = prod.filter(Boolean)
  const title = 'Trending Frames & Posters in India | XSNAPSTER'
  const Desc =
    'Elevate your walls with our most-loved premium photo frames and trending posters. From minimalist frames to viral art prints, see what’s transforming homes today. Shop the best-sellers at XSNAPSTER.'
  const url = 'https://www.xsnapster.store/'
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
            name: 'XSNAPSTER',
            numberOfItems: finalProd.length,
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            itemListElement: finalProd.map((pro, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                sku: pro?.id,
                name: pro?.title,
                image: pro?.image_link,
                description:
                  pro?.title +
                  'Perfect for home decor and gifting. Offer for limited time. Shop now!',
                brand: {
                  '@type': 'Brand',
                  name: 'XSNAPSTER'
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  ratingCount: pro?.id || 61
                },
                url: `https://www.xsnapster.store/categories/${pro?.category
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}/${pro?.subcategory
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}/${pro?.id}`,
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'INR',
                  price: pro?.discounted_price || pro?.price,
                  availability: 'https://schema.org/InStock',
                  itemCondition: 'https://schema.org/NewCondition',
                  shippingDetails: {
                    '@type': 'ShippingDetails',
                    shippingRate: {
                      '@type': 'MonetaryAmount',
                      value: '99',
                      currency: 'INR'
                    },
                    shippingDestination: {
                      '@type': 'DefinedRegion',
                      addressCountry: 'IN'
                    }
                  },
                  hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'IN',
                    returnPolicyCategory:
                      'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: 7,
                    returnMethod: 'https://schema.org/ReturnByMail',
                    returnFees: 'https://schema.org/FreeReturn',
                    url: 'https://www.xsnapster.store/return-and-refund'
                  }
                }
              }
            }))
          })
        }}
      />
    </Head>
  )
}

export default HomepageSEO
