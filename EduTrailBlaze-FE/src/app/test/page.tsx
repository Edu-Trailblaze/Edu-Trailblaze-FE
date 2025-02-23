'use client'
import React, { useState } from 'react'
import Pagination from '../../components/global/Pagination/Pagination'

export default function test() {
  const [pageIndex, setPageIndex] = useState(1)

  return (
    <Pagination
      pageIndex={pageIndex}
      totalPages={5}
      hasPreviousPage={pageIndex > 1}
      hasNextPage={pageIndex < 5}
      onPageChange={(page: number) => console.log(page)} // 🟢 Điều khiển state pageIndex
    />
  )
}
