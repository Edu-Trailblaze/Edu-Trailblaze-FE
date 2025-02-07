import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import DataRibbon from '@/components/admin/Dashboard/DataRibbon/DataRibbon'
import TransactionPerDay from '@/components/admin/Dashboard/TransactionPerDay/TransactionPerDay'
import TransactionBottomRow from '@/components/admin/Dashboard/TransactionBottomRow/TransactionBottomRow'

export default function Dashboard() {
  return (
    <Box>
      <Grid container gap={4} marginTop={2}>
        <DataRibbon />
        <TransactionPerDay />
      </Grid>
      <TransactionBottomRow />
    </Box>
  )
}
