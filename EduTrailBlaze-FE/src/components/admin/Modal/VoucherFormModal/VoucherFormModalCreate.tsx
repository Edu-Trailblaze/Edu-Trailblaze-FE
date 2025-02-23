import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'

type Voucher = {
  voucherCode: string
  discountType: string
  discountValue: number
  startDate: string
  expiryDate: string
  minimumOrderValue: number
  isUsed: boolean
}

type VoucherFormModalCreateProps = {
  initialValues: Voucher
  setNewVoucher: React.Dispatch<React.SetStateAction<Voucher>>
  onSubmit: (formValues: Voucher) => void
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

  const handleChange = (field: keyof Voucher, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setNewVoucher((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Modal open={isOpen} onClose={onCancel} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto'
        }}
      >
        <Typography variant='h6' gutterBottom>
          Create Voucher
        </Typography>
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Voucher Code'
            value={formValues.voucherCode}
            onChange={(e) => handleChange('voucherCode', e.target.value)}
            fullWidth
          />
          <TextField
            label='Discount Type'
            value={formValues.discountType}
            onChange={(e) => handleChange('discountType', e.target.value)}
            fullWidth
          />
          <TextField
            label='Discount Value'
            type='number'
            value={formValues.discountValue}
            onChange={(e) => handleChange('discountValue', Number(e.target.value))}
            fullWidth
          />
          <TextField
            label='Start Date'
            type='date'
            value={formValues.startDate ? formValues.startDate.split('T')[0] : ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label='Expiry Date'
            type='date'
            value={formValues.expiryDate ? formValues.expiryDate.split('T')[0] : ''}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Minimum Order Value'
            type='number'
            value={formValues.minimumOrderValue}
            onChange={(e) => handleChange('minimumOrderValue', Number(e.target.value))}
            fullWidth
          />
        </Box>

        <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
          <Button onClick={() => onSubmit(formValues)} variant='contained' color='primary'>
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
