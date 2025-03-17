'use client'
import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Users,
  BookOpen,
  DollarSign,
  Star,
  Calendar,
  BarChart2,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react'
import {
  useGetCourseCompletionRateQuery,
  useGetInstructorCoursesQuery,
  useGetInstructorEnrollmentsQuery,
  useGetInstructorRatingQuery,
  useGetInstructorRevenueQuery
} from '@/redux/services/instructor.service'
import { jwtDecode } from 'jwt-decode'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import { formatCurrency } from '@/helper/format'
import { RevenueChart } from './RevenueLineChart/RevenueChart'
import { EnrollmentChart } from './EnrollmentBarChart/EnrollmentChart'

export default function InstructorAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month')
  const [Time, setTime] = useState('month')
  const [InstructorId, setInstructorId] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    try {
      if (token) {
        const decode = jwtDecode(token)
        setInstructorId(decode?.sub ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setInstructorId('')
    }
  }, [])

  const { data: courses, isLoading, isError } = useGetInstructorCoursesQuery({ InstructorId, Time })
  const {
    data: enrollments,
    isLoading: enrollmentLoading,
    isError: enrollmentError
  } = useGetInstructorEnrollmentsQuery({ InstructorId, Time })
  const {
    data: revenue,
    isLoading: revenueLoading,
    isError: revenueError
  } = useGetInstructorRevenueQuery({ InstructorId, Time })
  const {
    data: rating,
    isLoading: ratingLoading,
    isError: ratingError
  } = useGetInstructorRatingQuery({ InstructorId, Time })
  const {
    data: completion,
    isLoading: completionLoading,
    isError: completionError
  } = useGetCourseCompletionRateQuery(InstructorId)

  // Mock data - in a real app, this would come from an API
  const analytics = {
    totalStudents: 2487,
    totalCourses: 8,
    totalRevenue: 48750,
    averageRating: 4.7,
    studentsGrowth: 12.5,
    courseIncrease: 2,
    revenueGrowth: 8.7,
    courseCompletionRate: 50,
    monthlyData: [
      { month: 'Jan', students: 210, revenue: 4200 },
      { month: 'Feb', students: 230, revenue: 4600 },
      { month: 'Mar', students: 250, revenue: 5000 },
      { month: 'Apr', students: 260, revenue: 5200 },
      { month: 'May', students: 280, revenue: 5600 },
      { month: 'Jun', students: 290, revenue: 5800 },
      { month: 'Jul', students: 300, revenue: 6000 }
    ],
    topCourses: [
      { id: 1, title: 'Complete Web Development Bootcamp', students: 584, revenue: 11680, rating: 4.8 },
      { id: 2, title: 'Advanced JavaScript Masterclass', students: 432, revenue: 8640, rating: 4.9 },
      { id: 3, title: 'Data Science Fundamentals', students: 378, revenue: 7560, rating: 4.6 },
      { id: 4, title: 'UI/UX Design Principles', students: 344, revenue: 6880, rating: 4.5 }
    ]
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value
    setSelectedTimeframe(newTime)
    setTime(newTime)
  }

  console.log(courses, enrollments, revenue, rating)

  if (isLoading || enrollmentLoading || revenueLoading || ratingLoading) return <LoadingPage />

  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <div>
          <div className='container mx-auto px-36 pt-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <h1 className='text-2xl font-bold mb-4 md:mb-0'>Instructor Analytics</h1>
              <div className='flex items-center space-x-2'>
                <select
                  className='bg-blue-600 text-white px-3 py-2 rounded-md focus:outline-none'
                  value={selectedTimeframe}
                  onChange={handleTimeChange}
                >
                  <option className='bg-blue-400' value='week'>
                    Last Week
                  </option>
                  <option className='bg-blue-400' value='month'>
                    Last Month
                  </option>
                  <option className='bg-blue-400' value='year'>
                    Last Year
                  </option>
                </select>
                <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center'>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className='container mx-auto px-36 py-8'>
          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div>
                <p className='text-gray-500 text-sm'>Total Courses</p>
                <div className='flex items-center mt-1'>
                  <span className='text-2xl font-bold'>{courses?.currentData}</span>
                  {courses?.comparisonData !== undefined && courses?.comparisonData >= 0 ? (
                    <span className='text-green-500 ml-2 text-sm'>+ {courses?.comparisonData}</span>
                  ) : (
                    <span className='text-red-500 ml-2 text-sm'>- {courses?.comparisonData}</span>
                  )}
                </div>
              </div>
              <BookOpen className='h-6 w-6 text-blue-500' />
            </div>
            <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div>
                <p className='text-gray-500 text-sm'>Total Students</p>
                <div className='flex items-center mt-1'>
                  <span className='text-2xl font-bold'>{enrollments?.currentData}</span>
                  {enrollments?.comparisonData !== undefined && enrollments?.comparisonData >= 0 ? (
                    <span className='text-green-500 ml-2 text-sm'>+ {enrollments?.comparisonData}</span>
                  ) : (
                    <span className='text-red-500 ml-2 text-sm'>- {enrollments?.comparisonData}</span>
                  )}
                </div>
              </div>
              <Users className='h-6 w-6 text-blue-500' />
            </div>
            <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div>
                <p className='text-gray-500 text-sm'>Rating</p>
                <div className='flex items-center mt-1'>
                  <span className='text-2xl font-bold'>{rating?.currentData}</span>
                  {rating?.comparisonData !== undefined && rating?.comparisonData >= 0 ? (
                    <span className='text-green-500 ml-2 text-sm'>+ {rating?.comparisonData}</span>
                  ) : (
                    <span className='text-red-500 ml-2 text-sm'>- {rating?.comparisonData}</span>
                  )}
                </div>
              </div>
              <Star className='h-6 w-6 text-blue-500' />
            </div>
            <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div>
                <p className='text-gray-500 text-sm'>Revenue This Month</p>
                <div className='flex items-center mt-1'>
                  <span className='text-2xl font-bold'>{formatCurrency(revenue?.currentData)}</span>
                  {revenue?.comparisonData !== undefined && revenue?.comparisonData >= 0 ? (
                    <span className='text-green-500 ml-2 text-sm'>+ {formatCurrency(revenue?.comparisonData)}</span>
                  ) : (
                    <span className='text-red-500 ml-2 text-sm'>- {formatCurrency(revenue?.comparisonData)}</span>
                  )}
                </div>
              </div>
              <DollarSign className='h-6 w-6 text-blue-500' />
            </div>
          </div>

          {/* Charts Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
            <EnrollmentChart />

            <RevenueChart />
          </div>

          {/* Course Completion */}
          <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Course Completion Rate</h2>
            <div className='w-full bg-gray-200 rounded-full h-4'>
              <div className='bg-blue-600 h-4 rounded-full' style={{ width: `${completion}%` }}></div>
            </div>
            <p className='mt-2 text-gray-600 text-center'>
              <span className='font-medium text-blue-600'>{completion}%</span> of enrolled students complete their
              courses
            </p>
          </div>

          {/* Top Performing Courses */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>Top Performing Courses</h2>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Course
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Students
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Revenue
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {analytics.topCourses.map((course) => (
                    <tr key={course.id} className='hover:bg-blue-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>{course.title}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>{course.students}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>${course.revenue.toLocaleString()}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <Star className='h-4 w-4 text-yellow-400 mr-1' />
                          <span className='text-sm text-gray-500'>{course.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-6 text-center'>
              <button className='text-blue-600 hover:text-blue-800 font-medium'>View All Courses</button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

// StatCard component
interface StatCardProps {
  title: string
  value: string | number
  percentChange?: number
  icon: React.ReactNode
}

function StatCard({ title, value, percentChange, icon }: StatCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='text-sm font-medium text-gray-500'>{title}</p>
          <p className='mt-1 text-2xl font-semibold text-gray-900'>{value}</p>
        </div>
        <div className='bg-blue-100 p-2 rounded-md'>{icon}</div>
      </div>

      {percentChange && (
        <div className='mt-4 flex items-center'>
          <ArrowUpRight className={`h-4 w-4 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`text-sm font-medium ml-1 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentChange}%
          </span>
          <span className='text-sm text-gray-500 ml-1'>from last period</span>
        </div>
      )}
    </div>
  )
}
