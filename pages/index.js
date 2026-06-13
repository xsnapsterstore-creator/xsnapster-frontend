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

export async function getServerSideProps () {
  try {
    const res = await fetchHomepage()
    const prodData = await res.json()
    const cat = await fetchCategories()
    const category = await cat.json()
    return {
      props: {
        products: prodData || [],
        category: category || []
      }
    }
  } catch (error) {
    console.error('Failed to fetch homepage data:', error)
    return {
      props: {
        products: [],
        category: []
      }
    }
  }
}
