'use client'
import React, { useState } from "react";

import courseData from "@/components/admin/mockData/courseData";

import ModalEdit from "@/components/admin/modal/ModalEdit";

import DateRangePicker from "@/components/admin/button/dateRangePicker";
import FilterButton from "@/components/admin/button/filterButton";
import SearchSection from "@/components/admin/button/searchSection";
import dayjs from "dayjs";

interface Course {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    language: string;
    price: string;
}

export default function CoursesManagement() {

    const [startDay, setStartDay] = useState<dayjs.Dayjs | null>(null);
    const [endDay, setEndDay] = useState<dayjs.Dayjs | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState<'id' | 'name'>('id');



    const handleSearch = (value: string, type: 'id' | 'name') => {
        setSearchValue(value);
        setSearchType(type);
    };

    const filteredCourses = courseData.filter((course) => {
        if (!searchValue) return true;
        return searchType === 'id'
            ? course.id.includes(searchValue)
            : course.title.toLowerCase().includes(searchValue.toLowerCase());
    });


    const handleEdit = (course: Course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    const handleSave = (updatedCourse: Course) => {
        console.log("Updated Course:", updatedCourse);
        //function
        setIsEditModalOpen(false);
    };


    const handleDelete = () => {
        console.log("Delete clicked for course:", selectedCourse);
        //function
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
                    {/* Search */}
                    <SearchSection />
                    {/*Filter */}
                    <FilterButton />
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
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">COURSE ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">TITLE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">INSTRUCTOR</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">DURATION</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">LANGUAGE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">PRICE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData.map((course) => (
                            <tr key={course.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">{course.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.instructor}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.duration}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.language}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.price}</td>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-blue-600"
                                        onClick={() => handleEdit(course)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
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
                        { key: "instructor", label: "Instructor" },
                        { key: "duration", label: "Duration" },
                        { key: "language", label: "Language" },
                        { key: "price", label: "Price", type: "number" },
                    ]}
                    title="Edit Course"
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
