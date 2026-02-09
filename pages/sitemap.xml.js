import { product } from '@/components/Data/data'

const BASE_URL = 'https://www.xsnapster.store'
const API_URL = 'https://api.xsnapster.store/v1'

function generateSiteMap ({
  categories = [],
  subcategories = [],
  products = []
}) {
  const staticPages = [
    '',
    '/contact-us',
    '/faqs',
    '/help-center',
    '/return-and-refund',
    '/reviews',
    '/shipping-policy',
    '/terms-and-conditions',
    '/privacy-policy',
    '/who-is-behind-the-camera'
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    ${staticPages
      .map(
        page => `
      <url>
        <loc>${BASE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === '' ? '1.0' : '0.3'}</priority>
      </url>
    `
      )
      .join('')}

    ${categories
      .map(
        cat => `
      <url>
        <loc>${BASE_URL}/categories/${cat.slug}</loc>
        <lastmod>${new Date(
          cat.created_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join('')}

    ${subcategories
      .map(
        subcategory => `
      <url>
        <loc>${BASE_URL}/categories/${subcategory.category.slug}/${
          subcategory.slug
        }</loc>
        <lastmod>${new Date(
          subcategory.created_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `
      )
      .join('')}

      ${products
        .map(
          prod => `
      <url>
        <loc>${BASE_URL}/categories/${prod.category
            .toLowerCase()
            .replace(/\s+/g, '-')}/${prod.subcategory
            .toLowerCase()
            .replace(/\s+/g, '-')}/${prod.id}</loc>
        <lastmod>${new Date(
          prod.updated_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
    `
        )
        .join('')}

  </urlset>`
}

export async function getServerSideProps ({ res }) {
  try {
    // 🔹 Fetch products & categories from your API
    const [categoriesRes, subcategoriesRes] = await Promise.all([
      fetch(`${API_URL}/category`),
      fetch(`${API_URL}/subcategory`)
    ])

    const categories = await categoriesRes.json()
    const subcategories = await subcategoriesRes.json()
    const productCateg = await categories.map(categ => {
      return categ.id
    })
    const prod = await Promise.all(
      productCateg.map(id =>
        fetch(`${API_URL}/products/category/${id}`).then(res => res.json())
      )
    )
    const products = prod.flat().filter(Boolean)

    const sitemap = generateSiteMap({ categories, subcategories, products })

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return { props: {} }
  } catch (error) {
    console.error('Sitemap generation error:', error)

    res.setHeader('Content-Type', 'text/xml')
    res.write(`<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>`)
    res.end()

    return { props: {} }
  }
}

export default function Sitemap () {
  return null
}
