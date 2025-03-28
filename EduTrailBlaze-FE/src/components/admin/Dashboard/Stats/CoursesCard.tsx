import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import {
  useGetTotalCoursesBoughtQuery,
  useGetNearestTimeForEnrollmentsQuery,
} from "@/redux/services/dashboard.service"

export default function CoursesCard() {
  const {
    data: totalCoursesBought = 0,
    isLoading: isLoadingTotal,
    isError: isErrorTotal,
  } = useGetTotalCoursesBoughtQuery()

  const {
    data: enrollmentsData,
    isLoading: isLoadingEnroll,
    isError: isErrorEnroll,
  } = useGetNearestTimeForEnrollmentsQuery({ time: "month" })

  // Nếu một trong hai API đang loading
  if (isLoadingTotal || isLoadingEnroll) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(236, 253, 245, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-green-700">Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse text-green-700">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  // Nếu có lỗi từ bất kỳ API nào hoặc không có dữ liệu enrollments
  if (isErrorTotal || isErrorEnroll || !enrollmentsData) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(236, 253, 245, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-green-700">Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600">Error fetching data</div>
        </CardContent>
      </Card>
    )
  }

  // Lấy dữ liệu enrollments tháng này và tháng trước từ API enrollments
  const currentMonthEnrollments = enrollmentsData[0]?.data ?? 0
  const lastMonthEnrollments = enrollmentsData[1]?.data ?? 0

  return (
    <Card
      className="border-0 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(135deg, rgba(236, 253, 245, 0.8), rgba(209, 250, 229, 0.7))",
        backdropFilter: "blur(8px)",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-green-700">
          <BookOpen className="h-4 w-4 mr-2" /> Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-900">
          {totalCoursesBought}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-green-700">This Month</p>
            <p className="text-sm font-medium text-green-800">
              {currentMonthEnrollments}
            </p>
          </div>
          <div>
            <p className="text-xs text-green-700">Last Month</p>
            <p className="text-sm font-medium text-green-800">
              {lastMonthEnrollments}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
