import { Mail, Phone } from "lucide-react"

export default function TopStudents() {
  // const { data: topStudents, isLoading, isError } = useGetTopStudentsQuery()

  // Tạm mock
  const topStudents = [
    { id: 1, name: "Sarah Johnson", role: "Lead Instructor", avatar: "/placeholder.svg" },
    { id: 2, name: "Michael Chen", role: "Course Director", avatar: "/placeholder.svg" },
    { id: 3, name: "Aisha Patel", role: "Student Success", avatar: "/placeholder.svg" },
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
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
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${
                colors[idx % colors.length]
              }`}
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
  )
}
