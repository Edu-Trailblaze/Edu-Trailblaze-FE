'use client'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useGetNumberOfCartItemsQuery,
  useDeleteAllCartItemsMutation
} from '@/redux/services/cart.service'
import { usePostPaymentMutation } from '@/redux/services/payment.service'
import { formatCurrency } from '@/utils/format'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTags } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import EmptyCart from './EmptyCart'

export default function Cart() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const { data: cartItems, isLoading, isFetching } = useGetCartQuery(userId)
  const [deleteCartItem, { isLoading: loadingRemove }] = useDeleteCartItemMutation()
  const [deleteAllCartItemsMutation, {isLoading: loadingRemoveAll}] = useDeleteAllCartItemsMutation()
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

  const loadingItems = isLoading || loadingRemove || loadingRemoveAll || loadingNumber || isAddingToPayment || fetchingNumber

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

  if (isLoading || isFetching) {
    return <LoadingPage />
  }

  const handleRemoveItem = async (userId: string, courseId: number) => {
    try {
      await deleteCartItem({ userId, courseId }).unwrap()
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  const deleteAllCartItems = async (userId: string) => {
    try {
      await deleteAllCartItemsMutation(userId).unwrap()
    } catch (error) {
      console.error('Error removing all items from cart:', error)
    }
  }

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleCheckout = async () => {
    try {
      const response = await postPayment({ userId, paymentMethod: selectedMethod }).unwrap()
      if (response.data) {
        router.push(`${response.data}`)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  if (loadingItems) {
      return <LoadingPage />
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
                        src='/assets/Side_Image/course_image.png'
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
                              className='w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-150'
                              onClick={() => handleRemoveItem(userId, cartItem.cartCourseInformation.id)}
                            >
                              Remove
                            </button>
                            <p className='flex items-center font-semibold'>
                              {cartItem.totalCoursePrice}VND
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
                <p className='font-bold text-2xl sm:text-3xl lg:text-4xl mb-4'>{cartItems?.totalPrice} VND</p>
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
                    className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150'
                    type='button'
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                  <button
                    className='w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-150'
                    type='button'
                    onClick={() => deleteAllCartItems(userId)}
                  >
                    Remove All
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
    </>
  )
}
