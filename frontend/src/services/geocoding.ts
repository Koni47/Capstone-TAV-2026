// Geocoding service using OpenStreetMap Nominatim API
export interface GeocodeResult {
  lat: number;
  lng: number;
  display_name: string;
}

export class GeocodingService {
  private static readonly NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

  // Predefined coordinates for common Chilean locations
  private static readonly predefinedLocations: { [key: string]: { lat: number; lng: number; display_name: string } } = {
    // Calama area
    'aeropuerto el loa': { lat: -22.4989, lng: -68.9036, display_name: 'Aeropuerto El Loa, Calama' },
    'hotel diego de almagro': { lat: -22.4600, lng: -68.9300, display_name: 'Hotel Diego de Almagro, Calama' },
    'centro calama': { lat: -22.4567, lng: -68.9304, display_name: 'Centro Calama' },
    'chuquicamata': { lat: -22.3200, lng: -68.9300, display_name: 'Chuquicamata' },
    'aeropuerto': { lat: -22.4989, lng: -68.9036, display_name: 'Aeropuerto El Loa, Calama' },
    'hotel': { lat: -22.4600, lng: -68.9300, display_name: 'Hotel Diego de Almagro, Calama' },
    'centro': { lat: -22.4567, lng: -68.9304, display_name: 'Centro Calama' },
    'calama': { lat: -22.4567, lng: -68.9304, display_name: 'Centro Calama' },

    // Santiago area
    'santiago': { lat: -33.4489, lng: -70.6693, display_name: 'Santiago, Chile' },
    'providencia': { lat: -33.4314, lng: -70.6092, display_name: 'Providencia, Santiago' },
    'las condes': { lat: -33.4067, lng: -70.5714, display_name: 'Las Condes, Santiago' },
    'vitacura': { lat: -33.4000, lng: -70.6000, display_name: 'Vitacura, Santiago' },
    'ñuñoa': { lat: -33.4569, lng: -70.6058, display_name: 'Ñuñoa, Santiago' },
    'la reina': { lat: -33.4500, lng: -70.5333, display_name: 'La Reina, Santiago' },

    // Other regions
    'antofagasta': { lat: -23.6500, lng: -70.4000, display_name: 'Antofagasta' },
    'iquique': { lat: -20.2307, lng: -70.1357, display_name: 'Iquique' },
    'arica': { lat: -18.4783, lng: -70.3126, display_name: 'Arica' },
    'concepción': { lat: -36.8269, lng: -73.0498, display_name: 'Concepción' },
    'valparaíso': { lat: -33.0472, lng: -71.6127, display_name: 'Valparaíso' },
    'viña del mar': { lat: -33.0245, lng: -71.5518, display_name: 'Viña del Mar' },
    'temuco': { lat: -38.7359, lng: -72.5904, display_name: 'Temuco' },
    'puerto montt': { lat: -41.4689, lng: -72.9411, display_name: 'Puerto Montt' },
    'punta arenas': { lat: -53.1638, lng: -70.9171, display_name: 'Punta Arenas' },
  };

  static async geocode(address: string): Promise<GeocodeResult | null> {
    if (!address || address.trim() === '') {
      console.log('GeocodingService: empty address')
      return null;
    }

    const searchTerm = address.toLowerCase().trim();
    console.log('GeocodingService: geocoding address:', address)

    // First, check predefined locations
    if (this.predefinedLocations[searchTerm]) {
      console.log('GeocodingService: found in predefined locations:', this.predefinedLocations[searchTerm])
      const location = this.predefinedLocations[searchTerm];
      return {
        lat: location.lat,
        lng: location.lng,
        display_name: location.display_name
      };
    }

    // Check partial matches in predefined locations
    for (const [key, location] of Object.entries(this.predefinedLocations)) {
      if (key.includes(searchTerm) || searchTerm.includes(key)) {
        console.log('GeocodingService: found partial match in predefined:', key, location)
        return {
          lat: location.lat,
          lng: location.lng,
          display_name: location.display_name
        };
      }
    }

    // Use Nominatim API - Try multiple search strategies
    try {
      console.log('GeocodingService: calling Nominatim API for:', address)
      
      // Strategy 1: Search with ", Chile" suffix and country code
      let url = `${this.NOMINATIM_URL}?format=json&q=${encodeURIComponent(address)}, Chile&countrycodes=cl`;
      let response = await fetch(url, {
        headers: {
          'User-Agent': 'ServiciosElLoa/1.0'
        }
      });
      let data = await response.json();

      // Strategy 2: If no results, try without ", Chile" but with country code
      if (data.length === 0) {
        console.log('GeocodingService: trying without ", Chile" suffix')
        url = `${this.NOMINATIM_URL}?format=json&q=${encodeURIComponent(address)}&countrycodes=cl`;
        response = await fetch(url, {
          headers: {
            'User-Agent': 'ServiciosElLoa/1.0'
          }
        });
        data = await response.json();
      }

      // Strategy 3: If still no results and doesn't contain "Chile", add it
      if (data.length === 0 && !address.toLowerCase().includes('chile')) {
        console.log('GeocodingService: trying with explicit Chile')
        url = `${this.NOMINATIM_URL}?format=json&q=${encodeURIComponent(address + ' Chile')}`;
        response = await fetch(url, {
          headers: {
            'User-Agent': 'ServiciosElLoa/1.0'
          }
        });
        data = await response.json();
      }

      if (data.length > 0) {
        console.log('GeocodingService: found location:', data[0].display_name)
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display_name: data[0].display_name
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }

    console.log('GeocodingService: no results found for:', address)
    return null;
  }
}