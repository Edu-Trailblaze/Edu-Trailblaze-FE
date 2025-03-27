import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../config/axios"; 
import { useGetTotalRevenueByMonthQuery, useGetTotalEnrollmentsByMonthQuery } from "@/redux/services/dashboard.service";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function PerformanceOverview() {
  const [selectedMonth, setSelectedMonth] = useState<number>(monthsToShow[0]);

  const { data: revenueData, isLoading: isRevenueLoading } = useGetTotalRevenueByMonthQuery({
    month: selectedMonth,
    year: new Date().getFullYear(),
  });
  const { data: enrollmentData, isLoading: isEnrollmentLoading } = useGetTotalEnrollmentsByMonthQuery({
    month: selectedMonth,
    year: new Date().getFullYear(),
  });

  const [chartRevenue, setChartRevenue] = useState<number[]>([]);
  const [chartEnrollments, setChartEnrollments] = useState<number[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(true);


  useEffect(() => {
    async function fetchChartData() {
      const revenueValues: number[] = [];
      const enrollmentValues: number[] = [];
      const currentYear = new Date().getFullYear();
  
      await Promise.all(
        monthsToShow.map(async (month, index) => {
          
          try {
            const revenueResponse = await api.get(
              `/Order/total-revenue-by-month?month=${month}&year=${currentYear}`
            );
            // Gán vào vị trí index thay vì push
            revenueValues[index] = revenueResponse.data.data;
          } catch (error) {
            revenueValues[index] = 0;
          }
      
          try {
            const enrollmentResponse = await api.get(
              `/Enrollment/total-enrollment-by-month?month=${month}&year=${currentYear}`
            );
            // Gán vào vị trí index thay vì push
            enrollmentValues[index] = enrollmentResponse.data.data;
          } catch (error) {
            enrollmentValues[index] = 0;
          }
        })
      );
      
  
      console.log("Final revenueValues =", revenueValues);
      console.log("Final enrollmentValues =", enrollmentValues);
  
      setChartRevenue(revenueValues);
      setChartEnrollments(enrollmentValues);
      setIsChartLoading(false);
    }
  
    fetchChartData();
  }, []);
  

  // Cấu hình dữ liệu cho Bar Chart
  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Revenue",
        data: chartRevenue,
        backgroundColor: "rgba(49, 130, 206, 0.7)",
      },
      {
        label: "Enrollments",
        data: chartEnrollments,
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 1,
      },
    },
    plugins: {
      legend: {
        position: "top" as const, 
      },
      title: {
        display: true,
        text: "Performance Overview - 12 Months",
      },
    },
  };
  

  // Hàm xử lý khi click vào một cột (tháng)
  const handleClick = (month: number): void => {
    setSelectedMonth(month);
  };

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

      {/* Bar Chart hiển thị dữ liệu cho 12 tháng */}
      <div className="mb-4">
        {isChartLoading ? (
          <div>Loading chart data...</div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Phần hiển thị dạng cột nhỏ (click để chọn tháng) */}
      <div className="flex justify-around mb-4">
        {monthsToShow.map((month, index) => (
          <div
            key={month}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => handleClick(month)}
          >
            <div className="text-center font-medium text-blue-900">
              {monthNames[index]}
            </div>
            <div className="flex space-x-2 mt-2">
              <div
                className="w-4 bg-blue-500"
                style={{ height: month === selectedMonth ? "80%" : "60%" }}
                title="Revenue"
              />
              <div
                className="w-4 bg-green-500"
                style={{ height: month === selectedMonth ? "70%" : "50%" }}
                title="Enrollments"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Phần thông tin chi tiết cho tháng được chọn */}
      <div
        className="p-4 rounded-lg"
        style={{
          background: "rgba(219, 234, 254, 0.3)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(191, 219, 254, 0.4)",
        }}
      >
        <div className="text-sm font-medium text-blue-900">
          {monthNames[monthsToShow.indexOf(selectedMonth)]}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <div className="text-sm text-blue-700">Total Enrollments</div>
            <div className="text-lg font-bold text-blue-900">
              {isEnrollmentLoading ? "Loading..." : enrollmentData ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-sm text-blue-700">Total Revenue</div>
            <div className="text-lg font-bold text-blue-900">
              {isRevenueLoading
                ? "Loading..."
                : revenueData
                ? revenueData.toLocaleString() + " VND"
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
