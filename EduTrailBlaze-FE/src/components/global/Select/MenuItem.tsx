import React from 'react'
import { IconButton, Menu as MuiMenu, MenuItem as MuiMenuItem, Button } from '@mui/material'
import { EllipsisVertical } from 'lucide-react'

interface MyMenuItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'Blue' | 'Red' | 'Green' | 'DarkBlue'
}

interface MenuItemProps {
  items: MyMenuItem[]
  label?: string
}

const variantStyles: Record<NonNullable<MyMenuItem['variant']>, React.CSSProperties> = {
  primary: {
    backgroundColor: '#3b82f6',
    color: '#fff'
  },
  secondary: {
    backgroundColor: '#4b5563',
    color: '#fff'
  },
  danger: {
    backgroundColor: '#dc2626',
    color: '#fff'
  },
  outline: {
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    color: '#374151'
  },
  Blue: {
    backgroundColor: '#bfdbfe',
    color: '#1e3a8a'
  },
  Red: {
    backgroundColor: '#fecaca',
    color: '#7f1d1d'
  },
  Green: {
    backgroundColor: '#10b981',
    color: '#fff'
  },
  DarkBlue: {
    backgroundColor: '#1e40af',
    color: '#fff'
  }
}

export default function MenuItem({ items, label }: MenuItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      {label ? (
        <Button
          id='custom-button'
          aria-controls={open ? 'custom-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {label}
        </Button>
      ) : (
        <IconButton
          id='custom-button'
          aria-controls={open ? 'custom-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            color: '#0000EE',
            '&:hover': {
              color: '#0000CC'
            }
          }}
        >
          <EllipsisVertical size={20} />
        </IconButton>
      )}

      <MuiMenu
        id='custom-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'custom-button' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'white'
          }
        }}
        disableScrollLock={true}
      >
        {items.map((item, idx) => {
          const styleObj = item.variant ? variantStyles[item.variant] : {}

          return (
            <MuiMenuItem
              key={idx}
              onClick={() => {
                item.onClick()
                handleClose()
              }}
              style={{
                ...styleObj,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {/* Icon (nếu có) */}
              {item.icon && <span>{item.icon}</span>}
              {/* Label */}
              <span>{item.label}</span>
            </MuiMenuItem>
          )
        })}
      </MuiMenu>
    </div>
  )
}
