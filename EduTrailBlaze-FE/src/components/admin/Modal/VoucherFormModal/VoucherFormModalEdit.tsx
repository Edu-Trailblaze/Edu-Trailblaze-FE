import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Voucher } from '@/app/(Admin)/admin_dashboard/Dashboard/vouchers/page'

import InputText from '@/components/global/Input/InputText'
import InputNumber from '@/components/global/Input/InputNumber'
import InputDate from '@/components/global/Input/InputDate'
import Button from '@/components/global/Button/Button'
import SelectField from '@/components/global/Select/SelectField'

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
          borderRadius: 3,
          border: '1px solid #ccc',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 12, right: 12, color: 'gray' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant='h4' component='h2' align='left' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
          UPDATE A VOUCHER
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
          <InputText
            noLayout
            label='Voucher Code'
            name='voucherCode'
            placeholder='Enter voucher code'
            value={formValues.voucherCode}
            onChange={(e) => handleChange('voucherCode', e.target.value)}
            required
          />

          <InputText
            noLayout
            label='Discount Type'
            name='discountType'
            placeholder='Enter discount type'
            value={formValues.discountType}
            onChange={(e) => handleChange('discountType', e.target.value)}
            required
          />

          <InputNumber
            noLayout
            label='Discount Value'
            name='discountValue'
            placeholder='Enter discount value'
            value={formValues.discountValue}
            onChange={(e) => handleChange('discountValue', Number(e.target.value))}
            min={0}
            required
          />

          <InputDate
            noLayout
            label='Start Date'
            name='startDate'
            placeholder='Select start date'
            value={formValues.startDate ? formValues.startDate.split('T')[0] : ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            required
          />

          <InputDate
            noLayout
            label='Expiry Date'
            name='expiryDate'
            placeholder='Select expiry date'
            value={formValues.expiryDate ? formValues.expiryDate.split('T')[0] : ''}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            required
          />

          <InputNumber
            noLayout
            label='Min Order Value'
            name='minimumOrderValue'
            placeholder='Enter min order value'
            value={formValues.minimumOrderValue}
            onChange={(e) => handleChange('minimumOrderValue', Number(e.target.value))}
            min={0}
            required
          />

          {/* 🔹 Updated: Dùng SelectField thay cho InputSelect */}
          <SelectField
            noLayout
            label='Is Used'
            name='isUsed'
            options={['YES', 'NO']}
            value={formValues.isUsed ? 'YES' : 'NO'}
            onChange={(e) => handleChange('isUsed', e.target.value === 'YES')}
            required
          />
          <Button variant='DarkBlue' size='md' onClick={handleSubmit} className='w-full mt-6'>
            SAVE CHANGES
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
