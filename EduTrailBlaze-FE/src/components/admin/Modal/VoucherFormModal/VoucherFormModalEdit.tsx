import React, { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Voucher } from '@/app/(Admin)/admin_dashboard/Dashboard/vouchers/page'

type VoucherFormModalEditProps = {
  initialValues: Voucher
  setEditVoucher: React.Dispatch<React.SetStateAction<Voucher | null>>
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
  const [formValues, setFormValues] = useState(initialValues)

  useEffect(() => {
    setFormValues(initialValues)
  }, [initialValues])

  const handleChange = (field: keyof Voucher, value: any) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [field]: value }
      setEditVoucher(updatedValues)
      return updatedValues
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formValues)
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
          EDIT VOUCHER
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Voucher Code</Typography>
            <TextField
              value={formValues.voucherCode}
              onChange={(e) => handleChange('voucherCode', e.target.value)}
              fullWidth
              size='small'
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Discount Type</Typography>
            <TextField
              value={formValues.discountType}
              onChange={(e) => handleChange('discountType', e.target.value)}
              fullWidth
              size='small'
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Discount Value</Typography>
            <TextField
              value={formValues.discountValue}
              onChange={(e) => handleChange('discountValue', Number(e.target.value))}
              fullWidth
              type='number'
              size='small'
              inputProps={{ min: 0 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Start Date</Typography>
            <TextField
              value={formValues.startDate ? formValues.startDate.split('T')[0] : ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              fullWidth
              type='date'
              size='small'
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Expiry Date</Typography>
            <TextField
              value={formValues.expiryDate ? formValues.expiryDate.split('T')[0] : ''}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              fullWidth
              type='date'
              size='small'
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Min Order Value</Typography>
            <TextField
              value={formValues.minimumOrderValue}
              onChange={(e) => handleChange('minimumOrderValue', Number(e.target.value))}
              fullWidth
              type='number'
              size='small'
              inputProps={{ min: 0 }}
            />
          </Box>

          {/* CHANGED: isUsed chọn YES/NO, giữ style label-bên-trái giống NewsForm */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Is Used</Typography>
            <FormControl fullWidth size='small'>
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
        </Box>

        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{
            mt: 4,
            bgcolor: '#00B4D8',
            color: 'white',
            display: 'block',
            width: '100%',
            borderRadius: '0px',
            '&:hover': { bgcolor: '#0096D7' }
          }}
        >
          SAVE CHANGES
        </Button>
      </Box>
    </Modal>
  )
}
