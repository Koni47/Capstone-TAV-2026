import React from 'react'
import { useNavigate } from 'react-router-dom'
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { getHtmlMock } from '../services/mockApi'
import Header from '../components/Header'

export default function Home() {
  const navigate = useNavigate()
  const mock = getHtmlMock('index.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative min-h-[650px] flex items-center pt-20 pb-20">
          <img 
            src="/assets/img/hero.jpg" 
            alt="Vista Pasajero Carretera" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002244]/95 via-[#003366]/80 to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                Viaja seguro. <br />
                <span className="text-gray-200 font-medium text-3xl block mt-2">Ya seas una gran empresa o un particular.</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Llevamos la excelencia operativa de la minería a tus traslados personales. Aeropuerto, turismo o faena, llegamos donde necesites.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
