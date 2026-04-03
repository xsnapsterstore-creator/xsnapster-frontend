import React from 'react'
import { useRouter } from 'next/router'
import ProductDetailsPage from '@/components/ProductDetails/Product_Details'
import { fetchProduct } from '@/components/API/api'
import ProdSEO from '@/components/SEO/ProdSEO'

const ProductId = ({ product }) => {
  const router = useRouter()
  const { category_name, sub_category_name, product_id } = router.query

  return (
    <>
      <ProdSEO product={product} />
      <div className='pt-[95px]'>
        <div className=''>
          <ProductDetailsPage prod={product} />
        </div>
      </div>
    </>
  )
}

export default ProductId

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking' // generate on demand
  }
}

export async function getStaticProps ({ params }) {
  const { product_id } = params
  const res = fetchProduct(product_id)
  const data = await (await res).json()

  return {
    props: {
      product: data || []
    },
    revalidate: 600
  }
}
