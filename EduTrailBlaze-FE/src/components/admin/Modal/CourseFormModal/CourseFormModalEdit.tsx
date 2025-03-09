import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import InputText from '@/components/global/Input/InputText'
import InputNumber from '@/components/global/Input/InputNumber'
import InputSelect from '@/components/global/Input/InputSelect'
import Button from '@/components/global/Button/Button'
import InputFile from '@/components/global/Input/InputFile'
type Course = {
  id?: number
  title: string
  imageURL: string
  introURL: string
  description: string
  duration: number
  price: number
  difficultyLevel: string
  createdBy: string
  prerequisites: string
  learningOutcomes: string[]
}

type CourseFormModalEditProps = {
  initialValues: Course
  setEditCourse: React.Dispatch<React.SetStateAction<Course>>
  onSubmit: (formValues: Course) => void
  onCancel: () => void
  isOpen: boolean
}

export default function CourseFormModalEdit({
  initialValues,
  setEditCourse,
  onSubmit,
  onCancel,
  isOpen
}: CourseFormModalEditProps) {
  const [formValues, setFormValues] = useState(initialValues)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formValues)
  }

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues)
    }
  }, [initialValues])

  const handleChange = (field: keyof Course, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }))
    setEditCourse((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Modal open={isOpen} onClose={onCancel} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          EDIT A COURSE
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
          <InputText
            noLayout
            label='Title'
            name='title'
            placeholder='Enter news title'
            value={formValues.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <InputFile
            label='Image File'
            name='imageURL'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0]
              handleChange('imageURL', file)
            }}
            noLayout
          />

          <InputFile
            label='Intro File'
            name='introURL'
            accept='video/*'
            onChange={(e) => {
              const file = e.target.files?.[0]
              handleChange('introURL', file)
            }}
            noLayout
          />
          <InputText
            noLayout
            label='Description'
            name='description'
            placeholder='Enter description'
            value={formValues.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <InputNumber
            noLayout
            label='Price'
            name='price'
            placeholder='Enter price'
            value={formValues.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
          />
          <InputSelect
            label='Difficulty'
            name='difficultyLevel'
            value={formValues.difficultyLevel}
            onChange={(e) => handleChange('difficultyLevel', e.target.value)}
            options={[
              { label: 'Select Difficulty', value: '' },
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advanced', value: 'Advanced' }
            ]}
            noLayout
          />
          {/* <TextField
                        label="Created By"
                        value={formValues.createdBy}
                        onChange={(e) => handleChange("createdBy", e.target.value)}
                        fullWidth
                    /> */}
          <InputText
            noLayout
            label='Prerequisites'
            name='prerequisites'
            placeholder='Enter prerequisites'
            value={formValues.prerequisites}
            onChange={(e) => handleChange('prerequisites', e.target.value)}
          />

          <InputText
            label='Learning Outcomes'
            name='learningOutcomes'
            type='textarea'
            value={formValues.learningOutcomes.join('\n')}
            onChange={(e) => {
              const lines = e.target.value
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line !== '')
              handleChange('learningOutcomes', lines)
            }}
            noLayout
          />
        </Box>

        <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
          <Button variant='DarkBlue' className='w-full mt-6' onClick={handleSubmit}>
            UPDATE A COURSE
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
