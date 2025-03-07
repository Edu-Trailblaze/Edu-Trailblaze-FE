'use client'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

//api
import api from '@/components/config/axios'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, MenuItem, IconButton, TableRow, TableCell } from '@mui/material'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

//sort filter
import CourseFilter from '@/components/admin/Filter/CourseSortFilter/CourseFilter'
import CourseSort from '@/components/admin/Filter/CourseSortFilter/CourseSort'

import axios from 'axios'

//modal
import CourseFormModalCreate from '../../../../../components/admin/Modal/CourseFormModal/CourseFormModalCreate'
import CourseFormModalEdit from '../../../../../components/admin/Modal/CourseFormModal/CourseFormModalEdit'
import DetailModal from '../../../../../components/admin/Modal/DetailModal'

//icon
import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil, EllipsisVertical } from 'lucide-react'

export type Course = {
  id?: number
  title: string
  imageURL: string
  introURL: string
  description: string
  price: number
  difficultyLevel: string
  prerequisites: string
  learningOutcomes: string[]
  createdAt?: string
  createdBy: string
}

export type CourseCreate = Omit<Course, 'createdAt'>

const API_URL = 'https://edu-trailblaze.azurewebsites.net/api/Course'
const USER_API_URL = 'https://edu-trailblaze.azurewebsites.net/api/User'

const courseFields: { label: string; accessor: keyof Course }[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Title', accessor: 'title' },
  { label: 'Price', accessor: 'price' },
  { label: 'Difficulty', accessor: 'difficultyLevel' },
  { label: 'Created at', accessor: 'createdAt' }
]

export default function CoursesManagement() {
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('')
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  //dot
  const [dot, setDot] = useState<{ [key: number]: HTMLElement | null }>({})
  const handleClickDot = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setDot((prev) => ({ ...prev, [id]: event.currentTarget }))
  }
  const handleCloseDot = (id: number) => {
    setDot((prev) => ({ ...prev, [id]: null }))
  }

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
    price: 0,
    difficultyLevel: '',
    createdBy: '',
    prerequisites: '',
    learningOutcomes: []
  })

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

  useEffect(() => {
    fetchCourses()
    fetchUserId()
  }, [])

  const handleAddCourse = async (newCourse: CourseCreate) => {
    if (!userId) {
      toast.error('User ID is not available!')
      return
    }
    try {
      const courseToSend = {
        ...newCourse,
        createdBy: userId, // <--- GÁN Ở ĐÂY
        learningOutcomes: newCourse.learningOutcomes.length > 0 ? newCourse.learningOutcomes : ['Default outcome']
      }
      const response = await axios.post(API_URL, courseToSend)

      toast.success('Course created successfully!')
      setCourses([...courses, { ...response.data, createdAt: new Date().toISOString() }])
      fetchCourses()
      setAddModalOpen(false)
    } catch (error: any) {
      console.error('Error adding course:', error)
      // Thêm đoạn này:
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
      const courseToSend = {
        ...updatedCourse,
        courseId: updatedCourse.id,
        learningOutcomes:
          updatedCourse.learningOutcomes.length > 0 ? updatedCourse.learningOutcomes : ['Default outcome']
      }

      await axios.put(`${API_URL}`, courseToSend, {
        headers: {
          'Content-Type': 'application/json'
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

  const renderRow = (course: Course) => (
    <TableRow key={course.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'>
      {visibleColumns['id'] && <TableCell className='p-4'>{course.id}</TableCell>}
      {visibleColumns['title'] && <TableCell>{course.title}</TableCell>}
      {visibleColumns['price'] && <TableCell>{course.price}</TableCell>}
      {visibleColumns['difficultyLevel'] && <TableCell>{course.difficultyLevel}</TableCell>}
      {visibleColumns['createdAt'] && (
        <TableCell>
          <FormatDateTime date={course.createdAt} />
        </TableCell>
      )}
      <TableCell>
        <IconButton onClick={(e) => handleClickDot(e, course.id!)}>
          <EllipsisVertical size={18} />
        </IconButton>

        <Menu anchorEl={dot[course.id!]} open={Boolean(dot[course.id!])} onClose={() => handleCloseDot(course.id!)}>
          <MenuItem
            onClick={() => {
              setSelectedCourse(course)
              handleCloseDot(course.id!)
            }}
          >
            <Eye size={18} style={{ marginRight: '10px', color: '#1D4ED8' }} /> View
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEditCourse(course)
              handleCloseDot(course.id!)
            }}
          >
            <Pencil size={18} style={{ marginRight: '10px', color: '#F59E0B' }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteCourse(course.id!)
              handleCloseDot(course.id!)
            }}
          >
            <Trash2 size={18} style={{ marginRight: '10px', color: '#DC2626' }} /> Delete
          </MenuItem>
        </Menu>
      </TableCell>
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
                    // CHANGED: Lọc theo fromDate, toDate, keyword
                    const from = fromDate ? new Date(fromDate) : null
                    const to = toDate ? new Date(toDate) : null
                    const kw = keyword.toLowerCase()

                    const filtered = allCourses.filter((item) => {
                      const itemDate = new Date(item.createdAt)
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

            {/* CHANGED: Nút Sort (mở CourseSort) */}
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

            {/* Nút + mở modal thêm Course */}
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
          columns={[
            ...courseFields.filter((field) => visibleColumns[field.accessor]),
            { label: 'Actions', accessor: 'action' }
          ]}
          renderRow={renderRow}
          data={courses}
        />
      )}

      {/* <Pagination /> */}

      {selectedCourse && (
        <DetailModal item={selectedCourse} fields={courseFields} onClose={() => setSelectedCourse(null)} />
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
