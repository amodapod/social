'use client'

import { Line, Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const labels = Array.from({ length: 14 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (13 - i))
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

const lineData = {
  labels,
  datasets: [
    {
      label: 'Views',
      data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
      borderColor: 'rgb(168, 85, 247)', // purple-500
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Watch Time (hours)',
      data: labels.map(() => Math.floor(Math.random() * 500) + 200),
      borderColor: 'rgb(236, 72, 153)', // pink-500
      backgroundColor: 'rgba(236, 72, 153, 0.2)',
      tension: 0.3,
      fill: true,
    },
  ],
}

const pieData = {
  labels: ['Likes', 'Comments', 'Shares', 'Saves'],
  datasets: [
    {
      data: [65, 15, 10, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(16, 185, 129, 0.8)',
      ],
      borderWidth: 0,
    },
  ],
}

const barData = {
  labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
  datasets: [
    {
      label: 'Viewers',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

export function LineChart() {
  return <Line options={chartOptions} data={lineData} />
}

export function PieChart() {
  return (
    <div className="relative w-full h-full">
      <Pie
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              ...chartOptions.plugins.legend,
              position: 'right' as const,
            },
          },
        }}
        data={pieData}
      />
    </div>
  )
}

export function BarChart() {
  return (
    <div className="relative w-full h-full">
      <Bar
        options={chartOptions}
        data={barData}
      />
    </div>
  )
}
