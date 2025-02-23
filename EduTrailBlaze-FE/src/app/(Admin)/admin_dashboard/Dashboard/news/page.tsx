'use client'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'

import DetailModal from '@/components/admin/Modal/DetailModal'
import NewsFormModalCreate from '@/components/admin/Modal/NewsFormModal/NewsFormModalCreate'
import NewsFormModalEdit from '@/components/admin/Modal/NewsFormModal/NewsFormModalEdit'

import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from 'lucide-react'
import api from '@/components/config/axios'

type News = {
  id?: number
  title: string
  content: string
  imageUrl: string
}

const newsFields: { label: string; accessor: keyof News }[] = [
  { label: 'Id', accessor: 'id' },
  { label: 'Title', accessor: 'title' },
  { label: 'Content', accessor: 'content' }
  // { label: 'Image URL', accessor: 'imageUrl' }
]

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editNews, setEditNews] = useState<News | null>(null)
  const [newNews, setNewNews] = useState<News>({
    title: '',
    content: '',
    imageUrl: ''
  })

  const initialValues: News = {
    title: '',
    content: '',
    imageUrl: ''
  }

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

  const handleAddNews = async (newNews: News) => {
    console.log('New voucher before submission:', newNews)

    try {
      const response = await api.post('/News', newNews)
      toast.success('News added successfully!')
      setNews([...news, response.data])
      fetchNews()
      setAddModalOpen(false)
    } catch (error) {
      console.error('Error adding news:', error)
      toast.error('Failed to add news!')
    }
  }

  const handleEditNews = (news: News) => {
    setEditNews(news)
    setEditModalOpen(true)
  }

  const handleUpdateNews = async (updatedNews: News) => {
    try {
      const newsToSend = {
        ...updatedNews,
        newsId: updatedNews.id
      }

      await api.put(`/News`, newsToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      toast.success('News updated successfully!')

      setNews(news.map((ne) => (ne.id === updatedNews.id ? updatedNews : ne)))

      setEditModalOpen(false)
      setEditNews(null)
    } catch (error) {
      console.error('Error updating news:', error)
      toast.error('Failed to update news!')
    }
  }

  const handleDeleteNews = async (newsId: number) => {
    if (!window.confirm('Are you sure you want to delete this news?')) return
    try {
      await api.delete(`/News/${newsId}`)
      setNews(news.filter((n) => n.id !== newsId))
      toast.success('News deleted successfully!')
    } catch (error) {
      console.error('Error deleting news:', error)
      toast.error('Failed to delete news!')
    }
  }

  const renderRow = (news: News) => (
    <tr key={news.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'>
      <td className='p-4'>{news.id}</td>
      <td>{news.title}</td>
      <td>{news.content}</td>
      {/* <td>{news.imageUrl}</td> */}
      <td className='flex mt-4 space-x-2'>
        <button onClick={() => setSelectedNews(news)} className='text-blue-600 cursor-pointer'>
          <Eye size={18} />
        </button>
        <button onClick={() => handleEditNews(news)} className='text-blue-600 cursor-pointer'>
          <Pencil size={18} />
        </button>
        <button onClick={() => handleDeleteNews(news.id!)} className='text-red-600 cursor-pointer'>
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>News Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <Filter size={18} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <ArrowUpDown size={18} />
            </button>
            <button
              className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='flex justify-center py-6'>
          <Loader className='w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin' />
          <p className='mt-2 text-gray-500 text-sm'>Loading news...</p>
        </div>
      ) : (
        <Table columns={newsFields} renderRow={renderRow} data={news} />
      )}

      {selectedNews && <DetailModal item={selectedNews} fields={newsFields} onClose={() => setSelectedNews(null)} />}
      <NewsFormModalCreate
        initialValues={initialValues}
        setNewNews={setNewNews}
        onSubmit={handleAddNews}
        onCancel={() => setAddModalOpen(false)}
        isOpen={isAddModalOpen}
      />
      {editNews && (
        <NewsFormModalEdit
          initialValues={editNews}
          setEditNews={setNewNews}
          onSubmit={handleUpdateNews}
          onCancel={() => {
            setEditModalOpen(false)
            setEditNews(null)
          }}
          isOpen={isEditModalOpen}
        />
      )}
    </div>
  )
}
