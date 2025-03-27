import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useGetNumberOfInstructorsQuery } from "@/redux/services/dashboard.service"

export default function InstructorsCard() {
  const {
    data: instructorsCount = 0,
    isLoading,
    isError,
  } = useGetNumberOfInstructorsQuery()

  if (isLoading) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Instructors</CardTitle></CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Instructors</CardTitle></CardHeader>
        <CardContent>Error fetching data</CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium flex items-center text-purple-700">
        <Users className="h-4 w-4 mr-2" /> Instructors
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-5xl font-bold text-purple-900">{instructorsCount}</div>
      {/* <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-xs text-purple-700">Active</p>
          <p className="text-sm font-medium">{Math.round(instructorsCount * 0.9)}</p>
        </div>
        <div>
          <p className="text-xs text-purple-700">New</p>
          <p className="text-sm font-medium">{Math.round(instructorsCount * 0.1)}</p>
        </div>
      </div> */}
    </CardContent>
  </Card>
  )
}
