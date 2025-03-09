'use client'
import React, { useState, useEffect } from 'react'
import {
  Search,
  BookOpen,
  Clock,
  Award,
  MoreVertical,
  Play,
  Filter,
  ChevronRight,
  BarChart2,
  Bookmark,
  Heart,
  Star,
  Calendar
} from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import { useGetAllMyLearningCourseQuery, useGetMyLearningCourseByTagQuery } from '@/redux/services/enrollment.service'
import { useGetTagQuery } from '@/redux/services/tag.service'
import { formatDate } from '@/helper/Util'
import LoadingPage from '@/components/animate/Loading/LoadingPage'

export default function MyLearning() {
  const [userId, setUserId] = useState('')
  const [selectedTag, setSelectedTag] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('lastAccessed')
  const [animation, setAnimation] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  const { data: tags, isFetching: tagsFetching, isLoading: tagsLoading } = useGetTagQuery()
  const {
    data: myCourses,
    isFetching: myCoursesFetching,
    isLoading: myCoursesLoading
  } = useGetMyLearningCourseByTagQuery({ StudentId: userId, TagId: selectedTag })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    try {
      if (token) {
        const decode = jwtDecode(token)
        setUserId(decode?.sub ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  // useEffect(() => {
  //   setAnimation(true);
  //   const timeout = setTimeout(() => setAnimation(false), 500);
  //   return () => clearTimeout(timeout);
  // }, [filterCategory, sortBy, viewMode]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // const filteredCourses = courses.filter(course => {
  //   return (
  //     (filterCategory === 'All' || course.category === filterCategory) &&
  //     (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  //   );
  // }).sort((a, b) => {
  //   if (sortBy === 'progress') return b.progress - a.progress;
  //   if (sortBy === 'lastAccessed') {
  //     // Simplified sort for demonstration
  //     if (a.lastAccessed.includes('Today')) return -1;
  //     if (b.lastAccessed.includes('Today')) return 1;
  //     if (a.lastAccessed.includes('Yesterday')) return -1;
  //     if (b.lastAccessed.includes('Yesterday')) return 1;
  //     return 0;
  //   }
  //   if (sortBy === 'rating') return b.rating - a.rating;
  //   return 0;
  // });

  // const toggleFavorite = (id) => {
  //   setCourses(courses.map(course =>
  //     course.id === id ? {...course, isFavorite: !course.isFavorite} : course
  //   ));
  // };

  // const calculateRemainingTime = (course) => {
  //   const completedMinutes = (course.progress / 100) * parseInt(course.duration);
  //   const totalMinutes = parseInt(course.duration);
  //   const remainingMinutes = totalMinutes - completedMinutes;

  //   if (remainingMinutes < 60) return `${Math.round(remainingMinutes)} minutes`;
  //   return `${Math.floor(remainingMinutes / 60)} hours ${Math.round(remainingMinutes % 60)} minutes`;
  // };

  const renderStarRating = (rating: number) => {
    return (
      <div className='flex items-center'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : i < rating ? 'text-yellow-400 fill-yellow-400 opacity-50' : 'text-gray-300'}`}
          />
        ))}
        <span className='ml-1 text-sm font-medium text-gray-700'>{rating.toFixed(1)}</span>
      </div>
    )
  }

  const handleTagSelect = (index: any, tagId: any) => {
    setActiveIndex(index)
    setSelectedTag(tagId)
  }

  const getCategoryColor = (category: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-green-100 text-green-800',
      'bg-orange-100 text-orange-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800'
    ]
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const loadingConditions = tagsLoading || myCoursesLoading || tagsFetching || myCoursesFetching

  if (loadingConditions) return <LoadingPage />

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero section with gradient */}
      <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-10 text-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-16'>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold mb-2'>Your Learning Journey</h1>
              <p className='text-blue-100 mb-4 max-w-xl'>
                Continue learning and developing your skills with your enrolled courses.
                {/* {filteredCourses.length > 0 && ` You're currently taking ${filteredCourses.length} courses.`} */}
              </p>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <h3 className='text-xl sm:text-2xl font-bold'>{myCourses?.courses.length}</h3>
                  <p className='text-blue-100 text-sm'>Total Courses</p>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <h3 className='text-xl sm:text-2xl font-bold'>
                    {Math.round(
                      (myCourses?.courses?.reduce(
                        (sum: number, course: IECourse) =>
                          sum + (course.progress?.progressPercentage === undefined
                            ? 0
                            : course.progress.progressPercentage),
                        0
                      ) ?? 0) / (myCourses?.courses?.length ?? 1)
                    )}
                    %
                  </h3>
                  <p className='text-blue-100 text-sm'>Average Progress</p>
                </div>
                {/* <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <h3 className='text-xl sm:text-2xl font-bold'>
                    {myCourses?.courses?.reduce((sum, course) => sum + course.completedLessons, 0)}
                  </h3>
                  <p className='text-blue-100 text-sm'>Completed Lessons</p>
                </div> */}
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <h3 className='text-xl sm:text-2xl font-bold'>
                    {myCourses?.courses.filter((c: IECourse) => c.progress?.progressPercentage === 100).length}
                  </h3>
                  <p className='text-blue-100 text-sm'>Completed Courses</p>
                </div>
              </div>
            </div>

            <div className='hidden lg:block'>
              <img
                src='/assets/Side_Image/my_learning.png'
                alt='Learning illustration'
                className='w-[500px] h-[500px] rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-4 sm:p-6'>
        {/* Search and filter bar */}
        <div className='bg-white rounded-xl shadow-md p-4 -mt-8 mb-8 flex flex-col md:flex-row gap-4'>
          <div className='relative flex-1'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search courses, instructors, or keywords'
              className='pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='flex gap-2 flex-wrap'>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${showFilters ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-300'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className='h-5 w-5' />
              <span>Filters</span>
            </button>

            <select
              className='px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value='lastAccessed'>Recently Accessed</option>
              <option value='progress'>Highest Progress</option>
              <option value='rating'>Highest Rated</option>
            </select>

            <div className='flex border border-gray-300 rounded-lg overflow-hidden'>
              <button
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('grid')}
              >
                <div className='grid grid-cols-2 gap-1'>
                  <div className='w-3 h-3 bg-current rounded-sm'></div>
                  <div className='w-3 h-3 bg-current rounded-sm'></div>
                  <div className='w-3 h-3 bg-current rounded-sm'></div>
                  <div className='w-3 h-3 bg-current rounded-sm'></div>
                </div>
              </button>
              <button
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('list')}
              >
                <div className='flex flex-col gap-1'>
                  <div className='w-6 h-2 bg-current rounded-sm'></div>
                  <div className='w-6 h-2 bg-current rounded-sm'></div>
                  <div className='w-6 h-2 bg-current rounded-sm'></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className={`bg-white p-4 rounded-xl shadow-md mb-6 ${animation ? 'animate-fadeIn' : ''}`}>
            <h3 className='font-medium text-gray-700 mb-3'>Filter by Category</h3>
            <div className='flex gap-2 flex-wrap'>
              <button
                className={`px-3 py-2 rounded-lg text-sm ${
                  activeIndex === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              {tags?.map((tag, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    activeIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                  onClick={() => handleTagSelect(index, tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Title and result count */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-800'>
            {filterCategory === 'All' ? 'All Courses' : `${filterCategory} Courses`}
            <span className='text-gray-500 ml-2 text-sm font-normal'>({myCourses?.courses?.length} courses)</span>
          </h2>

          {filterCategory !== 'All' && (
            <button
              className='text-blue-600 font-medium flex items-center text-sm hover:text-blue-800'
              onClick={() => setFilterCategory('All')}
            >
              View all <ChevronRight className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* Course list */}
        {viewMode === 'grid' ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${animation ? 'animate-fadeIn' : ''}`}>
            {myCourses?.courses.map((course: IECourse, index: number) => (
              <div
                key={index}
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-md transition-shadow group'
              >
                <div className='relative'>
                  <img
                    src={course.imageURL}
                    alt={course.title}
                    className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
                    <button className='w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform'>
                      <Play className='h-6 w-6 ml-1' />
                    </button>
                  </div>
                  <button
                    className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md'
                    // onClick={() => toggleFavorite(course.id)}
                  >
                    {/* <Heart className={`h-5 w-5 ${course.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} /> */}
                    <Heart className={`h-5 w-5 text-gray-400`} />
                  </button>
                  <div className='absolute bottom-0 left-0 right-0 h-2 bg-gray-200'>
                    <div
                      className='bg-blue-600 h-1'
                      style={{
                        width: `${course.progress?.progressPercentage === undefined ? 0 : course.progress.progressPercentage}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className='p-4'>
                  <div className='mb-2'>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(course.tags[0].id)}`}
                    >
                      {course.tags[0].name}
                    </span>
                  </div>

                  <h3 className='text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-14'>{course.title}</h3>

                  <div className='flex items-center text-gray-600 mb-3'>
                    {course.instructors?.map((instructor, index) => (
                      <div className='flex' key={index}>
                        <img
                          src={instructor.profilePictureUrl}
                          alt='Instructor'
                          className='w-6 h-6 rounded-full mr-1'
                        />
                      </div>
                    ))}

                    {course.instructors?.map((instructor, index) => (
                      <div key={index} className='flex'>
                        <p className='text-sm mr-1'>{instructor.fullname + ','}</p>
                      </div>
                    ))}
                  </div>

                  <div className='flex justify-between items-center mb-3'>
                    {renderStarRating(course.review.averageRating)}
                  </div>

                  <div className='mt-3 pt-3 border-t border-gray-100'>
                    <div className='flex justify-between text-sm text-gray-600'>
                      <div className='flex items-center'>
                        <Clock className='h-4 w-4 mr-1 text-gray-400' />
                        <span>{course.progress ? formatDate(course.progress.lastAccessed) : 'N/A'}</span>
                      </div>
                      <div className='flex items-center'>
                        <Calendar className='h-4 w-4 mr-1 text-gray-400' />
                        <span>{course.progress ? course.progress.remainingDurationInMins : 'N/A'} min(s) left</span>
                      </div>
                    </div>
                  </div>

                  <button className='mt-4 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium'>
                    {course.progress?.progressPercentage === 0 || course.progress?.progressPercentage === undefined
                      ? 'Start Learning'
                      : 'Continue Learning'}
                    <ChevronRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`space-y-4 ${animation ? 'animate-fadeIn' : ''}`}>
            {myCourses?.courses.map((course: IECourse, index: number) => (
              <div
                key={index}
                className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row'
              >
                <div className='relative sm:w-60'>
                  <img src={course.imageURL} alt={course.title} className='w-full h-40 sm:h-full object-cover' />
                  <div className='absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
                    <button className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white'>
                      <Play className='h-5 w-5 ml-0.5' />
                    </button>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 h-2 bg-gray-200'>
                    <div
                      className='bg-blue-600 h-1'
                      style={{
                        width: `${course.progress?.progressPercentage === undefined ? 0 : course.progress.progressPercentage}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className='p-4 flex-1 flex flex-col justify-between'>
                  <div>
                    <div className='flex justify-between items-start'>
                      <div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(course.tags[0].id)}`}
                        >
                          {course.tags[0].name}
                        </span>
                        <h3 className='text-lg font-semibold text-gray-800 mt-2'>{course.title}</h3>
                      </div>
                      <button
                        className='p-2 rounded-full hover:bg-gray-100'
                        // onClick={() => toggleFavorite(course.id)}
                      >
                        {/* <Heart className={`h-5 w-5 ${course.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} /> */}
                        <Heart className={`h-5 w-5 text-gray-400`} />
                      </button>
                    </div>

                    <div className='flex items-center text-gray-600 mt-2'>
                      {course.instructors?.map((instructor, index) => (
                        <div className='flex' key={index}>
                          <img
                            src={instructor.profilePictureUrl}
                            alt='Instructor'
                            className='w-6 h-6 rounded-full mr-2'
                          />
                        </div>
                      ))}
                      {course.instructors?.map((instructor, index) => (
                        <div className='flex' key={index}>
                          <p className='text-sm'>{instructor.fullname}</p>
                        </div>
                      ))}
                      <div className='ml-4'>{renderStarRating(course.review.averageRating)}</div>
                    </div>

                    <div className='flex flex-wrap gap-2 mt-3'>
                      {course.tags.map((tag, index) => (
                        <span key={index} className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full'>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div className='flex flex-col sm:flex-row gap-4 text-sm text-gray-600'>
                      <div className='flex items-center'>
                        <Clock className='h-4 w-4 mr-1 text-gray-400' />
                        <span>Accessed: {course.progress ? formatDate(course.progress.lastAccessed) : 'N/A'}</span>
                      </div>
                      <div className='flex items-center'>
                        <Calendar className='h-4 w-4 mr-1 text-gray-400' />
                        <span>{course.progress ? course.progress.remainingDurationInMins : 'N/A'} min(s) left</span>
                      </div>
                    </div>

                    <button className='py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium whitespace-nowrap'>
                      {course.progress?.progressPercentage === 0 || course.progress?.progressPercentage === undefined
                        ? 'Start Learning'
                        : 'Continue Learning'}
                      <ChevronRight className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {myCourses?.courses.length === 0 && (
          <div className='text-center py-16 bg-white rounded-xl shadow-sm'>
            <div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <BookOpen className='h-12 w-12 text-gray-400' />
            </div>
            <h3 className='text-xl font-medium text-gray-800 mb-2'>No Courses Found</h3>
            <p className='text-gray-600 max-w-md mx-auto'>
              Try searching with different keywords or changing your filters to see all your courses
            </p>
            <button
              className='mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
              onClick={() => {
                setFilterCategory('All')
                setSearchTerm('')
              }}
            >
              View all courses
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
