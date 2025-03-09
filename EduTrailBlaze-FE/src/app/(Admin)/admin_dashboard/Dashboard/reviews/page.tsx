'use client'
import api from '@/components/config/axios'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'
import dayjs from 'dayjs'

import DetailPopup from '@/components/global/Popup/PopupDetail'

//sort filter
import ReviewFilter from '@/components/admin/Filter/ReviewSortFilter/ReviewFilter'
import ReviewSort from '@/components/admin/Filter/ReviewSortFilter/ReviewSort'

//icon
import { Filter, ArrowUpDown, Trash2 } from 'lucide-react'
import { TableRow, TableCell } from '@mui/material'

export type Review = {
  id?: number
  courseId?: number
  rating: number
  reviewText: string
  createdAt: string
}

export type ReviewDetail = {
  id: number
  courseId: number
  userId: string
  rating: number
  reviewText: string
  createdAt: string
  updatedAt?: string
  user?: {
    id: string
    userName: string
    email: string
  }
  courseTitle?: string
}

const reviewFields: { label: string; accessor: keyof Review }[] = [
  { label: 'Review ID', accessor: 'id' },
  { label: 'Course ID', accessor: 'courseId' },
  { label: 'Rating', accessor: 'rating' },
  { label: 'Date', accessor: 'createdAt' }
]

export default function ReviewsManagement() {
  const dispatch = useDispatch()

  const { fromDate, toDate, keyword } = useSelector((state: RootState) => state.filter)
  const tableKey = 'reviews'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})

  const [isFilterOpen, setFilterOpen] = useState(false)
  const [isSortOpen, setSortOpen] = useState(false)

  //data
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  //modal
  // const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [selectedReview, setSelectedReview] = useState<ReviewDetail | null>(null)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editReview, setEditReview] = useState<Review | null>(null)

  //  Pagination
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  const fetchReviews = async (page: number) => {
    setLoading(true)
    try {
      const response = await api.get('/Review/get-paging-review', {
        params: { pageIndex: page, pageSize }
      })
      setReviews(response.data.items)
      setAllReviews(response.data.items)
      setTotalPages(response.data.totalPages)
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

  // Gọi API /Review/{review.id}, lấy ra userId => gọi tiếp /User/{userId}
  const handleDetail = async (review: Review) => {
    try {
      // 1) Gọi API lấy chi tiết review
      const reviewResponse = await api.get(`/Review/${review.id}`)
      const reviewData = reviewResponse.data

      // Kiểm tra nếu không có userId
      if (!reviewData.userId) {
        console.error('Review missing userId:', reviewData)
        toast.error('User ID not found for this review!')
        return
      }

      // 2) Gọi API lấy thông tin user
      const userResponse = await api.get(`/User/${reviewData.userId}`)
      const userData = userResponse.data

      // 3) Gọi API lấy thông tin khóa học
      let courseTitle = 'Unknown Course'
      if (reviewData.courseId) {
        const courseResponse = await api.get(`/Course/${reviewData.courseId}`)
        courseTitle = courseResponse.data.title // Lấy title từ API Course
      }

      // 4) Gộp thông tin review, user, course vào một object
      const detail: ReviewDetail = {
        ...reviewData,
        user: userData,
        courseTitle: courseTitle
      }
      setSelectedReview(detail)
    } catch (error: any) {
      console.error('Error fetching review details:', error)

      if (error.response?.status === 404) {
        toast.error(`Review with ID ${review.id} not found!`)
      } else {
        toast.error('Failed to fetch review details!')
      }
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

  const handleApplySort = (newVisibleColumns: Record<keyof Review, boolean>) => {
    dispatch(setSortForTable({ tableKey, visibility: newVisibleColumns }))
    setSortOpen(false)
  }

  const handleFilterApply = () => {
    const from = fromDate ? dayjs(fromDate) : null
    const to = toDate ? dayjs(toDate) : null
    const kw = keyword.toLowerCase()

    const filtered = allReviews.filter((item) => {
      const itemDate = dayjs(item.createdAt)
      if (from && itemDate.isBefore(from, 'day')) return false
      if (to && itemDate.isAfter(to, 'day')) return false

      if (kw) {
        const inText = item.reviewText.toLowerCase().includes(kw)
        const inRating = item.rating.toString().includes(kw)
        if (!inText && !inRating) return false
      }

      return true
    })

    setReviews(filtered)
    setFilterOpen(false)
    console.log('Filtered reviews:', filtered)
  }

  const renderRow = (review: Review) => (
    <TableRow
      key={review.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'
      onClick={() => handleDetail(review)}
    >
      {visibleColumns['id'] && <td className='p-4'>{review.id}</td>}
      {visibleColumns['courseId'] && <td>{review.courseId}</td>}
      {visibleColumns['rating'] && <td>{review.rating}</td>}
      {/* {visibleColumns['reviewText'] && <td>{review.reviewText}</td>} */}
      {visibleColumns['createdAt'] && (
        <TableCell>
          <FormatDateTime date={review.createdAt} />
        </TableCell>
      )}
    </TableRow>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Reviews Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            {/* FILTER */}
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
              </button>
              {isFilterOpen && (
                <ReviewFilter
                  onClose={() => setFilterOpen(false)}
                  onClear={() => {
                    dispatch(clearFilter())
                    setReviews(allReviews)
                  }}
                  onFilterApply={handleFilterApply}
                />
              )}
            </div>

            {/* SORT */}
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setSortOpen(!isSortOpen)}
              >
                <ArrowUpDown size={18} />
              </button>
              {isSortOpen && (
                <ReviewSort
                  columns={reviewFields}
                  visibleColumns={visibleColumns}
                  onApply={handleApplySort}
                  onClose={() => setSortOpen(false)}
                  onClear={() => dispatch(clearSortForTable(tableKey))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='flex justify-center py-6'>
          <Loader className='w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin' />
          <p className='mt-2 text-gray-500 text-sm'>Loading reviews...</p>
        </div>
      ) : (
        <Table
          columns={[...reviewFields.filter((field) => visibleColumns[field.accessor])]}
          renderRow={renderRow}
          data={reviews}
        />
      )}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />
      {selectedReview && (
        <DetailPopup
          isOpen={true}
          onClose={() => setSelectedReview(null)}
          title='Review Detail'
          fields={[
            { label: 'Review ID', value: selectedReview.id, isID: true },
            // { label: 'Course ID', value: selectedReview.courseId },
            { label: 'Course Title', value: selectedReview.courseTitle },
            // { label: 'User ID', value: selectedReview.userId },
            { label: 'Email', value: selectedReview.user?.email || '' },
            { label: 'Rating', value: selectedReview.rating },
            { label: 'Date', value: selectedReview.createdAt, isDate: true }
          ]}
          widgets={[
            {
              label: 'Comment',
              content: selectedReview.reviewText
            }
          ]}
          actions={[
            {
              label: 'Delete',
              icon: <Trash2 style={{ color: '#DC2626' }} />,
              onClick: () => {
                handleDeleteReview(selectedReview.id!)
                setSelectedReview(null)
              }
            }
          ]}
        />
      )}
      {/* {editReview && (
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
      )} */}
    </div>
  )
}
