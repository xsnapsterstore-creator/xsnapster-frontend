// const BASE_URL = 'https://www.xsnapster.store'
// const API_URL = 'https://api.xsnapster.store/v1'

// function generateSiteMap ({
//   categories = [],
//   subcategories = [],
//   products = []
// }) {
//   const staticPages = [
//     '',
//     '/contact-us',
//     '/faqs',
//     '/help-center',
//     '/return-and-refund',
//     '/reviews',
//     '/shipping-policy',
//     '/terms-and-conditions',
//     '/privacy-policy',
//     '/who-is-behind-the-camera'
//   ]

//   return `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

//     ${staticPages
//       .map(
//         page => `
//       <url>
//         <loc>${BASE_URL}${page}</loc>
//         <lastmod>${new Date().toISOString()}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>${page === '' ? '1.0' : '0.3'}</priority>
//       </url>
//     `
//       )
//       .join('')}

//     ${categories
//       .map(
//         cat => `
//       <url>
//         <loc>${BASE_URL}/categories/${cat.slug}</loc>
//         <lastmod>${new Date(
//           cat.created_at || Date.now()
//         ).toISOString()}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>
//     `
//       )
//       .join('')}

//     ${subcategories
//       .map(
//         subcategory => `
//       <url>
//         <loc>${BASE_URL}/categories/${subcategory.category.slug}/${
//           subcategory.slug
//         }</loc>
//         <lastmod>${new Date(
//           subcategory.created_at || Date.now()
//         ).toISOString()}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.7</priority>
//       </url>
//     `
//       )
//       .join('')}

//       ${products
//         .map(
//           prod => `
//       <url>
//         <loc>${BASE_URL}/categories/${prod.category
//             .toLowerCase()
//             .replace(/\s+/g, '-')}/${prod.subcategory
//             .toLowerCase()
//             .replace(/\s+/g, '-')}/${prod.id}</loc>
//         <lastmod>${new Date(
//           prod.updated_at || Date.now()
//         ).toISOString()}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.6</priority>
//       </url>
//     `
//         )
//         .join('')}

//   </urlset>`
// }

// export async function getServerSideProps ({ res }) {
//   try {
//     // 🔹 Fetch products & categories from your API
//     const [categoriesRes, subcategoriesRes] = await Promise.all([
//       fetch(`${API_URL}/category`),
//       fetch(`${API_URL}/subcategory`)
//     ])

//     const categories = await categoriesRes.json()
//     const subcategories = await subcategoriesRes.json()
//     const productCateg = await categories.map(categ => {
//       return categ.id
//     })
//     const prod = await Promise.all(
//       productCateg.map(id =>
//         fetch(`${API_URL}/products/category/${id}`).then(res => res.json())
//       )
//     )
//     const products = prod.flat().filter(Boolean)

//     const sitemap = generateSiteMap({ categories, subcategories, products })

//     res.setHeader('Content-Type', 'application/xml')
//     res.write(sitemap)
//     res.end()

//     return { props: {} }
//   } catch (error) {
//     console.error('Sitemap generation error:', error)

//     res.setHeader('Content-Type', 'application/xml')
//     res.write(`<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>`)
//     res.end()

//     return { props: {} }
//   }
// }

// export default function Sitemap () {
//   return null
// }

const BASE_URL = 'https://www.xsnapster.store'
const API_URL = 'https://api.xsnapster.store/v1'

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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
    page => `  <url>
    <loc>${escapeXml(BASE_URL + page)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.3'}</priority>
  </url>`
  )
  .join('\n')}
${categories
  .map(
    cat => `  <url>
    <loc>${escapeXml(`${BASE_URL}/categories/${cat.slug}`)}</loc>
    <lastmod>${new Date(
      cat.created_at || Date.now()
    ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
${subcategories
  .map(
    subcategory => `  <url>
    <loc>${escapeXml(`${BASE_URL}/categories/${subcategory.category?.slug || ''}/${subcategory.slug || ''}`)}</loc>
    <lastmod>${new Date(
      subcategory.created_at || Date.now()
    ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
${products
  .map(
    prod => {
      const categorySlug = prod.category
        ?.toLowerCase()
        .replace(/\s+/g, '-') || ''
      const subcategorySlug = prod.subcategory
        ?.toLowerCase()
        .replace(/\s+/g, '-') || ''
      const productId = prod.id || ''
      return `  <url>
    <loc>${escapeXml(`${BASE_URL}/categories/${categorySlug}/${subcategorySlug}/${productId}`)}</loc>
    <lastmod>${new Date(
      prod.updated_at || Date.now()
    ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    }
  )
  .join('\n')}
</urlset>`
}

export async function getServerSideProps ({ res }) {
  // Set status and headers before any operations
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate')

  try {
    // Fetch products & categories from your API
    const [categoriesRes, subcategoriesRes] = await Promise.all([
      fetch(`${API_URL}/category`),
      fetch(`${API_URL}/subcategory`)
    ])

    if (!categoriesRes.ok || !subcategoriesRes.ok) {
      throw new Error('Failed to fetch categories or subcategories')
    }

    const categories = await categoriesRes.json()
    const subcategories = await subcategoriesRes.json()
    
    // Validate that we got arrays
    if (!Array.isArray(categories) || !Array.isArray(subcategories)) {
      throw new Error('Invalid response format from API')
    }

    const productCateg = categories.map(categ => categ.id).filter(Boolean)
    const prod = await Promise.all(
      productCateg.map(id =>
        fetch(`${API_URL}/products/category/${id}`)
          .then(res => {
            if (!res.ok) {
              console.warn(`Failed to fetch products for category ${id}`)
              return []
            }
            return res.json()
          })
          .catch(err => {
            console.warn(`Error fetching products for category ${id}:`, err)
            return []
          })
      )
    )
    const products = prod.flat().filter(Boolean)

    const sitemap = generateSiteMap({ categories, subcategories, products })

    res.write(sitemap)
    res.end()

    return { props: {} }
  } catch (error) {
    console.error('Sitemap generation error:', error)

    // Return a minimal valid sitemap on error
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    res.write(errorSitemap)
    res.end()

    return { props: {} }
  }
}

export default function Sitemap () {
  return null
}
