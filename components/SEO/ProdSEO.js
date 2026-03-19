import React from 'react'
import Head from 'next/head'
import ProductSchema from './AISEO/ProductSchema'
import FaqSchema from './AISEO/Faq'

const ProdSEO = ({ product }) => {
  const title =
    product?.title?.split('|')[0] + '|' + ' ' + product?.title?.split('|')[1]
  const keyword = product.title.split('|')
  const Desc = `Get the complete look with the ${keyword[0]}. This premium Photo Frame and high-definition poster combo arrives ready to hang. Elevate your home decor with professional quality craftsmanship.`

  const url = `https://www.xsnapster.store/categories/${product?.category
    ?.toLowerCase()
    .replace(/\s+/g, '-')}/${product?.subcategory
    ?.toLowerCase()
    .replace(/\s+/g, '-')}/${product?.id}`

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
    <Head>
      <title>{title}</title>
      <meta charSet='UTF-8' />
      <meta name='language' content='en' />
      <meta name='author' content='XSNAPSTER' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='robots' content='index, follow' />
      <meta property='og:type' content='product' />
      <meta property='og:locale' content='en_US' />

      <meta name='description' content={product.description} />
      <meta name='keywords' content={keyword} />
      <link rel='canonical' href={url} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={Desc} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={product?.image_links?.[0]} />
      <meta
        property='og:image:secure_url'
        content={product?.image_links?.[0]}
      />
      <meta property='og:image:alt' content={title} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={product?.image_links?.[0]} />

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={Desc} />
      <meta property='og:site_name' content='XSNAPSTER' />
      <ProductSchema product={product} />
      <FaqSchema faqs={faqs} />
    </Head>
  )
}

export default ProdSEO
