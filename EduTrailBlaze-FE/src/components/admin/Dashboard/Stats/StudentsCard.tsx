import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { useGetNumberOfStudentsQuery } from "@/redux/services/dashboard.service"

export default function StudentsCard() {
  const {
    data: studentsCount = 0,
    isLoading,
    isError,
  } = useGetNumberOfStudentsQuery()

  if (isLoading) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Students</CardTitle></CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Students</CardTitle></CardHeader>
        <CardContent>Error fetching data</CardContent>
      </Card>
    )
  }

  return (
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
  )
}
