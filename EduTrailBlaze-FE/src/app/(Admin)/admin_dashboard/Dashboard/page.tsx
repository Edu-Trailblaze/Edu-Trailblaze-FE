"use client"
import { Users, GraduationCap, BookOpen, DollarSign, ChevronRight, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  useGetNumberOfInstructorsQuery,
  useGetNumberOfStudentsQuery,
  useGetTotalRevenueQuery,
  useGetTotalCoursesBoughtQuery,
} from "@/redux/services/dashboard.service"
import { useRouter } from "next/router";


export default function Dashboard() {
  const router = useRouter();


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
    <div
      className="min-h-screen p-4"
      style={{
        background: "linear-gradient(120deg, #1a365d 0%, #3182ce 50%, #ebf8ff 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-blue-900/10 p-4 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold flex items-center text-blue-900">
              <BookOpen className="mr-2 h-6 w-6 text-blue-700" />
              EduPlatform
              <span className="text-sm font-normal text-blue-700 ml-3">{studentsCount} students</span>
            </h1>
          </div>
          <div className="text-sm text-blue-700">
            <span className="ml-4">Updated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-blue-700">
                <GraduationCap className="h-4 w-4 mr-2" /> Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{studentsCount}</div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-blue-700">Active</p>
                  <p className="text-sm font-medium">{Math.round(studentsCount * 0.8)}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-700">New</p>
                  <p className="text-sm font-medium">{Math.round(studentsCount * 0.2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-purple-700">
                <Users className="h-4 w-4 mr-2" /> Instructors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{instructorsCount}</div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-purple-700">Active</p>
                  <p className="text-sm font-medium">{Math.round(instructorsCount * 0.9)}</p>
                </div>
                <div>
                  <p className="text-xs text-purple-700">New</p>
                  <p className="text-sm font-medium">{Math.round(instructorsCount * 0.1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-green-700">
                <BookOpen className="h-4 w-4 mr-2" /> Courses Bought
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{totalCoursesBought}</div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-green-700">Completed</p>
                  <p className="text-sm font-medium">{Math.round(totalCoursesBought * 0.65)}</p>
                </div>
                <div>
                  <p className="text-xs text-green-700">In Progress</p>
                  <p className="text-sm font-medium">{Math.round(totalCoursesBought * 0.35)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-amber-700">
                <DollarSign className="h-4 w-4 mr-2" /> Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">${totalRevenue.toLocaleString()}</div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-amber-700">This Month</p>
                  <p className="text-sm font-medium">${Math.round(totalRevenue * 0.15).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-amber-700">Last Month</p>
                  <p className="text-sm font-medium">${Math.round(totalRevenue * 0.12).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
          {/* Popular Categories */}
          <div className="lg:col-span-4 bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Popular Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Programming", count: "4.4k", icon: "💻", color: "bg-blue-100 text-blue-700" },
                { name: "Design", count: "3.6k", icon: "🎨", color: "bg-purple-100 text-purple-700" },
                { name: "Business", count: "3.1k", icon: "📊", color: "bg-green-100 text-green-700" },
                { name: "Marketing", count: "2.9k", icon: "📱", color: "bg-amber-100 text-amber-700" },
                { name: "Data Science", count: "2.7k", icon: "📈", color: "bg-cyan-100 text-cyan-700" },
                { name: "Language", count: "1.2k", icon: "🗣️", color: "bg-rose-100 text-rose-700" },
              ].map((category, index) => (
                <div key={index} className={`flex items-center p-3 rounded-lg shadow-sm ${category.color}`}>
                  <div className="text-2xl mr-3">{category.icon}</div>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs opacity-80">{category.count} students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="lg:col-span-6 bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Performance Overview</h2>
            <div className="h-[250px] flex items-end justify-between">
              {chartMonths.map((month, index) => {
                // Generate random heights for the bars
                const height = 30 + Math.random() * 70
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-12 rounded-t-md"
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(to top, #3182ce, #63b3ed)`,
                      }}
                    ></div>
                    <div className="mt-2 text-xs text-blue-800">{month}</div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 p-4 bg-blue-100/50 rounded-md">
              <div className="text-sm font-medium text-blue-900">Jul 2024</div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-sm text-blue-700">Total Enrollments</div>
                  <div className="text-lg font-bold text-blue-900">235</div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Total Revenue</div>
                  <div className="text-lg font-bold text-blue-900">${totalRevenue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Top Courses */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-900">Top Courses</h2>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                onClick={() => router.push("/admin_dashboard/Dashboard/courses")}
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {topCourses.map((course, idx) => {
                const colors = [
                  "bg-blue-50 border-blue-100 hover:bg-blue-100/70",
                  "bg-purple-50 border-purple-100 hover:bg-purple-100/70",
                  "bg-green-50 border-green-100 hover:bg-green-100/70",
                ]
                return (
                  <div
                    key={course.id}
                    className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${colors[idx % colors.length]}`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center mr-3 bg-white rounded-full shadow-sm">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">{course.name}</div>
                        <div className="text-xs text-blue-700">SKU: {course.sku}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-blue-900">{course.price}/item</div>
                      <div className="text-xs text-blue-700">{course.sold} sold</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Students */}
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Top Student</h2>
            <div className="space-y-4">
              {topStudents.map((student, idx) => {
                const colors = [
                  "bg-blue-50 border-blue-100 hover:bg-blue-100/70",
                  "bg-purple-50 border-purple-100 hover:bg-purple-100/70",
                  "bg-green-50 border-green-100 hover:bg-green-100/70",
                ]
                return (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${colors[idx % colors.length]}`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full mr-3 overflow-hidden border-2 border-white shadow-sm">
                        <img
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">{student.name}</div>
                        <div className="text-xs text-blue-700">{student.role}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-white/80 text-blue-600 hover:text-blue-800">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-white/80 text-blue-600 hover:text-blue-800">
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

