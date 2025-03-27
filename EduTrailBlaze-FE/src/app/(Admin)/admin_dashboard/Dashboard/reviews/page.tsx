'use client'
import api from '@/components/config/axios'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useMemo } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

import DetailPopup from '@/components/global/Popup/PopupDetail'

//sort filter
import DateFilter from '@/components/admin/Filter/DateFilter'
import ReviewSort from '@/components/admin/Filter/ReviewSortFilter/ReviewSort'

//icon
import { Filter, ArrowUpDown, Trash2, Star  } from 'lucide-react'
import { TableRow, TableCell } from '@mui/material'

export type Review = {
  id?: number
  courseId?: number
  courseTitle?: string
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
  { label: 'ID', accessor: 'id' },
  { label: 'Course', accessor: 'courseId' },
  { label: 'Rating', accessor: 'rating' },
  { label: 'Date', accessor: 'createdAt' }
]

export default function ReviewsManagement() {
  const dispatch = useDispatch()

  const [localFromDate, setLocalFromDate] = useState('');
  const [localToDate, setLocalToDate] = useState('');
  const [searchResult, setSearchResult] = useState<Review[]>([]);
  const [dateResult, setDateResult] = useState<Review[]>([]);
  const display = useMemo(() => {
    return searchResult.filter(review => dateResult.includes(review));
  }, [searchResult, dateResult]);

  const tableKey = 'reviews'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})

  const [isFilterOpen, setFilterOpen] = useState(false)
  const [isSortOpen, setSortOpen] = useState(false)

  //data
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<ReviewDetail | null>(null)

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
      const reviewsData: Review[] = response.data.items
  
      const reviewFinalData = await Promise.all(
        reviewsData.map(async (review) => {
          if (review.courseId) {
            try {
              const courseResponse = await api.get(`/Course/${review.courseId}`)
              return { ...review, courseTitle: courseResponse.data.title }
            } catch (error) {
              console.error('Error fetching course title for review', review.id, error)
              return review
            }
          }
          return review
        })
      )
  
      setReviews(reviewFinalData)
      setAllReviews(reviewFinalData)
      setSearchResult(reviewFinalData)
      setDateResult(reviewFinalData)
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

  // Gọi API /Review/{review.id}, lấy ra userId => gọi tiếp /User/{userId}
  const handleDetail = async (review: Review) => {
    try {
      // 1) Gọi API lấy chi tiết review
      const reviewResponse = await api.get(`/Review/${review.id}`)
      const reviewData = reviewResponse.data

      // check userId
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



  const renderRow = (review: Review) => (
    <TableRow
      key={review.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'
      onClick={() => handleDetail(review)}
    >
      {visibleColumns['id'] && <td className='p-4'>{review.id}</td>}
      {visibleColumns['courseId'] && <td>{review.courseTitle || review.courseId}</td>}
      {visibleColumns['rating'] && (
        <TableCell align="left" style={{ verticalAlign: 'middle' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            {review.rating}
            <Star
              size={16}
              style={{
                marginLeft: '4px',
                color: 'gold',
                fill: 'gold'
              }}
              strokeWidth={0}
            />
          </div>
        </TableCell>
      )}
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
        <TableSearch
            data={allReviews}
            filterKeys={['reviewText', 'rating']}
            onFilteredData={(filteredData) => {
              setSearchResult(filteredData);
            }}
          />          
          <div className='flex items-center gap-4 self-end'>
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
              </button>
              {isFilterOpen && (
                <DateFilter
                fromDate={localFromDate}
                toDate={localToDate}
                onChange={(newValues) => {                
                  if (newValues.fromDate !== undefined) {
                    setLocalFromDate(newValues.fromDate);
                  }
                  if (newValues.toDate !== undefined) {
                    setLocalToDate(newValues.toDate);
                  }
                }}
                onReset={() => {                        
                  setLocalFromDate('');
                  setLocalToDate('');
                }}
                onApply={() => {                        
                  const from = localFromDate ? new Date(localFromDate) : null;
                  const to = localToDate ? new Date(localToDate) : null;
                  const filtered = allReviews.filter((item) => {
                    if (!item.createdAt) return false;
                    const itemDate = new Date(item.createdAt);
                    if (from && itemDate < from) return false;
                    if (to && itemDate > to) return false;
                    return true;
                  });
                  setDateResult(filtered);
                  setFilterOpen(false);
                }}
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
          data={display}
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
            { label: 'Course Title', value: selectedReview.courseTitle },
            { label: 'Email', value: selectedReview.user?.email || '' },
            {
              label: 'Rating',
              value: (
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {selectedReview.rating}
                  <Star
                    size={16}
                    style={{
                      marginLeft: '4px',
                      color: 'gold',
                      fill: 'gold'
                    }}
                    strokeWidth={0}
                  />
                </div>
              )
            },          
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
    </div>
  )
}
