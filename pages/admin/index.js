import React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import EmailIcon from '@mui/icons-material/Email'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const AdminIndex = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email') // email | otp
  const [loading, setLoading] = useState(false)
  const [reSending, setReSending] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' }) // success | error | info

  useEffect(() => {
    const userId = localStorage.getItem('userID')
    if (userId) {
      router.push('/admin/xsnapsteruser')
      return
    }
    window.location.href = `/login`
  }, [])

  // --- SEND OR RESEND OTP ---
  const handleSendOTP = async () => {
    if (!email.trim()) {
      return setMsg({ type: 'error', text: 'Please enter your email' })
    }

    setLoading(true)

    setLoading(false)
  }

  const handleResendOTP = async () => {
    if (!email.trim()) {
      setStep('email')
      return setMsg({ type: 'error', text: 'Email is missing' })
    }

    setReSending(true)
    setReSending(false)
  }

  // --- VERIFY OTP ---
  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      return setMsg({ type: 'error', text: 'Please enter the OTP' })
    }

    setLoading(true)
    setLoading(false)
  }

  // --- STYLES FOR MESSAGES ---
  const messageColor =
    msg.type === 'error'
      ? 'text-red-600'
      : msg.type === 'success'
      ? 'text-green-600'
      : 'text-gray-500'

  return (
    <div className='pt-[115px] min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-white'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='text-center mb-5 px-3'
      >
        <Image
          className='m-auto'
          src='/logo.svg'
          alt='Logo'
          width={60}
          height={60}
        />
        <h2 className='text-3xl mt-2 lg:text-4xl font-extrabold text-gray-900'>
          Join the{' '}
          <span className='text-red-600 animate-pulse'>Wall of Fame</span>
        </h2>
        <p className='text-gray-600 mt-2 text-sm lg:text-base'>
          Because your walls deserve better — and so do you.
        </p>
      </motion.div>

      {/* EMAIL SCREEN */}
      {step === 'email' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='w-[90%] max-w-md bg-white shadow-xl rounded-3xl p-8'
        >
          <div className='mb-6 flex justify-center gap-6'>
            <button className='pb-3 font-semibold border-b-2 border-black flex items-center gap-2'>
              <EmailIcon fontSize='small' /> Email
            </button>
          </div>

          {msg.text && (
            <p className={`${messageColor} text-sm mb-3 text-center`}>
              {msg.text}
            </p>
          )}

          <input
            type='email'
            placeholder='you@example.com'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
            onChange={e => setEmail(e.target.value)}
          />

          <button
            onClick={handleSendOTP}
            className='mt-5 w-full bg-blue-600 cursor-pointer text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 transition'
          >
            {loading ? 'Sending OTP...' : 'Request OTP'}
          </button>
        </motion.div>
      )}

      {/* OTP SCREEN */}
      {step === 'otp' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='w-[90%] max-w-md bg-white shadow-xl rounded-3xl p-8'
        >
          <h1 className='text-2xl font-semibold text-gray-800 mb-1 text-center'>
            OTP Verification
          </h1>
          <p className='text-gray-500 text-sm text-center'>
            Enter the 6-digit code sent to your email
          </p>

          {msg.text && (
            <p className={`${messageColor} text-sm mt-3 text-center`}>
              {msg.text}
            </p>
          )}

          <input
            type='number'
            value={otp}
            maxLength={6}
            onChange={e => setOtp(e.target.value)}
            className='mt-6 w-full p-3 border rounded-xl text-center text-lg tracking-widest bg-gray-100 focus:bg-white focus:border-blue-500 outline-none'
            placeholder='Enter 6-digit OTP'
          />

          <button
            onClick={handleVerifyOTP}
            className='mt-6 w-full bg-blue-600 cursor-pointer text-white py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 transition'
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            onClick={handleResendOTP}
            className='mt-2 w-full bg-gray-500 cursor-pointer text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition'
          >
            {reSending ? 'Sending...' : 'Resend OTP'}
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <div className='mt-8 text-center text-xs text-gray-500 px-6 max-w-xs'>
        <p>
          By signing up, you agree to our{' '}
          <Link
            href='/terms-and-conditions'
            className='text-black font-medium hover:underline'
          >
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy-policy'
            className='text-black font-medium hover:underline'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default AdminIndex
