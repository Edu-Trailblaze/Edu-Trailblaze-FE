'use client'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'
import { setSortForTable, clearSortForTable } from '@/redux/slice/sort.slice'

//api
import api from '@/components/config/axios'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, MenuItem, IconButton, TableRow, TableCell } from '@mui/material'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Pagination from '@/components/admin/Pagination/Pagination'
import Table from '@/components/admin/Table/Table'
import TableSearch from '@/components/admin/TableSearch/TableSearch'
import Loader from '@/components/animate/loader/loader'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

//sort filter
import VoucherSort from '../../../../../components/admin/Filter/VoucherSortFilter/VoucherSort'
import VoucherFilter from '../../../../../components/admin/Filter/VoucherSortFilter/VoucherFilter'
//modal
import DetailModal from '../../../../../components/admin/Modal/DetailModal'
import VoucherFormModalCreate from '../../../../../components/admin/Modal/VoucherFormModal/VoucherFormModalCreate'
import VoucherFormModalEdit from '../../../../../components/admin/Modal/VoucherFormModal/VoucherFormModalEdit'

//icon
import { Filter, ArrowUpDown, Plus, Eye, Trash2, Pencil, EllipsisVertical } from 'lucide-react'

export type Voucher = {
  id?: number
  discountType: string
  discountValue: number
  voucherCode: string
  startDate: string
  expiryDate: string
  minimumOrderValue: number
  createdAt: string
  isUsed: boolean
}

export type VoucherCreate = Omit<Voucher, 'createdAt'>

const voucherFields: { label: string; accessor: keyof Voucher }[] = [
  { label: 'Voucher ID', accessor: 'id' },
  { label: 'Discount Type', accessor: 'discountType' },
  { label: 'Discount Value', accessor: 'discountValue' },
  { label: 'Voucher Code', accessor: 'voucherCode' },
  { label: 'Expiry Date', accessor: 'expiryDate' }
]

export default function VouchersManagement() {
  const dispatch = useDispatch()

  const [allVouchers, setAllVouchers] = useState<Voucher[]>([])
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [dot, setDot] = useState<{ [key: number]: HTMLElement | null }>({})
  const [isSortOpen, setSortOpen] = useState(false)

  //filter
  const [isFilterOpen, setFilterOpen] = useState(false)

  //redux filter
  const { fromDate, toDate, keyword } = useSelector((state: RootState) => state.filter)

  //redux sort
  const tableKey = 'vouchers'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})

  //modal
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editVoucher, setEditVoucher] = useState<Voucher | null>(null)
  const [newVoucher, setNewVoucher] = useState<VoucherCreate>({
    discountType: '',
    discountValue: 0,
    voucherCode: '',
    startDate: '',
    expiryDate: '',
    minimumOrderValue: 0,
    isUsed: false
  })

  //pagination
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  const fetchVouchers = async (page: number) => {
    setLoading(true)
    try {
      const response = await api.get('/Voucher/get-paging-voucher', {
        params: {
          pageIndex: page,
          pageSize
        }
      })
      setVouchers(response.data.items)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching vouchers:', error)
      toast.error('Failed to fetch vouchers!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVouchers(pageIndex)
  }, [pageIndex])

  const handleAddVoucher = async (newVoucher: VoucherCreate) => {
    try {
      const response = await api.post('/Voucher', {
        ...newVoucher,
        startDate: newVoucher.startDate ? newVoucher.startDate + 'T00:00:00Z' : '',
        expiryDate: newVoucher.expiryDate ? newVoucher.expiryDate + 'T23:59:59Z' : ''
      })

      toast.success('Voucher created successfully!')
      setVouchers([...vouchers, response.data])
      fetchVouchers(pageIndex)
      setAddModalOpen(false)
    } catch (error) {
      console.error('Error adding voucher:', error)
      toast.error('Failed to create voucher!')
    }
  }

  const handleEditVoucher = (voucher: Voucher) => {
    setEditVoucher(voucher)
    setEditModalOpen(true)
  }

  const handleUpdateVoucher = async (updatedVoucher: Voucher) => {
    try {
      const voucherToSend = {
        ...updatedVoucher,
        voucherId: updatedVoucher.id
      }

      await api.put(`/Voucher`, voucherToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      toast.success('Voucher updated successfully!')

      setVouchers(vouchers.map((voucher) => (voucher.id === updatedVoucher.id ? updatedVoucher : voucher)))

      setEditModalOpen(false)
      setEditVoucher(null)
    } catch (error) {
      console.error('Error updating voucher:', error)
      toast.error('Failed to update voucher!')
    }
  }

  const handleApplySort = (newVisibleColumns: Record<keyof Voucher, boolean>) => {
    // save state
    dispatch(setSortForTable({ tableKey, visibility: newVisibleColumns }))
    setSortOpen(false)
  }

  const handleClickDot = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setDot((prev) => ({ ...prev, [id]: event.currentTarget }))
  }

  const handleCloseDot = (id: number) => {
    setDot((prev) => ({ ...prev, [id]: null }))
  }

  const renderRow = (voucher: Voucher) => (
    <TableRow key={voucher.id} hover>
      {visibleColumns['id'] && <TableCell>{voucher.id}</TableCell>}
      {visibleColumns['discountType'] && <TableCell>{voucher.discountType}</TableCell>}
      {visibleColumns['discountValue'] && <TableCell>{voucher.discountValue}</TableCell>}
      {visibleColumns['voucherCode'] && <TableCell>{voucher.voucherCode}</TableCell>}
      {visibleColumns['expiryDate'] && (
        <TableCell>
          <FormatDateTime date={voucher.expiryDate} />
        </TableCell>
      )}

      <TableCell>
        <IconButton onClick={(e) => handleClickDot(e, voucher.id!)}>
          <EllipsisVertical size={18} />
        </IconButton>

        <Menu anchorEl={dot[voucher.id!]} open={Boolean(dot[voucher.id!])} onClose={() => handleCloseDot(voucher.id!)}>
          <MenuItem
            onClick={() => {
              setSelectedVoucher(voucher)
              handleCloseDot(voucher.id!)
            }}
          >
            <Eye size={18} style={{ marginRight: '10px', color: '#1D4ED8' }} /> View
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEditVoucher(voucher)
              handleCloseDot(voucher.id!)
            }}
          >
            <Pencil size={18} style={{ marginRight: '10px', color: '#F59E0B' }} /> Edit
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>Vouchers Management</h1>
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
                <VoucherFilter
                  onClose={() => setFilterOpen(false)}
                  onClear={() => {
                    dispatch(clearFilter())
                    setVouchers(allVouchers)
                  }}
                  onFilterApply={() => {
                    //  GET fromDate, toDate, keyword từ Redux
                    const from = fromDate ? new Date(fromDate) : null
                    const to = toDate ? new Date(toDate) : null
                    const kw = keyword.toLowerCase()

                    // filter
                    const filterVoucher = allVouchers.filter((item) => {
                      const itemDate = new Date(item.expiryDate)
                      if (from && itemDate < from) return false
                      if (to && itemDate > to) return false

                      if (kw) {
                        const inCode = item.voucherCode.toLowerCase().includes(kw)
                        const inType = item.discountType.toLowerCase().includes(kw)
                        if (!inCode && !inType) return false
                      }
                      return true
                    })

                    setVouchers(filterVoucher)
                    console.log('Filtered voucher:', filterVoucher)
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
                <VoucherSort
                  columns={voucherFields}
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
          <p className='mt-2 text-gray-500 text-sm'>Loading vouchers...</p>
        </div>
      ) : (
        <Table
          columns={[
            ...voucherFields.filter((field) => visibleColumns[field.accessor]),
            { label: 'Actions', accessor: 'action' }
          ]}
          renderRow={renderRow}
          data={vouchers}
        />
      )}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />
      {selectedVoucher && (
        <DetailModal item={selectedVoucher} fields={voucherFields} onClose={() => setSelectedVoucher(null)} />
      )}

      <VoucherFormModalCreate
        initialValues={newVoucher}
        setNewVoucher={setNewVoucher}
        onSubmit={handleAddVoucher}
        onCancel={() => setAddModalOpen(false)}
        isOpen={isAddModalOpen}
      />

      {editVoucher && (
        <VoucherFormModalEdit
          initialValues={editVoucher}
          setEditVoucher={setEditVoucher}
          onSubmit={handleUpdateVoucher}
          onCancel={() => {
            setEditModalOpen(false)
            setEditVoucher(null)
          }}
          isOpen={isEditModalOpen}
        />
      )}
    </div>
  )
}
