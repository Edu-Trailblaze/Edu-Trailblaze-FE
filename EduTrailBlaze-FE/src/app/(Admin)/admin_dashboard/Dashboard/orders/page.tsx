'use client';

// import FormModal from '@/components/FormModal';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import { useState, useEffect } from 'react';
import Loader from '@/components/animate/loader/loader';
import { Filter, ArrowUpDown, Plus } from "lucide-react";


type Order = {
    orderDate: string;
    invoiceId: string;
    customerName: string;
    phoneNumber: string;
    amount: string;
    paymentMethod: string;
};

const ordersData = [
    {
        orderDate: '15/11/2024',
        invoiceId: '200001',
        customerName: 'NGUYEN VAN A',
        phoneNumber: '0123456789',
        amount: '$3000.00',
        paymentMethod: 'Banking',
    },
    {
        orderDate: '15/11/2024',
        invoiceId: '200002',
        customerName: 'TRAN VAN B',
        phoneNumber: '0987654321',
        amount: '$2500.00',
        paymentMethod: 'Cash',
    },
    {
        orderDate: '15/11/2024',
        invoiceId: '200003',
        customerName: 'LE VAN C',
        phoneNumber: '0345678901',
        amount: '$1800.00',
        paymentMethod: 'Credit Card',
    },
];

const columns = [
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Invoice ID', accessor: 'invoiceId' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Phone', accessor: 'phoneNumber', className: 'hidden md:table-cell' },
    { header: 'Amount', accessor: 'amount', className: 'hidden md:table-cell' },
    { header: 'Payment Method', accessor: 'paymentMethod', className: 'hidden lg:table-cell' },
    { header: 'Actions', accessor: 'action' },
];

export default function OrdersManagement() {
    const [orders, setOrders] = useState(ordersData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 700);
    }, []);

    const renderRow = (order: Order) => (
        <tr key={order.invoiceId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{order.orderDate}</td>
            <td>{order.invoiceId}</td>
            <td>{order.customerName}</td>
            <td className="hidden md:table-cell">{order.phoneNumber}</td>
            <td className="hidden md:table-cell">{order.amount}</td>
            <td className="hidden lg:table-cell">{order.paymentMethod}</td>
            <td>
                {/* <div className="flex items-center gap-2">
                    <FormModal table="order" type="update" data={order} />
                    <FormModal table="order" type="delete" id={order.invoiceId} />
                </div> */}
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Orders Management</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#89CFF0]">
                            <Filter size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#89CFF0]">
                            <ArrowUpDown size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#89CFF0]">
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
                <Table columns={columns} renderRow={renderRow} data={orders} />
            )}
            <Pagination />
        </div>
    );
}
