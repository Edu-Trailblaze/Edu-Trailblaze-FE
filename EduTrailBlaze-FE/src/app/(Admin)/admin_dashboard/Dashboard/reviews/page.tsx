'use client'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'

import { Filter, ArrowUpDown, Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import api from '@/components/config/axios'
import ReviewFormModalEdit from '../../../../../components/admin/modal/ReviewFormModal/ReviewFormModalEdit'

type Review = {
  id?: number
  courseId?: number
  rating: number
  reviewText: string
}

const reviewFields: { label: string; accessor: keyof Review }[] = [
  { label: 'Review ID', accessor: 'id' },
  { label: 'Course ID', accessor: 'courseId' },
  { label: 'Rating', accessor: 'rating' },
  { label: 'Review Text', accessor: 'reviewText' }
]

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editReview, setEditReview] = useState<Review | null>(null)
  const [newReview, setNewReview] = useState<Review>({
    rating: 0,
    reviewText: ''
  })

  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const pageSize = 5

  const fetchReviews = async (page: number) => {
    setLoading(true)

    try {
      const response = await api.get('/Review/get-paging-review', {
        params: { pageIndex: page, pageSize }
      })
      setReviews(response.data.items)
      setTotalPages(response.data.totalPages)
      setHasPreviousPage(response.data.hasPreviousPage)
      setHasNextPage(response.data.hasNextPage)
      console.log('get data', response.data.items)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error('Failed to fetch reviews!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews(pageIndex)
  }, [pageIndex])

  const resetNewReview = () => {
    setNewReview({
      rating: 0,
      reviewText: ''
    })
  }

  const openEditModal = (review: Review) => {
    setEditReview(review)
    setEditModalOpen(true)
  }

  const handleEditReview = async (updatedReview: Review) => {
    try {
      await api.put(`/Review/${updatedReview.id}`, {
        rating: updatedReview.rating,
        reviewText: updatedReview.reviewText
      })
      toast.success('Review updated successfully!')
      setEditModalOpen(false)
      fetchReviews(pageIndex)
    } catch (error) {
      console.error('Error updating review:', error)
      toast.error('Failed to update review!')
    }
  }

  const handleDeleteReview = async (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa review này không?')
    if (!isConfirmed) return

    try {
      await api.delete(`/Review/${id}`)
      toast.success('Xóa review thành công!')
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id))
    } catch (error) {
      console.error('Lỗi khi xóa review:', error)
      toast.error('Xóa review thất bại. Vui lòng thử lại sau!')
    }
  }

  const renderRow = (review: Review) => (
    <tr key={review.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'>
      <td className='p-4'>{review.id}</td>
      <td>{review.courseId}</td>
      <td>{review.rating}</td>
      <td>{review.reviewText}</td>
      <td className='flex mt-4 space-x-2'>
        <button onClick={() => setSelectedReview(review)} className='text-blue-600 cursor-pointer'>
          <Eye size={18} />
        </button>
        <button onClick={() => openEditModal(review)} className='text-yellow-600 cursor-pointer'>
          <Pencil size={18} />
        </button>
        <button onClick={() => handleDeleteReview(review.id!)} className='text-red-600 cursor-pointer'>
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />

      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Reviews Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <Filter size={18} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <ArrowUpDown size={18} />
            </button>
            <button
              className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='flex justify-center py-6'>
          <Loader className='w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin' />
          <p className='mt-2 text-gray-500 text-sm'>Loading reviews...</p>
        </div>
      ) : (
        <Table columns={reviewFields} renderRow={renderRow} data={reviews} />
      )}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />

      {editReview && (
        <ReviewFormModalEdit
          initialValues={editReview}
          setEditReview={setEditReview}
          onSubmit={handleEditReview}
          onCancel={() => {
            setEditModalOpen(false)
            setEditReview(null)
          }}
          isOpen={isEditModalOpen}
        />
      )}
    </div>
  )
}
