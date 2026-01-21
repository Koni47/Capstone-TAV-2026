import React from 'react'
import { Line } from 'react-chartjs-2'

export default function LineChart({ data, options }: any) {
  return <Line data={data} options={options} />
}
