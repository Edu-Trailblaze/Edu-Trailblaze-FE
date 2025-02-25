import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'

type Review = {
  reviewId?: number
  rating: number
  reviewText: string
}

type ReviewFormModalEditProps = {
  initialValues: Review
  setEditReview: React.Dispatch<React.SetStateAction<Review | null>>
  onSubmit: (formValues: Review) => void
  onCancel: () => void
  isOpen: boolean
}

export default function ReviewFormModalEdit({
  initialValues,
  setEditReview,
  onSubmit,
  onCancel,
  isOpen
}: ReviewFormModalEditProps) {
  const [formValues, setFormValues] = useState<Review>(initialValues)

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues)
    }
  }, [initialValues])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formValues)
  }

  const handleChange = (field: keyof Review, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setEditReview((prev) => ({
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
          Edit Review
        </Typography>
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Review ID'
            value={formValues.reviewId || ''}
            onChange={(e) => handleChange('reviewId', Number(e.target.value))}
            fullWidth
            type='number'
            disabled
          />
          <TextField
            label='Rating'
            value={formValues.rating}
            onChange={(e) => handleChange('rating', Number(e.target.value))}
            fullWidth
            type='number'
            inputProps={{ min: 1, max: 5 }}
          />
          <TextField
            label='Review Text'
            value={formValues.reviewText}
            onChange={(e) => handleChange('reviewText', e.target.value)}
            fullWidth
            multiline
          />
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
