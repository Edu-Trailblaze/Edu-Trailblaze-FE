import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material'

type Voucher = {
  voucherId?: number
  voucherCode: string
  discountType: string
  discountValue: number
  startDate: string
  expiryDate: string
  minimumOrderValue: number
  isUsed: boolean
}

type VoucherFormModalEditProps = {
  initialValues: Voucher
  setEditVoucher: React.Dispatch<React.SetStateAction<Voucher>>
  onSubmit: (formValues: Voucher) => void
  onCancel: () => void
  isOpen: boolean
}

export default function VoucherFormModalEdit({
  initialValues,
  setEditVoucher,
  onSubmit,
  onCancel,
  isOpen
}: VoucherFormModalEditProps) {
  const [formValues, setFormValues] = useState<Voucher>(initialValues)

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues)
    }
  }, [initialValues])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit(formValues)
  }

  const handleChange = (field: keyof Voucher, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setEditVoucher((prev) => ({
      ...prev!,
      [field]: value
    }))
  }

  return (
    <Modal open={isOpen} onClose={onCancel} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto'
        }}
      >
        <Typography variant='h6' gutterBottom>
          Edit Voucher
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
            value={formValues.discountValue}
            onChange={(e) => handleChange('discountValue', Number(e.target.value))}
            fullWidth
            type='number'
            inputProps={{ min: 0 }}
          />
          <TextField
            label='Start Date'
            value={formValues.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            fullWidth
            type='date'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Expiry Date'
            value={formValues.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            fullWidth
            type='date'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Minimum Order Value'
            value={formValues.minimumOrderValue}
            onChange={(e) => handleChange('minimumOrderValue', Number(e.target.value))}
            fullWidth
            type='number'
            inputProps={{ min: 0 }}
          />
          <FormControl fullWidth>
            <InputLabel>Is Used</InputLabel>
            <Select
              value={formValues.isUsed ? 'true' : 'false'}
              onChange={(e) => handleChange('isUsed', e.target.value === 'true')}
              label='Is Used'
            >
              <MenuItem value='true'>YES</MenuItem>
              <MenuItem value='false'>NO</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Save Changes
          </Button>
          <Button onClick={onCancel} variant='contained' color='secondary'>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
