import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom cloud icon (orange)
const cloudIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMzAgMTBjMi4yIDAgNC4xLTEuNCA1LTMuNEMzNyA4IDE5IDE5IDE5IDE5SDdjLTMuMyAwLTYgMi43LTYgNnMyLjcgNiA2IDZoMjNjMi43IDAgNS0yLjIgNS01cy0yLjItNS01LTV6IiBmaWxsPSIjRkY2NjAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
})

interface MapProps {
  originCoords?: any
  destinationCoords?: any
  className?: string
  onDistanceChange?: (distance: number) => void
  onRouteError?: (error: 'origin' | 'destination' | 'both') => void
}

export default function Map({ originCoords, destinationCoords, className = '', onDistanceChange, onRouteError }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    try {
      // Initialize map centered on Chile (Santiago with wider view to show all Chile)
      const map = L.map(mapRef.current, { zoomControl: false }).setView([-33.4489, -70.6693], 6)
      leafletMapRef.current = map

      // Add zoom control to bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      // Add Carto Voyager tiles (better looking)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map)

    } catch (error) {
      console.error('Map initialization error:', error)
    }

    return () => {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove()
          leafletMapRef.current = null
        } catch (error) {
          console.error('Map cleanup error:', error)
        }
      }
    }
  }, [])

  // Update map when coordinates change (coordinates now come from parent)
  useEffect(() => {
    console.log('Map: coordinates updated - origin:', originCoords, 'destination:', destinationCoords)

    // Only run if map is initialized
    if (!leafletMapRef.current) {
      return
    }

    const map = leafletMapRef.current

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker))
    markersRef.current = []

    const bounds: L.LatLng[] = []

    // Add origin marker
    if (originCoords) {
      console.log('Map: adding origin marker at:', originCoords.lat, originCoords.lng, originCoords.display_name)
      const originMarker = L.marker([originCoords.lat, originCoords.lng], { icon: cloudIcon })
        .addTo(map)
        .bindPopup(`<b>Origen:</b><br>${originCoords.display_name}`)
      markersRef.current.push(originMarker)
      bounds.push(L.latLng(originCoords.lat, originCoords.lng))
    }

    // Add destination marker
    if (destinationCoords) {
      console.log('Map: adding destination marker at:', destinationCoords.lat, destinationCoords.lng, destinationCoords.display_name)
      const destMarker = L.marker([destinationCoords.lat, destinationCoords.lng], { icon: cloudIcon })
        .addTo(map)
        .bindPopup(`<b>Destino:</b><br>${destinationCoords.display_name}`)
      markersRef.current.push(destMarker)
      bounds.push(L.latLng(destinationCoords.lat, destinationCoords.lng))
    }

    // Calculate distance if both coordinates exist
    if (originCoords && destinationCoords) {
      const distance = map.distance(
        L.latLng(originCoords.lat, originCoords.lng),
        L.latLng(destinationCoords.lat, destinationCoords.lng)
      )
      console.log('Map: calculated distance:', distance / 1000, 'km')
      onDistanceChange?.(distance / 1000) // Convert to kilometers

      // Hide placeholder when we have a route
      setShowPlaceholder(false)
    } else {
      // Show placeholder if no route
      setShowPlaceholder(true)
    }

    // Fit map to show both markers if both exist
    if (bounds.length === 2) {
      const latLngBounds = L.latLngBounds(bounds)
      map.fitBounds(latLngBounds, { padding: [50, 50] })
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 13)
    } else {
      // If no markers, center on Chile (Santiago area with national view)
      map.setView([-33.4489, -70.6693], 6)
    }

  }, [originCoords, destinationCoords, onDistanceChange])

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full min-h-[400px]"
        style={{ height: '100%', width: '100%' }}
      />

      {/* Placeholder overlay */}
      {showPlaceholder && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100 z-10 transition-opacity duration-300">
          <span className="material-icons text-6xl mb-2 text-gray-300">map</span>
          <p className="font-medium">Ingresa Origen y Destino para ver la ruta</p>
        </div>
      )}
    </div>
  )
}
