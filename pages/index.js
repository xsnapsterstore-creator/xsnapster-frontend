import { fetchCategories, fetchHomepage } from '@/components/API/api'
import Category_Story from '@/components/Category_Story/Category_story'
import Hero from '@/components/Hero/Hero'
import HomepageSEO from '@/components/SEO/HomepageSEO'

export default function Home ({ products, category }) {
  return (
    <>
      <HomepageSEO products={products} category={category} />
      <div>
        <Category_Story category={category} />
        <div>
          <Hero products={products} categories={category} />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps () {
  try {
    const res = await fetchHomepage()
    const prodData = await res.json()
    const cat = await fetchCategories()
    const category = await cat.json()
    return {
      props: {
        products: prodData || [],
        category: category || []
      },
      revalidate: 180
    }
  } catch (error) {
    console.error('Build-time fetch failed, using empty fallback:', error)
    return {
      props: {
        products: [],
        category: []
      },
      revalidate: 60 // retry sooner since we have no data
    }
  }
}
