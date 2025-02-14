'use client';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';

import DetailModal from '@/components/admin/Modal/DetailModal';
import NewsFormModalCreate from '@/components/admin/Modal/NewsFormModal/NewsFormModalCreate';
import NewsFormModalEdit from '@/components/admin/Modal/NewsFormModal/NewsFormModalEdit';

import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from "lucide-react";
import api from '@/components/config/axios';

type Order = {
    id?: number;
    title: string;
    content: string;
    imageUrl: string;

};


const orderFields: { label: string; accessor: keyof Order }[] = [
    { label: 'Id', accessor: 'id' },
    { label: 'Title', accessor: 'title' },
    { label: 'Content', accessor: 'content' },
];



export default function OrdersManagement() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);



    const fetchOrders = async () => {
        try {
            const response = await api.get('/get-paging-order');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    ;

    useEffect(() => {
        fetchOrders();
    }, []);


    const renderRow = (order: Order) => (
        <tr key={order.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{order.id}</td>
            <td>{order.title}</td>
            <td>{order.content}</td>

            <td className="flex mt-4 space-x-2">
                <button onClick={() => setSelectedOrder(order)} className="text-blue-600 cursor-pointer">
                    <Eye size={18} />
                </button>

            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Orders Management</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <Filter size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]">
                            <ArrowUpDown size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]" >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center py-6">
                    <Loader className="w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin" />
                    <p className="mt-2 text-gray-500 text-sm">Loading orders...</p>
                </div>
            ) : (
                <Table columns={orderFields} renderRow={renderRow} data={orders} />
            )}

            {selectedOrder && <DetailModal item={selectedOrder} fields={orderFields} onClose={() => setSelectedOrder(null)} />}

        </div>
    );
}
