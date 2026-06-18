import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import StaticPageSEO from '@/components/SEO/StaticPageSEO'

const ContactUs = () => {
  const data = {
    title: 'Contact Us | XSNAPSTER',
    desc: 'Have questions about our premium frames or posters? Our team is here to help with orders, custom sizing, and decor advice. Contact XSNASPTER today for expert assistance.',
    keyword:
      'contact XSNAPSTER, customer service, photo frame support, poster shipping inquiry, custom framing help, XSNAPSTER phone number, email support, wholesale inquiries.',
    url: 'https://www.xsnapster.store/contact-us'
  }
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    subject: '',
    msg: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.fname.trim()) newErrors.fname = 'Required'
    if (!formData.lname.trim()) newErrors.lname = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = 'Enter a valid email'
    if (!formData.subject) newErrors.subject = 'Please choose a topic'
    if (!formData.msg.trim()) newErrors.msg = 'Please write a message'
    return newErrors
  }

  const handleChange = e => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    setErrors(prev => ({ ...prev, [id]: '' }))
  }

  const handleSubmit = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    console.log(formData)

    // Replace with your actual API call
    await new Promise(r => setTimeout(r, 2400))

    setLoading(false)
    setSubmitted(true)
  }

  const inputClass = field =>
    `w-full px-4 py-2.5 text-sm bg-gray-50 border rounded-lg outline-none transition focus:ring-2 focus:ring-black/10 focus:border-gray-400 ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`

  return (
    <>
      <StaticPageSEO data={data} />
      <div className='pt-[115px] pb-20 px-6 md:px-20 bg-gradient-to-b from-[#F2F2F2] via-[#F2F2F2]/60'>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12'
        >
          <div className='flex flex-col font-bold'>
            <h1 className='text-[35px] text-gray-900'>Contact Us</h1>
            <span className='text-red-600 animate-pulse text-sm'>
              Slide Into Our Inbox 💌
            </span>
          </div>
          <div className='w-16 h-1 bg-red-500 mx-auto mt-1 rounded-full'></div>
          <p className='text-gray-600 text-sm mt-2'>
            Got a question, complaint, or an ego that needs validation? We're
            all ears (and keyboards).
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center'>
          {/* Left Section — Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden'
          >
            <div className='absolute w-40 h-40 bg-pink-300 opacity-20 rounded-full -top-10 -right-10 blur-3xl'></div>
            <div className='absolute w-56 h-56 bg-yellow-300 opacity-20 rounded-full bottom-0 -left-20 blur-3xl'></div>

            <h2 className='text-2xl font-bold mb-3 text-gray-900'>
              We Don't Bite{' '}
              <span className='text-red-500 text-sm animate-pulse'>
                (Unless You're a Dusty Wall)
              </span>
            </h2>
            <hr className='border-gray-200 mb-4' />

            <p className='text-gray-700 leading-relaxed text-[15px]'>
              Whether it's about your order, a Custom Frame, or just to tell us
              how hilarious we are — we love hearing from you. Our customer
              support team replies faster than your ex's “seen” message.
            </p>

            <div className='mt-6 flex items-center gap-2 text-gray-800 hover:text-red-600 cursor-pointer transition'>
              <EmailIcon />
              <a
                href='mailto:contact@xsnapster.store'
                className='text-[15px] font-medium'
              >
                contact@xsnapster.store
              </a>
            </div>

            <p className='text-[14px] mt-3 text-gray-500 italic'>
              Got sarcasm better than ours? We dare you to out-snark us.
            </p>
          </motion.div>

          {/* Right Section — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='relative max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 text-black rounded-2xl shadow-2xl overflow-hidden'
          >
            <div className='max-w-md mx-auto'>
              <div className='bg-white border border-gray-100 rounded-2xl p-8 shadow-sm'>
                <p className='text-xs uppercase tracking-widest text-gray-400 mb-1'>
                  Get in touch
                </p>
                <h2 className='text-2xl font-medium text-gray-900 mb-7'>
                  Talk to us
                </h2>

                {submitted ? (
                  <div className='bg-green-50 border border-green-200 rounded-xl p-6 text-center'>
                    <svg
                      className='w-8 h-8 text-green-500 mx-auto mb-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <p className='text-sm text-green-700'>
                      <span className='font-medium'>Message sent!</span> We'll
                      get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {/* Name Row */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          htmlFor='fname'
                          className='block text-xs font-medium text-gray-500 mb-1.5'
                        >
                          First name
                        </label>
                        <input
                          id='fname'
                          type='text'
                          value={formData.fname}
                          onChange={handleChange}
                          placeholder='Jane'
                          autoComplete='given-name'
                          className={inputClass('fname')}
                        />
                        {errors.fname && (
                          <p className='text-xs text-red-500 mt-1'>
                            {errors.fname}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor='lname'
                          className='block text-xs font-medium text-gray-500 mb-1.5'
                        >
                          Last name
                        </label>
                        <input
                          id='lname'
                          type='text'
                          value={formData.lname}
                          onChange={handleChange}
                          placeholder='Smith'
                          autoComplete='family-name'
                          className={inputClass('lname')}
                        />
                        {errors.lname && (
                          <p className='text-xs text-red-500 mt-1'>
                            {errors.lname}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-xs font-medium text-gray-500 mb-1.5'
                      >
                        Email address
                      </label>
                      <input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='jane@company.com'
                        autoComplete='email'
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p className='text-xs text-red-500 mt-1'>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor='subject'
                        className='block text-xs font-medium text-gray-500 mb-1.5'
                      >
                        Subject
                      </label>
                      <select
                        id='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClass('subject')}
                      >
                        <option value=''>Select a topic…</option>
                        <option>General enquiry</option>
                        <option>Partnership</option>
                        <option>Orders & Support</option>
                        <option>Press & media</option>
                        <option>Other</option>
                      </select>
                      {errors.subject && (
                        <p className='text-xs text-red-500 mt-1'>
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor='msg'
                        className='block text-xs font-medium text-gray-500 mb-1.5'
                      >
                        Message
                      </label>
                      <textarea
                        id='msg'
                        rows={5}
                        value={formData.msg}
                        onChange={handleChange}
                        placeholder="Tell us what's on your mind…"
                        maxLength={1000}
                        className={inputClass('msg') + ' resize-none'}
                      />
                      <div className='flex justify-between mt-1'>
                        {errors.msg ? (
                          <p className='text-xs text-red-500'>{errors.msg}</p>
                        ) : (
                          <span />
                        )}
                        <span className='text-xs text-gray-400 ml-auto'>
                          {formData.msg.length} / 1000
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className='w-full mt-2 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {loading ? (
                        <>
                          <svg
                            className='w-4 h-4 animate-spin'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            />
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8v8z'
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
