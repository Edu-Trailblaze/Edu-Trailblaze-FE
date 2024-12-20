"use client";

import React from "react";
import { FaTags } from "react-icons/fa6";

export default function ShoppingCart() {
  return (
    <>
      <div className="px-[100px] py-[70px]">
        <h1 className="font-bold text-4xl mb-5">Shopping Cart</h1>
        <div className="flex justify-around">
          <div>
            <p className="font-semibold">1 course(s) in the Cart</p>
            <div className="flex">
              <div className="flex border-t-2 py-3 w-fit">
                <img
                  src="assets/Side_Image/course_image.png"
                  alt=""
                  className="w-[155px] h-[100px] mr-5"
                />

                <div className="flex justify-between w-[900px]">
                  <div className="w-[350px]">
                    <p className="font-semibold text-xl pb-2">
                      The Complete Prompt Engineering for AI Bootcamp (2024)
                    </p>
                    <p className="font-light pb-2 text-sm">By Author</p>
                    <div className="flex space-x-1 text-yellow-400 pb-2">
                      {/* <!-- Rating text --> */}
                      <span className="text-gray-600 text-sm font-medium">
                        4.6
                      </span>
                      {/* <!-- Star icons --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {/* <!-- Review count --> */}
                      <span className="text-gray-400 text-sm">(40,856)</span>
                    </div>
                    <p className="font-thin text-sm">
                      50 total hours • 200 lectures • Diploma
                    </p>
                  </div>

                  <div>
                    <button
                      className="w-[100px] bg-red-600 text-white border-2 border-red-600 cursor-pointer px-2 py-1 rounded-md transition duration-150 hover:bg-red-700 hover:border-red-700"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <p className="flex font-semibold">
                      1,500,000 vnd <FaTags className="ml-2 mt-1" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-500 mb-3">Total:</p>
            <p className="font-bold text-4xl mb-2 text-center">1,500,000 vnd</p>
            <div>
              <button
                className="w-[250px] bg-blue-500 text-white cursor-pointer px-2 py-2 mt-2 rounded-md transition duration-150 hover:bg-blue-600"
                type="button"
              >
                Checkout
              </button>
            </div>
            <div className="mt-5 border-t-gray-300 border-t-2">
              <p className="font-semibold pt-3 pb-1">Discount</p>
              <div className="flex items-center justify-center">
                <div>
                  <div className="flex">
                    <div>
                    <input
                      type="text"
                      className="w-full max-w-[190px] h-[40px] bg-white pl-2 text-base font-semibold outline-0 items-center border-gray-300 border-2 rounded-l-lg"
                      placeholder=""
                      id=""
                    /></div>
                    <input
                      type="button"
                      value="Apply"
                      className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
