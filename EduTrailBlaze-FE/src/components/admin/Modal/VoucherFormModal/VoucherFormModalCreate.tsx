import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { z } from 'zod'
import { VoucherCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/vouchers/page'

const voucherSchema = z.object({
  voucherCode: z.string().min(1, 'Voucher Code is required'),
  discountType: z.string().min(1, 'Discount Type is required'),
  discountValue: z
    .number({ invalid_type_error: 'Discount Value must be a number' })
    .min(0, 'Discount Value must be >= 0'),
  startDate: z.string().min(1, 'Start Date is required'),
  expiryDate: z.string().min(1, 'Expiry Date is required'),
  minimumOrderValue: z
    .number({ invalid_type_error: 'Minimum Order Value must be a number' })
    .min(0, 'Minimum Order Value must be >= 0')
})

type VoucherFormModalCreateProps = {
  initialValues: VoucherCreate
  setNewVoucher: React.Dispatch<React.SetStateAction<VoucherCreate>>
  onSubmit: (formValues: VoucherCreate) => void
  onCancel: () => void
  isOpen: boolean
}

export default function VoucherFormModalCreate({
  initialValues,
  setNewVoucher,
  onSubmit,
  onCancel,
  isOpen
}: VoucherFormModalCreateProps) {
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState<{
    voucherCode?: string
    discountType?: string
    discountValue?: string
    startDate?: string
    expiryDate?: string
    minimumOrderValue?: string
  }>({})

  const handleChange = (field: keyof VoucherCreate, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setNewVoucher((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    const result = voucherSchema.safeParse(formValues)
    if (!result.success) {
      const newErrors: any = {}
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message
      })
      setErrors(newErrors)
    } else {
      setErrors({})
      onSubmit(formValues)
      setFormValues(initialValues)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.5)' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          bgcolor: 'white',
          p: 4,
          borderRadius: 0,
          border: '1px solid #ccc',
          position: 'relative'
        }}
      >
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 12, right: 12, color: 'gray' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant='h6' component='h2' align='center' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
          ADD Voucher
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Voucher Code</Typography>
            <TextField
              label='Voucher Code'
              value={formValues.voucherCode}
              onChange={(e) => handleChange('voucherCode', e.target.value)}
              fullWidth
              size='small'
              error={!!errors.voucherCode}
              helperText={errors.voucherCode}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Discount Type</Typography>
            <TextField
              label='Discount Type'
              value={formValues.discountType}
              onChange={(e) => handleChange('discountType', e.target.value)}
              fullWidth
              size='small'
              error={!!errors.discountType}
              helperText={errors.discountType}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Discount Value</Typography>
            <TextField
              label='Discount Value'
              type='number'
              value={formValues.discountValue}
              onChange={(e) => handleChange('discountValue', Number(e.target.value))}
              fullWidth
              size='small'
              error={!!errors.discountValue}
              helperText={errors.discountValue}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Start Date</Typography>
            <TextField
              label='Start Date'
              type='date'
              value={formValues.startDate ? formValues.startDate.split('T')[0] : ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              fullWidth
              size='small'
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Expiry Date</Typography>
            <TextField
              label='Expiry Date'
              type='date'
              value={formValues.expiryDate ? formValues.expiryDate.split('T')[0] : ''}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              fullWidth
              size='small'
              InputLabelProps={{ shrink: true }}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>
              Minimum Order Value
            </Typography>
            <TextField
              label='Minimum Order Value'
              type='number'
              value={formValues.minimumOrderValue}
              onChange={(e) => handleChange('minimumOrderValue', Number(e.target.value))}
              fullWidth
              size='small'
              error={!!errors.minimumOrderValue}
              helperText={errors.minimumOrderValue}
            />
          </Box>
        </Box>

        <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Create
          </Button>
          <Button onClick={onCancel} variant='contained' color='secondary'>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
