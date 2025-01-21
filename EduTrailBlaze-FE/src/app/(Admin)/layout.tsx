'use client'
import {
  createTheme,
  CssBaseline,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html lang='en'>
          <body>{children}</body>
        </html>
      </ThemeProvider>
    </>
  )
}

const theme = createTheme({
  colorSchemes: {
    dark: true
  }
})
