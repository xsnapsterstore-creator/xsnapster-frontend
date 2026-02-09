import React from 'react'
import { useRouter } from 'next/router'
import ProductDetailsPage from '@/components/ProductDetails/Product_Details'
import { fetchProduct } from '@/components/API/api'
import ProductSchema from '@/components/SEO/AISEO/ProductSchema'
import FaqSchema from '@/components/SEO/AISEO/Faq'
import Head from 'next/head'

const ProductId = ({ product }) => {
  const router = useRouter()
  const { category_name, sub_category_name, product_id } = router.query
  const faqs = [
    {
      question: 'What is XSNAPSTER?',
      answer:
        'XSNAPSTER is your go-to site for bold, cheeky, and aesthetic Frames. The only thing we expose here is your boring wall.'
    },
    {
      question: 'Is this frame glass or acrylic?',
      answer: 'This frame uses premium unbreakable acrylic glass.'
    },
    {
      question: 'How fast is delivery?',
      answer:
        'Faster than your ex texted - I miss you. Usually ships within a few days. We don not play hard to get.'
    },
    {
      question: 'Do the Frames come with pictures?',
      answer:
        'Yes. Unlike your Tinder matches, these frames would not ghost you empty.'
    },
    {
      question: 'Is Checkout safe?',
      answer: '100%. The only thing you will catch is… compliments 😉..'
    },
    {
      question: 'Can I request custom Frames?',
      answer:
        'Absolutely. Slide into our DMs and we will frame whatever aesthetic sin you want.'
    },
    {
      question: 'Why should I buy from you?',
      answer:
        'Because we are funny, bold, and sarcastic — just like our Frames. Also, We have premium quality of Frames and Posters unlike others.'
    }
  ]

  return (
    <>
      <Head>
        <ProductSchema product={product} />
        <FaqSchema faqs={faqs} />
      </Head>
      <div className='pt-[85px]'>
        <div className=''>
          <ProductDetailsPage prod={product} />
        </div>
      </div>
    </>
  )
}

export default ProductId

export async function getServerSideProps ({ params }) {
  const { category_name, sub_category_name, product_id } = params
  const res = fetchProduct(product_id)
  const data = await (await res).json()

  return {
    props: {
      product: data || []
    }
  }
}
