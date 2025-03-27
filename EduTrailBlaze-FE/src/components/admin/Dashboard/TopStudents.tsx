import { Mail, Phone, Award, Users, UserCheck } from "lucide-react"
import Link from "next/link"
import { useGetTopStudentsEnrollmentQuery } from "@/redux/services/dashboard.service"

export default function TopStudents() {
  const { data: topStudents, isLoading, isError } = useGetTopStudentsEnrollmentQuery()

  if (isLoading)
    return (
      <div
        className="rounded-lg p-6 h-full"
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
        className="rounded-lg p-6 h-full"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-center items-center h-40 text-red-600">Error loading top students</div>
      </div>
    )

  return (
    <div
      className="rounded-lg p-6 h-full flex flex-col"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Top Students</h2>
          <div className="text-sm font-medium text-blue-700 mt-1">Highest enrollment activity</div>
        </div>
        <Link
          href="/admin_dashboard/Dashboard/users"
          className="px-4 py-2 rounded-md bg-blue-600/10 text-blue-700 hover:bg-blue-600/20 transition-colors font-medium text-sm flex items-center"
        >
          <Users className="h-4 w-4 mr-1.5" />
          View All
        </Link>
      </div>

      <div className="space-y-4 flex-grow">
        {topStudents?.map((student, idx) => {
          const colors = [
            { bg: "rgba(239, 246, 255, 0.7)", border: "rgba(147, 197, 253, 0.5)", accent: "bg-blue-100" },
            { bg: "rgba(243, 232, 255, 0.7)", border: "rgba(192, 132, 252, 0.5)", accent: "bg-purple-100" },
            { bg: "rgba(236, 253, 245, 0.7)", border: "rgba(110, 231, 183, 0.5)", accent: "bg-green-100" },
          ]

          const color = colors[idx % colors.length]
          const rank = idx + 1

          return (
            <div
              key={student.email}
              className="rounded-lg overflow-hidden transition-all hover:shadow-md"
              style={{
                background: `linear-gradient(135deg, ${color.bg}, rgba(255, 255, 255, 0.6))`,
                backdropFilter: "blur(4px)",
                border: `1px solid ${color.border}`,
              }}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img src="/placeholder.svg" alt={student.fullName} className="w-full h-full object-cover" />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 rounded-full ${color.accent} text-blue-800 w-5 h-5 flex items-center justify-center text-xs font-bold border border-white`}
                    >
                      {rank}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-blue-900">{student.fullName}</div>
                    <div className="text-xs text-blue-700 mt-0.5">{student.email}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {student.email && (
                    <a href={`mailto:${student.email}`}>
                      <button className="p-2 rounded-full bg-white/50 hover:bg-white/80 text-blue-600 hover:text-blue-800 transition-colors shadow-sm">
                        <Mail className="h-4 w-4" />
                      </button>
                    </a>
                  )}
                  {student.phoneNumber && (
                    <a href={`tel:${student.phoneNumber}`}>
                      <button className="p-2 rounded-full bg-white/50 hover:bg-white/80 text-blue-600 hover:text-blue-800 transition-colors shadow-sm">
                        <Phone className="h-4 w-4" />
                      </button>
                    </a>
                  )}
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
                  <UserCheck className="h-3 w-3 mr-1" />
                  <span>{student.totalEnrollments} courses completed</span>                
                </div>
                <div className="text-blue-700">
                  <span className="font-medium">Active</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer section to fill remaining space */}
      {topStudents && topStudents.length > 0 && (
        <div className="mt-auto pt-4 text-center text-sm text-blue-700 font-medium">
          <Award className="inline-block h-4 w-4 mr-1" />
          Top performers based on course enrollment and completion
        </div>
      )}
    </div>
  )
}

