import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { useGetTotalRevenueQuery } from "@/redux/services/dashboard.service"

export default function RevenueCard() {
  const {
    data: totalRevenue = 0,
    isLoading,
    isError,
  } = useGetTotalRevenueQuery()


  if (isLoading) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
        <CardContent>Error fetching data</CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium flex items-center text-amber-700">
        <DollarSign className="h-4 w-4 mr-2" />Revenue
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-amber-900">${totalRevenue.toLocaleString()}</div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-xs text-amber-700">This Month</p>
          <p className="text-sm font-medium">${Math.round(totalRevenue * 0.15).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-amber-700">Last Month</p>
          <p className="text-sm font-medium">${Math.round(totalRevenue * 0.12).toLocaleString()}</p>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
