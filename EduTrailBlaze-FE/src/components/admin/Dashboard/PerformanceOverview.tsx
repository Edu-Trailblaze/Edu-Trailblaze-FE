export default function PerformanceOverview() {
  // Ví dụ bạn có thể gọi API khác để lấy dữ liệu chart
  // const { data: performanceData, isLoading, isError } = useGetPerformanceDataQuery()

  const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const totalRevenue = 16316292.88 

  return (
    <div
      className="rounded-lg p-6"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-blue-900">Performance Overview</h2>
      <div
        className="h-[250px] flex items-end justify-between p-4 rounded-lg mb-4"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {chartMonths.map((month, index) => {
          const height = 30 + Math.random() * 70
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-md"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, rgba(49, 130, 206, 0.9), rgba(99, 179, 237, 0.8))`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
              <div className="mt-2 text-xs font-medium text-blue-800">{month}</div>
            </div>
          )
        })}
      </div>
      <div
        className="p-4 rounded-lg"
        style={{
          background: "rgba(219, 234, 254, 0.3)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(191, 219, 254, 0.4)",
        }}
      >
        <div className="text-sm font-medium text-blue-900">Jul 2024</div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <div className="text-sm text-blue-700">Total Enrollments</div>
            <div className="text-lg font-bold text-blue-900">235</div>
          </div>
          <div>
            <div className="text-sm text-blue-700">Total Revenue</div>
            <div className="text-lg font-bold text-blue-900">{totalRevenue.toLocaleString()} VND</div>
          </div>
        </div>
      </div>
    </div>
  )
}

