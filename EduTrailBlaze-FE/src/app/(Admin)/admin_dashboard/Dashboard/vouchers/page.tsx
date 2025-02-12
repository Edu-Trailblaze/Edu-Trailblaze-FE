'use client';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';

import DetailModal from '@/components/admin/Modal/DetailModal';
import FormModal from '@/components/admin/Modal/CourseFormModal/CourseFormModalCreate';

import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from 'lucide-react';
import dayjs from 'dayjs';
import axios from 'axios';

type Voucher = {
    id?: number;
    discountType: string;
    discountValue: number;
    voucherCode: string;
    isUsed: boolean;
    expiryDate: string;
};

const API_URL = 'https://edu-trailblaze.azurewebsites.net/api/Voucher';

const voucherFields: { label: string; accessor: keyof Voucher }[] = [
    { label: 'Voucher ID', accessor: 'id' },
    { label: 'Voucher Code', accessor: 'voucherCode' },
    { label: 'Discount Type', accessor: 'discountType' },
    { label: 'Discount Value', accessor: 'discountValue' },
    { label: 'Expiry Date', accessor: 'expiryDate' },
    { label: 'Is Used', accessor: 'isUsed' },
];


const voucherFormFields: { label: string; accessor: keyof Voucher; type: string }[] = [
    { label: 'Voucher Code', accessor: 'voucherCode', type: 'text' },
    { label: 'Discount Type', accessor: 'discountType', type: 'text' },
    { label: 'Discount Value', accessor: 'discountValue', type: 'number' },
    { label: 'Expiry Date', accessor: 'expiryDate', type: 'date' },
    { label: 'Is Used', accessor: 'isUsed', type: 'checkbox' },
];


export default function VouchersManagement() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedVoucher, setEditedVoucher] = useState<Voucher | null>(null);
    const [newVoucher, setNewVoucher] = useState<Voucher>({
        voucherCode: '',
        discountType: '',
        discountValue: 0,
        expiryDate: '',
        isUsed: false, // Default to false for new vouchers if that's the norm
    });

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(API_URL);
            setVouchers(response.data);
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            toast.error('Failed to fetch vouchers!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const handleAddVoucher = async () => {
        try {
            await axios.post(API_URL, newVoucher);
            toast.success('Voucher created successfully!');
            setAddModalOpen(false);
            resetNewVoucher();
            fetchVouchers();
        } catch (error) {
            console.error('Error adding voucher:', error);
            toast.error('Failed to create voucher!');
        }
    };

    const resetNewVoucher = () => {
        setNewVoucher({
            voucherCode: '',
            discountType: '',
            discountValue: 0,
            expiryDate: '',
            isUsed: true,
        });
    };



    const openEditModal = (voucher: Voucher) => {
        setEditedVoucher(voucher);
        setEditModalOpen(true);
    };

    const handleEditVoucher = async (updatedVoucher: Voucher) => {
        if (!updatedVoucher.id) return;

        try {
            await axios.put(`${API_URL}/${updatedVoucher.id}`, updatedVoucher);
            setVouchers(vouchers.map((v) => (v.id === updatedVoucher.id ? updatedVoucher : v)));
            toast.success('Voucher updated successfully!');
            setEditModalOpen(false);
            setEditedVoucher(null);
        } catch (error) {
            console.error('Error updating voucher:', error);
            toast.error('Failed to update voucher!');
        }
    };

    const renderRow = (voucher: Voucher) => (
        <tr key={voucher.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{voucher.id}</td>
            <td>{voucher.voucherCode}</td>
            <td>{voucher.discountType}</td>
            <td>{voucher.discountValue}</td>
            <td>{voucher.expiryDate}</td>
            <td>{voucher.isUsed}</td>
            <td className="flex mt-4 space-x-2">
                <button onClick={() => setSelectedVoucher(voucher)} className="text-blue-600 cursor-pointer">
                    <Eye size={18} />
                </button>
                <button onClick={() => openEditModal(voucher)} className="text-yellow-600 cursor-pointer">
                    <Pencil size={18} />
                </button>
                <button className="text-red-600 cursor-pointer">
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <ToastContainer position="top-right" autoClose={3000} />

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
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]" onClick={() => setAddModalOpen(true)}>
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
                <Table columns={voucherFields} renderRow={renderRow} data={vouchers} />
            )}
            <Pagination />

            {selectedVoucher && <DetailModal item={selectedVoucher} fields={voucherFields} onClose={() => setSelectedVoucher(null)} />}
            {(isAddModalOpen || isEditModalOpen) && (
                <FormModal initialValues={isEditModalOpen ? editedVoucher! : newVoucher} fields={voucherFormFields} onSubmit={isEditModalOpen ? handleEditVoucher : handleAddVoucher} onCancel={() => {
                    setAddModalOpen(false);
                    setEditModalOpen(false);
                }}
                />
            )}
        </div>
    );
}