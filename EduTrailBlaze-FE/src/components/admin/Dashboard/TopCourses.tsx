import { BookOpen, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useGetTopSaleCoursesQuery } from "@/redux/services/dashboard.service"
import { formatCurrency } from "@/helper/format"

export default function TopCourses() {
  const { data: topCourses, isLoading, isError } = useGetTopSaleCoursesQuery()
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" })

  if (isLoading)
    return (
      <div
        className="rounded-lg p-6"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-blue-900 font-medium">Loading...</div>
        </div>
      </div>
    )

  if (isError)
    return (
      <div
        className="rounded-lg p-6"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-center items-center h-40 text-red-600">Error loading top courses</div>
      </div>
    )

  return (
    <div
      className="rounded-lg p-6"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Top Courses</h2>
          <div className="text-sm font-medium text-blue-700 mt-1">Performance for {currentMonth}</div>
        </div>
        <Link
          href="/admin_dashboard/Dashboard/courses"
          className="px-4 py-2 rounded-md bg-blue-600/10 text-blue-700 hover:bg-blue-600/20 transition-colors font-medium text-sm flex items-center"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {topCourses?.map((course, idx) => {
          const colors = [
            { bg: "rgba(239, 246, 255, 0.7)", border: "rgba(147, 197, 253, 0.5)", icon: "text-blue-600" },
            { bg: "rgba(243, 232, 255, 0.7)", border: "rgba(192, 132, 252, 0.5)", icon: "text-purple-600" },
            { bg: "rgba(236, 253, 245, 0.7)", border: "rgba(110, 231, 183, 0.5)", icon: "text-green-600" },
            { bg: "rgba(254, 242, 242, 0.7)", border: "rgba(252, 165, 165, 0.5)", icon: "text-red-600" },
          ]

          const color = colors[idx % colors.length]

          return (
            <div
              key={course.id}
              className="rounded-lg transition-all hover:shadow-md overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color.bg}, rgba(255, 255, 255, 0.6))`,
                backdropFilter: "blur(4px)",
                border: `1px solid ${color.border}`,
              }}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  {course.imageURL ? (
                    <img
                      src={course.imageURL || "/placeholder.svg"}
                      alt={course.title}
                      className="w-12 h-12 mr-4 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 flex items-center justify-center mr-4 bg-white rounded-full shadow-sm ${color.icon}`}
                    >
                      <BookOpen className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-blue-900 text-base">{course.title}</div>
                    <div className="text-xs text-blue-700 mt-1 flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        ID: {course.id}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                <div className="font-bold text-blue-900 text-lg">{formatCurrency(course.totalSales)}</div>
                <div className="flex items-center mt-1">
                    <Award className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-xs font-medium text-blue-700">Rank {course.rank}</span>
                  </div>
                </div>
              </div>
              <div
                className="px-4 py-2 text-xs font-medium flex justify-between items-center"
                style={{
                  background: `rgba(255, 255, 255, 0.3)`,
                  borderTop: `1px solid ${color.border}`,
                }}
              >
                <div className="flex items-center text-blue-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Performance trending up</span>
                </div>
                {/* <div className="text-blue-700">
                  {idx === 0 ? "+12%" : idx === 1 ? "+8%" : idx === 2 ? "+5%" : "+3%"} this month
                </div> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

