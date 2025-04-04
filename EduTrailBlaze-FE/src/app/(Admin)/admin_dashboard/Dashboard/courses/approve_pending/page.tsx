"use client"

import React, { useState } from "react"
import { TableRow, TableCell } from "@mui/material"
import { useGetPendingCoursesQuery } from "@/redux/services/dashboard.service"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Import services approveCourse, approveCourseByAI
import {
  useApproveCourseMutation,
  useApproveCourseByAIMutation
} from "@/redux/services/courseDetail.service"

import Table from "@/components/admin/Table/Table"
import Pagination from "@/components/admin/Pagination/Pagination"
import Loader from "@/components/animate/loader/loader"
import FormatDateTime from "@/components/admin/Date/FormatDateTime"
import DetailPopup from "@/components/global/Popup/PopupDetail"
import StatusModal from "@/components/admin/Modal/CourseFormModal/CourseStatusModal"

import { RefreshCw, Bot } from "lucide-react"

// Kiểu approval status
type CourseApprovalStatus = "Approved" | "Rejected" | "Pending"

interface PendingCourseItem {
  id: number
  title: string
  imageURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: string
  approvalStatus: string
  createdAt: string
  learningOutcomes: string[]
  prerequisites:string
}

export default function ApprovePendingCourses() {
  // Pagination local
  const [pageIndex, setPageIndex] = useState(1)
  const pageSize = 10

  // Quản lý mở/đóng modal thay đổi status
  const [selectedCourse, setSelectedCourse] = useState<PendingCourseItem | null>(null)
  const [isStatusModalOpen, setStatusModalOpen] = useState(false)
  const [statusCourseId, setStatusCourseId] = useState<number | null>(null)
  const [statusCurrent, setStatusCurrent] = useState<CourseApprovalStatus>("Pending")

  // Call service mutations
  const [approveCourse] = useApproveCourseMutation()
  const [approveCourseByAI] = useApproveCourseByAIMutation()

  // Gọi API getPendingCourses
  const { data, isLoading, isError } = useGetPendingCoursesQuery({
    pageIndex,
    pageSize
  })

  const pendingCourses = data?.items || []
  const totalPages = data?.totalPages || 1

  const handleApproveOrReject = async (courseId: number, newStatus: CourseApprovalStatus) => {
    try {
      await approveCourse({ courseId, status: newStatus }).unwrap()
      toast.success(`Course #${courseId} is now ${newStatus}!`)
    } catch (error) {
      console.error("Error updating course status:", error)
      toast.error("Failed to update course status!")
    }
  }

  // Render row
  const renderRow = (course: PendingCourseItem) => (
    <TableRow
      key={course.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100 cursor-pointer"
      hover
      onClick={() => setSelectedCourse(course)}
    >
      <TableCell className="p-4">{course.id}</TableCell>
      <TableCell>{course.title}</TableCell>
      <TableCell>{course.price}</TableCell>
      <TableCell>{course.duration}</TableCell>
      <TableCell>{course.difficultyLevel}</TableCell>
      <TableCell>{course.approvalStatus}</TableCell>
    </TableRow>
  )

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Title", accessor: "title" },
    { label: "Price", accessor: "price" },
    { label: "Duration", accessor: "duration" },
    { label: "Difficulty", accessor: "difficultyLevel" },
    { label: "Status", accessor: "approvalStatus" }
  ]

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-lg font-semibold mb-4">Approve Pending Courses</h1>

      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader className="w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin" />
          <p className="mt-2 text-gray-500 text-sm">Loading pending courses...</p>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-sm">Failed to load pending courses!</p>
      ) : (
        <>
          <Table columns={columns} data={pendingCourses} renderRow={renderRow} />

          <Pagination
            pageIndex={pageIndex}
            totalPages={totalPages}
            onPageChange={(page) => setPageIndex(page)}
          />
        </>
      )}

      {selectedCourse && (
        <DetailPopup
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
          title="Course Details"
          fields={[
            { label: "ID", value: selectedCourse.id ,  isID: true },
            { label: "Title", value: selectedCourse.title },
            {
              label: 'Price',
              value: selectedCourse.price ? selectedCourse.price + 'VND' : 'N/A'
            },
            {
              label: 'Duration',
              value: selectedCourse.duration ? selectedCourse.duration + ' hours' : 'N/A'
            },

            { label: "Status", value: <span style={{ color: "goldenrod" }}>{selectedCourse.approvalStatus}</span> },
            { label: "Image URL", value: selectedCourse.imageURL, isImage: true },
            {
              label: 'Difficulty',
              value: [
                {
                  label: selectedCourse.difficultyLevel ?? 'N/A',
                  color:
                  selectedCourse.difficultyLevel === 'Beginner'
                      ? 'green'
                      : selectedCourse.difficultyLevel === 'Intermediate'
                        ? 'blue'
                        : 'red'
                }
              ],
              isStatus: true
            },
            { label: "Date", value: <FormatDateTime date={selectedCourse.createdAt} /> },

          ]}
          widgets={[
            {
              label: 'Description',
              content: selectedCourse.description ?? 'No description available'
            },
            {
              label: 'Prerequisites',
              content: selectedCourse.prerequisites ?? 'No prerequisites available'
            },
            {
              label: 'Learning Outcomes',
              content: selectedCourse.learningOutcomes?.join('\n') || 'No outcomes'
            },

          ]}

          actions={[
            {
              label: "Change Status",
              icon: <RefreshCw style={{ color: "#F59E0B" }} />,
              onClick: () => {
                if (!selectedCourse) {
                  console.log("No course selected => cannot change status")
                  return
                }
                setStatusCourseId(selectedCourse.id)
                setStatusCurrent(selectedCourse.approvalStatus as CourseApprovalStatus)
                setStatusModalOpen(true)
              }
            },

          ]}
        />
      )}

      <StatusModal
        isOpen={isStatusModalOpen}
        currentStatus={statusCurrent}
        onClose={() => setStatusModalOpen(false)}
        onSubmit={(newStatus) => {
          if (!statusCourseId) return
          handleApproveOrReject(statusCourseId, newStatus)
          setStatusModalOpen(false)
        }}
      />
    </div>
  )
}
