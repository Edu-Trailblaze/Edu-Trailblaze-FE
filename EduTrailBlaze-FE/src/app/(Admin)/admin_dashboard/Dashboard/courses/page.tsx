'use client'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

//api
import api from '@/components/config/axios'
import axios from 'axios'

//material
import 'react-toastify/dist/ReactToastify.css'
import { TableRow, TableCell } from '@mui/material'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'
import Pagination from '@/components/admin/Pagination/Pagination'

//sort filter
import CourseFilter from '@/components/admin/Filter/CourseSortFilter/CourseFilter'
import CourseSort from '@/components/admin/Filter/CourseSortFilter/CourseSort'

//modal
import CourseFormModalCreate from '@/components/admin/modal/CourseFormModal/CourseFormModalCreate'
import CourseFormModalEdit from '@/components/admin/modal/CourseFormModal/CourseFormModalEdit' 
import DetailPopup from '@/components/global/Popup/PopupDetail'

//icon
import { Filter, ArrowUpDown, Plus, Trash2, Pencil } from 'lucide-react'

export type Course = {
  id?: number
  title: string
  imageURL: string
  introURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: string
  prerequisites: string
  learningOutcomes: string[]
  createdBy: string
  isPublished?:string
  reviewInfo?: {
    averageRating: number
    totalRatings: number
  }
  createdAt?: string
}

export type CourseCreate = Omit<Course, 'createdAt'>

const API_URL = 'https://edu-trailblaze.azurewebsites.net/api/Course'
const USER_API_URL = 'https://edu-trailblaze.azurewebsites.net/api/User'
const REVIEW_API_URL = 'https://edu-trailblaze.azurewebsites.net/api/Review/get-review-info'

const courseFields: { label: string; accessor: keyof Course }[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Title', accessor: 'title' },
  { label: 'Price', accessor: 'price' },
  { label: 'Difficulty', accessor: 'difficultyLevel' },
  { label: 'Published', accessor: 'isPublished' }, 
  { label: 'Created at', accessor: 'createdAt' }
]

export default function CoursesManagement() {
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('')
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  //filter&sort open
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
    learningOutcomes: []
  })


  //pagination
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 10

  const fetchUserId = async () => {
    try {
      const response = await axios.get(USER_API_URL)
      if (response.data.length > 0) {
        setUserId(response.data[0].id)
      }
    } catch (error) {
      console.error('Error fetching user ID:', error)
    }
  }

  //old
  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL)
      setCourses(response.data)
      setAllCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

//new
  // const fetchCourse = async (page: number) => {
  //   setLoading(true)
  //   try {
  //     const response = await api.get('/Course/get-paging-course-information', {
  //       params: { pageIndex: page, pageSize }
  //     })
  //     setCourses(response.data.items)
  //     setAllCourses(response.data.items)
  //     setTotalPages(response.data.totalPages)
  //   } catch (error) {
  //     console.error('Error fetching reviews:', error)
  //     toast.error('Failed to fetch reviews!')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    fetchCourses()
    fetchUserId()
  }, [])

  const handleDetail = async (course: Course) => {
    try {
      const reviewResponse = await axios.get(`${REVIEW_API_URL}/${course.id}`)
      const reviewInfo = reviewResponse.data
      setSelectedCourse({
        ...course,
        reviewInfo
      })
    } catch (error) {
      console.error('Error fetching course review info:', error)
      toast.error('Failed to fetch course review info!')
      setSelectedCourse(course)
    }
  }

  const handleAddCourse = async (newCourse: CourseCreate) => {
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
      newCourse.learningOutcomes.forEach((outcome) => {
        formData.append('LearningOutcomes', outcome)
      })
      if (newCourse.imageURL) {
        formData.append('ImageURL', newCourse.imageURL)
      }
      if (newCourse.introURL) {
        formData.append('IntroURL', newCourse.introURL)
      }
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Course created successfully!')
      setCourses([...courses, { ...response.data, createdAt: new Date().toISOString() }])
      fetchCourses()
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
    setEditCourse(course)
    setEditModalOpen(true)
  }

  const handleUpdateCourse = async (updatedCourse: Course) => {
    if (
      !updatedCourse.title ||
      !updatedCourse.description ||
      !updatedCourse.difficultyLevel ||
      updatedCourse.price <= 0
    ) {
      toast.error('Please fill all required fields and ensure price is greater than 0!')
      return
    }

    try {
      const formData = new FormData()
      formData.append('CourseId', updatedCourse.id!.toString()) // Thêm CourseId
      formData.append('Title', updatedCourse.title)
      formData.append('Description', updatedCourse.description)
      formData.append('Price', updatedCourse.price.toString())
      formData.append('DifficultyLevel', updatedCourse.difficultyLevel)
      formData.append('CreatedBy', userId)
      formData.append('Prerequisites', updatedCourse.prerequisites)
  
      updatedCourse.learningOutcomes.forEach((outcome) => {
        formData.append('LearningOutcomes', outcome)
      })
  
      if (updatedCourse.imageURL) {
        formData.append('ImageURL', updatedCourse.imageURL)
      }
      if (updatedCourse.introURL) {
        formData.append('IntroURL', updatedCourse.introURL)
      }
      if (typeof updatedCourse.isPublished !== 'undefined') {
        formData.append('IsPublished', updatedCourse.isPublished)
      }
  
      await axios.put(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
      toast.success('Course updated successfully!')
      setCourses(courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)))
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
      await axios.delete(`${API_URL}?courseId=${courseId}`)
      setCourses(courses.filter((c) => c.id !== courseId))
      toast.success('Course deleted successfully!')
    } catch (error) {
      console.error('Error deleting course:', error)
      toast.error('Failed to delete course!')
    }
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return { color: 'goldenrod' } 
      case 'Reject':
        return { color: 'red' }     
      case 'Approve':
        return { color: 'green' }     
      default:
        return {}
    }
  }

  const renderRow = (course: Course) => (
    <TableRow
      key={course.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'
      hover
      onClick={() => handleDetail(course)}
    >
      {visibleColumns['id'] && <TableCell className='p-4'>{course.id}</TableCell>}
      {visibleColumns['title'] && <TableCell>{course.title}</TableCell>}
      {visibleColumns['price'] && <TableCell>{course.price}</TableCell>}
      {visibleColumns['difficultyLevel'] && <TableCell>{course.difficultyLevel}</TableCell>}
      {/* {visibleColumns['isPublished'] && <TableCell>{course.isPublished}</TableCell>} */}
      {visibleColumns['isPublished'] && (
      <TableCell sx={getStatusColor(course.isPublished || '')}>
        {course.isPublished}
      </TableCell>
    )}
      {visibleColumns['createdAt'] && (
        <TableCell>
          <FormatDateTime date={course.createdAt || ''} />
        </TableCell>
      )}
    </TableRow>
  )

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
          <p className='mt-2 text-gray-500 text-sm'>Loading courses...</p>
        </div>
      ) : (
        <Table
          columns={[...courseFields.filter((field) => visibleColumns[field.accessor])]}
          renderRow={renderRow}
          data={courses}
        />
      )}

      {/* <Pagination /> */}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />
      

      {selectedCourse && (
        <DetailPopup
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
          title='Course Detail'
          fields={[
            { label: 'ID', value: selectedCourse.id, isID: true },
            { label: 'Title', value: selectedCourse.title },
            { label: 'Duration', value: selectedCourse.duration },
            { label: 'Price', value: selectedCourse.price },

            { label: 'imageURL', value: selectedCourse.imageURL, isImage: true },
            { label: 'introURL', value: selectedCourse.introURL, isVideo: true },

            {
              label: 'Difficulty',
              value: [
                {
                  label: selectedCourse.difficultyLevel,
                  color:
                    selectedCourse.difficultyLevel === 'Beginner'
                      ? 'green'
                      : selectedCourse.difficultyLevel === 'Intermediate'
                        ? 'blue'
                        : 'red'
                }
              ],
              isStatus: true
            },
            { label: 'Date', value: selectedCourse.createdAt, isDate: true }
          ]}
          widgets={[
            {
              label: 'Description',
              content: selectedCourse.description
            },
            {
              label: 'Prerequisites',
              content: selectedCourse.prerequisites
            },

            {
              label: 'Review Info',
              content: `Average Rating: ${selectedCourse.reviewInfo?.averageRating}\nTotal Ratings: ${selectedCourse.reviewInfo?.totalRatings}`
            }
          ]}
          actions={[
            {
              label: 'Update',
              icon: <Pencil style={{ color: '#F59E0B' }} />,
              onClick: () => {
                handleEditCourse(selectedCourse)
              }
            },
            {
              label: 'Delete',
              icon: <Trash2 style={{ color: '#DC2626' }} />,
              onClick: () => {
                handleDeleteCourse(selectedCourse.id!)
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
