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
        className="min-h-screen p-4 md:p-6"
        style={{
          background: "linear-gradient(120deg, #1a365d 0%, #3182ce 50%, #ebf8ff 100%)",
        }}
      >
        <div 
          className="container mx-auto max-w-7xl rounded-xl shadow-xl p-4 md:p-6"
          style={{
            background: "linear-gradient(120deg, rgba(26, 54, 93, 0.15) 0%, rgba(49, 130, 206, 0.15) 50%, rgba(235, 248, 255, 0.25) 100%)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.25)"
          }}
        >
        {/* Header */}
        <div 
          className="flex justify-between items-center mb-6 p-4 rounded-lg" 
          style={{
            background: "linear-gradient(to right, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}
        >
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700">
              EduPlatform
            </h1>

          </div>
          <div className="text-sm font-medium text-blue-800 flex items-center">
            <span className="hidden sm:inline mr-2">Last updated:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className="p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <StudentsCard />
          </div>
          <div
            className="p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <InstructorsCard />
          </div>
          <div
            className="p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <CoursesCard />
          </div>
          <div
            className="p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <RevenueCard />
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
          <div
            className="lg:col-span-4 p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <div
              className="h-full"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)", borderRadius: "0.5rem" }}
            >
              <PopularCategories />
            </div>
          </div>
          <div
            className="lg:col-span-6 p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <div
              className="h-full"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)", borderRadius: "0.5rem" }}
            >
              <PerformanceOverview />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div
            className="lg:col-span-7 p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <div
              className="h-full"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)", borderRadius: "0.5rem" }}
            >
              <TopCourses />
            </div>
          </div>
          <div
            className="lg:col-span-3 p-0.5 rounded-lg"
            style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))" }}
          >
            <div
              className="h-full"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)", borderRadius: "0.5rem" }}
            >
              <TopStudents />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

