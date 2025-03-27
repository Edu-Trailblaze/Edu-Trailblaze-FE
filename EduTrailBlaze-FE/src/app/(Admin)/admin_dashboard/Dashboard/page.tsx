"use client"
import PopularCategories from "@/components/admin/Dashboard/PopularCategories"
import PerformanceOverview from "@/components/admin/Dashboard/PerformanceOverview"
import TopCourses from "@/components/admin/Dashboard/TopCourses"
import TopStudents from "@/components/admin/Dashboard/TopStudents"

// Stat cards
import StudentsCard from "@/components/admin/Dashboard/Stats/StudentsCard"
import InstructorsCard from "@/components/admin/Dashboard/Stats/InstructorsCard"
import CoursesCard from "@/components/admin/Dashboard/Stats/CoursesCard"
import RevenueCard from "@/components/admin/Dashboard/Stats/RevenueCard"

export default function Dashboard() {
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: "linear-gradient(120deg, #1a365d 0%, #3182ce 50%, #ebf8ff 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-blue-900/10 p-4 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold flex items-center text-blue-900">
              EduPlatform
            </h1>
          </div>
          <div className="text-sm text-blue-700">
            <span className="ml-4">Updated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StudentsCard />
          <InstructorsCard />
          <CoursesCard />
          <RevenueCard />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
          <div className="lg:col-span-4">
            <PopularCategories />
          </div>
          <div className="lg:col-span-6">
            <PerformanceOverview />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-7">
            <TopCourses />
          </div>
          <div className="lg:col-span-3">
            <TopStudents />
          </div>
        </div>
      </div>
    </div>
  )
}
