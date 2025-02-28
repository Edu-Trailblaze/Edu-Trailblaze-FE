'use client';
//api
import api from '@/components/config/axios';
import 'react-toastify/dist/ReactToastify.css';
import { Menu, MenuItem, IconButton, TableRow, TableCell } from "@mui/material";


import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Table from '@/components/admin/Table/Table';
import TableSearch from '@/components/admin/TableSearch/TableSearch';
import Loader from '@/components/animate/loader/loader';
import FormatDateTime from '@/components/admin/Date/FormatDateTime';

//sort filter
import NewsSort from '@/components/admin/Filter/NewsFilter/NewsSort';
import NewsFilter from '@/components/admin/Filter/NewsFilter/NewsFilter';

//modal
import DetailModal from '@/components/admin/Modal/DetailModal';
import NewsFormModalCreate from '@/components/admin/Modal/NewsFormModal/NewsFormModalCreate';
import NewsFormModalEdit from '@/components/admin/Modal/NewsFormModal/NewsFormModalEdit';

//icon
import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil, EllipsisVertical } from "lucide-react";

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

  const [dot, setDot] = useState<{ [key: number]: HTMLElement | null }>({});
  //sort
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(newsFields.map(field => [field.accessor, true]))
  );
  const [isSortOpen, setSortOpen] = useState(false);
  const [tempVisibleColumns, setTempVisibleColumns] = useState(visibleColumns);

  //filter
  const [isFilterOpen, setFilterOpen] = useState(false);



  //modal
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
      const response = await api.get('/News')
      setNews(response.data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])




 

  

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
  const handleApplySort = (newVisibleColumns: Record<keyof News, boolean>) => {
    setVisibleColumns(newVisibleColumns);
    setSortOpen(false);
  };

  const handleClickDot = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setDot(prev => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleCloseDot = (id: number) => {
    setDot(prev => ({ ...prev, [id]: null }));
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
        <IconButton onClick={(e) => handleClickDot(e, news.id!)}>
          <EllipsisVertical size={18} />
        </IconButton>

        <Menu
          anchorEl={dot[news.id!]}
          open={Boolean(dot[news.id!])}
          onClose={() => handleCloseDot(news.id!)}
        >
          <MenuItem onClick={() => { setSelectedNews(news); handleCloseDot(news.id!); }}>
            <Eye size={18} style={{ marginRight: "10px", color: "#1D4ED8" }} /> View
          </MenuItem>
          <MenuItem onClick={() => { handleEditNews(news); handleCloseDot(news.id!); }}>
            <Pencil size={18} style={{ marginRight: "10px", color: "#F59E0B" }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => { handleDeleteNews(news.id!); handleCloseDot(news.id!); }}>
            <Trash2 size={18} style={{ marginRight: "10px", color: "#DC2626" }} /> Delete
          </MenuItem>
        </Menu>
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
                <NewsFilter
                  columns={newsFields}
                  visibleColumns={tempVisibleColumns}
                  onApply={handleApplySort}
                  onClose={() => setFilterOpen(false)}
                  onClear={() =>
                    setTempVisibleColumns(
                      Object.fromEntries(newsFields.map(field => [field.accessor, true]))
                    )
                  }
                  onFilterApply={(filters) => {
                    console.log("Applied filters: ", filters);
                  }}
                />
              )}

            </div>
            <div className="relative">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]"
                onClick={() => setSortOpen(!isSortOpen)}
              >
                <ArrowUpDown size={18} />
              </button>
              {isSortOpen && (
                <NewsSort
                  columns={newsFields}
                  visibleColumns={tempVisibleColumns}
                  onApply={handleApplySort}
                  onClose={() => setSortOpen(false)}
                  onClear={() => setTempVisibleColumns(Object.fromEntries(newsFields.map(field => [field.accessor, true])))}
                />
              )}
            </div>

            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]"
              onClick={() => setAddModalOpen(true)}>
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
  )
}

