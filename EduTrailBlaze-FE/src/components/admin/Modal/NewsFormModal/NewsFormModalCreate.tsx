import React, { useState } from 'react'
import { Modal, IconButton, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { z } from 'zod'
import { NewsCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/news/page'

import InputText from '@/components/global/Input/InputText'
import Button from '@/components/global/Button/Button'
const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Invalid URL format')
})

type NewsFormModalCreateProps = {
  initialValues: NewsCreate
  setNewNews: React.Dispatch<React.SetStateAction<NewsCreate>>
  onSubmit: (formValues: NewsCreate) => void
  onCancel: () => void
  isOpen: boolean
}

export default function NewsFormModalCreate({
  initialValues,
  setNewNews,
  onSubmit,
  onCancel,
  isOpen
}: NewsFormModalCreateProps) {
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState<{ title?: string; content?: string; imageUrl?: string }>({})

  const handleChange = (field: keyof NewsCreate, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setNewNews((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    const result = newsSchema.safeParse(formValues)
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
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0,0,0,0.5)'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          maxWidth: 500, // 🔹 Updated: Định kích thước modal
          p: 4,
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 16, right: 16, color: 'gray' }}>
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant='h4' component='h2' align='left' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
          CREATE A NEWS
        </Typography>

        {/* Form Fields */}
        <Box display='flex' flexDirection='column' gap={2}>
          {/* 🔹 Updated: Thay div bằng Box */}
          <InputText
            noLayout
            label='Title'
            name='title'
            placeholder='Enter news title'
            value={formValues.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            helperText={errors.title}
          />
          <InputText
            noLayout
            label='Content'
            name='content'
            placeholder='Describe the news...'
            type='textarea'
            rows={5}
            value={formValues.content}
            onChange={(e) => handleChange('content', e.target.value)}
            required
            helperText={errors.content}
          />
          <InputText
            noLayout
            label='Image URL'
            name='imageUrl'
            placeholder='Enter image URL'
            value={formValues.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            required
            helperText={errors.imageUrl}
          />
        </Box>

        {/* Submit Button */}
        <Button variant='DarkBlue' size='md' onClick={handleSubmit} className='w-full mt-4'>
          CREATE
        </Button>
      </Box>
    </Modal>
  )
}
