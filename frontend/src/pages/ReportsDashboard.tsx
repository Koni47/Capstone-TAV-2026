import React, { useEffect, useState } from 'react'
import reportService from '../services/report.service'
import Header from '../components/Header'

export default function ReportsDashboard() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const d = await reportService.getDashboard()
        setData(d)
      } catch (e) {
        console.error('ReportsDashboard error', e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">KPIs Operativos</h1>
        {loading && <p>Cargando...</p>}
        {!loading && !data && <p>No hay datos disponibles</p>}
        {data && (
          <pre className="bg-white p-4 rounded border overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>
        )}
      </main>
    </div>
  )
}
