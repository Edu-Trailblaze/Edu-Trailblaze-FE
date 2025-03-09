import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { News } from '@/app/(Admin)/admin_dashboard/Dashboard/news/page'

import InputText from '@/components/global/Input/InputText'
import Button from '@/components/global/Button/Button'

type NewsFormModalEditProps = {
  initialValues: News
  setEditNews: React.Dispatch<React.SetStateAction<News | null>>
  onSubmit: (formValues: News) => void
  onCancel: () => void
  isOpen: boolean
}

export default function NewsFormModalEdit({
  initialValues,
  setEditNews,
  onSubmit,
  onCancel,
  isOpen
}: NewsFormModalEditProps) {
  const [formValues, setFormValues] = useState(initialValues)

  useEffect(() => {
    setFormValues(initialValues)
  }, [initialValues])

  const handleChange = (field: keyof News, value: any) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [field]: value }
      setEditNews(updatedValues)
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
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 12, right: 12, color: 'gray' }}>
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant='h4' component='h2' align='left' fontWeight='bold' gutterBottom sx={{ mb: '30px' }}>
          UPDATE A NEWS
        </Typography>

        {/* Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <InputText
            noLayout
            label='Title'
            name='title'
            placeholder='Enter news title'
            value={formValues.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />

          <InputText
            noLayout
            label='Content'
            name='content'
            placeholder='Enter news content'
            value={formValues.content}
            onChange={(e) => handleChange('content', e.target.value)}
            type='textarea'
            rows={4}
            required
          />

          <InputText
            noLayout
            label='Image URL'
            name='imageUrl'
            placeholder='Enter image URL'
            value={formValues.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            required
          />
        </Box>

        {/* Save Button */}
        <Button onClick={handleSubmit} variant='DarkBlue' size='md' className='w-full mt-4'>
          SAVE CHANGES
        </Button>
      </Box>
    </Modal>
  )
}
