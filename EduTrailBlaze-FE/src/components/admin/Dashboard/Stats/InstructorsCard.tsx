import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useGetNumberOfInstructorsQuery } from "@/redux/services/dashboard.service"

export default function InstructorsCard() {
  const { data: instructorsCount = 0, isLoading, isError } = useGetNumberOfInstructorsQuery()

  if (isLoading) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(243, 232, 255, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-purple-700">Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse text-purple-700">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(243, 232, 255, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-purple-700">Instructors</CardTitle>
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
        background: "linear-gradient(135deg, rgba(243, 232, 255, 0.8), rgba(233, 213, 255, 0.7))",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
      }}
    >
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

