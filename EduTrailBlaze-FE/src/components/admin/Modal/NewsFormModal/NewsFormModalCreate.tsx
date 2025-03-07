import React, { useState } from 'react'
import { Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { z } from 'zod'
import { NewsCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/news/page'

import InputText from '@/components/global/Input/InputText'

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
      {/* Bạn tự style thẻ bên ngoài thay vì <Box> của MUI */}
      <div className='bg-white w-full max-w-lg p-6 rounded-md relative'>
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 16, right: 16, color: 'gray' }}>
          <CloseIcon />
        </IconButton>
        <h2 className='text-center text-lg font-bold mb-6'>ADD NEWS</h2>

        {/* Dùng flex-col + gap để sắp xếp các input */}
        <div className='flex flex-col gap-4'>
          {/* Title */}
          <InputText
            noLayout={true} // <-- Sử dụng noLayout
            label='Title'
            name='title'
            placeholder='Enter news title'
            value={formValues.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            helperText={errors.title}
          />

          {/* Content */}
          <InputText
            noLayout={true} // <-- Sử dụng noLayout
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

          {/* Image URL */}
          <InputText
            noLayout={true} // <-- Sử dụng noLayout
            label='Image URL'
            name='imageUrl'
            placeholder='Enter image URL'
            value={formValues.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            required
            helperText={errors.imageUrl}
          />
        </div>

        {/* Nút ADD NEWS */}
        <button
          onClick={handleSubmit}
          className='mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-all'
        >
          ADD NEWS
        </button>
      </div>
    </Modal>
  )
}
