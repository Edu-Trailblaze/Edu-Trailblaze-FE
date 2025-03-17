'use client'
import AdminHeader from '@/components/admin/Header/header'
import AdminGuard from '@/components/global/AdminGuard'
import Layout from '@/components/Layout/Layout'
import { createTheme, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminGuard>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>{children}</Layout>
      </ThemeProvider>
    </AdminGuard>
  )
}

const theme = createTheme({
  colorSchemes: {
    dark: true
  }
})
