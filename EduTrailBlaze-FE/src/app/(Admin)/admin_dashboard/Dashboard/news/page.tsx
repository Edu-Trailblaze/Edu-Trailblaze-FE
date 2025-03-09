'use client'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

//api
import api from '@/components/config/axios'
import 'react-toastify/dist/ReactToastify.css'
import { TableRow, TableCell } from '@mui/material'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

//sort filter
import NewsSort from '@/components/admin/Filter/NewsSortFilter/NewsSort'
import NewsFilter from '@/components/admin/Filter/NewsSortFilter/NewsFilter'

//modal
import NewsFormModalEdit from '@/components/admin/Modal/NewsFormModal/NewsFormModalEdit'
import NewsFormModalCreate from '@/components/admin/Modal/NewsFormModal/NewsFormModalCreate'
// import DetailModal from '@/components/admin/Modal/DetailModal'
import DetailPopup from '@/components/global/Popup/PopupDetail'

//icon
import { Filter, ArrowUpDown, Plus } from 'lucide-react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export type News = {
  id?: number
  title: string
  content: string
  imageUrl: string
  createdAt: string
}

export type NewsCreate = Omit<News, 'createdAt'>

const newsFields: { label: string; accessor: keyof News }[] = [
  { label: 'Id', accessor: 'id' },
  { label: 'Title', accessor: 'title' },
  { label: 'Content', accessor: 'content' },
  { label: 'Image URL', accessor: 'imageUrl' },
  { label: 'Created on', accessor: 'createdAt' }
]

export default function NewsManagement() {
  const dispatch = useDispatch()

  const [allNews, setAllNews] = useState<News[]>([])
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)

  //filter
  const [isFilterOpen, setFilterOpen] = useState(false)

  //redux filter
  const { fromDate, toDate, keyword } = useSelector((state: RootState) => state.filter)

  //redux sort
  const [isSortOpen, setSortOpen] = useState(false)
  const tableKey = 'news'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})

  //modal
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editNews, setEditNews] = useState<News | null>(null)
  const [newNews, setNewNews] = useState<NewsCreate>({
    title: '',
    content: '',
    imageUrl: ''
  })

  const fetchNews = async () => {
    try {
      const response = await api.get('/News')
      setNews(response.data)
      setAllNews(response.data)
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
      const response = await api.post('/News', newNews)
      toast.success('News added successfully!')
      setNews([...news, { ...response.data, createdAt: new Date().toISOString() }])
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

  const handleApplySort = (newVisibleColumns: Record<keyof News, boolean>) => {
    // save state
    dispatch(setSortForTable({ tableKey, visibility: newVisibleColumns }))
    setSortOpen(false)
  }

  const renderRow = (news: News) => (
    <TableRow
      key={news.id}
      hover
      onClick={() => setSelectedNews(news)} // Click toàn dòng => DetailPopup
    >
      {visibleColumns['id'] && <TableCell>{news.id}</TableCell>}
      {visibleColumns['title'] && <TableCell>{news.title}</TableCell>}
      {visibleColumns['content'] && <TableCell>{news.content}</TableCell>}
      {visibleColumns['imageUrl'] && (
        <TableCell>
          <img
            src={news.imageUrl}
            alt='news image'
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 4 }}
          />
        </TableCell>
      )}
      {visibleColumns['createdAt'] && (
        <TableCell>
          <FormatDateTime date={news.createdAt} />
        </TableCell>
      )}
    </TableRow>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>News Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
              </button>
              {isFilterOpen && (
                <NewsFilter
                  onClose={() => setFilterOpen(false)}
                  onClear={() => {
                    dispatch(clearFilter())
                    setNews(allNews)
                  }}
                  onFilterApply={() => {
                    //  GET fromDate, toDate, keyword từ Redux
                    const from = fromDate ? new Date(fromDate) : null
                    const to = toDate ? new Date(toDate) : null
                    const kw = keyword.toLowerCase()

                    // filter
                    const filtered = allNews.filter((item) => {
                      const itemDate = new Date(item.createdAt)
                      if (from && itemDate < from) return false
                      if (to && itemDate > to) return false

                      if (kw) {
                        const inTitle = item.title.toLowerCase().includes(kw)
                        const inContent = item.content.toLowerCase().includes(kw)
                        if (!inTitle && !inContent) return false
                      }
                      return true
                    })

                    setNews(filtered)
                    console.log('Filtered news:', filtered)
                  }}
                />
              )}
            </div>

            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setSortOpen(!isSortOpen)}
              >
                <ArrowUpDown size={18} />
              </button>
              {isSortOpen && (
                <NewsSort
                  columns={newsFields}
                  visibleColumns={visibleColumns}
                  onApply={handleApplySort}
                  onClose={() => setSortOpen(false)}
                  onClear={() => dispatch(clearSortForTable(tableKey))}
                />
              )}
            </div>

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
        <Table
          columns={[...newsFields.filter((field) => visibleColumns[field.accessor])]}
          renderRow={renderRow}
          data={news}
        />
      )}

      {selectedNews && (
        <DetailPopup
          isOpen={true}
          onClose={() => setSelectedNews(null)}
          title='News Detail'
          fields={[
            { label: 'ID', value: selectedNews.id, isID: true },
            { label: 'Title', value: selectedNews.title },
            { label: 'imageURL', value: selectedNews.imageUrl, isImage: true },
            { label: 'Date', value: selectedNews.createdAt, isDate: true }
          ]}
          widgets={[
            {
              label: 'Content',
              content: selectedNews.content
            }
          ]}
          actions={[
            {
              label: 'Update',
              onClick: () => {
                handleEditNews(selectedNews)
              },
              icon: <EditIcon fontSize='small' style={{ color: '#F59E0B' }} />
            },
            {
              label: 'Delete',
              onClick: () => {
                handleDeleteNews(selectedNews.id!)
              },
              icon: <DeleteIcon fontSize='small' style={{ color: '#DC2626' }} />
            }
          ]}
        />
      )}
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
            setEditModalOpen(false)
            setEditNews(null)
          }}
          isOpen={isEditModalOpen}
        />
      )}
    </div>
  )
}
