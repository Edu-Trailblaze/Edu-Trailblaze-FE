import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { useGetTotalCoursesBoughtQuery } from "@/redux/services/dashboard.service"

export default function CoursesCard() {
  const { data: totalCoursesBought = 0, isLoading, isError } = useGetTotalCoursesBoughtQuery()

  if (isLoading) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(236, 253, 245, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
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

  if (isError) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(236, 253, 245, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
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

  return (
    <Card
      className="border-0 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, rgba(236, 253, 245, 0.8), rgba(209, 250, 229, 0.7))",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-green-700">
          <BookOpen className="h-4 w-4 mr-2" /> Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-900">{totalCoursesBought}</div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-green-700">Completed</p>
            <p className="text-sm font-medium text-green-800">{Math.round(totalCoursesBought * 0.65)}</p>
          </div>
          <div>
            <p className="text-xs text-green-700">In Progress</p>
            <p className="text-sm font-medium text-green-800">{Math.round(totalCoursesBought * 0.35)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

