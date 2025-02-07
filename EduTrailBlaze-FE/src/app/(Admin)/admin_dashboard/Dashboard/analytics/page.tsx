'use client'
import React from 'react'
import { useDemoData } from '@mui/x-data-grid-generator'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'

export default function Analytics() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 10
  })
  return (
    <>
      <h1>Data</h1>
      <p>
        The best of data available here at your finger tips in the table form. This could be a whole section of data
        that is available for users to deep dive further into the numbers/stats
      </p>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          {...data}
          slots={{
            toolbar: GridToolbar
          }}
        />
      </div>
    </>
  )
}
