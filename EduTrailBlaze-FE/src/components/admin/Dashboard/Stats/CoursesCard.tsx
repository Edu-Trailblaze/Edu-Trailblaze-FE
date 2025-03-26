import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { useGetTotalCoursesBoughtQuery } from "@/redux/services/dashboard.service"

export default function CoursesCard() {
  const {
    data: totalCoursesBought = 0,
    isLoading,
    isError,
  } = useGetTotalCoursesBoughtQuery()


  if (isLoading) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Courses</CardTitle></CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Courses</CardTitle></CardHeader>
        <CardContent>Error fetching data</CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
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
          <p className="text-sm font-medium">{Math.round(totalCoursesBought * 0.65)}</p>
        </div>
        <div>
          <p className="text-xs text-green-700">In Progress</p>
          <p className="text-sm font-medium">{Math.round(totalCoursesBought * 0.35)}</p>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
