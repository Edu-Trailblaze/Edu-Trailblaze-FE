'use client';
import 'react-toastify/dist/ReactToastify.css';


import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';

import DetailModal from '@/components/admin/Modal/DetailModal'
import FormModal from '@/components/admin/Modal/FormModal'

import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from "lucide-react";
import dayjs from 'dayjs';
import axios from 'axios';


type Course = {
    id?: number;
    title: string;
    imageURL: string;
    introURL: string;
    description: string;
    price: number;
    duration: number;
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
    { label: 'Difficulty', accessor: 'difficultyLevel' },
    { label: 'Created By', accessor: 'createdBy' },
    { label: 'Created Date', accessor: 'createdAt' },
];

const courseFormFields: { label: string; accessor: keyof Course; type: string }[] = [
    { label: 'Title', accessor: 'title', type: 'text' },
    { label: 'Image URL', accessor: 'imageURL', type: 'text' },
    { label: 'Intro URL', accessor: 'introURL', type: 'text' },
    { label: 'Description', accessor: 'description', type: 'text' },
    { label: 'Price', accessor: 'price', type: 'number' },
    { label: 'Duration', accessor: 'duration', type: 'number' },
    { label: 'Difficulty Level', accessor: 'difficultyLevel', type: 'text' },
    // { label: 'Created By', accessor: 'createdBy', type: 'text' },
    { label: 'Prerequisites', accessor: 'prerequisites', type: 'text' },
];


export default function CoursesManagement() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedCourse, setEditedCourse] = useState<Course | null>(null);
    const [newCourse, setNewCourse] = useState<Course>({
        title: '',
        imageURL: '',
        introURL: '',
        description: '',
        price: 0,
        duration: 0,
        difficultyLevel: '',
        createdBy: 'aca1c0c4-d195-4208-b1ed-0a89f55b7e09',
        prerequisites: '',
        learningOutcomes: [],
    });



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
    }, []);


    const handleAddCourse = async () => {
        try {
            const courseToSend = {
                ...newCourse,
                learningOutcomes: newCourse.learningOutcomes.filter((item) => item.trim() !== ''),
            };
            await axios.post(API_URL, courseToSend);
            toast.success("Course created successfully!");
            setAddModalOpen(false);
            resetNewCourse();
            fetchCourses();
        } catch (error) {
            console.error('Error adding course:', error);
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
            duration: 0,
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

    const openEditModal = (course: Course) => {
        setEditedCourse(course);
        setEditModalOpen(true);
    };

    const handleEditCourse = async (updatedCourse: Course) => {
        if (!updatedCourse.id) return;

        try {
            await axios.put(`${API_URL}?courseId=${updatedCourse.id}`, updatedCourse);
            setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
            setEditModalOpen(false);
            setEditedCourse(null);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const renderRow = (course: Course) => (
        <tr key={course.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{course.id}</td>
            <td>{course.title}</td>
            <td>{course.difficultyLevel}</td>
            <td>{course.createdBy}</td>
            <td className="hidden lg:table-cell">{dayjs(course.createdAt).format("YYYY-MM-DD")}</td>
            <td className="flex space-x-2">
                <button onClick={() => setSelectedCourse(course)} className="text-blue-600 cursor-pointer">
                    <Eye size={18} />
                </button>
                <button onClick={() => openEditModal(course)} className="text-yellow-600 cursor-pointer">
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
            <Pagination />

            {selectedCourse && <DetailModal item={selectedCourse} fields={courseFields} onClose={() => setSelectedCourse(null)} />}

            {(isAddModalOpen || isEditModalOpen) && (
                <FormModal
                    initialValues={isEditModalOpen ? editedCourse! : newCourse}
                    fields={courseFormFields}
                    onSubmit={isEditModalOpen ? handleEditCourse : handleAddCourse}
                    onCancel={() => {
                        setAddModalOpen(false);
                        setEditModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}
