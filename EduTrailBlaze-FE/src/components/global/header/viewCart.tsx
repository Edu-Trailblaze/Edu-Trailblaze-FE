import { useGetCartQuery } from '@/redux/services/cart.service'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface CartItemProps {
  id: string
}

export default function ViewCart({ id }: CartItemProps) {
  const cart = useSelector((state: RootState) => state.cart)
  const { isLoading, isFetching } = useGetCartQuery(id)

  if (isLoading) return <span>Loading...</span>
  return (
    <div className='absolute mt-4 w-80 -translate-x-[45%] p-4 bg-white shadow-2xl rounded-xl border border-gray-400 z-10'>
      {cart.cartItems.length > 0
        ? cart.cartItems.map((cart, index) => (
            <div key={index}>
              <div className='flex gap-5'>
                <div className='w-[120px]'>
                  <img className='rounded-[7px]' src={cart.cartCourseInformation.imageURL} alt='img' />
                </div>
                <div>
                  <h1 className='font-semibold line-clamp-1'>{cart.cartCourseInformation.title}</h1>
                  <p className='block font-sans font-light text-sm leading-relaxed text-inherit antialiased line-clamp-1'>
                    <strong>{cart.instructorInformation[0].userName}</strong>
                  </p>
                  <p className='font-semibold'>{cart.cartCourseInformation.price}$</p>
                </div>
              </div>
              <div className='border-b-2 mb-5'></div>
            </div>
          ))
        : 'No course in the cart now'}
      <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg'>
        <Link href={'/shopping_cart'}>Go to Cart</Link>
      </button>

      <div className='absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-400'></div>
    </div>
  )
}
