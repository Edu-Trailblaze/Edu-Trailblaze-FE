'use client'

import { useDeleteCartItemMutation, useGetCartQuery, useGetNumberOfCartItemsQuery, useDeleteAllCartItemsMutation } from '@/services/cart.service'
import { usePostPaymentMutation } from '@/services/payment.service'
import { formatCurrency } from '@/utils/format'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTags } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'

export default function ShoppingCart() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const { data: cartItems, isLoading, isFetching } = useGetCartQuery(userId)
  const [deleteCartItem, {isLoading: loadingRemove}] = useDeleteCartItemMutation()
  const [deleteAllCartItemsMutation] = useDeleteAllCartItemsMutation()
  const {
    data: cartNumber,
    isLoading: loadingNumber,
    isFetching: fetchingNumber
  } = useGetNumberOfCartItemsQuery(userId)
  const [postPayment, { isLoading: isAddingToPayment, isSuccess: addedPayment, error: PaymentError }] = usePostPaymentMutation();
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleRemoveItem = async (userId: string, courseId: number) => {
    try {
      await deleteCartItem({userId, courseId}).unwrap()
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

  const handleCheckout = async () => {
    try {
      const response = await postPayment({ userId, paymentMethod: 'VnPay' }).unwrap();
      if (response.data) {
        router.push(`${response.data}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  return (
    <>
      <div className='px-[100px] py-[70px]'>
        <h1 className='font-bold text-4xl mb-5'>Shopping Cart</h1>
        <div className='flex justify-around'>
          <div>
            <p className='font-semibold'>{cartNumber} course(s) in the Cart</p>
            {cartItems && cartItems !== undefined ? (
              cartItems.cartItems.map((cartItems, index) => (
                <div key={index} className='flex'>
                  <div className='flex border-t-2 py-3 w-fit'>
                    <img src='assets/Side_Image/course_image.png' alt='' className='w-[155px] h-[100px] mr-5' />

                    <div className='flex justify-between w-[800px]'>
                      <div className='w-[350px]'>
                        <p className='font-semibold text-xl pb-2'>{cartItems.cartCourseInformation.title}</p>
                        <p className='font-light pb-2 text-sm'>{cartItems.instructorInformation[0].fullname}</p>
                        <div className='flex space-x-1 text-yellow-400 pb-2'>
                          {/* <!-- Rating text --> */}
                          <span className='text-gray-600 text-sm font-medium'>4.6</span>
                          {/* <!-- Star icons --> */}
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          {/* <!-- Review count --> */}
                          <span className='text-gray-400 text-sm'>(40,856)</span>
                        </div>
                        <p className='font-thin text-sm'>50 total hours • 200 lectures • Diploma</p>
                      </div>

                      <div>
                        <button
                          className='w-[100px] bg-red-600 text-white border-2 border-red-600 cursor-pointer px-2 py-1 rounded-md transition duration-150 hover:bg-red-700 hover:border-red-700'
                          type='button'
                          onClick={() => handleRemoveItem(userId, cartItems.cartCourseInformation.id)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className='flex justify-end w-[300px]'>
                        <p className='flex font-semibold'>
                          {cartItems.totalCoursePrice}VND <FaTags className='ml-2 mt-1' />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No course in the cart now</p>
            )}
          </div>
          <div className='w-[250px]'>
            <p className='font-semibold text-gray-500 mb-3'>Total:</p>
            <p className='font-bold text-4xl mb-2'>{cartItems?.totalPrice} VND</p>
            <div>
              <button
                className='w-[250px] bg-blue-500 text-white cursor-pointer px-2 py-2 mt-2 rounded-md transition duration-150 hover:bg-blue-600'
                type='button'
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className='w-[250px] bg-red-500 text-white cursor-pointer px-2 py-2 mt-2 rounded-md transition duration-150 hover:bg-red-600'
                type='button'
                onClick={() => deleteAllCartItems(userId)}
              >
                Remove All
              </button>
            </div>
            <div className='mt-5 border-t-gray-300 border-t-2'>
              <p className='font-semibold pt-3 pb-1'>Discount</p>
              <div className='flex items-center justify-center'>
                <div>
                  <div className='flex'>
                    <div>
                      <input
                        type='text'
                        className='w-full max-w-[190px] h-[40px] bg-white pl-2 text-base font-semibold outline-0 items-center border-gray-300 border-2 rounded-l-lg'
                        placeholder=''
                        id=''
                      />
                    </div>
                    <input
                      type='button'
                      value='Apply'
                      className='bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
