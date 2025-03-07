import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { z } from 'zod'
import { CourseCreate } from '@/app/(Admin)/admin_dashboard/Dashboard/courses/page'

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imageURL: z.string().url('Invalid URL format'),
  introURL: z.string().url('Invalid URL format'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than zero'),
  difficultyLevel: z.string().min(1, 'Difficulty level is required'),
  prerequisites: z.string().min(1, 'Prerequisites are required'),
  learningOutcomes: z.array(z.string().min(1, 'Each learning outcome must have content'))
})

type CourseFormModalCreateProps = {
  initialValues: CourseCreate
  setNewCourse: React.Dispatch<React.SetStateAction<CourseCreate>>
  onSubmit: (formValues: CourseCreate) => void
  onCancel: () => void
  isOpen: boolean
}

export default function CourseFormModalCreate({
  initialValues,
  setNewCourse,
  onSubmit,
  onCancel,
  isOpen
}: CourseFormModalCreateProps) {
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    imageURL?: string
    introURL?: string
    price?: string
    difficultyLevel?: string
    prerequisites?: string
    learningOutcomes?: string
  }>({})

  const handleChange = (field: keyof CourseCreate, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setNewCourse((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    const result = courseSchema.safeParse(formValues)
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
          ADD COURSE
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Title</Typography>
            <TextField
              label='Title'
              value={formValues.title}
              onChange={(e) => handleChange('title', e.target.value)}
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Image URL</Typography>
            <TextField
              label='Image URL'
              value={formValues.imageURL}
              onChange={(e) => handleChange('imageURL', e.target.value)}
              fullWidth
              error={!!errors.imageURL}
              helperText={errors.imageURL}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Intro URL</Typography>
            <TextField
              label='Intro URL'
              value={formValues.introURL}
              onChange={(e) => handleChange('introURL', e.target.value)}
              fullWidth
              error={!!errors.introURL}
              helperText={errors.introURL}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Description</Typography>
            <TextField
              label='Description'
              value={formValues.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              multiline
              error={!!errors.description}
              helperText={errors.description}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Price</Typography>
            <TextField
              label='Price'
              type='number'
              value={formValues.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              fullWidth
              error={!!errors.price}
              helperText={errors.price}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Difficulty</Typography>
            <Select
              value={formValues.difficultyLevel}
              onChange={(e) => handleChange('difficultyLevel', e.target.value)}
              fullWidth
              displayEmpty
              error={!!errors.difficultyLevel}
            >
              <MenuItem value='' disabled>
                Select Difficulty
              </MenuItem>
              <MenuItem value='Beginner'>Beginner</MenuItem>
              <MenuItem value='Intermediate'>Intermediate</MenuItem>
              <MenuItem value='Advanced'>Advanced</MenuItem>
            </Select>
            {errors.difficultyLevel && (
              <Typography color='error' variant='body2'>
                {errors.difficultyLevel}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>Prerequisites</Typography>
            <TextField
              label='Prerequisites'
              value={formValues.prerequisites}
              onChange={(e) => handleChange('prerequisites', e.target.value)}
              fullWidth
              multiline
              error={!!errors.prerequisites}
              helperText={errors.prerequisites}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '40%', fontWeight: 600, textTransform: 'uppercase' }}>
              Learning Outcomes
            </Typography>
            <TextField
              label='Learning Outcomes'
              value={formValues.learningOutcomes.join('\n')}
              onChange={(e) => {
                const lines = e.target.value
                  .split('\n')
                  .map((line) => line.trim())
                  .filter((line) => line !== '')
                handleChange('learningOutcomes', lines)
              }}
              fullWidth
              multiline
              error={!!errors.learningOutcomes}
              helperText={errors.learningOutcomes}
            />
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
          ADD COURSE
        </Button>
      </Box>
    </Modal>
  )
}
