export default function ProductSchema ({ product }) {
  if (!product) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product.id,
    name: product.title,
    image: product.image_links,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'XSNAPSTER'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: product?.id || 61
    },
    url: `https://www.xsnapster.store/categories/${product.category
      .toLowerCase()
      .replace(/\s+/g, '-')}/${product.subcategory
      .toLowerCase()
      .replace(/\s+/g, '-')}/${product.id}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.discounted_price || product.price,
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

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
