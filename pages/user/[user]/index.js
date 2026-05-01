import User from '@/components/User/User'
import React from 'react'
import Head from 'next/head'

const UserDetails = () => {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <User />
    </>
  )
}

export default UserDetails
