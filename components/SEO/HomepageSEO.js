import React from 'react'
import Head from 'next/head'

const HomepageSEO = ({ products, category }) => {
  const min = 0
  const max = category?.length || 0
  const ind = Math.floor(Math.random() * (max - min + 1)) + min
  const imgLink =
    category[ind]?.image_links[0] || 'https://www.xsnapster.store/logo.png'
  const keyword =
    'XSNAPSTER, Trending Frames & Posters in India, Aesthetic Frames & Posters by XSNAPSTER, Frames under 399, Posters under 99, Car Frames & Posters, Anime Frames & Posters, aesthetic wall decor India, Pinterest room decor India, acrylic photo frames India'
  const title = 'XSNAPSTER STORE | Trending Frames & Posters in India'
  const Desc =
    'Elevate your walls with our most-loved premium photo frames and trending posters. From minimalist frames to viral art prints, see what’s transforming homes today. Shop the best-sellers at XSNAPSTER.'
  const url = 'https://www.xsnapster.store/'
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
    </Head>
  )
}

export default HomepageSEO
