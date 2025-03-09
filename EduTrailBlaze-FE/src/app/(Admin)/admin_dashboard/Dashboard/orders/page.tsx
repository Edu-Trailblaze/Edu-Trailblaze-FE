'use client'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

//api
import api from '@/components/config/axios'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import dayjs from 'dayjs'

import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

//sort filter
import OrderSort from '@/components/admin/Filter/OrderSortFilter/OrderSort'
import OrderFilter from '@/components/admin/Filter/OrderSortFilter/OrderFilter'

//modal
import DetailPopup from '@/components/global/Popup/PopupDetail'

//icon
import { Filter, ArrowUpDown } from 'lucide-react'

export type Order = {
  id?: number
  userId: string
  orderAmount: number
  orderDate: string
  orderStatus: string
  userName?: string
}

const orderFields: { label: string; accessor: keyof Order }[] = [
  { label: 'Id', accessor: 'id' },
  { label: 'User Name', accessor: 'userName' },
  { label: 'Amount', accessor: 'orderAmount' },
  { label: 'Order Date', accessor: 'orderDate' },
  { label: 'Status', accessor: 'orderStatus' }
]

export default function OrdersManagement() {
  const dispatch = useDispatch()

  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const { fromDate, toDate, keyword } = useSelector((state: RootState) => state.filter)
  const tableKey = 'orders'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})

  const [isFilterOpen, setFilterOpen] = useState(false)
  const [isSortOpen, setSortOpen] = useState(false)

  const handleApplySort = (newVisibleColumns: Record<keyof Order, boolean>) => {
    dispatch(setSortForTable({ tableKey, visibility: newVisibleColumns }))
    setSortOpen(false)
  }

  //pagination
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

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
      setTotalPages(response.data.totalPages)

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
      setAllOrders(ordersWithNames)
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

  const handleFilterApply = () => {
    // parse fromDate, toDate bằng dayjs (nếu fromDate, toDate là ISO: 'YYYY-MM-DD')
    const from = fromDate ? dayjs(fromDate) : null
    const to = toDate ? dayjs(toDate) : null
    const kw = keyword.toLowerCase()

    const filtered = allOrders.filter((item) => {
      const itemDate = dayjs(item.orderDate)

      if (from && itemDate.isBefore(from, 'day')) return false
      if (to && itemDate.isAfter(to, 'day')) return false

      if (kw) {
        const inUser = item.userName?.toLowerCase().includes(kw)
        const inStatus = item.orderStatus.toLowerCase().includes(kw)
        if (!inUser && !inStatus) return false
      }
      return true
    })

    setOrders(filtered)
    setFilterOpen(false)
    console.log('Filtered orders:', filtered)
  }

  const renderRow = (order: Order & { userName?: string }) => (
    <TableRow key={order.id} hover onClick={() => setSelectedOrder(order)}>
      {visibleColumns['id'] && <TableCell>{order.id}</TableCell>}
      {visibleColumns['userName'] && <TableCell>{order.userName}</TableCell>}
      {visibleColumns['orderAmount'] && <TableCell>{order.orderAmount}</TableCell>}
      {visibleColumns['orderDate'] && (
        <TableCell>
          <FormatDateTime date={order.orderDate} />
        </TableCell>
      )}
      {visibleColumns['orderStatus'] && <TableCell>{order.orderStatus}</TableCell>}
    </TableRow>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Orders Management</h1>
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
                <OrderFilter
                  onClose={() => setFilterOpen(false)}
                  onClear={() => {
                    dispatch(clearFilter())
                    setOrders(allOrders)
                  }}
                  onFilterApply={handleFilterApply}
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
                <OrderSort
                  columns={orderFields}
                  visibleColumns={visibleColumns}
                  onApply={handleApplySort}
                  onClose={() => setSortOpen(false)}
                  onClear={() => dispatch(clearSortForTable(tableKey))}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center py-6'>
          <Loader className='w-12 h-12 border-t-4 border-gray-300 border-solid rounded-full animate-spin' />
          <p className='mt-2 text-gray-500 text-sm'>Loading orders...</p>
        </div>
      ) : (
        <Table
          columns={[...orderFields.filter((field) => visibleColumns[field.accessor])]}
          renderRow={renderRow}
          data={orders}
        />
      )}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />
      {selectedOrder && (
        <DetailPopup
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          title='Order Detail'
          fields={[
            { label: 'Id', value: selectedOrder.id, isID: true },
            { label: 'User Name', value: selectedOrder.userName },
            { label: 'Amount', value: selectedOrder.orderAmount },
            { label: 'Order Date', value: selectedOrder.orderDate },
            {
              label: 'Status',
              value: [
                {
                  label: selectedOrder.orderStatus,
                  color:
                    selectedOrder.orderStatus === 'Completed'
                      ? 'green'
                      : selectedOrder.orderStatus === 'Pending'
                        ? 'orange'
                        : selectedOrder.orderStatus === 'Fail'
                          ? 'red'
                          : 'gray'
                }
              ],
              isStatus: true // Kích hoạt render status
            }
          ]}
        />
      )}
    </div>
  )
}
