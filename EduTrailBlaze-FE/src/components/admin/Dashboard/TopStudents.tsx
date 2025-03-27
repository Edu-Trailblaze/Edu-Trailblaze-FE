import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useGetTopStudentsEnrollmentQuery } from "@/redux/services/dashboard.service"

export default function TopStudents() {
  const { data: topStudents, isLoading, isError } = useGetTopStudentsEnrollmentQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading top students</div>

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Top Students</h2>
        <Link
          href="/admin_dashboard/Dashboard/courses"
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {topStudents?.map((student, idx) => {
          const colors = [
            "bg-blue-50 border-blue-100 hover:bg-blue-100/70",
            "bg-purple-50 border-purple-100 hover:bg-purple-100/70",
            "bg-green-50 border-green-100 hover:bg-green-100/70",
          ]
          return (
            <div
              key={student.email}
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${
                colors[idx % colors.length]
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-3 overflow-hidden border-2 border-white shadow-sm">
                  {/* Vì API không cung cấp avatar nên dùng placeholder */}
                  <img
                    src="/placeholder.svg"
                    alt={student.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-blue-900">{student.fullName}</div>
                  <div className="text-xs text-blue-700">{student.email}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                {student.email && (
                  <a href={`mailto:${student.email}`}>
                    <button className="p-1 rounded-full hover:bg-white/80 text-blue-600 hover:text-blue-800">
                      <Mail className="h-4 w-4" />
                    </button>
                  </a>
                )}
                {student.phoneNumber && (
                  <a href={`tel:${student.phoneNumber}`}>
                    <button className="p-1 rounded-full hover:bg-white/80 text-blue-600 hover:text-blue-800">
                      <Phone className="h-4 w-4" />
                    </button>
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
