import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Button, TextField, IconButton, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

interface FieldConfig {
  key: string
  label: string
  type?: 'text' | 'number' | 'textarea'
}

interface ModalEditProps {
  open: boolean
  onClose: () => void
  initialData: ICourse
  fields: FieldConfig[]
  title?: string
  onSave: (updatedData: ICourse) => void
  onDelete?: (id: number) => void
}

const ModalEdit: React.FC<ModalEditProps> = ({
  open,
  onClose,
  initialData,
  fields,
  title = 'Edit Details',
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<ICourse>(initialData || {})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleInputChange = <K extends keyof ICourse>(key: K, value: ICourse[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    if (!formData.courseId) {
      toast.error('Invalid course data!')
      return
    }

    try {
      setLoading(true)
      setLoading(true)
      // api
      onSave(formData)
      toast.success('Course updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update course!')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete || !formData.courseId) return
    if (!window.confirm('Do you want to delete this course?')) return

    try {
      setLoading(true)
      //api
      toast.success('Course deleted successfully!')
      onDelete(formData.courseId)
      onClose()
    } catch (error) {
      toast.error('Failed to delete course!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='edit-modal-title'>
      <Box
        className='bg-white p-6 rounded-lg shadow-md relative'
        style={{
          width: '400px',
          margin: '100px auto',
          outline: 'none'
        }}
      >
        <IconButton aria-label='close' onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CloseIcon />
        </IconButton>

        <Typography id='edit-modal-title' variant='h6' className='mb-4 font-bold'>
          {title}
        </Typography>

        <div className='flex flex-col gap-4 mb-4'>
          {fields.map((field) => (
            <div key={field.key}>
              {field.type === 'textarea' ? (
                <TextField
                  label={field.label}
                  multiline
                  rows={4}
                  value={formData[field.key as keyof ICourse] || ''}
                  onChange={(e) => handleInputChange(field.key as keyof ICourse, e.target.value)}
                  fullWidth
                />
              ) : (
                <TextField
                  label={field.label}
                  type={field.type || 'text'}
                  value={formData[field.key as keyof ICourse] || ''}
                  onChange={(e) =>
                    handleInputChange(
                      field.key as keyof ICourse,
                      field.type === 'number' ? Number(e.target.value) : e.target.value
                    )
                  }
                  fullWidth
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-4'>
          {onDelete && (
            <Button variant='contained' color='error' onClick={handleDelete} disabled={loading}>
              {loading ? <CircularProgress size={20} color='inherit' /> : 'Delete'}
            </Button>
          )}
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSave} disabled={loading}>
            {loading ? <CircularProgress size={20} color='inherit' /> : 'Save'}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default ModalEdit
