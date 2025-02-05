'use client'
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { courseData } from "@/components/admin/mockData/courseData";


import ModalEdit from "@/components/admin/modal/ModalEdit";
import DateRangePicker from "@/components/admin/button/dateRangePicker";
import FilterButton from "@/components/admin/button/filterButton";
import SearchSection from "@/components/admin/button/searchSection";
import Loader from "@/components/animate/loader/loader";
import dayjs from "dayjs";


export default function CoursesManagement() {
    const [courses, setCourses] = useState<ICourse[]>(courseData);
    const [startDay, setStartDay] = useState<dayjs.Dayjs | null>(null);
    const [endDay, setEndDay] = useState<dayjs.Dayjs | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filters, setFilters] = useState<Record<string, { min?: number; max?: number }>>({});
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 700);
    }, []);


    const handleSearch = (value: string) => {
        setSearchValue(value.toLowerCase());
    };

    const handleApplyFilters = (newFilters: Record<string, { min?: number; max?: number }>) => {
        setFilters(newFilters);
    };

    const filteredCourses = courses.filter((course) => {
        const courseCreatedDate = dayjs(course.createdAt);

        const matchesSearch =
            searchValue === "" ||
            course.courseId.toString().includes(searchValue) ||
            course.title.toLowerCase().includes(searchValue);

        const matchesDateRange =
            (!startDay || courseCreatedDate.isAfter(startDay.subtract(1, "day"))) &&
            (!endDay || courseCreatedDate.isBefore(endDay.add(1, "day")));

        const matchesPrice =
            (!filters.price?.min || course.price >= filters.price.min) &&
            (!filters.price?.max || course.price <= filters.price.max);

        const matchesRating =
            (!filters.averageRating?.min || course.review.averageRating >= filters.averageRating.min) &&
            (!filters.averageRating?.max || course.review.averageRating <= filters.averageRating.max);

        const matchesStudents =
            (!filters.totalEnrollments?.min || course.enrollment.totalEnrollments >= filters.totalEnrollments.min) &&
            (!filters.totalEnrollments?.max || course.enrollment.totalEnrollments <= filters.totalEnrollments.max);

        return matchesSearch && matchesDateRange && matchesPrice && matchesRating && matchesStudents;
    });

    const handleEdit = (courseId: number) => {
        setIsEditModalOpen(true);
    };


    const handleSave = async (updatedData: ICourse) => {
        setIsEditModalOpen(false);

    };


    const handleDelete = async (courseId: number) => {
        setIsEditModalOpen(false);

    };



    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <div className="flex justify-start items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-black">COURSES MANAGEMENT</h1>
                {/* Date Picker */}
                <DateRangePicker
                    startDay={startDay}
                    endDay={endDay}
                    onStartChange={(newValue) => setStartDay(newValue)}
                    onEndChange={(newValue) => setEndDay(newValue)}
                />
            </div>

            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-4 w-2/5">
                    <SearchSection onSearchChange={handleSearch} />
                    <FilterButton
                        fieldsToFilter={[
                            { key: "price", label: "Price Range" },
                            { key: "averageRating", label: "Rating" },
                            { key: "totalEnrollments", label: "Students" },
                        ]}
                        onApplyFilters={handleApplyFilters}
                    />
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">Page 2 of 78</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            &lt;
                        </button>
                        <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>


            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto"> <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Course ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Difficulty</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Instructor</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Discount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Rating</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Students</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created By</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                    </tr>
                </thead>
                    {loading ? (
                        <div className="flex items-center justify-center " suppressHydrationWarning>
                            <div className="flex flex-col items-center justify-center mt-5 mb-5">
                                <Loader className="w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin" />
                                <p className="mt-2 text-gray-500 text-sm">Loading courses...</p>
                            </div>
                        </div>

                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center text-gray-500 py-6">No courses found.</div>

                    ) : (

                        <tbody>
                            {filteredCourses.map((course) => (
                                <tr key={course.courseId} className="border-b hover:bg-gray-50">

                                    <td className="px-4 py-4 text-sm text-gray-700">{course.courseId}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{course.title}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{course.difficultyLevel}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {Array.isArray(course.instructors) ? course.instructors.map((inst) => inst.userName).join(", ") : "N/A"}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {course.discount
                                            ? `-${course.discount.calculatedDiscount} ($${course.discount.calculatedPrice} Final)` : "No Discount"}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {course.review.averageRating}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{course.enrollment.totalEnrollments}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{course.createdBy}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{dayjs(course.createdAt).format("YYYY-MM-DD")}</td>
                                    <td className="px-4 py-4">
                                        <button className="text-blue-600" onClick={() => handleEdit(course.courseId)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>

            </div>

            {/* Modal */}
            {selectedCourse && (
                <ModalEdit
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    initialData={selectedCourse}
                    fields={[
                        { key: "title", label: "Title" },
                        { key: "difficultyLevel", label: "Difficulty Level" },
                        { key: "price", label: "Price", type: "number" },
                        { key: "discountValue", label: "Discount Value", type: "number" },
                    ]}
                    title="Edit Course"
                    onSave={handleSave}
                    onDelete={() => handleDelete(selectedCourse.courseId)}
                />
            )}
        </div>
    );
}
