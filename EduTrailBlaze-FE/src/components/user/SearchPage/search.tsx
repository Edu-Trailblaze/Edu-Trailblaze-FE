'use client'
import React from 'react'
import { Search, Star, ChevronDown } from 'lucide-react'
import SearchSidebar from './search_sidebar'
import SearchCard from './search_card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'
import { useGetCoursePagingQuery } from '../../../redux/services/courseDetail.service'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const { data: courses, isLoading } = useGetCoursePagingQuery(
    { Title: searchQuery, PageIndex: 1, PageSize: 10 },
    { skip: !searchQuery }
  )

  if (!courses?.items?.length) return <h1>No course</h1>

  const sampleCourses = [
    {
      title: 'React - The Complete Guide 2024',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.8,
      reviews: 180345,
      description: 'Master React 18, Redux, Hooks, Router & More. Build powerful React applications.',
      price: 89.99,
      image: '/api/placeholder/400/320',
      bestseller: true,
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      title: 'Ultimate React Course 2024',
      instructor: 'Jonas Schmedtmann',
      rating: 4.7,
      reviews: 52891,
      description: 'Learn modern React from beginner to advanced.',
      price: 94.99,
      image: '/api/placeholder/400/320',
      bestseller: false,
      tags: ['React', 'Frontend', 'JavaScript']
    }
  ]

  return (
    <div className='min-h-screen bg-white'>
      <main className='max-w-7xl mx-auto px-6 py-8'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold mb-2'>{searchQuery && `Results for "${searchQuery}"`}</h2>
        </div>

        <div className='flex'>
          <SearchSidebar />

          <div className='flex-1'>
            <div className='mb-4 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <span>Sort by:</span>
                <Select defaultValue='mostRelevant'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Most Relevant' />
                  </SelectTrigger>
                  <SelectContent className='bg-white shadow-lg'>
                    <SelectGroup>
                      <SelectItem
                        value='mostRelevant'
                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:text-white'
                      >
                        Most Relevant
                      </SelectItem>
                      <SelectItem
                        value='mostReviewed'
                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:text-white'
                      >
                        Most Reviewed
                      </SelectItem>
                      <SelectItem
                        value='highestRated'
                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:text-white'
                      >
                        Highest Rated
                      </SelectItem>
                      <SelectItem
                        value='newest'
                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:text-white'
                      >
                        Newest
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='border rounded z-0'>
              <SearchCard courses={courses?.items || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
