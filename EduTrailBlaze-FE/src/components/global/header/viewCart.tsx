import { useGetCartQuery } from '@/redux/services/cart.service'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { formatCurrency } from '@/helper/format'

interface CartItemProps {
  id: string
}

export default function ViewCart({ id }: CartItemProps) {
  const cart = useSelector((state: RootState) => state.cart)
  const { data } = useGetCartQuery(id)

  const cartItemsToRender = cart.cartItems.length > 0 ? cart.cartItems : (data?.cartItems ?? [])

  // if (isLoading) return <span>Loading...</span>
  return (
    <div className='absolute mt-4 w-80 -translate-x-[46%] p-4 bg-white shadow-2xl rounded-xl border border-gray-400 z-50'>
      {cartItemsToRender.length > 0 ? (
        cartItemsToRender.map((cart, index) => (
          <div key={index}>
            <div className='flex gap-5'>
              <div className='w-[170px]'>
                <img className='rounded-[7px] w-40 h-16' src={cart.cartCourseInformation.imageURL} alt='img' />
              </div>
              <div>
                <h1 className='font-semibold line-clamp-1'>{cart.cartCourseInformation.title}</h1>
                <p className='block font-sans font-light text-sm leading-relaxed text-inherit antialiased line-clamp-1'>
                  <strong>{cart.instructorInformation[0].userName}</strong>
                </p>
                <p className='font-semibold'>{formatCurrency(cart.cartCourseInformation.price)}</p>
              </div>
            </div>
            <div className='border-b-2 mb-5'></div>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>No course in the cart now</p>
      )}
      <Link href={'/student/shopping_cart'}>
        <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg'>
          Go to Cart
        </button>
      </Link>

      <div className='absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-400'></div>
    </div>
  )
}
