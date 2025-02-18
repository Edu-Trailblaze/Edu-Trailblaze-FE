'use client';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';
import FormatDateTime from '@/components/admin/Date/FormatDateTime';

import DetailModal from '@/components/admin/Modal/DetailModal';
import VoucherFormModalCreate from '@/components/admin/Modal/VoucherFormModal/VoucherFormModalCreate';
import VoucherFormModalEdit from '@/components/admin/Modal/VoucherFormModal/VoucherFormModalEdit';

import { Filter, ArrowUpDown, Plus, Eye, Pencil } from 'lucide-react';
import api from '@/components/config/axios';



type Voucher = {
    id?: number;
    discountType: string;
    discountValue: number;
    voucherCode: string;
    isUsed: boolean;
    startDate: string;
    expiryDate: string;
    minimumOrderValue: number;
};

const voucherFields: { label: string; accessor: keyof Voucher }[] = [
    { label: 'Voucher ID', accessor: 'id' },
    { label: 'Discount Type', accessor: 'discountType' },
    { label: 'Discount Value', accessor: 'discountValue' },
    { label: 'Voucher Code', accessor: 'voucherCode' },
    { label: 'Is Used', accessor: 'isUsed' },
    { label: 'Expiry Date', accessor: 'expiryDate' },
];


export default function VouchersManagement() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editVoucher, setEditVoucher] = useState<Voucher | null>(null);
    const [newVoucher, setNewVoucher] = useState<Voucher>({
        discountType: '',
        discountValue: 0,
        voucherCode: '',
        startDate: '',
        expiryDate: '',
        minimumOrderValue: 0,
        isUsed: false,
    });

    const initialValues: Voucher = {
        discountType: '',
        discountValue: 0,
        voucherCode: '',
        startDate: '',
        expiryDate: '',
        minimumOrderValue: 0,
        isUsed: false,
    };
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const fetchVouchers = async (page: number) => {
        setLoading(true);
        try {
            const response = await api.get('/Voucher/get-paging-voucher', {
                params: {
                    pageIndex: page,
                    pageSize
                },
            });
            setVouchers(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            toast.error('Failed to fetch vouchers!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers(pageIndex);
    }, [pageIndex]);


    const handleAddVoucher = async (newVoucher: Voucher) => {
        console.log("New voucher before submission:", newVoucher);

        try {
            const response = await api.post('/Voucher', {
                ...newVoucher,
                startDate: newVoucher.startDate ? newVoucher.startDate + "T00:00:00Z" : "",
                expiryDate: newVoucher.expiryDate ? newVoucher.expiryDate + "T23:59:59Z" : "",
            });

            toast.success("Voucher created successfully!");
            setVouchers([...vouchers, response.data]);
            fetchVouchers(pageIndex);
            setAddModalOpen(false);
        } catch (error) {
            console.error('Error adding voucher:', error);
            toast.error("Failed to create voucher!");
        }
    };

    const handleEditVoucher = (voucher: Voucher) => {
        setEditVoucher(voucher);
        setEditModalOpen(true);
    };

    const handleUpdateVoucher = async (updatedVoucher: Voucher) => {

        try {
            const voucherToSend = {
                ...updatedVoucher,
                voucherId: updatedVoucher.id,
            };

            await api.put(`/Voucher`, voucherToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Voucher updated successfully!");

            setVouchers(vouchers.map((voucher) =>
                voucher.id === updatedVoucher.id ? updatedVoucher : voucher
            ));

            setEditModalOpen(false);
            setEditVoucher(null);
        } catch (error) {
            console.error('Error updating voucher:', error);
            toast.error("Failed to update voucher!");
        }
    };

    const renderRow = (voucher: Voucher) => (
        <tr key={voucher.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100">
            <td className="p-4">{voucher.id}</td>
            <td>{voucher.discountType}</td>
            <td>{voucher.discountValue}</td>
            <td>{voucher.voucherCode}</td>
            <td>{voucher.isUsed ? 'Yes' : 'No'}</td>
            <td>
                <FormatDateTime date={voucher.expiryDate} />
            </td>
            <td className="flex mt-4 space-x-2">
                <button onClick={() => setSelectedVoucher(voucher)} className="text-blue-600 cursor-pointer">
                    <Eye size={18} />
                </button>
                <button onClick={() => handleEditVoucher(voucher)} className="text-yellow-600 cursor-pointer">
                    <Pencil size={18} />
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
            <Pagination
                pageIndex={pageIndex}
                totalPages={totalPages}
                onPageChange={(page) => setPageIndex(page)}
            />
            {selectedVoucher && <DetailModal item={selectedVoucher} fields={voucherFields} onClose={() => setSelectedVoucher(null)} />}

            <VoucherFormModalCreate
                initialValues={initialValues}
                setNewVoucher={setNewVoucher}
                onSubmit={handleAddVoucher}
                onCancel={() => setAddModalOpen(false)}
                isOpen={isAddModalOpen}
            />
            {editVoucher && (
                <VoucherFormModalEdit
                    initialValues={editVoucher}
                    setEditVoucher={setNewVoucher}
                    onSubmit={handleUpdateVoucher}
                    onCancel={() => {
                        setEditModalOpen(false);
                        setEditVoucher(null);
                    }}
                    isOpen={isEditModalOpen}
                />
            )}
        </div>
    );
}
