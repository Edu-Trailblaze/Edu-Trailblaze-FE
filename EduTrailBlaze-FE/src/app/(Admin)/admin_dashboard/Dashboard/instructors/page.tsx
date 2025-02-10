'use client';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';

import DetailModal from '@/components/admin/Modal/DetailModal';
import FormModal from '@/components/admin/Modal/FormModal';

import { Filter, ArrowUpDown, Plus, Eye, Trash2 } from "lucide-react";
import dayjs from 'dayjs';
import axios from 'axios';

type Instructor = {
    instructorId: string;
    courseId: number;
    isPrimaryInstructor: boolean;
    createdAt: string;

};

const API_URL = 'https://edu-trailblaze.azurewebsites.net/api/CourseInstructor';

const instructorFields: { label: string; accessor: keyof Instructor }[] = [
    { label: 'Instructor ID', accessor: 'instructorId' },
    { label: 'Course ID', accessor: 'courseId' },
    { label: 'Primary Instructor', accessor: 'isPrimaryInstructor' },
    { label: 'Created At', accessor: 'createdAt' },
];

export default function InstructorsManagement() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [newInstructor, setNewInstructor] = useState<Instructor>({
        courseId: 0,
        instructorId: '',
        isPrimaryInstructor: false,
        createdAt: dayjs().format('YYYY-MM-DD'),

    });


    const fetchInstructors = async () => {
        try {
            const response = await axios.get(API_URL);
            setInstructors(response.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    const handleAddInstructor = async () => {
        try {
            await axios.post(API_URL, newInstructor);
            toast.success("Instructor added successfully!");
            setAddModalOpen(false);
            fetchInstructors();
        } catch (error) {
            console.error('Error adding instructor:', error);
            toast.error("Failed to add instructor!");
        }
    };

    const handleDeleteInstructor = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this instructor?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            setInstructors(instructors.filter((inst) => inst.id !== id));
            toast.success("Instructor deleted successfully!");
        } catch (error) {
            console.error("Error deleting instructor:", error);
            toast.error("Failed to delete instructor!");
        }
    };

    const renderRow = (instructor: Instructor) => (
        <tr key={instructor.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{instructor.instructorId}</td>
            <td>{instructor.courseId}</td>
            <td>{instructor.isPrimaryInstructor ? 'Yes' : 'No'}</td>
            <td>{instructor.createdAt}</td>
            <td className="flex space-x-2">
                <button onClick={() => setSelectedInstructor(instructor)} className="text-blue-600 cursor-pointer">
                    <Eye size={18} />
                </button>
                <button onClick={() => handleDeleteInstructor(instructor.id)} className="text-red-600 cursor-pointer">
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Instructors Management</h1>
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
                    <p className="mt-2 text-gray-500 text-sm">Loading instructors...</p>
                </div>
            ) : (
                <Table columns={instructorFields} renderRow={renderRow} data={instructors} />
            )}
            <Pagination />
            {selectedInstructor && <DetailModal item={selectedInstructor} fields={instructorFields} onClose={() => setSelectedInstructor(null)} />}
            {isAddModalOpen && (
                <FormModal
                    initialValues={newInstructor}
                    fields={instructorFields}
                    onSubmit={handleAddInstructor}
                    onCancel={() => setAddModalOpen(false)}
                />
            )}
        </div>
    );
}
