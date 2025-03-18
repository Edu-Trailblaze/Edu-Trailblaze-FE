'use client'
import React from 'react'
import { CheckCircle, ArrowLeft, Download } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useGetPaymentQuery } from '@/redux/services/payment.service'
import { formatDate } from '@/helper/Util'
import { formatCurrency } from '@/helper/format'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import Link from 'next/link'

const PaymentSuccess = () => {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('paymentId')
  const { data, isFetching, isLoading } = useGetPaymentQuery(Number(paymentId))

  if (isLoading || isFetching) return <LoadingPage />

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
        {/* Success Icon */}
        <div className='flex justify-center'>
          <div className='rounded-full bg-green-100 p-3'>
            <CheckCircle className='w-8 h-8 text-green-600' />
          </div>
        </div>

        {/* Success Message */}
        <h1 className='mt-4 text-2xl font-bold text-center text-gray-800'>Payment Successful!</h1>
        <p className='mt-2 text-center text-gray-600'>
          Thank you for your payment. We've sent a confirmation email with your receipt.
        </p>

        {/* Payment Details */}
        <div className='mt-6 bg-gray-50 rounded-md p-4'>
          <div className='flex justify-between mb-2'>
            <span className='text-gray-600'>Amount Paid</span>
            <span className='font-semibold'>{formatCurrency(data?.amount)}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span className='text-gray-600'>Transaction ID</span>
            <span className='font-mono text-sm'>{data?.id}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Date</span>
            <span>{data ? formatDate(data.paymentDate) : 'N/A'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className='mt-8 space-y-3'>
          <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'>
            <Download className='w-4 h-4' />
            Download Receipt
          </button>

          <Link href={'/'}>
            <button className='w-full bg-white text-gray-600 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'>
              <ArrowLeft className='w-4 h-4' />
              Return to Home
            </button>
          </Link>
        </div>
      </div>

      {/* Support Section */}
      <div className='mt-8 text-center text-gray-600'>
        <p>
          Having trouble?{' '}
          <a href='#' className='text-blue-600 hover:underline'>
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}

export default PaymentSuccess
