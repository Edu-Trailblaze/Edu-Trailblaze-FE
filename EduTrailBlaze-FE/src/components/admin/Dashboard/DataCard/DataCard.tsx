import { InfoOutlined } from '@mui/icons-material'
import { IconButton, Paper, Tooltip, Typography } from '@mui/material'
import React from 'react'
import scss from './DataCard.module.scss'

export type DataCardProps = {
  title: string
  value: string
  description: string
}

export default function DataCard(props: DataCardProps) {
  const { title, value, description } = props
  return (
    <Paper className={scss.dataCard}>
      <div className={scss.header}>
        <Typography fontSize={'h6'} color={'lightslategrey'}>
          {title}
        </Typography>
        <Tooltip title={<Typography fontSize={16}>{`${description} which is ${value}`}</Typography>}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </div>
      <Typography fontSize={'h4'}>{value}</Typography>
    </Paper>
  )
}
