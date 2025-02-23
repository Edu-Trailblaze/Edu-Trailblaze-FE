'use client'

import React from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface DateRangePickerProps {
  startDay: dayjs.Dayjs | null
  endDay: dayjs.Dayjs | null
  onStartChange: (newValue: dayjs.Dayjs | null) => void
  onEndChange: (newValue: dayjs.Dayjs | null) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDay, endDay, onStartChange, onEndChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label='Start Date' value={startDay} onChange={onStartChange} />
        <DatePicker label='End Date' value={endDay} onChange={onEndChange} />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default DateRangePicker
