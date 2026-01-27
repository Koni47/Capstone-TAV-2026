import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Map from '../components/Map'
import { GeocodingService } from '../services/geocoding'

export default function ServiceRequestCreate() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [clientType, setClientType] = useState('empresa')
  const [distance, setDistance] = useState(0)
  const [geocodeError, setGeocodeError] = useState<'origin' | 'destination' | null>(null)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [originCoords, setOriginCoords] = useState<any>(null)
  const [destinationCoords, setDestinationCoords] = useState<any>(null)

  const handleDistanceChange = useCallback((newDistance: number) => {
    console.log('ServiceRequestCreate: distance updated to:', newDistance)
    setDistance(newDistance)
  }, [])

  const handleRouteError = useCallback((error: 'origin' | 'destination' | 'both') => {
    // This will be called when route calculation fails
    console.log('Route error:', error)
  }, [])

  // Function to attempt route update (similar to HTML's updateMapRoute)
  const attemptRouteUpdate = useCallback(async () => {
    const originText = origin.trim()
    const destinationText = destination.trim()

    if (!originText || !destinationText) {
      return // Don't attempt if both fields aren't filled
    }

    console.log('Attempting route update for:', originText, '->', destinationText)

    try {
      // Clear previous errors
      setGeocodeError(null)

      // Geocode origin
      const originResult = await GeocodingService.geocode(originText)
      if (!originResult) {
        console.log('Origin geocoding failed')
        setGeocodeError('origin')
        setShowErrorModal(true)
        return
      }

      // Geocode destination
      const destResult = await GeocodingService.geocode(destinationText)
      if (!destResult) {
        console.log('Destination geocoding failed')
        setGeocodeError('destination')
        setShowErrorModal(true)
        return
      }

      // Both geocoding successful
      setOriginCoords(originResult)
      setDestinationCoords(destResult)
      console.log('Route update successful')

    } catch (error) {
      console.error('Route update error:', error)
      setGeocodeError('origin') // Default to origin error
      setShowErrorModal(true)
    }
  }, [origin, destination])

  useEffect(() => {
    const now = new Date()
    setDate(now.toISOString().split('T')[0])
    setTime(now.toTimeString().substring(0, 5))
  }, [])

  // Debounced route update
  const [routeUpdateTimeout, setRouteUpdateTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (routeUpdateTimeout) {
      clearTimeout(routeUpdateTimeout)
    }

    if (origin.trim() && destination.trim()) {
      const timeout = setTimeout(() => {
        attemptRouteUpdate()
      }, 1000) // 1 second debounce
      setRouteUpdateTimeout(timeout)
    }

    return () => {
      if (routeUpdateTimeout) {
        clearTimeout(routeUpdateTimeout)
      }
    }
  }, [origin, destination, attemptRouteUpdate])

  const handleRouteUpdate = () => {
    // Force immediate update by clearing and setting timeout
    if (routeUpdateTimeout) {
      clearTimeout(routeUpdateTimeout)
    }
    attemptRouteUpdate()
  }

  // Calculate estimated cost
  const calculateCost = () => {
    const baseRate = 1800 // per kilometer
    const baseCost = distance * baseRate
    
    // Check if time is between 22:01 and 06:00 (night surcharge 15%)
    const [hours, minutes] = time.split(':').map(Number)
    const timeInMinutes = hours * 60 + minutes
    const isNightTime = timeInMinutes >= (22 * 60 + 1) || timeInMinutes <= (6 * 60)
    const surcharge = isNightTime ? baseCost * 0.15 : 0
    
    return {
      baseCost,
      surcharge,
      total: baseCost + surcharge
    }
  }

  const cost = calculateCost()

  return (
    <div className="bg-surface font-sans text-gray-800 flex flex-col min-h-screen">
      <nav className="bg-primary text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 font-bold text-xl cursor-pointer hover:opacity-90 transition-opacity">
                <span className="material-icons text-secondary text-lg">local_shipping</span>
                <span>EL LOA</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = '/AdminDashboard'; }} className="text-blue-100 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                <Link to="/service-request" className="bg-secondary text-white px-3 py-2 rounded-md text-sm font-medium shadow-md transform scale-105">Solicitudes</Link>
                <Link to="/users" className="text-blue-100 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Usuarios</Link>
                <Link to="/companies" className="text-blue-100 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Clientes</Link>
                <Link to="/vehicles" className="text-blue-100 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Flota</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-white/10 transition group">
                <span className="material-icons text-blue-200 group-hover:text-white">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-primary"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none user-name">Usuario</p>
                  <p className="text-xs text-blue-300 user-role uppercase tracking-wider">Perfil</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/20 shadow-lg user-initials">US</div>
                <Link to="/logout" className="ml-2 text-gray-300 hover:text-white transition" title="Salir">
                  <span className="material-icons">logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <nav className="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li><Link to="/" className="hover:text-primary transition">Inicio</Link></li>
                <li><span className="material-icons text-[10px] text-gray-400">arrow_forward_ios</span></li>
                <li><Link to="/service-request" className="hover:text-primary transition">Solicitudes</Link></li>
                <li><span className="material-icons text-[10px] text-gray-400">arrow_forward_ios</span></li>
                <li className="text-secondary font-medium">Nueva Solicitud</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-bold text-primary">Planificar Nuevo Viaje</h1>
            <p className="text-gray-500 mt-1">Complete los detalles para cotizar y agendar un servicio.</p>
          </div>
        </div>

        {/* Main Layout Split */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[750px]">
          {/* Left Column: Form */}
          <div className="w-full lg:w-5/12 h-full flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons">edit_road</span>
                </div>
                <h2 className="font-bold text-gray-800">Detalles del Servicio</h2>
              </div>

              <div className="p-6 overflow-y-auto custom-scroll flex-grow">
                <form className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Cliente</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-3 text-gray-400">business</span>
                      <select value={clientType} onChange={(e) => setClientType(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                        <option value="empresa">Empresa / Convenio</option>
                        <option value="persona">Persona Natural</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 relative">
                    {/* Línea conectora visual */}
                    <div className="absolute left-[19px] top-[40px] bottom-[40px] w-0.5 bg-gray-200 border-l border-dashed border-gray-300 z-0"></div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Origen</label>
                      <div className="relative z-10">
                        <span className="material-icons absolute left-3 top-2.5 text-green-600 text-sm bg-white rounded-full p-0.5">trip_origin</span>
                        <input 
                          type="text" 
                          value={origin} 
                          onChange={(e) => setOrigin(e.target.value)} 
                          placeholder="Ej: Aeropuerto El Loa"
                          className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                            geocodeError === 'origin' ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Destino</label>
                      <div className="relative z-10">
                        <span className="material-icons absolute left-3 top-2.5 text-red-500 text-sm bg-white rounded-full p-0.5">location_on</span>
                        <input 
                          type="text" 
                          value={destination} 
                          onChange={(e) => setDestination(e.target.value)} 
                          placeholder="Ej: Hotel Diego de Almagro"
                          className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                            geocodeError === 'destination' ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={handleRouteUpdate}
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                    >
                      <span className="material-icons text-sm">refresh</span> Actualizar Ruta
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Fecha</label>
                      <div className="relative">
                        <span className="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">event</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Hora</label>
                      <div className="relative">
                        <span className="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">schedule</span>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Pasajeros / Notas</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-3 text-gray-400 text-sm">group</span>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Nombres, centro de costo, observaciones..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button type="submit" className="w-full bg-secondary hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2">
                  <span>Confirmar Solicitud</span>
                  <span className="material-icons text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Map & Summary */}
          <div className="w-full lg:w-7/12 flex flex-col gap-4 relative h-full">
            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex-grow relative z-0">
              <Map 
                originCoords={originCoords}
                destinationCoords={destinationCoords}
                className="rounded-2xl" 
                onDistanceChange={handleDistanceChange}
                onRouteError={handleRouteError}
              />

              {/* Floating Summary Card */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 p-6 z-[1001] transition-all duration-300 opacity-90 hover:opacity-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b border-gray-200 pb-2">Resumen Estimado</h3>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1"><span className="material-icons text-xs text-secondary">straighten</span> Distancia</span>
                    <span className="font-semibold text-gray-800">{distance > 0 ? `${distance.toFixed(2)} km` : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tarifa Base ($1,800/km)</span>
                    <span className="font-mono text-gray-800">{cost.baseCost > 0 ? `$${cost.baseCost.toLocaleString('es-CL')}` : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1" title="Cargo Nocturno (22:01 - 06:00)"><span className="material-icons text-xs text-blue-500">nightlight</span> Recargo Nocturno (15%)</span>
                    <span className="font-mono text-orange-600">{cost.surcharge > 0 ? `$${cost.surcharge.toLocaleString('es-CL')}` : '-'}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                  <span className="text-gray-500 text-sm font-medium">Total Estimado</span>
                  <span className="text-4xl font-bold text-primary leading-none">{cost.total > 0 ? `$${cost.total.toLocaleString()}` : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="material-icons text-secondary text-2xl">local_shipping</span>
            <span className="font-bold text-lg text-white">Servicios El Loa</span>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>&copy; 2026 Servicios de Transporte El Loa SpA.</p>
            <div className="flex gap-4 mt-2 justify-center md:justify-end text-xs text-gray-500">
              <a href="#" className="hover:text-secondary">Términos</a>
              <a href="#" className="hover:text-secondary">Privacidad</a>
              <a href="#" className="hover:text-secondary">Soporte</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100">
            <div className="bg-red-50 p-4 flex items-center gap-3 border-b border-red-100">
              <div className="bg-red-100 p-2 rounded-full">
                <span className="material-icons text-red-600">location_off</span>
              </div>
              <h3 className="font-bold text-red-800">Ubicación no encontrada</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4">No pudimos localizar una de las direcciones. Intenta ser más específico.</p>
              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 border border-gray-100">
                <strong>Sugerencias:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Agrega "Calama" o la ciudad al final.</li>
                  <li>Usa nombres de lugares conocidos (Aeropuerto, Hotel...).</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setShowErrorModal(false)}
                className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition shadow"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}