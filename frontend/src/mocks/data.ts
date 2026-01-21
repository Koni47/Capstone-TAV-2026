export const site = {
  companyName: 'Servicios El Loa',
  tagline: 'Viaja seguro. Ya seas una gran empresa o un particular.',
  hero: {
    title: 'Viaja seguro.',
    subtitle: 'Ya seas una gran empresa o un particular.',
    lead:
      'Llevamos la excelencia operativa de la minería a tus traslados personales. Aeropuerto, turismo o faena, llegamos donde necesites.',
    cta: 'Ver Precios y Disponibilidad',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Solicitudes', href: '/service-request' },
    { label: 'Viajes', href: '/trips' },
    { label: 'Vehículos', href: '/vehicles' },
    { label: 'Clientes', href: '/companies' }
  ],
  features: [
    { icon: 'gps_fixed', title: 'GPS 24/7' },
    { icon: 'airline_seat_recline_extra', title: 'Confort' },
    { icon: 'receipt_long', title: 'Facturación' }
  ],
  services: [
    {
      title: 'Transporte de Personal',
      desc: 'Traslado seguro y puntual para trabajadores y colaboradores hacia faenas o plantas.',
      href: '/service-request',
      icon: 'groups'
    },
    {
      title: 'Servicios Corporativos',
      desc: 'Soluciones de transporte exclusivas para empresas con contratos mensuales y facturación.',
      href: '/companies',
      icon: 'apartment'
    },
    {
      title: 'Viajes Programados',
      desc: 'Reserva anticipada y seguimiento de viajes en tiempo real con nuestra App.',
      href: '/trips',
      icon: 'event_available'
    },
    {
      title: 'Pago de Servicios',
      desc: 'Paga tus servicios particulares de forma segura mediante nuestra pasarela web.',
      href: '/payment',
      icon: 'credit_card'
    }
  ],
  contact: {
    address: 'Av. Granaderos 2550, Of. 304\nCalama, Región de Antofagasta',
    phone: '+56 55 234 5678',
    email: 'operaciones@elloa.cl'
  },
  footerLinks: [
    { label: 'Términos y Condiciones', href: '/terms' },
    { label: 'Política de Privacidad', href: '/privacy' },
    { label: 'Portal de Denuncias', href: '/complaints' }
  ],

  // Admin Dashboard mock data
  adminDashboard: {
    kpis: {
      totalTrips: 245,
      totalRevenue: 1245000,
      pendingTrips: 23,
      activeVehicles: '18 / 20'
    },
    revenueByService: [
      { label: 'Transporte Personal', value: 400000 },
      { label: 'Corporativo', value: 520000 },
      { label: 'Turismo', value: 150000 },
      { label: 'Otros', value: 75000 }
    ],
    topClients: [
      { name: 'Minera ABC', value: 450000 },
      { name: 'Constructora XYZ', value: 320000 },
      { name: 'Transportes ABC', value: 250000 },
      { name: 'Empresas LMN', value: 150000 },
      { name: 'Otros Clientes', value: 75000 }
    ],
    tripsByMonth: [180, 200, 220, 230, 245, 250],
    vehicleOccupancy: { occupied: 12, available: 6, maintenance: 2 },
    recentTrips: [
      { id: 'VJ-2601', client: 'Minera ABC', driver: 'Juan Pérez', origin: 'Aeropuerto', dest: 'Faena Atacama', date: '20/01/2026 08:30', fare: 85000, status: 'Completado' },
      { id: 'VJ-2600', client: 'Constructora XYZ', driver: 'Carlos López', origin: 'Centro Calama', dest: 'Obra Construcción', date: '20/01/2026 07:15', fare: 42000, status: 'Completado' },
      { id: 'VJ-2599', client: 'Transportes ABC', driver: 'Miguel González', origin: 'Estación de Bus', dest: 'Terminal Aéreo', date: '20/01/2026 06:45', fare: 28000, status: 'Completado' }
    ]
  }
}


export default site
