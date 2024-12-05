"use client";
import React from "react";

export default function HomeCourses() {
  return (
    <>
    {/** Premium courses layout */}
    <div className="bg-[#F4F4F4] px-[150px]">
      <div>
        <div className="mb-[30px]">
          <p className="mb-[10px] font-bold">Invest in Yourself</p>
          <h1 className="text-4xl font-bold">
            Unlock Learning with Premium Courses
          </h1>
          <p>
            Explore top-tier online courses from the world's leading
            universities and companies.
          </p>
        </div>

        <div className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-[20rem] w-[16rem] hover:shadow-xl bg-white border border-black">
          <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg"></div>

          <div className="px-5 pt-2 flex flex-col">
            <h2 className="font-semibold">C# Advanced Course</h2>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Author, teacher
            </p>
            {/* <!-- Rating Section --> */}
            <div className="flex space-x-1 text-yellow-400">
              {/* <!-- Rating text --> */}
              <span className="text-gray-600 text-sm font-medium">4.6</span>
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

            <p className="mt-5">50$</p>
          </div>
        </div>
        <div className="mt-[20px]">
          <button
            className="w-[160px] bg-blue-500 cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-700 mr-[10px]"
            type="button"
          >
            Show 8 others
          </button>
          <button
            className="w-[100px] bg-white text-blue-500 border-2 border-blue-500 cursor-pointer px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-500 hover:text-white"
            type="button"
          >
            View all
          </button>
        </div>
      </div>

      {/** Free courses layout */}
      <div className="mt-[80px]">
        <div className="mb-[30px]">
          <p className="mb-[10px] font-bold">100% free</p>
          <h1 className="text-4xl font-bold">
          Start learning with free courses
          </h1>
          <p>
          Discover free online courses from the world's best universities and companies.
          </p>
        </div>

        <div className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-[20rem] w-[16rem] hover:shadow-xl bg-white border border-black">
          <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg"></div>

          <div className="px-5 pt-2 flex flex-col">
            <h2 className="font-semibold">C# Advanced Course</h2>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Author, teacher
            </p>
            {/* <!-- Rating Section --> */}
            <div className="flex space-x-1 text-yellow-400">
              {/* <!-- Rating text --> */}
              <span className="text-gray-600 text-sm font-medium">4.6</span>
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

            <p className="mt-5">Free</p>
          </div>
        </div>
        <div className="mt-[20px]">
          <button
            className="w-[160px] bg-blue-500 cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-700 mr-[10px]"
            type="button"
          >
            Show 8 others
          </button>
          <button
            className="w-[100px] bg-white text-blue-500 border-2 border-blue-500 cursor-pointer px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-500 hover:text-white"
            type="button"
          >
            View all
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
