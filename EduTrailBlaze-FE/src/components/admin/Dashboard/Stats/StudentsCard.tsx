import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { useGetNumberOfStudentsQuery } from "@/redux/services/dashboard.service"

export default function StudentsCard() {
  const { data: studentsCount = 0, isLoading, isError } = useGetNumberOfStudentsQuery()

  if (isLoading) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(239, 246, 255, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-blue-700">Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse text-blue-700">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(239, 246, 255, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-blue-700">Students</CardTitle>
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
        background: "linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(219, 234, 254, 0.7))",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-blue-700">
          <GraduationCap className="h-4 w-4 mr-2" /> Students
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold text-blue-900">{studentsCount}</div>
        {/* <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-blue-700">Active</p>
            <p className="text-sm font-medium">{Math.round(studentsCount * 0.8)}</p>
          </div>
          <div>
            <p className="text-xs text-blue-700">New</p>
            <p className="text-sm font-medium">{Math.round(studentsCount * 0.2)}</p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

