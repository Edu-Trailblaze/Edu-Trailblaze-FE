import { months } from '@/helper/Util'

const labels = months({ count: 7 })

export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: 'Transaction',
      data: [65, 59, 80, 91, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      BorderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
}

export const doughnutChartData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'Transaction Dataset',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4
    }
  ]
}
