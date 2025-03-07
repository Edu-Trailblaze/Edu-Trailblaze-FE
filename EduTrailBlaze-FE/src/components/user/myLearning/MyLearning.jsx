'use client'
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Award, MoreVertical, Play, Filter, ChevronRight, BarChart2, Bookmark, Heart, Star, Calendar } from 'lucide-react';

export default function MyLearning() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "JavaScript Programming from Basic to Advanced",
      instructor: "John Smith",
      thumbnail: "/assets/Side_Image/course_image.png",
      progress: 65,
      duration: "10 hours 30 minutes",
      lastAccessed: "Today",
      category: "Programming",
      rating: 4.8,
      isFavorite: true,
      completedLessons: 12,
      totalLessons: 20,
      tags: ["JavaScript", "Web Development", "Frontend"]
    },
    {
      id: 2,
      title: "UI/UX Design for Beginners",
      instructor: "Sarah Johnson",
      thumbnail: "/assets/Side_Image/course_image.png",
      progress: 30,
      duration: "8 hours 15 minutes",
      lastAccessed: "Yesterday",
      category: "Design",
      rating: 4.6,
      isFavorite: false,
      completedLessons: 5,
      totalLessons: 15,
      tags: ["UI Design", "UX", "Figma"]
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      instructor: "Michael Lee",
      thumbnail: "/assets/Side_Image/course_image.png",
      progress: 10,
      duration: "12 hours 45 minutes",
      lastAccessed: "3 days ago",
      category: "Mobile Development",
      rating: 4.7,
      isFavorite: true,
      completedLessons: 2,
      totalLessons: 24,
      tags: ["React Native", "Mobile", "JavaScript"]
    },
    {
      id: 4,
      title: "Effective Online Marketing",
      instructor: "Emma Davis",
      thumbnail: "/assets/Side_Image/course_image.png",
      progress: 90,
      duration: "6 hours 20 minutes",
      lastAccessed: "1 week ago",
      category: "Marketing",
      rating: 4.5,
      isFavorite: false,
      completedLessons: 14,
      totalLessons: 16,
      tags: ["Digital Marketing", "Social Media", "SEO"]
    },
    {
      id: 5,
      title: "Introduction to Machine Learning and AI",
      instructor: "David Wilson",
      thumbnail: "/assets/Side_Image/course_image.png",
      progress: 45,
      duration: "15 hours 30 minutes",
      lastAccessed: "2 weeks ago",
      category: "AI & ML",
      rating: 4.9,
      isFavorite: true,
      completedLessons: 8,
      totalLessons: 18,
      tags: ["Python", "AI", "Machine Learning"]
    },
    {
      id: 6,
      title: "Blockchain and Cryptocurrency for Beginners",
      instructor: "Lisa Chen",
      thumbnail: "/assets/Side_Image/course_image.png",
      progress: 20,
      duration: "9 hours 45 minutes",
      lastAccessed: "1 month ago",
      category: "Blockchain",
      rating: 4.4,
      isFavorite: false,
      completedLessons: 4,
      totalLessons: 20,
      tags: ["Blockchain", "Crypto", "Web3"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('lastAccessed');
  const [animation, setAnimation] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const categories = ['All', 'Programming', 'Design', 'Marketing', 'Mobile Development', 'AI & ML', 'Blockchain'];

  useEffect(() => {
    setAnimation(true);
    const timeout = setTimeout(() => setAnimation(false), 500);
    return () => clearTimeout(timeout);
  }, [filterCategory, sortBy, viewMode]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredCourses = courses.filter(course => {
    return (
      (filterCategory === 'All' || course.category === filterCategory) &&
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }).sort((a, b) => {
    if (sortBy === 'progress') return b.progress - a.progress;
    if (sortBy === 'lastAccessed') {
      // Simplified sort for demonstration
      if (a.lastAccessed.includes('Today')) return -1;
      if (b.lastAccessed.includes('Today')) return 1;
      if (a.lastAccessed.includes('Yesterday')) return -1;
      if (b.lastAccessed.includes('Yesterday')) return 1;
      return 0;
    }
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleFavorite = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? {...course, isFavorite: !course.isFavorite} : course
    ));
  };

  const calculateRemainingTime = (course) => {
    const completedMinutes = (course.progress / 100) * parseInt(course.duration);
    const totalMinutes = parseInt(course.duration);
    const remainingMinutes = totalMinutes - completedMinutes;
    
    if (remainingMinutes < 60) return `${Math.round(remainingMinutes)} minutes`;
    return `${Math.floor(remainingMinutes / 60)} hours ${Math.round(remainingMinutes % 60)} minutes`;
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : i < rating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"}`} 
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Programming': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-green-100 text-green-800',
      'Mobile Development': 'bg-orange-100 text-orange-800',
      'AI & ML': 'bg-red-100 text-red-800',
      'Blockchain': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-10 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-16">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Learning Journey</h1>
              <p className="text-blue-100 mb-4 max-w-xl">
                Continue learning and developing your skills with your enrolled courses.
                {filteredCourses.length > 0 && ` You're currently taking ${filteredCourses.length} courses.`}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl sm:text-2xl font-bold">{courses.length}</h3>
                  <p className="text-blue-100 text-sm">Total Courses</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
                  </h3>
                  <p className="text-blue-100 text-sm">Average Progress</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {courses.reduce((sum, course) => sum + course.completedLessons, 0)}
                  </h3>
                  <p className="text-blue-100 text-sm">Completed Lessons</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {courses.filter(c => c.progress === 100).length}
                  </h3>
                  <p className="text-blue-100 text-sm">Completed Courses</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="/assets/Side_Image/my_learning.png" 
                alt="Learning illustration" 
                className="w-[500px] h-[500px] rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Search and filter bar */}
        <div className="bg-white rounded-xl shadow-md p-4 -mt-8 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses, instructors, or keywords"
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${showFilters ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-300'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="lastAccessed">Recently Accessed</option>
              <option value="progress">Highest Progress</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('grid')}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-3 h-3 bg-current rounded-sm"></div>
                  <div className="w-3 h-3 bg-current rounded-sm"></div>
                  <div className="w-3 h-3 bg-current rounded-sm"></div>
                  <div className="w-3 h-3 bg-current rounded-sm"></div>
                </div>
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('list')}
              >
                <div className="flex flex-col gap-1">
                  <div className="w-6 h-2 bg-current rounded-sm"></div>
                  <div className="w-6 h-2 bg-current rounded-sm"></div>
                  <div className="w-6 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Extended filters */}
        {showFilters && (
          <div className={`bg-white p-4 rounded-xl shadow-md mb-6 ${animation ? 'animate-fadeIn' : ''}`}>
            <h3 className="font-medium text-gray-700 mb-3">Filter by Category</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    filterCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Title and result count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filterCategory === 'All' ? 'All Courses' : `${filterCategory} Courses`}
            <span className="text-gray-500 ml-2 text-sm font-normal">({filteredCourses.length} courses)</span>
          </h2>
          
          {filterCategory !== 'All' && (
            <button 
              className="text-blue-600 font-medium flex items-center text-sm hover:text-blue-800"
              onClick={() => setFilterCategory('All')}
            >
              View all <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Course list */}
        {viewMode === 'grid' ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${animation ? 'animate-fadeIn' : ''}`}>
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="h-6 w-6 ml-1" />
                    </button>
                  </div>
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                    onClick={() => toggleFavorite(course.id)}
                  >
                    <Heart className={`h-5 w-5 ${course.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="bg-blue-600 h-1"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(course.category)}`}>
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-14">{course.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <img 
                      src="/api/placeholder/24/24" 
                      alt={course.instructor} 
                      className="w-6 h-6 rounded-full mr-2" 
                    />
                    <p className="text-sm">{course.instructor}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    {renderStarRating(course.rating)}
                    <span className="text-sm text-gray-600">{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{course.lastAccessed}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{calculateRemainingTime(course)} left</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium">
                    {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`space-y-4 ${animation ? 'animate-fadeIn' : ''}`}>
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row"
              >
                <div className="relative sm:w-60">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-40 sm:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <Play className="h-5 w-5 ml-0.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="bg-blue-600 h-1"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800 mt-2">{course.title}</h3>
                      </div>
                      <button 
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() => toggleFavorite(course.id)}
                      >
                        <Heart className={`h-5 w-5 ${course.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mt-2">
                      <img 
                        src="/api/placeholder/24/24" 
                        alt={course.instructor} 
                        className="w-6 h-6 rounded-full mr-2" 
                      />
                      <p className="text-sm">{course.instructor}</p>
                      <div className="ml-4">
                        {renderStarRating(course.rating)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {course.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>Accessed: {course.lastAccessed}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{calculateRemainingTime(course)} left</span>
                      </div>
                    </div>
                    
                    <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium whitespace-nowrap">
                      {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Courses Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try searching with different keywords or changing your filters to see all your courses
            </p>
            <button 
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => {setFilterCategory('All'); setSearchTerm('');}}
            >
              View all courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};