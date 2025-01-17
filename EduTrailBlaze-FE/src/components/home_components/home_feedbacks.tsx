"use client";

import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";

export default function HomeFeedbacks() {
  return (
    <div className=" flex w-[1200px] bg-[#F4F4F4] px-[70px] py-[70px] rounded-lg">
      <div className="w-[220px]">
        <h1 className="font-semibold text-4xl mb-5">What we receive from students</h1>
        <p className="pt-5">
          These are reviews from students throughout the process of
          participating in courses at WebsiteName
        </p>
        <button
          className="w-[130px] bg-blue-500 cursor-pointer text-white px-2 py-1 mt-14 rounded-md transition duration-150 hover:bg-blue-700 mr-[10px]"
          type="button"
        >
          View All
        </button>
      </div>
      <div className="pt-[80px]">
        <div className="max-w-72 mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-[#80808069]">
          <div className="text-gray-900 font-medium mb-4">
            <RiDoubleQuotesL className="text-3xl mb-3"/>
            <p className="text-black font-semibold">
              "This C# course is really good and completed. It help me to solve
              many problem that I am facing now in coding C#."
            </p>
          </div>
          <div className="flex items-center mt-4">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="assets/Side_Image/user_avatar.jpg"
              alt="User avatar"
            />
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-800">Le Thanh Nhan</p>
              <p className="text-sm text-gray-500">Student of FPT University</p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-end text-blue-500 font-semibold text-sm hover:underline"
            >
              View the C# Course
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
