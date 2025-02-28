'use client'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'

import DetailModal from '@/components/admin/Modal/DetailModal'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil } from 'lucide-react'
import api from '@/components/config/axios'

type Order = {
  id?: number
  userId: string
  orderAmount: number
  orderDate: string
  orderStatus: string
  userName?: string // <-- thêm dòng này
}

const orderFields: { label: string; accessor: keyof Order }[] = [
  { label: 'Id', accessor: 'id' },
  { label: 'User Name', accessor: 'userName' },
  { label: 'Amount', accessor: 'orderAmount' },
  { label: 'Date', accessor: 'orderDate' },
  { label: 'Status', accessor: 'orderStatus' }
]

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 5

  const fetchOrders = async (page: number) => {
    setLoading(true)
    try {
      const response = await api.get('/Order/get-paging-order', {
        params: {
          pageIndex: page,
          pageSize
        }
      })

      const ordersData = response.data.items

      const ordersWithNames = await Promise.all(
        ordersData.map(async (order: Order) => {
          try {
            const userResponse = await api.get(`/User/${order.userId}`)

            return {
              ...order,
              userName: userResponse.data.userName
            }
          } catch (error) {
            console.error(`Error fetching user name for userId ${order.userId}:`, error)
            return { ...order, fullName: 'Unknown' }
          }
        })
      )

      setOrders(ordersWithNames)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders(pageIndex)
  }, [pageIndex])

  const renderRow = (order: Order & { userName?: string }) => (
    <tr key={order.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100'>
      <td className='p-4'>{order.id}</td>
      <td>{order.userName || 'Loading...'}</td>
      <td>{order.orderAmount}</td>
      <td>
        <FormatDateTime date={order.orderDate} />
      </td>
      <td>{order.orderStatus}</td>

      <td className='flex mt-4 space-x-2'>
        <button onClick={() => setSelectedOrder(order)} className='text-blue-600 cursor-pointer'>
          <Eye size={18} />
        </button>
      </td>
    </tr>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Orders Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <Filter size={18} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <ArrowUpDown size={18} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'>
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center py-6'>
          <Loader className='w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin' />
          <p className='mt-2 text-gray-500 text-sm'>Loading orders...</p>
        </div>
      ) : (
        <Table columns={orderFields} renderRow={renderRow} data={orders} />
      )}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />
      {selectedOrder && (
        <DetailModal item={selectedOrder} fields={orderFields} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}
