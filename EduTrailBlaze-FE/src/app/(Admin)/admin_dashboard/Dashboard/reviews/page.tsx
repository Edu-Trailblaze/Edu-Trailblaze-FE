'use client';

import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import { useState, useEffect } from 'react';
import Loader from '@/components/animate/loader/loader';
import { Filter, ArrowUpDown, Plus, Star } from "lucide-react";

import axios from 'axios';

const API_URL = 'https://edu-trailblaze.azurewebsites.net/api/Review';

type Review = {
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    status: string;
};


const columns = [
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Rating', accessor: 'rating' },
    { header: 'Comment', accessor: 'comment', className: 'hidden md:table-cell' },
    { header: 'Date', accessor: 'date', className: 'hidden lg:table-cell' },
    { header: 'Status', accessor: 'status' },
    { header: 'Actions', accessor: 'action' },
];

export default function ReviewsManagement() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch reviews data from API
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}`);
                setReviews(response.data);
                console.log("check data:", response.data)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);


    const renderRow = (review: Review) => (
        <tr key={review.customerName} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{review.customerName}</td>
            <td className="flex items-center gap-1">
                {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={14} className="text-yellow-500" />
                ))}
            </td>
            <td className="hidden md:table-cell">{review.comment}</td>
            <td className="hidden lg:table-cell">{review.date}</td>
            <td className={review.status === 'Approved' ? 'text-green-600' : review.status === 'Pending' ? 'text-orange-600' : 'text-red-600'}>
                {review.status}
            </td>
            <td className="text-blue-600 cursor-pointer">Manage</td>
        </tr>
    );



    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Reviews Management</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <Filter size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <ArrowUpDown size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center py-6">
                    <Loader className="w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin" />
                    <p className="mt-2 text-gray-500 text-sm">Loading reviews...</p>
                </div>
            ) : (
                <Table columns={columns} renderRow={renderRow} data={reviews} />
            )}
            <Pagination />
        </div>
    );
}
