import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { useGetTotalRevenueQuery, useGetNearestTimeForRevenueQuery } from "@/redux/services/dashboard.service"
import { formatCurrency } from "@/helper/format"

export default function RevenueCard() {
  // Đổi tên biến khi destructure
  const {
    data: totalRevenue = 0,
    isLoading: isLoadingTotal,
    isError: isErrorTotal,
  } = useGetTotalRevenueQuery()

  const {
    data: revenueData,
    isLoading: isLoadingNearest,
    isError: isErrorNearest,
  } = useGetNearestTimeForRevenueQuery({ time: 'month' })

  // Kiểm tra loading
  if (isLoadingTotal || isLoadingNearest) {
    return (
      <Card 
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(254, 249, 195, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-amber-700">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse text-amber-700">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  // Kiểm tra error
  if (isErrorTotal || isErrorNearest || !revenueData) {
    return (
      <Card
        className="border-0 overflow-hidden"
        style={{
          background: "rgba(254, 249, 195, 0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-amber-700">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600">Error fetching data</div>
        </CardContent>
      </Card>
    )
  }

  const currentMonthRevenue = revenueData[0]?.data || 0
  const lastMonthRevenue = revenueData[1]?.data || 0

  return (
    <Card
      className="border-0 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(135deg, rgba(254, 249, 195, 0.8), rgba(254, 240, 138, 0.7))",
        backdropFilter: "blur(8px)",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)",
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-amber-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-amber-900">
          {formatCurrency(totalRevenue)}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-amber-700">This Month</p>
            <p className="text-sm font-medium text-amber-800">
              {formatCurrency(currentMonthRevenue)}
            </p>
          </div>
          <div>
            <p className="text-xs text-amber-700">Last Month</p>
            <p className="text-sm font-medium text-amber-800">
              {formatCurrency(lastMonthRevenue)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
