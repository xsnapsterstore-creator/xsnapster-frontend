import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from '../store/cartSlice'
import { useQuery } from '@tanstack/react-query'
import { UserOrder, verifyUserPayment, fetchUserAddress } from '../API/api'
import OfferAlert from '../Alert/OfferAlert'

const BillingTemplate = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.items)

  const [paymentOpt, setPaymentOpt] = useState('upi')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isloading, setIsLoading] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [deliveryCharge, setDeliveryCharge] = useState('Free')
  const [order, setOrder] = useState([])
  const [OfferPrice, setOfferPrice] = useState(0)
  const [customAlert, setCustomAlert] = useState({
    open: false,
    title: '',
    message: ''
  })
  const paymentOptions = [
    { value: '', label: 'Select a payment method', isDisabled: true },
    { value: 'cod', label: '💵 Cash on Delivery' },
    {
      value: 'upi',
      label: '🟢 UPI / Debit Card / Credit Card'
    }
  ]

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '12px',
      padding: '4px',
      borderColor: state.isFocused ? '#6366F1' : '#D1D5DB',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99,102,241,0.4)' : 'none',
      '&:hover': {
        borderColor: '#6366F1'
      }
    }),
    option: (base, state) => ({
      ...base,
      padding: '12px',
      fontSize: '14px',
      backgroundColor: state.isSelected
        ? '#6366F1'
        : state.isFocused
        ? '#EEF2FF'
        : 'white',
      color: state.isSelected ? 'white' : '#111827',
      cursor: 'pointer'
    }),
    menu: base => ({
      ...base,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    })
  }

  const CurrAddress =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('address_details') || '{}')
      : {}

  const PosterOffer = [
    { id: 'p1', buy: 5, get: 5 },
    { id: 'p2', buy: 10, get: 15 }
  ]
  const FrameOffer = [
    { id: 'F1', buy: 3, get: 1 },
    { id: 'F2', buy: 6, get: 3 },
    { id: 'F3', buy: 9, get: 5 }
  ]

  //For Poster Total Count
  const isPoster = cart.filter(item => item.dimensions === 'Poster')
  const PosterTotal = isPoster.reduce((sum, item) => sum + item.quantity, 0)
  //For Frame Tatal Count
  const isFrame = cart.filter(
    item =>
      item.dimensions === 'A4' ||
      item.dimensions === 'A3' ||
      item.dimensions === 'A2'
  )
  const FrameTotal = isFrame.reduce((sum, item) => sum + item.quantity, 0)

  // Load cart items from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    setLoading(true)
    const cartData = localStorage.getItem('cart')

    if (PosterTotal) {
      const offer1 = PosterOffer[0]
      const offer2 = PosterOffer[1]

      // FIRST OFFER
      if (PosterTotal < offer1.buy) {
        setCustomAlert({
          open: true,
          title: 'POSTER OFFER!',
          message: `Add ${offer1.buy - PosterTotal} more POSTER to GET ${
            offer1.get
          } POSTER FREE. Check your updated total at checkout.`
        })
      } else if (PosterTotal < offer1.buy + offer1.get) {
        setCustomAlert({
          open: true,
          title: 'POSTER OFFER UNLOCKED',
          message: `Add ${
            offer1.buy + offer1.get - PosterTotal
          } more POSTER to GET it FREE. Check your updated total at checkout.`
        })
      }

      // SECOND OFFER
      else if (PosterTotal < offer2.buy) {
        setCustomAlert({
          open: true,
          title: 'POSTER OFFER!',
          message: `Add ${offer2.buy - PosterTotal} more POSTER to GET ${
            offer2.get
          } POSTER FREE. Check your updated total at checkout.`
        })
      } else if (PosterTotal < offer2.buy + offer2.get) {
        setCustomAlert({
          open: true,
          title: 'POSTER OFFER UNLOCKED',
          message: `Add ${
            offer2.buy + offer2.get - PosterTotal
          } more POSTER to GET it FREE. Check your updated total at checkout.`
        })
      }
    }

    // Frame ALert Offer Logic
    if (FrameTotal) {
      const offer1 = FrameOffer[0]
      const offer2 = FrameOffer[1]
      const offer3 = FrameOffer[2]

      // OFFER 1
      if (FrameTotal < offer1.buy) {
        setCustomAlert({
          open: true,
          title: 'FRAME OFFER!',
          message: `Add ${offer1.buy - FrameTotal} more FRAME to GET ${
            offer1.get
          } FRAME FREE. Check your updated total at checkout.`
        })
      } else if (FrameTotal < offer1.buy + offer1.get) {
        setCustomAlert({
          open: true,
          title: 'FRAME OFFER UNLOCKED',
          message: `Add ${
            offer1.buy + offer1.get - FrameTotal
          } more FRAME for FREE. Check your updated total at checkout.`
        })
      }

      // OFFER 2
      else if (
        FrameTotal < offer2.buy &&
        FrameTotal > offer1.buy + offer1.get
      ) {
        setCustomAlert({
          open: true,
          title: 'FRAME OFFER!',
          message: `Add ${offer2.buy - FrameTotal} more FRAME to GET ${
            offer2.get
          } FRAME FREE. Check your updated total at checkout.`
        })
      } else if (
        FrameTotal < offer2.buy + offer2.get &&
        FrameTotal > offer1.buy + offer1.get
      ) {
        setCustomAlert({
          open: true,
          title: 'FRAME OFFER UNLOCKED',
          message: `Add ${
            offer2.buy + offer2.get - FrameTotal
          } more FRAME to GET it FREE. Check your updated total at checkout.`
        })
      }

      // OFFER 3
      else if (FrameTotal < offer3.buy) {
        setCustomAlert({
          open: true,
          title: 'FRAME OFFER!',
          message: `Add ${offer3.buy - FrameTotal} more FRAME to GET ${
            offer3.get
          } FRAME FREE. Check your updated total at checkout.`
        })
      } else if (FrameTotal < offer3.buy + offer3.get) {
        setCustomAlert({
          open: true,
          title: 'FRAME OFFER UNLOCKED',
          message: `Add ${
            offer3.buy + offer3.get - FrameTotal
          } more FRAME to GET it FREE. Check your updated total at checkout.`
        })
      }
    }

    if (!cartData || cartData === '[]') {
      setItems([])
      setShowBilling(false)
      setLoading(false)
      return
    }

    try {
      setItems(cart)
      setShowBilling(true)
    } catch (error) {
      console.error('Cart JSON parsing error:', error)
      setItems([])
      setShowBilling(false)
    }
    setLoading(false)
  }, [cart])

  // 🔢 Compute totals (memoized)
  const total = useMemo(() => {
    if (PosterTotal === PosterOffer[0].buy + PosterOffer[0].get) {
      const temp = Math.floor(
        cart.reduce(
          (sum, item) => sum + item.discounted_price * item.quantity,
          0
        )
      )
      setOfferPrice(645)
      return temp - 645
    } else if (PosterTotal === PosterOffer[1].buy + PosterOffer[1].get) {
      const temp = Math.floor(
        cart.reduce(
          (sum, item) => sum + item.discounted_price * item.quantity,
          0
        )
      )
      setOfferPrice(1935)
      return temp - 1935
    } else if (FrameTotal === FrameOffer[0].buy + FrameOffer[0].get) {
      const temp = Math.floor(
        cart.reduce(
          (sum, item) => sum + item.discounted_price * item.quantity,
          0
        )
      )
      setOfferPrice(399)
      return temp - 399
    } else if (FrameTotal === FrameOffer[1].buy + FrameOffer[1].get) {
      const temp = Math.floor(
        cart.reduce(
          (sum, item) => sum + item.discounted_price * item.quantity,
          0
        )
      )
      setOfferPrice(1197)
      return temp - 1197
    } else if (FrameTotal === FrameOffer[2].buy + FrameOffer[2].get) {
      const temp = Math.floor(
        cart.reduce(
          (sum, item) => sum + item.discounted_price * item.quantity,
          0
        )
      )
      setOfferPrice(1995)
      return temp - 1995
    } else {
      setOfferPrice(0)
      return Math.floor(
        cart.reduce(
          (sum, item) => sum + item.discounted_price * item.quantity,
          0
        )
      )
    }
  }, [cart])

  // 🚚 Delivery charge logic
  useEffect(() => {
    setDeliveryCharge(total > 500 ? 0 : 99)
  }, [total])
  // 🧮 Grand total
  const grandTotal = total + deliveryCharge

  async function ProceedPayment () {
    setIsLoading(true)
    const address_id = localStorage.getItem('address_id')
    const idempotency = localStorage.getItem('idempotency')
    try {
      // Prevent checkout if cart is empty
      if (!cart || cart.length === 0) {
        setCustomAlert({
          open: true,
          title: 'CART',
          message: 'Your Cart is Empty'
        })
        return
      }
      if (paymentOpt === 'cod') {
        const payload = {
          items: cart.map(item => ({
            product_id: item.id,
            dimension: item.dimensions,
            qty: item.quantity
          })),
          address_id: address_id,
          payment_method: 'COD',
          idempotency_key: idempotency
        }

        const res = await UserOrder(payload)

        if (!res) {
          alert('Network error. Please try again.')
          return
        }

        const data = await res.json()

        if (res.ok) {
          Promise.resolve().then(() => {
            localStorage.removeItem('cart')
            localStorage.setItem('order_id', data.order_id)
          })
          window.location.href = '/order-placed'
        } else {
          alert(data.message || 'Failed to place order.')
        }
      } else {
        // Load Razorpay SDK
        const loadRazorpay = () => {
          return new Promise(resolve => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
          })
        }

        // API: create order
        const createOrder = async () => {
          const payload = {
            items: cart.map(item => ({
              product_id: item.id,
              qty: item.quantity,
              dimension: item.dimensions
            })),
            address_id: address_id,
            payment_method: 'RAZORPAY',
            idempotency_key: idempotency
          }
          const res = await UserOrder(payload)

          if (!res.ok) {
            alert('Network error. Please try again.')
            return
          }

          return await res.json()
        }

        // API: verify payment
        const VerifyPayment = async data => {
          const res = await verifyUserPayment(data)

          if (!res) {
            alert('Network error. Please try again.')
            return
          }

          return res
        }

        const startPayment = async () => {
          const loaded = await loadRazorpay()
          if (!loaded) {
            alert('Failed to load Razorpay')
            return
          }

          const order = await createOrder()

          const options = {
            key: 'rzp_test_Rc3r0uTkowIjsF',
            amount: order.amount * 100,
            currency: 'INR',
            order_id: order.payment_gateway_order_id,
            name: 'XSNAPSTER',
            description: 'Order Payment',
            handler: async function (response) {
              const verifyRes = await VerifyPayment({
                order_id: order.order_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
              console.log('Step 3')
              const data = await verifyRes.json()

              console.log('VERIFY RESPONSE:', data)
              console.log('Step 4')
              setCustomAlert({
                open: true,
                title: 'PAYMENT UPDATE',
                message: data.message
              })
              if (verifyRes.ok) {
                Promise.resolve().then(() => {
                  localStorage.setItem('order_id', order.order_id)
                  localStorage.removeItem('cart')
                  localStorage.removeItem('address_id')
                })
                window.location.href = '/order-placed'
              } else {
                window.location.href = '/billing'
              }
            }
          }

          const rzp = new window.Razorpay(options)
          rzp.open()
        }
        // 👉 CALL THE PAYMENT WINDOW
        await startPayment()
        setIsLoading(false)
      }
    } catch (error) {
      console.error('❌ ProceedPayment Error:', error)
      alert('Something went wrong while processing your order.')
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['Address'],
    queryFn: async () => {
      const res = await fetchUserAddress()
      return res
    },

    staleTime: 600_000,
    gcTime: 600_000,
    refetchInterval: 600_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8 pb-24 md:pb-36'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* ---------------- LEFT SECTION ---------------- */}
        <div className='lg:col-span-2 flex flex-col gap-5'>
          {/* Page Title */}
          <div className='px-1'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
              Total Billing
            </h1>
            <p className='text-gray-500 text-sm mt-1'>
              Review your items and complete your purchase
            </p>
          </div>

          {/* ---------------- ORDER ITEMS ---------------- */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Order Items
            </h2>

            <div className='flex flex-col divide-y'>
              {loading ? (
                <p className='text-center py-5 text-gray-500 animate-pulse'>
                  Loading items...
                </p>
              ) : items.length === 0 ? (
                <p className='text-center py-5 text-gray-500'>
                  Your cart is empty
                </p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-start py-4 gap-3'
                  >
                    {/* Item Left */}
                    <div className='flex items-start gap-3'>
                      <Image
                        loading='lazy'
                        quality={75}
                        width={70}
                        height={70}
                        src={item.image_link}
                        alt={item.title}
                        className='w-20 h-20 rounded-xl object-cover border'
                      />

                      <div className='flex-1'>
                        <p className='font-semibold text-gray-900 text-[12.5px] md:text-base'>
                          {item.title.substring(0, 35) + '...'}
                        </p>

                        <div className='flex justify-start items-end mt-1 gap-1'>
                          <p className='text-red-600 animate-pulse font-semibold text-sm'>
                            ₹{item.discounted_price}
                          </p>
                          <p className='line-through text-gray-900 text-xs'>
                            ₹{item.price}
                          </p>
                          <span className='text-[11px] pl-3'>
                            {item.dimensions}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity / Remove */}
                    <div className='flex flex-col items-center gap-2'>
                      <div className='text-center'>
                        <div className='flex items-center gap-1 border rounded-lg bg-gray-200'>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              dispatch(
                                decreaseQuantity({
                                  id: item.id,
                                  dimensions: item.dimensions
                                })
                              )
                            }}
                            className='w-[25px] flex justify-center text-lg font-semibold text-gray-700 hover:text-black active:scale-90 transition'
                          >
                            -
                          </button>

                          <span className='font-semibold text-xs w-[15px] text-gray-900'>
                            {item.quantity || 1}
                          </span>

                          <button
                            onClick={e => {
                              e.stopPropagation()
                              dispatch(
                                increaseQuantity({
                                  id: item.id,
                                  dimensions: item.dimensions
                                })
                              )
                            }}
                            className='w-[25px] flex justify-center text-lg font-semibold text-gray-700 hover:text-black active:scale-90 transition'
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={e => {
                          e.stopPropagation()
                          dispatch(
                            removeFromCart({
                              id: item.id,
                              dimensions: item.dimensions
                            })
                          )
                        }}
                        className='bg-gray-500 px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-red-600 transition'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ---------------- ADDRESS SECTION ---------------- */}
          {showBilling && (
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-3'>
                Delivery Address
              </h2>

              {isLoading ? (
                // 🔄 Loading State (Skeleton Chips)
                <div className='text-center text-sm p-4'>
                  <p>Loading...</p>
                </div>
              ) : (
                <div className='text-gray-700 text-sm leading-relaxed'>
                  {CurrAddress?.name}
                  <br />
                  {CurrAddress?.address_line}, {CurrAddress?.city},{' '}
                  {CurrAddress?.state}, {CurrAddress?.zip_code}
                  <br />
                  Mobile: {CurrAddress?.phone_number}
                  <br />
                  Address Type: {CurrAddress?.address_type}
                </div>
              )}

              <button
                onClick={() => router.push('/address')}
                className='mt-4 px-5 py-2 bg-black text-white rounded-lg text-sm active:scale-95 transition cursor-pointer'
              >
                Change Address
              </button>
            </div>
          )}
        </div>

        {/* ---------------- RIGHT SECTION (SUMMARY) ---------------- */}
        {showBilling && (
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg p-6 sticky top-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-5'>
                Price Details
              </h2>

              <div className='space-y-3 text-sm'>
                {/* Subtotal */}
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal</span>
                  <span>₹{total + OfferPrice}</span>
                </div>

                {/* Delivery Charges */}
                <div className='flex justify-between text-gray-700'>
                  <span>Delivery Charges</span>
                  <span className='text-green-600 font-medium'>
                    ₹{deliveryCharge}
                  </span>
                </div>

                {/* Offer Prices */}
                <div className='flex justify-between text-gray-700'>
                  <span>Free Worth</span>
                  <span className='text-gray-600'>-₹{OfferPrice}</span>
                </div>

                <hr className='my-4' />

                {/* Total */}
                <div className='flex justify-between text-gray-900 font-semibold text-lg'>
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <hr className='my-4' />

              <div className='mt-6 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-900 mb-2'>
                  Payment Options
                </h2>

                {/* Select Box */}
                <div>
                  <label className='font-medium text-gray-700 text-sm'>
                    Choose Payment Method
                  </label>
                  <Select
                    value={paymentOptions.find(opt => opt.value === paymentOpt)}
                    onChange={selected => setPaymentOpt(selected.value)}
                    options={paymentOptions}
                    styles={customStyles}
                    placeholder='Select a payment method'
                    className='mt-2 mb-5'
                    classNamePrefix='react-select'
                  />
                </div>
              </div>

              <div className='mt-5'>
                <p className='text-[11px]'>
                  By continuing with the order, you confirm that you are above
                  18 years of age, and you agree to the{' '}
                  <bold className='font-semibold'>
                    <bold className='text-red-600'>X</bold>SNAPSTER's
                  </bold>{' '}
                  <Link
                    className='text-green-500'
                    href={'/terms-and-conditions'}
                  >
                    Terms of Use
                  </Link>{' '}
                  and{' '}
                  <Link className='text-green-500' href={'privacy-policy'}>
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Payment Button */}
              <button
                onClick={ProceedPayment}
                className='w-full mt-6 py-3 cursor-pointer bg-black text-white rounded-xl text-sm font-medium active:scale-95 transition'
              >
                {isloading
                  ? 'Processing Order...'
                  : paymentOpt === 'cod'
                  ? 'Place Order'
                  : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        )}

        {/* Go Back / Go to Homepage Route */}
        {!showBilling && (
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <div className='flex flex-col divide-y'>
              <p className='text-center py-5 text-gray-500'>
                Please add some items in the cart
              </p>
            </div>
            <div className='mt-2 flex justify-center items-center gap-3'>
              <button
                onClick={() => window.history.back()}
                className='px-5 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 text-sm font-medium bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition'
              >
                Go Back
              </button>

              <a
                href='/'
                className='px-5 py-2 cursor-pointer rounded-xl text-white text-sm font-medium bg-black shadow-md hover:bg-gray-900 active:scale-95 transition'
              >
                Go to Homepage
              </a>
            </div>
          </div>
        )}
      </div>

      <OfferAlert
        open={customAlert.open}
        title={customAlert.title}
        message={customAlert.message}
        onClose={() => setCustomAlert({ open: false, message: '' })}
      />
    </div>
  )
}

export default BillingTemplate
