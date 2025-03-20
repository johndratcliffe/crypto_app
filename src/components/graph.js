import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler)

const Graph = (props) => {
  const timePeriod = props.timePeriod
  const dataType = props.dataType
  const homePageGraph = props.homePageGraph
  const priceHistory14Days = props.priceHistory14Days
  const priceHistory365Days = props.priceHistory365Days

  ChartJS.defaults.color = "#ffffff"

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    }).format(value)
  }
  
  const getTimeConfig = () => {
    switch(timePeriod) {
      case '1':
        return {
          displayFormats: { hour: 'HH:mm' },
          tooltipFormat: 'MMM d, yyyy HH:mm'
        }
      case '7':
      case '14':
      case '30':
        return {
          displayFormats: { day: 'd. MMM' },
          tooltipFormat: 'MMM d, yyyy HH:mm'
        }
      case '365':
        return {
          displayFormats: { month: 'MMM `yy' },
          tooltipFormat: 'MMM d, yyyy HH:mm'
        }
      default:
        return {
          displayFormats: { day: 'd. MMM `yy' },
          tooltipFormat: 'MMM d, yyyy HH:mm'
        }
    }
  }

  const getChartData = () => {
    if (!priceHistory14Days && !priceHistory365Days) return { labels: [], datasets: [] }

    let data
    if (timePeriod === '1' || timePeriod === '7' || timePeriod === '14') {
      data = priceHistory14Days
    } else {
      data = priceHistory365Days
    }
    
    if (dataType === 'prices') {data = data.prices}
    else if (dataType === 'market_caps') {data = data.market_caps}
    else if (dataType === 'total_volumes') {data = data.total_volumes}

    if (timePeriod === '1') {data = data.slice(-24)}
    else if (timePeriod === '7') {data = data.slice(-168)}
    else if (timePeriod === '14') {data = data.slice(-336)}
    else if (timePeriod === '30') {data = data.slice(-30)}
    
    data = data.map(([timestamp, value]) => ({
      x: timestamp,
      y: value.toFixed(2)
    }))

    const startPrice = data[0].y
    const endPrice = data[data.length - 1].y
    const lineColor = endPrice >= startPrice ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)'

    return {
      datasets: [
        {
          data: data,
          fill: true,
          backgroundColor: (context) => {
            const chart = context.chart
            const {ctx, chartArea} = chart
            if (!chartArea) {
              return null
            }
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
            if (homePageGraph) gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
            else gradient.addColorStop(1, lineColor)
            return gradient
          },
          borderColor: lineColor,
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.15,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y
            if (dataType === 'prices') return ` Price: ${formatNumber(value.toFixed(2))}`
            if (dataType === 'market_caps') return ` Market Cap: ${formatNumber(Math.floor(value))}`
            if (dataType === 'total_volumes') return ` Total Volume: ${formatNumber(Math.floor(value))}`
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: getTimeConfig(),
        ticks: {
          display: !homePageGraph,
          font: {
            size: 20
          },
          maxTicksLimit: 12
        },
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        position: 'right',
        border: {
          display: false,
        },
        grid: {
          color: homePageGraph?
          'rgba(255, 255, 255, 0)' :
          'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          display: !homePageGraph,
          font: {
            size: 20
          },
          maxTicksLimit: 10,
          callback: function(value) {
            const checkSize = () => {
              if (value >= 0 && value < 1000) return (value).toFixed(2)
              if (value >= 1000 && value < 1000000) return (value/1000).toFixed(2) + 'K'
              if (value >= 1000000 && value < 1000000000) return (value/1000000).toFixed(2) + 'M'
              if (value >= 1000000000 && value < 1000000000000) return (value/1000000000).toFixed(2) + 'B'
              if (value >= 1000000000000 && value < 1000000000000000) return (value/1000000000000).toFixed(2) + 'T'
            }
            return '€' + checkSize()
          }
        }
      }
    }
  }

  return (
    <Line data={getChartData()} options={chartOptions} />
  )
}

export default Graph