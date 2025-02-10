'use client';

import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import { useState, useEffect } from 'react';
import Loader from '@/components/animate/loader/loader';
import { Filter, ArrowUpDown, Plus, Ticket } from "lucide-react";

type Voucher = {
    voucherCode: string;
    description: string;
    discount: string;
    expiryDate: string;
    status: string;
};

const vouchersData = [
    {
        voucherCode: 'VOUCHER2025',
        description: '10% off on all orders',
        discount: '10%',
        expiryDate: '31/12/2025',
        status: 'Active',
    },
    {
        voucherCode: 'WELCOME2025',
        description: '15% off for new customers',
        discount: '15%',
        expiryDate: '30/06/2025',
        status: 'Active',
    },
    {
        voucherCode: 'SUMMER50',
        description: 'Flat $50 off on orders above $500',
        discount: '$50',
        expiryDate: '01/09/2025',
        status: 'Expired',
    },
];

const columns = [
    { header: 'Voucher Code', accessor: 'voucherCode' },
    { header: 'Description', accessor: 'description' },
    { header: 'Discount', accessor: 'discount', className: 'hidden md:table-cell' },
    { header: 'Expiry Date', accessor: 'expiryDate', className: 'hidden lg:table-cell' },
    { header: 'Status', accessor: 'status' },
    { header: 'Actions', accessor: 'action' },
];

export default function VouchersManagement() {
    const [vouchers, setVouchers] = useState(vouchersData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 700);
    }, []);

    const renderRow = (voucher: Voucher) => (
        <tr key={voucher.voucherCode} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{voucher.voucherCode}</td>
            <td>{voucher.description}</td>
            <td className="hidden md:table-cell">{voucher.discount}</td>
            <td className="hidden lg:table-cell">{voucher.expiryDate}</td>
            <td className={voucher.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{voucher.status}</td>
            <td className="text-blue-600 cursor-pointer">Edit</td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Vouchers Management</h1>
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
                    <p className="mt-2 text-gray-500 text-sm">Loading vouchers...</p>
                </div>
            ) : (
                <Table columns={columns} renderRow={renderRow} data={vouchers} />
            )}
            <Pagination />
        </div>
    );
}
