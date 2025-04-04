'use client'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

//api
import api from '@/components/config/axios'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'


import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'
import DetailPopup from '@/components/global/Popup/PopupDetail'
import { formatCurrency } from '@/helper/format'

//sort filter
import OrderSort from '@/components/admin/Filter/OrderSortFilter/OrderSort'
import DateFilter from '@/components/admin/Filter/DateFilter'

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

  const [searchResult, setSearchResult] = useState<Order[]>([]);
  const [dateResult, setDateResult] = useState<Order[]>([]);
  const display = useMemo(() => {
    return searchResult.filter(order => dateResult.includes(order));
  }, [searchResult, dateResult]);
  
  const [localFromDate, setLocalFromDate] = useState('');
  const [localToDate, setLocalToDate] = useState('');

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

      setSearchResult(ordersWithNames);
      setDateResult(ordersWithNames);
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




  function getOrderStatusColor(status: string) {
    switch (status) {
      case 'Completed':
        return { color: 'green' }
      case 'Failed':
        return { color: 'red' }
      case 'Pending':
        return { color: 'goldenrod' }
      default:
        return {}
    }
  }

  const renderRow = (order: Order & { userName?: string }) => (
    <TableRow key={order.id} hover onClick={() => setSelectedOrder(order)}>
      {visibleColumns['id'] && <TableCell>{order.id}</TableCell>}
      {visibleColumns['userName'] && <TableCell>{order.userName}</TableCell>}
      {visibleColumns['orderAmount'] && <TableCell>{formatCurrency(order.orderAmount)}</TableCell>}
      {visibleColumns['orderDate'] && (
        <TableCell>
          <FormatDateTime date={order.orderDate} />
        </TableCell>
      )}
      {/* {visibleColumns['orderStatus'] && <TableCell>{order.orderStatus}</TableCell>} */}
      {visibleColumns['orderStatus'] && (
      <TableCell sx={getOrderStatusColor(order.orderStatus)}>
        {order.orderStatus}
      </TableCell>
    )}
    </TableRow>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Orders Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
            <TableSearch
              data={allOrders}
              filterKeys={['userName', 'orderStatus']}  
              onFilteredData={(filteredData) => {
                setSearchResult(filteredData);
              }}
            />         
            <div className='flex items-center gap-4 self-end'>
            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
              </button>
              {isFilterOpen && (
                <DateFilter
                fromDate={localFromDate}
                toDate={localToDate}
                onChange={(newValues) => {
                  if (newValues.fromDate !== undefined) {
                    setLocalFromDate(newValues.fromDate);
                  }
                  if (newValues.toDate !== undefined) {
                    setLocalToDate(newValues.toDate);
                  }
                }}
                onReset={() => {
                  setLocalFromDate('');
                  setLocalToDate('');
                }}
                onApply={() => {
                  const from = localFromDate ? new Date(localFromDate) : null;
                  const to = localToDate ? new Date(localToDate) : null;
                  const filtered = allOrders.filter((item) => {
                    if (!item.orderDate) return false;
                    const itemDate = new Date(item.orderDate);
                    if (from && itemDate < from) return false;
                    if (to && itemDate > to) return false;
                    return true;
                  });
                  setDateResult(filtered);
                  setFilterOpen(false);
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
          data={display}
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
            { label: 'Amount', value: formatCurrency(selectedOrder.orderAmount) },
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
              isStatus: true 
            }
          ]}
        />
      )}
    </div>
  )
}
