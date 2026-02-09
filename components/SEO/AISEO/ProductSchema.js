export default function ProductSchema ({ product }) {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image_links,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'XSNAPSTER'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.discounted_price || product.price,
      availability: 'https://schema.org/InStock',
      url: `https://www.xsnapster.store/categories/${product.category
        .toLowerCase()
        .replace(/\s+/g, '-')}/${product.subcategory
        .toLowerCase()
        .replace(/\s+/g, '-')}/${product.id}`
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
