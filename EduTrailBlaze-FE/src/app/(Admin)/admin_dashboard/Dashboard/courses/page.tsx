'use client';
import 'react-toastify/dist/ReactToastify.css';


import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';

import DetailModal from '@/components/admin/Modal/DetailModal'
import CourseFormModalCreate from '@/components/admin/Modal/CourseFormModal/CourseFormModalCreate'
import CourseFormModalEdit from '@/components/admin/Modal/CourseFormModal/CourseFormModalEdit'


import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from "lucide-react";
import dayjs from 'dayjs';
import axios from 'axios';
import api from '@/components/config/axios';


type Course = {
    id?: number;
    title: string;
    imageURL: string;
    introURL: string;
    description: string;
    price: number;
    difficultyLevel: string;
    prerequisites: string;
    learningOutcomes: string[];
    createdAt?: string;
    createdBy: string;
};

const API_URL = 'https://edu-trailblaze.azurewebsites.net/api/Course';


const courseFields: { label: string; accessor: keyof Course }[] = [
    { label: 'Course ID', accessor: 'id' },
    { label: 'Title', accessor: 'title' },
    { label: 'Price', accessor: 'price' },
    { label: 'Difficulty', accessor: 'difficultyLevel' },
    { label: 'Created at', accessor: 'createdAt' },

];


export default function CoursesManagement() {
    const [userId, setUserId] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editCourse, setEditCourse] = useState<Course | null>(null);
    const [newCourse, setNewCourse] = useState<Course>({
        title: '',
        imageURL: '',
        introURL: '',
        description: '',
        price: 0,
        difficultyLevel: '',
        createdBy: '',
        prerequisites: '',
        learningOutcomes: [],
    });

    const initialValues: Course = {
        title: '',
        imageURL: '',
        introURL: '',
        description: '',
        price: 0,
        difficultyLevel: '',
        createdBy: '',
        prerequisites: '',
        learningOutcomes: [],
    };


    const fetchUserId = async () => {
        try {
            const response = await axios.get("https://edu-trailblaze.azurewebsites.net/api/User");
            if (response.data.length > 0) {
                setUserId(response.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get(API_URL);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchUserId();
    }, []);


    const handleAddCourse = async (newCourse: Course) => {
        if (!newCourse.title || !newCourse.description || !newCourse.difficultyLevel || newCourse.price <= 0) {
            toast.error("Please fill all required fields and ensure price is greater than 0!");
            return;
        }

        if (!userId) {
            toast.error("User ID is not available!");
            return;
        }
        try {
            const courseToSend = {
                ...newCourse,
                learningOutcomes: newCourse.learningOutcomes.length > 0 ? newCourse.learningOutcomes : ["Default outcome"],
                createdBy: userId
            };
            const response = await axios.post(API_URL, courseToSend);

            toast.success("Course created successfully!");
            setCourses([...courses, response.data]);
            fetchCourses();
            setAddModalOpen(false);
            resetNewCourse();

        } catch (error) {
            console.error('Error adding course:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Response data:', error.response.data);
            }
            toast.error("Failed to create course!");
        }
    };


    const resetNewCourse = () => {
        setNewCourse({
            title: '',
            imageURL: '',
            introURL: '',
            description: '',
            price: 0,
            difficultyLevel: '',
            createdBy: '',
            prerequisites: '',
            learningOutcomes: [],
        });
    };


    const handleDeleteCourse = async (courseId: number) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await axios.delete(`${API_URL}?courseId=${courseId}`);
            setCourses(courses.filter((c) => c.id !== courseId));
            toast.success("Course deleted successfully!");

        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course!");

        }
    };

    const handleEditCourse = (course: Course) => {
        setEditCourse(course);
        setEditModalOpen(true);
    };


    const handleUpdateCourse = async (updatedCourse: Course) => {
        if (!updatedCourse.title || !updatedCourse.description || !updatedCourse.difficultyLevel || updatedCourse.price <= 0) {
            toast.error("Please fill all required fields and ensure price is greater than 0!");
            return;
        }

        try {
            const courseToSend = {
                ...updatedCourse,
                courseId: updatedCourse.id,
                learningOutcomes: updatedCourse.learningOutcomes.length > 0 ? updatedCourse.learningOutcomes : ["Default outcome"],
            };

            await axios.put(`${API_URL}`, courseToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Course updated successfully!");

            setCourses(courses.map((course) =>
                course.id === updatedCourse.id ? updatedCourse : course
            ));

            setEditModalOpen(false);
            setEditCourse(null);
        } catch (error) {
            console.error('Error updating course:', error);
            toast.error("Failed to update course!");
        }
    };

    const renderRow = (course: Course) => (
        <tr key={course.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{course.id}</td>
            <td>{course.title}</td>
            <td>{course.price}</td>
            <td>{course.difficultyLevel}</td>
            <td className="hidden lg:table-cell">{dayjs(course.createdAt).format("YYYY-MM-DD")}</td>
            <td className="flex mt-4 space-x-2">
                <button onClick={() => setSelectedCourse(course)} className="text-blue-600 cursor-pointer">
                    <Eye size={18} />
                </button>
                <button onClick={() => handleEditCourse(course)} className="text-yellow-600 cursor-pointer">
                    <Pencil size={18} />
                </button>
                <button onClick={() => handleDeleteCourse(course.id!)} className="text-red-600 cursor-pointer">
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    );


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Courses Management</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <Filter size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <ArrowUpDown size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]" onClick={() => setAddModalOpen(true)}>
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-6">
                    <Loader className="w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin" />
                    <p className="mt-2 text-gray-500 text-sm">Loading courses...</p>
                </div>
            ) : (
                <Table columns={courseFields} renderRow={renderRow} data={courses} />
            )}
            {/* <Pagination /> */}

            {selectedCourse && <DetailModal item={selectedCourse} fields={courseFields} onClose={() => setSelectedCourse(null)} />}
            <CourseFormModalCreate
                initialValues={initialValues}
                setNewCourse={setNewCourse}
                onSubmit={handleAddCourse}
                onCancel={() => setAddModalOpen(false)}
                isOpen={isAddModalOpen}

            />
            {editCourse && (
                <CourseFormModalEdit
                    initialValues={editCourse}
                    setEditCourse={setNewCourse}
                    onSubmit={handleUpdateCourse}
                    onCancel={() => {
                        setEditModalOpen(false);
                        setEditCourse(null);
                    }}
                    isOpen={isEditModalOpen}
                />
            )}
        </div>
    );
}
