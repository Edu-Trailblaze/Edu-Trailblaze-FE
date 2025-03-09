// File: CloseButton.tsx
import React from 'react'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface CloseButtonProps {
  onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: 'inherit',
        '&:hover': {
          color: 'red'
        }
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}
