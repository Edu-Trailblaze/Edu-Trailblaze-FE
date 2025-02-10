'use client'
import AdminHeader from '@/components/admin/Header/header'
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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AdminHeader />
        <Layout>{children}</Layout>

      </ThemeProvider>
    </>
  )
}

const theme = createTheme({
  colorSchemes: {
    dark: true
  }
})
