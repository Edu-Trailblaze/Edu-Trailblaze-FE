'use client';
import 'react-toastify/dist/ReactToastify.css';
import { TableRow, TableCell } from "@mui/material";


import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@/components/admin/Pagination/Pagination';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';
import NewsColumnFilter from '@/components/admin/Filter/NewsFilter/NewsColumnFilter';
import FormatDateTime from '@/components/admin/Date/FormatDateTime';

import DetailModal from '@/components/admin/Modal/DetailModal';
import NewsFormModalCreate from '@/components/admin/Modal/NewsFormModal/NewsFormModalCreate';
import NewsFormModalEdit from '@/components/admin/Modal/NewsFormModal/NewsFormModalEdit';

import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from "lucide-react";
import api from '@/components/config/axios';

export type News = {
    id?: number;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
};

export type NewsCreate = Omit<News, "createdAt">;



const newsFields: { label: string; accessor: keyof News }[] = [
    { label: 'Id', accessor: 'id' },
    { label: 'Title', accessor: 'title' },
    { label: 'Content', accessor: 'content' },
    { label: 'Image URL', accessor: 'imageUrl' },
    { label: 'Created on', accessor: 'createdAt' }


];


export default function NewsManagement() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(newsFields.map(field => [field.accessor, true]))
    );
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [tempVisibleColumns, setTempVisibleColumns] = useState(visibleColumns);

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editNews, setEditNews] = useState<News | null>(null);
    const [newNews, setNewNews] = useState<NewsCreate>({
        title: '',
        content: '',
        imageUrl: '',
    });



    const fetchNews = async () => {
        try {
            const response = await api.get('/News');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    ;

    useEffect(() => {
        fetchNews();
    }, []);


    const handleAddNews = async (newNews: NewsCreate) => {
        try {
            const response = await api.post('/News', newNews);
            toast.success("News added successfully!");
            setNews([...news, { ...response.data, createdAt: new Date().toISOString() }]);
            fetchNews();
            setAddModalOpen(false);
        } catch (error) {
            console.error('Error adding news:', error);
            toast.error("Failed to add news!");
        }
    };

    const handleEditNews = (news: News) => {
        setEditNews(news);
        setEditModalOpen(true);
    };


    const handleUpdateNews = async (updatedNews: News) => {

        try {
            const newsToSend = {
                ...updatedNews,
                newsId: updatedNews.id,
            };

            await api.put(`/News`, newsToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("News updated successfully!");

            setNews(news.map((ne) =>
                ne.id === updatedNews.id ? updatedNews : ne
            ));

            setEditModalOpen(false);
            setEditNews(null);
        } catch (error) {
            console.error('Error updating news:', error);
            toast.error("Failed to update news!");
        }
    };


    const handleDeleteNews = async (newsId: number) => {
        if (!window.confirm("Are you sure you want to delete this news?")) return;
        try {
            await api.delete(`/News/${newsId}`);
            setNews(news.filter((n) => n.id !== newsId));
            toast.success("News deleted successfully!");
        } catch (error) {
            console.error("Error deleting news:", error);
            toast.error("Failed to delete news!");
        }
    };

    //comlumn filter
    const toggleColumnVisibility = (column: keyof News) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };
    const handleApplyFilter = (newVisibleColumns: Record<keyof News, boolean>) => {
        setVisibleColumns(newVisibleColumns);
        setFilterOpen(false);
    };

    const renderRow = (news: News) => (
        <TableRow key={news.id} hover>
            {visibleColumns["id"] && <TableCell>{news.id}</TableCell>}
            {visibleColumns["title"] && <TableCell>{news.title}</TableCell>}
            {visibleColumns["content"] && <TableCell>{news.content}</TableCell>}
            {visibleColumns["imageUrl"] && (
                <TableCell>
                    <img
                        src={news.imageUrl}
                        alt="news image"
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: 4 }}
                    />
                </TableCell>
            )}
            {visibleColumns["createdAt"] && <TableCell><FormatDateTime date={news.createdAt} /></TableCell>}

            <TableCell>
                <button onClick={() => setSelectedNews(news)} style={{ color: "#1D4ED8" }}>
                    <Eye size={18} style={{ marginRight: "10px" }} />
                </button>
                <button onClick={() => handleEditNews(news)} style={{ color: "#F59E0B" }}>
                    <Pencil size={18} style={{ marginRight: "10px" }} />
                </button>
                <button onClick={() => handleDeleteNews(news.id!)} style={{ color: "#DC2626" }}>
                    <Trash2 size={18} />
                </button>
            </TableCell>
        </TableRow>
    );


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">News Management</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <div className="relative">
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]"
                                onClick={() => setFilterOpen(!isFilterOpen)}
                            >
                                <Filter size={18} />
                            </button>
                            {isFilterOpen && (
                                <NewsColumnFilter
                                    columns={newsFields}
                                    visibleColumns={tempVisibleColumns}
                                    onApply={handleApplyFilter}
                                    onClose={() => setFilterOpen(false)}
                                    onClear={() => setTempVisibleColumns(Object.fromEntries(newsFields.map(field => [field.accessor, true])))}
                                />
                            )}
                        </div>

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
                    <p className="mt-2 text-gray-500 text-sm">Loading news...</p>
                </div>
            ) : (
                <Table
                    columns={[
                        ...newsFields.filter(field => visibleColumns[field.accessor]),
                        { label: 'Actions', accessor: 'action' }
                    ]}
                    renderRow={renderRow}
                    data={news}
                />)}

            {selectedNews && <DetailModal item={selectedNews} fields={newsFields} onClose={() => setSelectedNews(null)} />}
            <NewsFormModalCreate
                initialValues={newNews}
                setNewNews={setNewNews}
                onSubmit={handleAddNews}
                onCancel={() => setAddModalOpen(false)}
                isOpen={isAddModalOpen}
            />
            {editNews && (
                <NewsFormModalEdit
                    initialValues={editNews}
                    setEditNews={setEditNews}
                    onSubmit={handleUpdateNews}
                    onCancel={() => {
                        setEditModalOpen(false);
                        setEditNews(null);
                    }}
                    isOpen={isEditModalOpen}
                />
            )}
        </div>
    );
}
