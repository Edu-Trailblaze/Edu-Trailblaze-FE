"use client"
import { Users, GraduationCap, BookOpen, DollarSign, ChevronRight, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  useGetNumberOfInstructorsQuery,
  useGetNumberOfStudentsQuery,
  useGetTotalRevenueQuery,
  useGetTotalCoursesBoughtQuery,
} from "@/redux/services/dashboard.service"

export default function Dashboard() {
  // Call each endpoint
  const {
    data: instructorsCount = 0,
    isLoading: isLoadingInstructors,
    isError: isErrorInstructors,
  } = useGetNumberOfInstructorsQuery()
  const {
    data: studentsCount = 0,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = useGetNumberOfStudentsQuery()
  const { data: totalRevenue = 0, isLoading: isLoadingRevenue, isError: isErrorRevenue } = useGetTotalRevenueQuery()
  const {
    data: totalCoursesBought = 0,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useGetTotalCoursesBoughtQuery()

  // Optionally handle loading / error states
  if (isLoadingInstructors || isLoadingStudents || isLoadingRevenue || isLoadingCourses) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isErrorInstructors || isErrorStudents || isErrorRevenue || isErrorCourses) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">Failed to load dashboard data!</div>
      </div>
    )
  }

  // Mock data for chart
  const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  // Mock data for top courses
  const topCourses = [
    { id: 1, name: "Web Development Bootcamp", sku: "WDB1001", price: "$89", sold: "2.3k" },
    { id: 2, name: "Data Science Fundamentals", sku: "DSF2002", price: "$79", sold: "1.8k" },
    { id: 3, name: "UI/UX Design Masterclass", sku: "UXD3003", price: "$69", sold: "1.5k" },
  ]

  // Mock data for team members
  const topStudents = [
    { id: 1, name: "Sarah Johnson", role: "Lead Instructor", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Michael Chen", role: "Course Director", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Aisha Patel", role: "Student Success", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-primary" />
            EduPlatform
            <span className="text-sm font-normal text-muted-foreground ml-3">{studentsCount} students</span>
          </h1>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="uppercase tracking-wide">#PLATFORM-OVERVIEW</span>
          <span className="ml-4">Updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">  

        <div className="bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:-translate-y-1">       
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">     
              <GraduationCap className="h-4 w-4 inline mr-1" /> Students
          </div>
          <div>
            <div className="text-2xl font-bold">{studentsCount}</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-sm font-medium">{Math.round(studentsCount * 0.8)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">New</p>
                <p className="text-sm font-medium">{Math.round(studentsCount * 0.2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:-translate-y-1">       
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">     
              <Users className="h-4 w-4 inline mr-1" /> Instructors
          </div>
          <div>
            <div className="text-2xl font-bold">{instructorsCount}</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-sm font-medium">{Math.round(instructorsCount * 0.9)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">New</p>
                <p className="text-sm font-medium">{Math.round(instructorsCount * 0.1)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:-translate-y-1">       
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">     
              <BookOpen className="h-4 w-4 inline mr-1" /> Courses Bought
          </div>
          <div>
            <div className="text-2xl font-bold">{totalCoursesBought}</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-sm font-medium">{Math.round(totalCoursesBought * 0.65)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">In Progress</p>
                <p className="text-sm font-medium">{Math.round(totalCoursesBought * 0.35)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:-translate-y-1">       
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">     
              <DollarSign className="h-4 w-4 inline mr-1" /> Total Revenue
          </div>
          <div>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="text-sm font-medium">${Math.round(totalRevenue * 0.15).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Month</p>
                <p className="text-sm font-medium">${Math.round(totalRevenue * 0.12).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
        {/* Popular Categories */}
        <div className="lg:col-span-4 bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Programming", count: "4.4k", icon: "💻" },
              { name: "Design", count: "3.6k", icon: "🎨" },
              { name: "Business", count: "3.1k", icon: "📊" },
              { name: "Marketing", count: "2.9k", icon: "📱" },
              { name: "Data Science", count: "2.7k", icon: "📈" },
              { name: "Language", count: "1.2k", icon: "🗣️" },
            ].map((category, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg">
                <div className="text-2xl mr-3">{category.icon}</div>
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{category.count} students</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="lg:col-span-6 bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
          <div className="h-[250px] flex items-end justify-between">
            {chartMonths.map((month, index) => {
              // Generate random heights for the bars
              const height = 30 + Math.random() * 70
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 bg-primary/80 rounded-t-md" style={{ height: `${height}%` }}></div>
                  <div className="mt-2 text-xs">{month}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-md">
            <div className="text-sm font-medium">Jul 2024</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <div className="text-sm text-muted-foreground">Total Enrollments</div>
                <div className="text-lg font-bold">235</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
                <div className="text-lg font-bold">${totalRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Top Courses */}
        <div className="lg:col-span-7 bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top Courses</h2>
            <button className="text-sm text-blue-500 hover:underline flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {topCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-xs text-muted-foreground">SKU: {course.sku}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{course.price}/item</div>
                  <div className="text-xs text-muted-foreground">{course.sold} sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="lg:col-span-3 bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Top Student</h2>
          <div className="space-y-4">
            {topStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <img
                    src={student.avatar || "/placeholder.svg"}
                    alt={student.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.role}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 rounded-full hover:bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-muted">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

