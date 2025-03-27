import { BookOpen } from "lucide-react"
import Link from "next/link"
import { useGetTopSaleCoursesQuery } from "@/redux/services/dashboard.service" 

export default function TopCourses() {
  const { data: topCourses, isLoading, isError } = useGetTopSaleCoursesQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading top courses</div>

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-900">Top Courses</h2>
        <Link
          href="/admin_dashboard/Dashboard/courses"
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {topCourses?.map((course, idx) => {
          const colors = [
            "bg-blue-50 border-blue-100 hover:bg-blue-100/70",
            "bg-purple-50 border-purple-100 hover:bg-purple-100/70",
            "bg-green-50 border-green-100 hover:bg-green-100/70",
            "bg-red-50 border-red-100 hover:bg-red-100/70",
            "bg-yellow-50 border-yellow-100 hover:bg-yellow-100/70",
          ]
          return (
            <div
              key={course.id}
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${
                colors[idx % colors.length]
              }`}
            >
              <div className="flex items-center">
                {course.imageURL ? (
                  <img
                    src={course.imageURL}
                    alt={course.title}
                    className="w-10 h-10 mr-3 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center mr-3 bg-white rounded-full shadow-sm">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-blue-900">{course.title}</div>
                  <div className="text-xs text-blue-700">ID: {course.id}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-900">
                  Sales: {course.totalSales}
                </div>
                <div className="text-xs text-blue-700">Rank: {course.rank}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
