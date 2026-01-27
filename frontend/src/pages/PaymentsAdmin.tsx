import React, { useEffect, useState } from 'react'
import paymentsService from '../services/payments.service'
import Header from '../components/Header'

export default function PaymentsAdmin() {
  const [lastTest, setLastTest] = useState<any | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const t = await paymentsService.initTest(1000, 'TEST-ORDER-1')
        setLastTest(t)
      } catch (e) {
        console.error('PaymentsAdmin initTest error', e)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Administración de Pagos</h1>
        <p className="mb-4 text-sm text-gray-600">Pruebas rápidas y herramientas de conciliación</p>
        {lastTest ? (
          <div className="bg-white p-4 rounded border"><pre>{JSON.stringify(lastTest, null, 2)}</pre></div>
        ) : (
          <p>Cargando prueba de pago...</p>
        )}
      </main>
    </div>
  )
}
