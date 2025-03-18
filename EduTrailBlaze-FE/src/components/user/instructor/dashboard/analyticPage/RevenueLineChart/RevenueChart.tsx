'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useGetRevenueDataQuery } from '@/redux/services/instructor.service'
import BeatLoader from 'react-spinners/BeatLoader'

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

interface RevenueChartProps {
  userId: string
  time: string
}

export function RevenueChart({ userId, time }: RevenueChartProps) {
  const { data, isLoading, isFetching } = useGetRevenueDataQuery({ InstructorId: userId, Time: time })

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
        revenue: item.data,
        fromDate
      }
    })
    .sort((a, b) => a.fromDate.getTime() - b.fromDate.getTime())

  console.log(chartData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart Of Revenue</CardTitle>
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
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='label'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                tickFormatter={(value) => value.toString()}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey='revenue' type='natural' stroke='hsl(210, 100%, 50%)' strokeWidth={2} dot={false} />
            </LineChart>
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
