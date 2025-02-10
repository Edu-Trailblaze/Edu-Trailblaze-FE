'use client'
import { Card, Grid, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import scss from './TransactionPerDay.module.scss'
import DataChart from '../../DataChart/DataChart'
import { lineChartData } from '@/components/mockData'

export type TransactionCardType = {
  title: string
  value: string
  changeValue: string
}


export default function TransactionPerDay() {
  const theme = useTheme()
  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Transaction Per Day</Typography>
          <DataChart type={'line'} data={lineChartData} />
        </div>
        <div className={scss.cardWrapper}>
          <Card className={scss.card} variant={'outlined'}>
            <div className={scss.cardTitle}>
              <Typography>Total Products</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>1.275</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>
                428.7%
              </Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={'outlined'}>
            <div className={scss.cardTitle}>
              <Typography>Buy-to-detail</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>4.40%</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>
                899.4%
              </Typography>
            </div>
          </Card>
          <Card className={scss.card} variant={'outlined'}>
            <div className={scss.cardTitle}>
              <Typography>Refunds</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography>0</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>
                0
              </Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </Grid>
  )
}
