import Head from 'next/head'
import React from 'react'

const StaticPageSEO = ({ data }) => {
  return (
    <Head>
      <title>{data?.title}</title>
      <meta charSet='UTF-8' />
      <meta name='language' content='en' />
      <meta name='author' content='XSNAPSTER' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='robots' content='index, follow' />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_US' />

      <meta name='description' content={data?.desc} />
      <meta name='keywords' content={data?.keyword} />
      <link rel='canonical' href={data?.url} />

      <meta property='og:title' content={data?.title} />
      <meta property='og:description' content={data?.desc} />
      <meta property='og:url' content={data?.url} />
      <meta
        property='og:image'
        content={'https://www.xsnapster.store/logo.svg'}
      />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/svg' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta
        name='twitter:image'
        content={'https://www.xsnapster.store/logo.svg'}
      />

      <meta name='twitter:title' content={data?.title} />
      <meta name='twitter:description' content={data?.desc} />
      <meta property='og:site_name' content='XSNAPSTER' />
    </Head>
  )
}

export default StaticPageSEO
