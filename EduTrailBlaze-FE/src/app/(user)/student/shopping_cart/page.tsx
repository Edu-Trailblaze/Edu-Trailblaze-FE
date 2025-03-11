'use client'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import Cart from '@/components/user/cart/Cart'
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useGetNumberOfCartItemsQuery,
  useDeleteAllCartItemsMutation
} from '@/redux/services/cart.service'
import { usePostPaymentMutation } from '@/redux/services/payment.service'
import { formatCurrency } from '@/helper/format'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTags } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'

export default function ShoppingCart() {
  return (
    <>
      <Cart />
    </>
  )
}
