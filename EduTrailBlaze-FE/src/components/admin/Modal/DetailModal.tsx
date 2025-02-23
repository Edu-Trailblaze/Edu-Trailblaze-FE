import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import FormatDateTime from '../Date/FormatDateTime'

type DetailProps<T> = {
  item: T | null
  onClose: () => void
  fields: { label: string; accessor: keyof T }[]
}

// Generic Detail component
export default function DetailModal<T>({ item, onClose, fields }: DetailProps<T>) {
  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 700,
          height: '80%',
          maxHeight: '100vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto'
        }}
      >
        {item && (
          <>
            <Typography
              variant='h6'
              component='h2'
              gutterBottom
              sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
            >
              {item[fields[0].accessor] as string}
            </Typography>

            {fields.map(({ label, accessor }) => {
              const value = item[accessor]
              const isDateField = typeof value === 'string' && !isNaN(Date.parse(value))

              const displayValue = isDateField ? FormatDateTime({ date: value as string }) : String(value || '')

              return (
                <Box key={String(accessor)} sx={{ mb: 2 }}>
                  <Typography variant='subtitle2' component='label' sx={{ color: 'text.secondary' }}>
                    {label}
                  </Typography>
                  <Typography variant='body1' sx={{ mt: 0.5 }}>
                    {displayValue}
                  </Typography>
                </Box>
              )
            })}

            <Button
              onClick={onClose}
              variant='contained'
              color='primary'
              sx={{ mt: 3, display: 'block', width: '100%' }}
            >
              Close
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}
