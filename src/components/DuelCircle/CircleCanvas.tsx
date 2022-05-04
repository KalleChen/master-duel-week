import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  PieController,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Chart } from 'react-chartjs-2'
import { continueRender, delayRender } from 'remotion'

import duelData from '../../../data/duelData.json'

const statisticsData = duelData.statistics
  .filter((d) => d.count > 1)
  .slice(0, 10)

const chartData: ChartData<'pie', number[], string> = {
  labels: statisticsData.map((stat) => stat.name),
  datasets: [
    {
      data: statisticsData.map((stat) => stat.count),
      borderWidth: 1,
    },
  ],
}

const options: ChartOptions = {
  layout: {
    padding: 60,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    datalabels: {
      anchor: 'end',
      align: 'center',
      color: '#D9D9D9',
      formatter: (_, context) => {
        return context?.chart?.data?.labels?.[context.dataIndex] || ''
      },
      font: {
        size: 12,
        weight: 'bold',
      },
      borderRadius: 4,
    },
  },
}

const getDateTotal = (): number => {
  let total = 0
  statisticsData.forEach((stat) => {
    total += stat.count
  })
  return total
}

const getCirclePosition = (current: number): { x: number; y: number } => {
  const total = getDateTotal()
  const percent = current / total
  const angle = percent * 2 * Math.PI
  const radius = 100
  const x = Math.sin(angle) * radius
  const y = Math.cos(angle) * radius
  return { x, y }
}

const getImagePattern = (
  imgUrl: string,
  chart: ChartJS,
  currentNum: number
): Promise<CanvasPattern | null> => {
  const img = new Image()
  img.src = imgUrl
  const imageCanvas = document.createElement('canvas')
  imageCanvas.width = 439.06
  imageCanvas.height = 439.06
  const imageCtx = imageCanvas.getContext('2d')
  return new Promise((resolve) => {
    img.onload = () => {
      const position = getCirclePosition(currentNum)
      imageCtx?.drawImage(img, 125 + position.x, 125 - position.y, 250, 250)
      if (imageCtx) {
        imageCtx.globalAlpha = 0.3
        imageCtx.fillRect(0, 0, 439.06, 439.06)
        imageCtx.globalAlpha = 1.0
      }
      const pattern = chart.ctx.createPattern(imageCanvas, 'repeat')
      resolve(pattern)
    }
  })
}
const updateChartPattern = async (chart: ChartJS) => {
  const requests = statisticsData.map(
    async (stat): Promise<CanvasPattern | string> => {
      const pattern: CanvasPattern | null = await getImagePattern(
        stat.img,
        chart,
        stat.count / 2 + stat.previousCount
      )
      return new Promise((resolve) => {
        if (pattern) {
          resolve(pattern)
        }
        resolve('#fff')
      })
    }
  )
  const patterns: (CanvasPattern | string)[] = await Promise.all(requests)
  if (patterns) {
    chart.data.datasets[0].backgroundColor = patterns
    chart.update()
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const CircleCanvas: React.FC = () => {
  ChartJS.register(ArcElement, ChartDataLabels, PieController)
  const chartRef = useRef<ChartJS>(null)
  const [handle] = useState(() => delayRender())

  const startRender = useCallback(async () => {
    const chart = chartRef?.current
    if (chart) {
      await updateChartPattern(chart)
      await delay(2000)
    }
    continueRender(handle)
  }, [handle])

  useEffect(() => {
    startRender()
  }, [startRender])
  return <Chart ref={chartRef} type="pie" data={chartData} options={options} />
}
