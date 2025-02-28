import React from 'react';
import { XCircle, ArrowLeft, RefreshCcw } from 'lucide-react';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Card */}
      <div className="w-full max-w-[280px] sm:max-w-md md:max-w-lg bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-2 sm:p-3 md:p-4">
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-600" />
          </div>
        </div>
        
        {/* Error Message */}
        <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
          Payment Failed
        </h1>
        <p className="mt-2 text-sm sm:text-base text-center text-gray-600">
          We couldn't process your payment. Please check your payment details and try again.
        </p>
        
        {/* Error Details */}
        <div className="mt-4 sm:mt-6 bg-red-50 border border-red-100 rounded-md p-3 sm:p-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm sm:text-base font-medium text-red-800">
              Error Details:
            </span>
            <span className="text-sm text-red-600">
              Insufficient funds in the account
            </span>
            <span className="text-xs text-gray-500">
              Error Code: ERR_PAYMENT_001
            </span>
          </div>
        </div>
        
        {/* Common Issues */}
        <div className="mt-4 sm:mt-6">
          <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Common Reasons for Failure:
          </h2>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Insufficient funds in the account</li>
            <li>Incorrect card information</li>
            <li>Card expired or invalid</li>
            <li>Transaction blocked by bank</li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
            <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Try Again
          </button>
          
          <button className="w-full bg-white text-gray-600 py-2 sm:py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Return to Checkout
          </button>
        </div>
      </div>
      
      {/* Support Section */}
      <div className="mt-6 sm:mt-8 text-center text-gray-600">
        <p className="text-sm sm:text-base">
          Need help? {' '}
          <a href="#" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;