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
  ]
}

export default site
