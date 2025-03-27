'use client'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useGetNumberOfCartItemsQuery,
  useDeleteAllCartItemsMutation
} from '@/redux/services/cart.service'
import { usePostPaymentMutation } from '@/redux/services/order.service'
import { formatCurrency } from '@/helper/format'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTags } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import EmptyCart from './EmptyCart'
import Modal from 'react-modal'
import RequestPaymentMethod from '@/components/global/requestNotification/requestPaymentMethod/RequestPaymentMethod'
import '@/components/global/Modal/ReactModal.css'

export default function Cart() {
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isRemove, setIsRemove] = useState<{ [key: string]: boolean }>({})
  const [isRemoveAll, setIsRemoveAll] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const {
    data: cartItems,
    isLoading,
    isFetching,
    refetch
  } = useGetCartQuery(userId, {
    skip: !userId // Chỉ fetch nếu có userId
  })
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [deleteCartItem, { isLoading: loadingRemove }] = useDeleteCartItemMutation()
  const [deleteAllCartItemsMutation, { isLoading: loadingRemoveAll }] = useDeleteAllCartItemsMutation()
  const {
    data: cartNumber,
    isLoading: loadingNumber,
    isFetching: fetchingNumber
  } = useGetNumberOfCartItemsQuery(userId)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [postPayment, { isLoading: isAddingToPayment, isSuccess: addedPayment, error: PaymentError }] =
    usePostPaymentMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  const loadingItems = isLoading || loadingNumber || isAddingToPayment || fetchingNumber

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    try {
      if (token) {
        const decode = jwtDecode(token)
        console.log('decode', decode)
        setUserId(decode?.sub ?? '') // Use optional chaining and nullish coalescing
        setUserName((decode as any)?.fullName ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  useEffect(() => {
    if (!isFetching && cartItems?.cartItems.length === 0) {
      setTimeout(() => refetch(), 5000) // Chỉ fetch lại sau 5 giây
    }
  }, [cartItems, isFetching])

  if (isLoading || isFetching) {
    return <LoadingPage />
  }

  const handleRemoveItem = async (userId: string, courseId: number) => {
    setIsRemove((prev) => ({ ...prev, [courseId]: true }))
    try {
      await deleteCartItem({ userId, courseId }).unwrap()
      location.reload()
    } catch (error) {
      console.error('Error removing item from cart:', error)
    } finally {
      setIsRemove((prev) => ({ ...prev, [courseId]: false }))
    }
  }

  const deleteAllCartItems = async (userId: string) => {
    setIsRemoveAll(true)
    try {
      await deleteAllCartItemsMutation(userId).unwrap()
      location.reload()
    } catch (error) {
      console.error('Error removing all items from cart:', error)
    } finally {
      setIsRemoveAll(false)
    }
  }

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleCheckout = async () => {
    setIsCheckOut(true)
    if (selectedMethod === '') {
      setPaymentModalOpen(true)
      return
    }
    try {
      const response = await postPayment({ userId, paymentMethod: selectedMethod }).unwrap()
      if (response.data) {
        router.push(`${response.data}`)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
    } finally {
      setIsCheckOut(false)
    }
  }

  if (loadingItems) {
    return <LoadingPage />
  }

  const handleCloseModal = () => {
    setPaymentModalOpen(false)
  }

  return (
    <>
      {cartItems && cartItems !== undefined ? (
        <div className='px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto'>
          <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl mb-5'>Shopping Cart</h1>
          <div className='flex flex-col lg:flex-row lg:space-x-8'>
            <div className='flex-grow mb-8 lg:mb-0'>
              <p className='font-semibold mb-4'>{cartNumber} course(s) in the Cart</p>
              <div className='space-y-4'>
                {cartItems.cartItems.map((cartItem, index) => (
                  <div key={index} className='border-t-2 pt-4'>
                    <div className='flex flex-col sm:flex-row'>
                      {/* Course Image */}
                      <img
                        src={cartItem.cartCourseInformation.imageURL}
                        alt=''
                        className='w-full sm:w-[155px] h-[100px] object-cover mb-4 sm:mb-0 sm:mr-4'
                      />

                      {/* Course Details */}
                      <div className='flex-grow'>
                        <div className='flex flex-col sm:flex-row justify-between'>
                          <div className='max-w-xl mb-4 sm:mb-0'>
                            <p className='font-semibold text-lg sm:text-xl mb-2'>
                              {cartItem.cartCourseInformation.title}
                            </p>
                            <p className='font-light text-sm mb-2'>{cartItem.instructorInformation[0].fullname}</p>

                            {/* Rating Section */}
                            <div className='flex items-center space-x-1 text-yellow-400 mb-2'>
                              <span className='text-gray-600 text-sm font-medium'>4.6</span>
                              {[...Array(4)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='currentColor'
                                  viewBox='0 0 24 24'
                                  className='w-4 h-4'
                                >
                                  <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                                </svg>
                              ))}
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                className='w-4 h-4'
                              >
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                              </svg>
                              <span className='text-gray-400 text-sm'>(40,856)</span>
                            </div>

                            <p className='font-thin text-sm'>50 total hours • 200 lectures • Diploma</p>
                          </div>

                          {/* Price and Remove Button */}
                          <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'>
                            <button
                              className='w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-150 flex justify-center items-center gap-2'
                              disabled={isRemove[cartItem.cartCourseInformation.id]}
                              onClick={() => handleRemoveItem(userId, cartItem.cartCourseInformation.id)}
                            >
                              {isRemove[cartItem.cartCourseInformation.id] ? (
                                <>
                                  <svg
                                    className='animate-spin h-5 w-5 text-white'
                                    xmlns='http://www.w3.org/2000/svg'
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
                                    ></circle>
                                    <path
                                      className='opacity-75'
                                      fill='currentColor'
                                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                    ></path>
                                  </svg>
                                  Removing...
                                </>
                              ) : (
                                'Remove'
                              )}
                            </button>
                            <p className='flex items-center font-semibold'>
                              {formatCurrency(cartItem.totalCoursePrice)}
                              <FaTags className='ml-2' />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='w-full lg:w-80 flex-shrink-0'>
              <div className='bg-white p-4 rounded-lg shadow-sm border'>
                <p className='font-semibold text-gray-500 mb-3'>Total:</p>
                <p className='font-bold text-2xl sm:text-3xl lg:text-4xl mb-4'>
                  {formatCurrency(cartItems?.totalPrice)}
                </p>
                {/* Add Payment method here */}

                <div className='mt-4'>
                  <p className='font-semibold text-gray-700 mb-3'>Payment Method</p>
                  <div className='grid grid-cols-2 gap-2 mb-4'>
                    {/* VNPAY Option */}
                    <div
                      className={`bg-white p-3 rounded-lg border ${selectedMethod === 'VnPay' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col items-center shadow-sm hover:shadow-md`}
                      onClick={() => handleMethodSelect('VnPay')}
                    >
                      <div className='h-10 w-[80px] mb-2 flex items-center justify-center'>
                        <img src='/assets/paymentLogo/VNPAY-QR.svg' className='w-full h-full' alt='' />
                      </div>
                      <span className='text-sm font-medium text-gray-800'>VnPay</span>
                    </div>

                    {/* Momo Option */}
                    <div
                      className={`bg-white p-3 rounded-lg border ${selectedMethod === 'MoMo' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col items-center shadow-sm hover:shadow-md`}
                      onClick={() => handleMethodSelect('MoMo')}
                    >
                      <div className='h-10 w-10 mb-2 flex items-center justify-center'>
                        <img src='/assets/paymentLogo/MoMo.svg' className='w-full h-full' alt='' />
                      </div>
                      <span className='text-sm font-medium text-gray-800'>MoMo</span>
                    </div>

                    {/* PayPal Option */}
                    <div
                      className={`bg-white p-3 rounded-lg border ${selectedMethod === 'PayPal' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col items-center shadow-sm hover:shadow-md`}
                      onClick={() => handleMethodSelect('PayPal')}
                    >
                      <div className='h-12 w-[80px] mb-2 flex items-center justify-center'>
                        <img src='/assets/paymentLogo/PayPal.svg' className='w-full h-full' alt='' />
                      </div>
                      <span className='text-sm font-medium text-gray-800'>PayPal</span>
                    </div>

                    {/* Balance Option */}
                    <div
                      className={`bg-white p-3 rounded-lg border ${selectedMethod === 'balance' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} hover:border-blue-500 cursor-pointer transition-all duration-200 flex flex-col items-center shadow-sm hover:shadow-md`}
                      onClick={() => handleMethodSelect('balance')}
                    >
                      <div className='h-10 w-10 mb-2 flex items-center justify-center'>
                        <svg
                          className='w-full h-full'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <rect width='24' height='24' rx='6' fill='#f0f0f0' />
                          <path
                            d='M5 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V7C4 7.55228 4.44772 8 5 8Z'
                            stroke='#2C3E50'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M5 20H19C19.5523 20 20 19.5523 20 19V10C20 9.44772 19.5523 9 19 9H5C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20Z'
                            stroke='#2C3E50'
                            strokeWidth='1.5'
                          />
                          <path
                            d='M16 15.5C16 16.8807 14.8807 18 13.5 18C12.1193 18 11 16.8807 11 15.5C11 14.1193 12.1193 13 13.5 13C14.8807 13 16 14.1193 16 15.5Z'
                            stroke='#2C3E50'
                            strokeWidth='1.5'
                          />
                        </svg>
                      </div>
                      <span className='text-sm font-medium text-gray-800'>Balance</span>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <button
                    className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150 flex justify-center items-center gap-2'
                    type='button'
                    disabled={isCheckOut}
                    onClick={handleCheckout}
                  >
                    {isCheckOut ? (
                      <>
                        <svg
                          className='animate-spin h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
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
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        processing...
                      </>
                    ) : (
                      'Checkout'
                    )}
                  </button>
                  <button
                    className='w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-150 flex justify-center items-center gap-2'
                    type='button'
                    disabled={isRemoveAll}
                    onClick={() => deleteAllCartItems(userId)}
                  >
                    {isRemoveAll ? (
                      <>
                        <svg
                          className='animate-spin h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
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
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Removing...
                      </>
                    ) : (
                      'Remove All'
                    )}
                  </button>
                </div>
                <div className='mt-6 pt-6 border-t'>
                  <p className='font-semibold mb-3'>Discount</p>
                  <div className='flex'>
                    <input
                      type='text'
                      className='flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter code'
                    />
                    <button className='bg-blue-500 px-4 py-2 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition-colors'>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}

      {paymentModalOpen && (
        <Modal
          key='unique-modal-key'
          isOpen={paymentModalOpen}
          onRequestClose={handleCloseModal}
          className={'bg-transparent border-none p-0'}
          overlayClassName='modal-overlay'
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <RequestPaymentMethod />
        </Modal>
      )}
    </>
  )
}
