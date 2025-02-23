import React from 'react'
import { format } from 'date-fns'

type FormatDateTimeProps = {
  date: string
}

const FormatDateTime: React.FC<FormatDateTimeProps> = ({ date }) => {
  if (!date) return <span>N/A</span>

  const formattedDate = format(new Date(date), 'dd-MM-yyyy HH:mm')
  return <span>{formattedDate}</span>
}

export default FormatDateTime
