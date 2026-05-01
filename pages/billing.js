import BillingTemplate from '@/components/Billing/billing'
import Head from 'next/head'
import React from 'react'

const Billing = () => {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <div className='pt-[115px]'>
        <BillingTemplate />
      </div>
    </>
  )
}

export default Billing
