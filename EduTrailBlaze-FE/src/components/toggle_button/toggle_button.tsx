'use client'
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Box, useColorScheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';


export default function ToggleButton() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newMode: 'system' | 'light' | 'dark') => {
    setMode(newMode);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconButton onClick={handleClick} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={() => handleChange('light')}>Light</MenuItem>
        <MenuItem onClick={() => handleChange('dark')}>Dark</MenuItem>
        <MenuItem onClick={() => handleChange('system')}>System</MenuItem>
      </Menu>
    </Box>
  );
}
