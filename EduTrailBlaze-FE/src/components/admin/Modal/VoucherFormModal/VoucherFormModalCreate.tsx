import React, { useState } from 'react'
import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { z } from 'zod'
import { VoucherCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/vouchers/page'

import InputText from '@/components/global/Input/InputText'
import InputNumber from '@/components/global/Input/InputNumber'
import InputDate from '@/components/global/Input/InputDate'
import Button from '@/components/global/Button/Button'

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
          CREATE A VOUCHER
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
            subtitle={errors.voucherCode}
          />

          <InputText
            noLayout
            label='Discount Type'
            name='discountType'
            placeholder='Enter discount type'
            value={formValues.discountType}
            onChange={(e) => handleChange('discountType', e.target.value)}
            required
            subtitle={errors.discountType}
          />

          <InputNumber
            noLayout
            label='Discount Value'
            name='discountValue'
            placeholder='Enter discount value'
            value={formValues.discountValue}
            onChange={(e) => handleChange('discountValue', Number(e.target.value))}
            required
            subtitle={errors.discountValue}
          />

          <InputDate
            noLayout
            label='Start Date'
            name='startDate'
            placeholder='Select start date'
            value={formValues.startDate ? formValues.startDate.split('T')[0] : ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            required
            subtitle={errors.startDate}
          />

          <InputDate
            noLayout
            label='Expiry Date'
            name='expiryDate'
            placeholder='Select expiry date'
            value={formValues.expiryDate ? formValues.expiryDate.split('T')[0] : ''}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            required
            subtitle={errors.expiryDate}
          />

          <InputNumber
            noLayout
            label='Minimum Order Value'
            name='minimumOrderValue'
            placeholder='Enter minimum order value'
            value={formValues.minimumOrderValue}
            onChange={(e) => handleChange('minimumOrderValue', Number(e.target.value))}
            required
            subtitle={errors.minimumOrderValue}
          />

          <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
            <Button variant='DarkBlue' className='w-full mt-6' onClick={handleSubmit}>
              CREATE
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
