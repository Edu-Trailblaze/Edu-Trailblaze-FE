import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@/components/global/Button/Button'
import InputSelect from '@/components/global/Input/InputSelect'
// import { CourseApprovalStatus } from '@/types/course.type'

type CourseApprovalStatus = 'Approved' | 'Rejected' | 'Pending'
interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (newStatus: CourseApprovalStatus) => void
  currentStatus?: CourseApprovalStatus // giá trị ban đầu
}

const STATUS_OPTIONS: CourseApprovalStatus[] = ['Approved', 'Rejected', 'Pending']

export default function StatusModal({ isOpen, onClose, onSubmit, currentStatus = 'Pending' }: StatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<CourseApprovalStatus>(currentStatus)

  useEffect(() => {
    // Mỗi lần mở modal với currentStatus mới
    setSelectedStatus(currentStatus)
  }, [currentStatus])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(selectedStatus)
  }

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          border: '1px solid #ccc',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        {/* Icon Close giống form edit */}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, color: 'gray' }}>
          <CloseIcon />
        </IconButton>

        {/* Tiêu đề giống form edit */}
        <Typography variant='h4' component='h2' align='left' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
          UPDATE STATUS
        </Typography>

        {/* Form nội dung */}
        <Box
          component='form'
          onSubmit={handleSave}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}
        >
          {/* Thay InputText, InputNumber,... bằng InputSelect */}
          <InputSelect
            label='Status'
            name='status'
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as CourseApprovalStatus)}
            options={[
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
              { label: 'Pending', value: 'Pending' }
            ]}
            noLayout
          />

          {/* Nút Update */}
          <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
            <Button variant='DarkBlue' className='w-full mt-6' type='submit'>
              UPDATE STATUS
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
