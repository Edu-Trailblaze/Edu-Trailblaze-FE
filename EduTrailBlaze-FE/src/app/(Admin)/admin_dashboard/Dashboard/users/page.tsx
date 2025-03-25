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
import Pagination from '@/components/admin/Pagination/Pagination'

//sort filter
import UserSort from '@/components/admin/Filter/UserSortFilter/UserSort'
import UserFilter from '@/components/admin/Filter/UserSortFilter/UserFilter'

//modal
// import UserFormModalEdit from '@/components/admin/Modal/UserFormModal/UserFormModalEdit'
// import UserFormModalCreate from '@/components/admin/Modal/UserFormModal/UserFormModalCreate'
import DetailPopup from '@/components/global/Popup/PopupDetail'

//icon
import { Filter, ArrowUpDown, Plus } from 'lucide-react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export type User = {
  id: string
  userName: string
  email: string
  phoneNumber: string
  twoFactorEnabled: boolean
  lockoutEnabled: boolean
  fullName: string
  role: string[]
  balance: number
  profilePictureUrl: string
}

export type UserCreate = Omit<User, 'id' | 'twoFactorEnabled' | 'lockoutEnabled' | 'role' | 'balance'>

const userFields: { label: string; accessor: keyof User }[] = [
  { label: 'Full Name', accessor: 'fullName' },
  { label: 'Email', accessor: 'email' },
  { label: 'Phone Number', accessor: 'phoneNumber' },
  { label: 'Role', accessor: 'role' },
  { label: 'Balance', accessor: 'balance' },
  { label: 'Profile', accessor: 'profilePictureUrl' }
]

export default function UserManagement() {
  const dispatch = useDispatch()

  const [allUsers, setAllUsers] = useState<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  //filter
  const [isFilterOpen, setFilterOpen] = useState(false)
  // Chỉ sử dụng keyword cho filter (với User, ta không cần lọc theo ngày)
  const { keyword } = useSelector((state: RootState) => state.filter)

  //redux sort
  const [isSortOpen, setSortOpen] = useState(false)
  const tableKey = 'users'
  const visibleColumns = useSelector((state: RootState) => state.sort[tableKey] || {})

  //modal
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<UserCreate>({
    userName: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    profilePictureUrl: ''
  })

  //pagination
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  // Lấy danh sách user theo API get-paging-user
  const fetchUsers = async (page: number) => {
    setLoading(true)
    try {
      const response = await api.get('/User/get-paging-user', {
        params: {
          pageIndex: page,
          pageSize
        }
      })
      setUsers(response.data.items)
      setAllUsers(response.data.items)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch user list!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(pageIndex)
  }, [pageIndex])

  const handleAddUser = async (newUser: UserCreate) => {
    try {
      const response = await api.post('/User', newUser)
      toast.success('User added successfully!')
      setUsers([...users, response.data])
      fetchUsers(pageIndex)
      setAddModalOpen(false)
    } catch (error) {
      console.error('Error adding user:', error)
      toast.error('Failed to add user!')
    }
  }

  const handleEditUser = (user: User) => {
    setEditUser(user)
    setEditModalOpen(true)
  }

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const userToSend = {
        ...updatedUser,
        userId: updatedUser.id
      }
      await api.put(`/User`, userToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success('User updated successfully!')
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
      setEditModalOpen(false)
      setEditUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user!')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await api.delete(`/User/${userId}`)
      setUsers(users.filter((u) => u.id !== userId))
      toast.success('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user!')
    }
  }

  const handleApplySort = (newVisibleColumns: Record<keyof User, boolean>) => {
    dispatch(setSortForTable({ tableKey, visibility: newVisibleColumns }))
    setSortOpen(false)
  }

  const handleDetail = async (user: User) => {
    try {
      const response = await api.get('/User/get-user-profile', {
        params: {
          userId: user.id
        }
      })
      setSelectedUser(response.data)
    } catch (error) {
      console.error('Error fetching user details:', error)
      toast.error('Failed to fetch user details!')
    }
  }

  function getRoleStyle(role: string) {
    switch (role) {
      case 'Admin':
        return {
          backgroundColor: '#FF0000',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          marginRight: '6px',
          marginBottom: '6px',
          display: 'inline-block'
        }
      case 'Student':
        return {
          backgroundColor: '#8FD3FE',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          marginRight: '6px',
          marginBottom: '6px',
          display: 'inline-block'
        }
      case 'Instructor':
        return {
          backgroundColor: 'green',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          marginRight: '6px',
          marginBottom: '6px',
          display: 'inline-block'
        }
      case 'Customer':
        return {
          backgroundColor: '#FDD97C',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          marginRight: '6px',
          marginBottom: '6px',
          display: 'inline-block'
        }
      default:
        return {
          backgroundColor: 'gray',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          marginRight: '6px',
          marginBottom: '6px',
          display: 'inline-block'
        }
    }
  }

  const renderRow = (user: User) => (
    <TableRow key={user.id} hover onClick={() => handleDetail(user)}>
      {visibleColumns['fullName'] && <TableCell>{user.fullName}</TableCell>}
      {visibleColumns['email'] && <TableCell>{user.email}</TableCell>}
      {visibleColumns['phoneNumber'] && <TableCell>{user.phoneNumber}</TableCell>}
      {visibleColumns['role'] && (
      <TableCell>
        <div style={{ whiteSpace: 'pre' }}>
          {user.role.map((r, idx) => (
            <span key={idx} style={getRoleStyle(r)}>
              {r}
              {idx < user.role.length - 1 ? '\n' : ''}
            </span>
          ))}
        </div>
      </TableCell>
    )} 
   {visibleColumns['balance'] && <TableCell>{user.balance}</TableCell>}
      {visibleColumns['profilePictureUrl'] && (
        <TableCell>
          <img
            src={user.profilePictureUrl}
            alt='user profile'
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 4 }}
          />
        </TableCell>
      )}
    </TableRow>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>User Management</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            {/* <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
              </button>
              {isFilterOpen && (
                <UserFilter
                  onClose={() => setFilterOpen(false)}
                  onClear={() => {
                    dispatch(clearFilter())
                    setUsers(allUsers)
                  }}
                  onFilterApply={() => {
                    const kw = keyword.toLowerCase()
                    const filtered = allUsers.filter((item) => {
                      if (kw) {
                        const inUserName = item.userName.toLowerCase().includes(kw)
                        const inEmail = item.email.toLowerCase().includes(kw)
                        const inFullName = item.fullName.toLowerCase().includes(kw)
                        if (!inUserName && !inEmail && !inFullName) return false
                      }
                      return true
                    })
                    setUsers(filtered)
                    console.log('Filtered users:', filtered)
                  }}
                />
              )}
            </div> */}

            <div className='relative'>
              <button
                className='w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]'
                onClick={() => setSortOpen(!isSortOpen)}
              >
                <ArrowUpDown size={18} />
              </button>
              {isSortOpen && (
                <UserSort
                  columns={userFields}
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
          <p className='mt-2 text-gray-500 text-sm'>Loading users...</p>
        </div>
      ) : (
        <Table
          columns={[...userFields.filter((field) => visibleColumns[field.accessor])]}
          renderRow={renderRow}
          data={users}
        />
      )}
      <Pagination pageIndex={pageIndex} totalPages={totalPages} onPageChange={(page) => setPageIndex(page)} />

      {selectedUser && (
  <DetailPopup
    isOpen={true}
    onClose={() => setSelectedUser(null)}
    title='User Detail'
    fields={[
      {
        label: 'User Name',
        value: selectedUser.userName || 'N/A'
      },
      {
        label: 'Email',
        value: selectedUser.email || 'N/A'
      },
      {
        label: 'Full Name',
        value: selectedUser.fullName || 'N/A'
      },
      {
        label: 'Phone Number',
        value: selectedUser.phoneNumber || 'N/A'
      },
      {
        label: 'Role',
        value:
          selectedUser.role && selectedUser.role.length > 0
            ? selectedUser.role.map((r) => ({
                label: r,
                color:
                  r === 'Admin'
                    ? '#FF0000'
                    : r === 'Student'
                    ? '#8FD3FE'
                    : r === 'Instructor'
                    ? 'green'
                    : r === 'Customer'
                    ? '#FDD97C'
                    : 'gray'
              }))
            : [{ label: 'N/A', color: 'gray' }],
        isStatus: true
      },
      {
        label: 'Balance',
        value: selectedUser.balance ?? 'N/A'
      },
      {
        label: 'Profile Image',
        value: selectedUser.profilePictureUrl ? (
          <img
            src={selectedUser.profilePictureUrl}
            alt='Profile'
            className='w-16 h-16 object-cover rounded'
          />
        ) : (
          'N/A'
        )
      }
    ]}
          // actions={[
          //   {
          //     label: 'Assign role',
          //     onClick: () => {
          //       handleEditUser(selectedUser)
          //     },
          //     icon: <EditIcon fontSize='small' style={{ color: '#F59E0B' }} />
          //   }
          // ]}
        />
      )}
      {/* <UserFormModalCreate
        initialValues={newUser}
        setNewUser={setNewUser}
        onSubmit={handleAddUser}
        onCancel={() => setAddModalOpen(false)}
        isOpen={isAddModalOpen}
      /> */}
      {/* {editUser && (
        <UserFormModalEdit
          initialValues={editUser}
          setEditUser={setEditUser}
          onSubmit={handleUpdateUser}
          onCancel={() => {
            setEditModalOpen(false)
            setEditUser(null)
          }}
          isOpen={isEditModalOpen}
        />
      )} */}
    </div>
  )
}
