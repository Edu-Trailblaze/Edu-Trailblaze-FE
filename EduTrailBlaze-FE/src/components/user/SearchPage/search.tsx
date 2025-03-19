'use client'
import React, { useState } from 'react'
import SearchSidebar from './search_sidebar'
import SearchCard from './search_card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const [sortBy, setSortBy] = useState('most_popular')

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
                <Select defaultValue='most_popular' onValueChange={setSortBy}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Most Poplular' />
                  </SelectTrigger>
                  <SelectContent className='bg-white shadow-lg'>
                    <SelectGroup>
                      <SelectItem
                        value='most_popular'
                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:text-white'
                      >
                        Most Poplular
                      </SelectItem>
                      <SelectItem
                        value='highest_rated'
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

            <div>
              <SearchCard searchQuery={searchQuery} sortBy={sortBy} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
