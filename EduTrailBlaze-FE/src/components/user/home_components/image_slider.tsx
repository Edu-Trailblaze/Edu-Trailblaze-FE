'use client'

import React, { useState } from 'react'
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

export default function ImageSlider() {
  const slides = [
    { url: 'https://res.cloudinary.com/dtjgueyp2/image/upload/v1742871948/pic4_x7vp9z.jpg' },
    { url: 'https://res.cloudinary.com/dtjgueyp2/image/upload/v1742871947/pic2_cr8s7t.jpg' },
    { url: 'https://res.cloudinary.com/dtjgueyp2/image/upload/v1742871948/pic5_ttmpzn.jpg' },
    { url: 'https://res.cloudinary.com/dtjgueyp2/image/upload/v1742871947/pic3_l9y6j6.jpg' },
    { url: 'https://res.cloudinary.com/dtjgueyp2/image/upload/v1742871947/pic1_chwtte.jpg' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const preSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className='h-[600px] container py-16 relative group'>
      <div
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>
      {/** Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={preSlide} size={30} />
      </div>
      {/** Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
            <RxDotFilled></RxDotFilled>
          </div>
        ))}
      </div>
    </div>
  )
}
