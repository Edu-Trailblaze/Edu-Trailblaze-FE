'use client'
import { format } from 'date-fns'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import BeatLoader from 'react-spinners/BeatLoader'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useGetEnrollmentDataQuery } from '@/redux/services/instructor.service'
import { formatDate } from '@/helper/Util'

const chartConfig = {
  enrollments: {
    label: 'Enrollments',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

interface EnrollmentChartProps {
  userId: string
  time: string
}

export function EnrollmentChart({ userId, time }: EnrollmentChartProps) {
  const { data, isLoading, isFetching } = useGetEnrollmentDataQuery({ InstructorId: userId, Time: time })
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  let chartData = data
    ?.map((item) => {
      const fromDate = new Date(item.fromDate)
      let label = ''

      if (time === 'week') {
        label = format(fromDate, 'dd/MM') // Display by day (vd: 02/03)
      } else if (time === 'month') {
        label = format(fromDate, 'MMM') //  Display by month (vd: Mar)
      } else if (time === 'year') {
        label = format(fromDate, 'yyyy') //  Display by year (vd: 2025)
      }

      return {
        label,
        enrollments: item.data,
        fromDate
      }
    })
    .sort((a, b) => a.fromDate.getTime() - b.fromDate.getTime()) // ascending order based on fromDate

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart Of Enrollment</CardTitle>
        <CardDescription>Showing data by {time}</CardDescription>
      </CardHeader>

      {isLoading || isFetching ? (
        <CardContent>
          <div className='flex justify-center items-center h-32'>
            <BeatLoader />
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='label'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                tickFormatter={(value) => value.toString()}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey='enrollments' fill='hsl(210, 100%, 50%)' radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up this {time} <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}
