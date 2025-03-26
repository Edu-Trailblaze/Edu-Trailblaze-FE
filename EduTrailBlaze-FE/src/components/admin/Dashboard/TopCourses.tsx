import { BookOpen } from "lucide-react"

export default function TopCourses() {
  // const { data: topCourses, isLoading, isError } = useGetTopCoursesQuery()

  // Tạm mock
  const topCourses = [
    { id: 1, name: "Web Development Bootcamp", sku: "WDB1001", price: "$89", sold: "2.3k" },
    { id: 2, name: "Data Science Fundamentals", sku: "DSF2002", price: "$79", sold: "1.8k" },
    { id: 3, name: "UI/UX Design Masterclass", sku: "UXD3003", price: "$69", sold: "1.5k" },
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-900">Top Courses</h2>
      </div>
      <div className="space-y-4">
        {topCourses.map((course, idx) => {
          const colors = [
            "bg-blue-50 border-blue-100 hover:bg-blue-100/70",
            "bg-purple-50 border-purple-100 hover:bg-purple-100/70",
            "bg-green-50 border-green-100 hover:bg-green-100/70",
          ]
          return (
            <div
              key={course.id}
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${
                colors[idx % colors.length]
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center mr-3 bg-white rounded-full shadow-sm">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-blue-900">{course.name}</div>
                  <div className="text-xs text-blue-700">SKU: {course.sku}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-900">{course.price}/item</div>
                <div className="text-xs text-blue-700">{course.sold} sold</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
