import React from "react"

export default function PerformanceOverview() {
  // Ví dụ bạn có thể gọi API khác để lấy dữ liệu chart
  // const { data: performanceData, isLoading, isError } = useGetPerformanceDataQuery()

  // Tạm mock
  const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const totalRevenue = 16316292.88 // Ví dụ
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-900">Performance Overview</h2>
      <div className="h-[250px] flex items-end justify-between">
        {chartMonths.map((month, index) => {
          const height = 30 + Math.random() * 70
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-md"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, #3182ce, #63b3ed)`,
                }}
              />
              <div className="mt-2 text-xs text-blue-800">{month}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 p-4 bg-blue-100/50 rounded-md">
        <div className="text-sm font-medium text-blue-900">Jul 2024</div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <div className="text-sm text-blue-700">Total Enrollments</div>
            <div className="text-lg font-bold text-blue-900">235</div>
          </div>
          <div>
            <div className="text-sm text-blue-700">Total Revenue</div>
            <div className="text-lg font-bold text-blue-900">${totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
