import React from 'react'
import Head from 'next/head'

const CategSEO = ({ product, category, route }) => {
  const imgLink =
    product[0]?.image_link || 'https://www.xsnapster.store/logo.png'
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
      <meta property='og:image' content={imgLink} />
      <meta property='og:image:secure_url' content={imgLink} />
      <meta property='og:image:alt' content={title} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={imgLink} />

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
                    '@type': 'OfferShippingDetails',
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

export default CategSEO
