'use client'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

// React, libs
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { TableRow, TableCell } from '@mui/material'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

//components
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'
import Pagination from '@/components/admin/Pagination/Pagination'
import CourseFilter from '@/components/admin/Filter/CourseSortFilter/CourseFilter'
import CourseSort from '@/components/admin/Filter/CourseSortFilter/CourseSort'
import CourseFormModalCreate from '../../../../../components/admin/modal/CourseFormModal/CourseFormModalCreate'
import CourseFormModalEdit from '../../../../../components/admin/modal/CourseFormModal/CourseFormModalEdit'
import DetailPopup from '@/components/global/Popup/PopupDetail'
import StatusModal from '@/components/admin/modal/CourseFormModal/CourseStatusModal'
//icon
import { Filter, ArrowUpDown, Plus, Trash2, Pencil, RefreshCw, Bot } from 'lucide-react'

//type
// import { Course, CourseCreate, ICourseDetails} from '../../../../../types/course.type'

export interface Course {
  id: number
  title: string
  introURL?: string
  imageURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: string
  learningOutcomes: string[]
  prerequisites: string
  createdBy?: string
  createdAt?: string
  updatedAt?: string
  updatedBy?: string
  approvalStatus?: string
}

export interface CourseCreate {
  id: number
  title: string
  introURL?: string
  imageURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: string
  learningOutcomes: string[]
  prerequisites: string
  createdBy?: string
  createdAt?: string
  updatedAt?: string
  updatedBy?: string
  approvalStatus?: string
}

interface ApproveCourseRequest {
  courseId: number
  status: CourseApprovalStatus
}

//redux
import { useAddCourseTagMutation } from '@/redux/services/courseTag.service'
import { useLazyGetReviewInfoQuery } from '@/redux/services/review.service'
import {
  useGetCoursePagingQuery,
  useGetCourseQuery,
  useGetCourseDetailsQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useApproveCourseMutation,
  useApproveCourseByAIMutation
} from '@/redux/services/courseDetail.service'

type CourseKey = Extract<keyof Course, string>

// const courseFields: { label: string; accessor: keyof Course }[] = [
const courseFields: { label: string; accessor: CourseKey }[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Title', accessor: 'title' },
  { label: 'Price', accessor: 'price' },
  { label: 'Duration', accessor: 'duration' },
  { label: 'Difficulty', accessor: 'difficultyLevel' },
  { label: 'Status', accessor: 'approvalStatus' },
  { label: 'Created at', accessor: 'createdAt' }
]

export default function CoursesManagement() {
  const dispatch = useDispatch()

  //state
  const [userId, setUserId] = useState('')
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  // const [selectedCourse, setSelectedCourse] = useState<CourseDetails | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [statusCourseId, setStatusCourseId] = useState<number | null>(null)
  const [statusCurrent, setStatusCurrent] = useState<CourseApprovalStatus>('Pending')

  //filter&sort
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [isSortOpen, setSortOpen] = useState(false)

  //redux filter
  const { fromDate, toDate, keyword } = useSelector((state: RootState) => state.filter)

  //redux sort
  const tableKey = 'courses'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})
  const handleApplySort = (newVisibleColumns: Record<keyof Course, boolean>) => {
    dispatch(setSortForTable({ tableKey, visibility: newVisibleColumns }))
    setSortOpen(false)
  }

  //modal
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editCourse, setEditCourse] = useState<Course | null>(null)
  const [newCourse, setNewCourse] = useState<CourseCreate>({
    title: '',
    imageURL: '',
    introURL: '',
    description: '',
    duration: 0,
    price: 0,
    difficultyLevel: '',
    createdBy: '',
    prerequisites: '',
    learningOutcomes: [],
    id: Date.now()
  })

  //pagination
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  //RTK
  const {
    data: pagingData,
    isLoading,
    isError
  } = useGetCoursePagingQuery({
    PageIndex: pageIndex,
    PageSize: pageSize
  })
  const {
    data: detailData,
    isLoading: detailLoading,
    isError: detailError
  } = useGetCourseDetailsQuery(selectedCourseId ?? 0, {
    skip: selectedCourseId === null
  })
  const [addCourseMutation] = useAddCourseMutation()
  const [updateCourseMutation] = useUpdateCourseMutation()
  const [deleteCourseMutation] = useDeleteCourseMutation()
  const [addCourseTag] = useAddCourseTagMutation()
  const [approveCourse] = useApproveCourseMutation()
  const [approveCourseByAI] = useApproveCourseByAIMutation()

  const [triggerGetReviewInfo, { data: reviewData, isFetching: isReviewFetching }] = useLazyGetReviewInfoQuery()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const decoded: any = jwtDecode(token)
        setUserId(decoded?.sub ?? '')
      } catch (error) {
        console.error('Error decoding token:', error)
        setUserId('')
      }
    }
  }, [])

  useEffect(() => {
    if (pagingData?.items) {
      setAllCourses(pagingData.items.map((item) => item.course))
      setCourses(pagingData.items.map((item) => item.course))
    }
    if (pagingData?.totalPages) {
      setTotalPages(pagingData.totalPages)
    }
  }, [pagingData])

  const handleDetail = async (course: Course) => {
    try {
      setSelectedCourseId(course.id)
      await triggerGetReviewInfo(course.id!).unwrap()
    } catch (error) {
      console.error('Error fetching course review info:', error)
      toast.error('Failed to fetch course review info!')
    }
  }
  // const handleAddCourse = async (newCourse: CourseCreate) => {
  //   if (!userId) {
  //     toast.error('User ID is not available!')
  //     return
  //   }
  //   try {
  //     const formData = new FormData()
  //     formData.append('Title', newCourse.title)
  //     formData.append('Description', newCourse.description)
  //     formData.append('Price', newCourse.price.toString())
  //     formData.append('DifficultyLevel', newCourse.difficultyLevel)
  //     formData.append('CreatedBy', userId)
  //     formData.append('Prerequisites', newCourse.prerequisites)
  //     newCourse.learningOutcomes.forEach((outcome) => {
  //       formData.append('LearningOutcomes', outcome)
  //     })
  //     if (newCourse.imageURL) {
  //       formData.append('ImageURL', newCourse.imageURL)
  //     }
  //     if (newCourse.introURL) {
  //       formData.append('IntroURL', newCourse.introURL)
  //     }
  //     const response = await axios.post(API_URL, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //     toast.success('Course created successfully!')
  //     setCourses([...courses, { ...response.data, createdAt: new Date().toISOString() }])
  //     fetchCourses()
  //     setAddModalOpen(false)
  //   } catch (error: any) {
  //     console.error('Error adding course:', error)
  //     if (error.response) {
  //       console.log('Server error response:', error.response.data)
  //     }
  //     toast.error('Failed to create course!')
  //   }
  // }

  const handleAddCourse = async (newCourse: CourseCreate, selectedTagIds: number[]) => {
    if (!userId) {
      toast.error('User ID is not available!')
      return
    }

    try {
      const formData = new FormData()
      formData.append('Title', newCourse.title)
      formData.append('Description', newCourse.description)
      formData.append('Price', newCourse.price.toString())
      formData.append('DifficultyLevel', newCourse.difficultyLevel)
      formData.append('CreatedBy', userId)
      formData.append('Prerequisites', newCourse.prerequisites)
      newCourse.learningOutcomes.forEach((outcome: string) => {
        formData.append('LearningOutcomes', outcome)
      })

      if (newCourse.imageURL) {
        formData.append('ImageURL', newCourse.imageURL)
      }
      if (newCourse.introURL) {
        formData.append('IntroURL', newCourse.introURL)
      }

      const createdCourse = await addCourseMutation(formData).unwrap()
      // const courseId = createdCourse.id // ID của course vừa tạo
      const courseId = createdCourse.data.courseId // ID của course vừa tạo

      await Promise.all(selectedTagIds.map((tagId) => addCourseTag({ courseId, tagId }).unwrap()))

      toast.success('Course created successfully!')
      // setCourses([...courses, { ...createdCourse, createdAt: new Date().toISOString() }])
      // fetchCourses()
      setAddModalOpen(false)
    } catch (error: any) {
      console.error('Error adding course:', error)
      if (error.response) {
        console.log('Server error response:', error.response.data)
      }
      toast.error('Failed to create course!')
    }
  }

  const handleEditCourse = (course: Course) => {
    console.log('course trước khi edit:', course)

    setEditCourse(course)
    setEditModalOpen(true)
  }

  const handleUpdateCourse = async (updatedCourse: Course) => {
    console.log('updatedCourse khi update:', updatedCourse)

    if (
      !updatedCourse.title ||
      !updatedCourse.description ||
      !updatedCourse.difficultyLevel ||
      updatedCourse.price <= 0
    ) {
      toast.error('Please fill all required fields and ensure price is greater than 0!')
      return
    }

    if (!userId) {
      toast.error('User ID is not available!')
      return
    }

    try {
      const formData = new FormData()
      formData.append('CourseId', updatedCourse.id!.toString())
      formData.append('Title', updatedCourse.title)
      formData.append('Description', updatedCourse.description)
      formData.append('Price', updatedCourse.price.toString())
      formData.append('DifficultyLevel', updatedCourse.difficultyLevel)
      formData.append('Prerequisites', updatedCourse.prerequisites)

      updatedCourse.learningOutcomes.forEach((outcome: string) => {
        formData.append('LearningOutcomes', outcome)
      })

      if (updatedCourse.imageURL) {
        formData.append('ImageURL', updatedCourse.imageURL)
      }
      if (updatedCourse.introURL) {
        formData.append('IntroURL', updatedCourse.introURL)
      }
      formData.append('UpdatedBy', userId)

      await updateCourseMutation(formData).unwrap()

      toast.success('Course updated successfully!')
      // setCourses(courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)))
      setEditModalOpen(false)
      setEditCourse(null)
    } catch (error) {
      console.error('Error updating course:', error)
      toast.error('Failed to update course!')
    }
  }

  const handleDeleteCourse = async (courseId: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return
    try {
      console.log('Deleting course ID:', courseId)
      await deleteCourseMutation(courseId).unwrap()
      toast.success('Course deleted successfully!')
    } catch (error: any) {
      console.error('Error deleting course:', error)
      if (error.data) {
        console.error('Server error response:', error.data)
      }
      toast.error('Failed to delete course!')
    }
  }

  const handleApproveOrReject = async (courseId: number, newStatus: CourseApprovalStatus) => {
    try {
      await approveCourse({ courseId, status: newStatus }).unwrap()
      toast.success('Course status updated successfully!')
    } catch (error) {
      console.error('Error updating course status:', error)
      toast.error('Failed to update course status!')
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'Pending':
        return { color: 'goldenrod' }
      case 'Rejected':
        return { color: 'red' }
      case 'Approved':
        return { color: 'green' }
      default:
        return {}
    }
  }

  function transformStatus(rawStatus: string | undefined): string {
    if (!rawStatus) return ''
    if (rawStatus === 'Reject') return 'Rejected'
    if (rawStatus === 'Approve') return 'Approved'
    return rawStatus
  }

  const renderRow = (course: Course) => {
    const transformed = transformStatus(course.approvalStatus)

    return (
      <TableRow
        key={course.id}
        className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'
        hover
        onClick={() => handleDetail(course)}
      >
        {visibleColumns['id'] && <TableCell className='p-4'>{course.id}</TableCell>}
        {visibleColumns['title'] && <TableCell>{course.title}</TableCell>}
        {visibleColumns['price'] && <TableCell>{course.price}</TableCell>}
        {visibleColumns['duration'] && <TableCell>{course.duration}</TableCell>}
        {visibleColumns['difficultyLevel'] && <TableCell>{course.difficultyLevel}</TableCell>}

        {/* Status */}
        {visibleColumns['approvalStatus'] && (
          <TableCell sx={getStatusColor(transformed)}>{transformed || 'N/A'}</TableCell>
        )}

        {visibleColumns['createdAt'] && (
          <TableCell>
            <FormatDateTime date={course.createdAt || ''} />
          </TableCell>
        )}
      </TableRow>
    )
  }

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Courses Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
              </button>
              {isFilterOpen && (
                <CourseFilter
                  onClose={() => setFilterOpen(false)}
                  onClear={() => {
                    dispatch(clearFilter())
                    setAllCourses(allCourses)
                  }}
                  onFilterApply={() => {
                    const from = fromDate ? new Date(fromDate) : null
                    const to = toDate ? new Date(toDate) : null
                    const kw = keyword.toLowerCase()

                    const filtered = allCourses.filter((item) => {
                      const itemDate = new Date(item.createdAt || '')
                      if (from && itemDate < from) return false
                      if (to && itemDate > to) return false

                      if (kw) {
                        const inTitle = item.title.toLowerCase().includes(kw)
                        const inDescription = item.description.toLowerCase().includes(kw)
                        if (!inTitle && !inDescription) return false
                      }
                      return true
                    })

                    setCourses(filtered)
                    console.log('Filtered courses:', filtered)
                  }}
                />
              )}
            </div>

            {/* Sort */}
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setSortOpen(!isSortOpen)}
              >
                <ArrowUpDown size={18} />
              </button>
              {isSortOpen && (
                <CourseSort
                  columns={courseFields}
                  visibleColumns={visibleColumns}
                  onApply={handleApplySort}
                  onClose={() => setSortOpen(false)}
                  onClear={() => dispatch(clearSortForTable(tableKey))}
                />
              )}
            </div>

            {/* ADD */}
            {/* <button
              className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} />
            </button> */}
          </div>
        </div>
      </div>

      {/* {loading ? ( */}
      {isLoading ? (
        <div className='flex justify-center py-6'>
          <Loader className='w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin' />
          <p className='mt-2 text-gray-500 text-sm'>Loading courses...</p>
        </div>
      ) : isError ? (
        <p className='text-red-500 text-sm'>Failed to load courses!</p>
      ) : (
        <Table
          columns={[...courseFields.filter((field) => visibleColumns[field.accessor])]}
          renderRow={renderRow}
          data={courses}
        />
      )}

      {/* <Pagination /> */}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />

      {detailData && selectedCourseId !== null && (
        <DetailPopup
          isOpen={true}
          onClose={() => setSelectedCourseId(null)}
          title='Course Detail'
          fields={[
            { label: 'ID', value: selectedCourseId, isID: true },
            {
              label: 'Instructor',
              value: detailData.courseDetails?.instructors?.map((inst) => inst.fullname).join(', ') || 'No instructors',
              isName: true
            },
            { label: 'Title', value: detailData.courseDetails?.title },
            {
              label: 'Duration',
              value: detailData.courseDetails?.duration ? detailData.courseDetails?.duration + ' hours' : 'N/A'
            },
            {
              label: 'Price',
              value: detailData.courseDetails?.price ? detailData.courseDetails?.price + ' $' : 'N/A'
            },
            { label: 'Enrollements', value: detailData.courseDetails?.enrollment?.totalEnrollments },
            { label: 'imageURL', value: detailData.courseDetails?.imageURL, isImage: true },
            { label: 'introURL', value: detailData.courseDetails?.introURL, isVideo: true },
            {
              label: 'Difficulty',
              value: [
                {
                  label: detailData.courseDetails?.difficultyLevel ?? 'N/A',
                  color:
                    detailData.courseDetails?.difficultyLevel === 'Beginner'
                      ? 'green'
                      : detailData.courseDetails?.difficultyLevel === 'Intermediate'
                        ? 'blue'
                        : 'red'
                }
              ],
              isStatus: true
            },
            { label: 'Tag', value: detailData.courseDetails?.tags?.join(', ') || 'No tags' },

            {
              label: 'Date',
              value: detailData.courseDetails?.createdAt,
              isDate: true
            }
          ]}
          widgets={[
            {
              label: 'Description',
              content: detailData.courseDetails?.description ?? 'No description available'
            },
            {
              label: 'Prerequisites',
              content: detailData.courseDetails?.prerequisites ?? 'No prerequisites available'
            },
            {
              label: 'Learning Outcomes',
              content: detailData.courseDetails?.learningOutcomes?.join('\n') || 'No outcomes'
            },
            {
              label: 'Review Info',
              content: `Average Rating: ${
                detailData.courseDetails?.review?.averageRating ?? 0
              }\nTotal Ratings: ${detailData.courseDetails?.review?.totalRatings ?? 0}`
            }
            // {
            //   label: 'Section Details',
            //   content: detailData.sectionDetails
            //     ?.map(
            //       (sec, idx) =>
            //         `Section ${idx + 1}: ${sec.title}\nLectures: ${
            //           sec.numberOfLectures
            //         }\nDuration: ${sec.duration}\n`
            //     )
            //     .join('\n') || 'No sections'
            // }
          ]}
          actions={[
            // {
            //   label: 'Change Status',
            //   icon: <RefreshCw style={{ color: '#F59E0B' }} />,
            //   onClick: () => {
            //     if (!selectedCourseId) {
            //       console.log('No course id => cannot change status');
            //       return;
            //     }
            //     setStatusCourseId(selectedCourseId);
            //     setStatusCurrent(
            //       detailData.courseDetails?.approvalStatus as CourseApprovalStatus
            //     );
            //     setStatusModalOpen(true);
            //   }
            // },
            {
              label: 'Approve by AI',
              icon: <Bot style={{ color: '#14B8A6' }} />,
              onClick: async () => {
                if (!selectedCourseId) {
                  console.log('No course id => cannot approve by AI')
                  return
                }
                try {
                  // Gọi mutation RTK Query
                  await approveCourseByAI(selectedCourseId).unwrap()
                  toast.success('AI approval successful!')
                } catch (error: any) {
                  console.error('Error approving course by AI:', error)
                  toast.error('Failed to approve course by AI!')
                }
              }
            },

            {
              label: 'Update',
              icon: <Pencil style={{ color: '#3B82F6' }} />,
              onClick: () => {
                if (!detailData?.courseDetails) return

                const c: Course = {
                  id: selectedCourseId,
                  title: detailData.courseDetails.title ?? '',
                  imageURL: detailData.courseDetails.imageURL ?? '',
                  introURL: detailData.courseDetails.introURL ?? '',
                  description: detailData.courseDetails.description ?? '',
                  duration: detailData.courseDetails.duration ?? 0,
                  price: detailData.courseDetails.price ?? 0,
                  difficultyLevel: detailData.courseDetails.difficultyLevel ?? '',
                  updatedBy: '',
                  prerequisites: detailData.courseDetails.prerequisites ?? '',
                  learningOutcomes: detailData.courseDetails.learningOutcomes ?? []
                }

                handleEditCourse(c)
              }
            },
            {
              label: 'Delete',
              icon: <Trash2 style={{ color: '#DC2626' }} />,
              onClick: () => {
                if (!selectedCourseId) {
                  console.log('No course id => cannot delete')
                  return
                }
                handleDeleteCourse(selectedCourseId)
              }
            }
          ]}
        />
      )}

      <CourseFormModalCreate
        initialValues={newCourse}
        setNewCourse={setNewCourse}
        onSubmit={handleAddCourse}
        onCancel={() => setAddModalOpen(false)}
        isOpen={isAddModalOpen}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        currentStatus={statusCurrent}
        onSubmit={(newStatus) => {
          if (!statusCourseId) return
          handleApproveOrReject(statusCourseId, newStatus)
          setStatusModalOpen(false)
        }}
      />

      {editCourse && (
        <CourseFormModalEdit
          initialValues={editCourse}
          setEditCourse={setNewCourse}
          onSubmit={handleUpdateCourse}
          onCancel={() => {
            setEditModalOpen(false)
            setEditCourse(null)
          }}
          isOpen={isEditModalOpen}
        />
      )}
    </div>
  )
}
