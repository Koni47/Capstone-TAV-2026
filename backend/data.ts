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
  },

  // Other mocks
  tripsMockData: {
    trips: [
      { id: 'VJ-2601', title: 'Traslado Turno B', date: '22 Ene', time: '08:30', origin: 'Aeropuerto', dest: 'Faena Minera Gaby', client: 'Minera ABC', driver: 'Juan Pérez', fare: 85000, status: 'En ruta' },
      { id: 'VJ-2602', title: 'Traslado Ejecutivo', date: '22 Ene', time: '10:00', origin: 'Hotel', dest: 'Aeropuerto', client: 'Empresa XYZ', driver: 'Carlos López', fare: 42000, status: 'Asignado' }
    ]
  },

  loginMockData: {
    title: 'Inicio de Sesión',
    subtitle: 'Servicios de Transporte El Loa',
    emailPlaceholder: 'Ej: juanito.perez@correo.cl',
    passwordPlaceholder: 'Ingresa tu contraseña',
    roles: [
      { value: 'admin', label: 'Administrador' },
      { value: 'cliente', label: 'Cliente' },
      { value: 'chofer', label: 'Chofer' }
    ],
    links: { recoverPassword: '/recover-password', register: '/register', home: '/' },
    buttonText: 'Iniciar Sesión'
  },

  complaintsMockData: {
    pageTitle: 'Portal de Denuncias',
    description: 'Aquí puedes registrar una denuncia o reclamo relacionado con nuestros servicios.'
  },

  // Client Portal mock data
  clientPortalMockData: {
    company: {
      name: 'Usuario',
      initials: 'US'
    },
    stats: {
      tripsThisMonth: 24,
      tripsInRoute: 2,
      estimatedSpending: '$450.000'
    },
    recentTrips: [
      {
        id: '#REQ-890',
        route: 'Aeropuerto -> Faena',
        date: '22 Ene, 10:00',
        passenger: 'Ing. Juan Perez',
        status: 'FINALIZADO',
        statusColor: 'green'
      }
    ]
  }
}

export const companiesMockData = {
  stats: {
    totalCompanies: 15,
    expiringContracts: 3,
    billedTripsMonth: 245,
  },
  companies: [
    {
      id: 1,
      name: 'Minera ABC',
      rut: '12.345.678-9',
      avatarBgColor: 'indigo',
      initials: 'MA',
      costCenter: 'CC-001',
      costCenterDesc: 'Centro de Costo Principal',
      contact: {
        name: 'Juan Pérez',
        email: 'juan@mineraabc.cl',
      },
      status: 'Activo',
      statusColor: 'green',
      contractEnd: '2026-06-15',
      tripsThisMonth: 45,
      totalBilled: 1250000,
    },    {
      id: 2,
      name: 'Transportes Norte',
      rut: '76.543.210-K',
      avatarBgColor: 'orange',
      initials: 'TN',
      costCenter: 'CC-002',
      costCenterDesc: 'Logística',
      contact: {
        name: 'Ana María',
        email: 'ana@norte.cl',
      },
      status: 'Activo',
      statusColor: 'green',
      contractEnd: '2025-12-01',
      tripsThisMonth: 32,
      totalBilled: 850000,
    },    {
      id: 2,
      name: 'Constructora XYZ',
      rut: '76.543.210-K',
      avatarBgColor: 'orange',
      initials: 'CX',
      costCenter: 'CC-088',
      costCenterDesc: 'Obra Calama Norte',
      contact: {
        name: 'María García',
        email: 'mgarcia@xyz.cl',
      },
      status: 'Inactivo',
      statusColor: 'red',
      contractEnd: '2025-12-31',
      tripsThisMonth: 0,
      totalBilled: 850000,
    },
  ],
  pagination: {
    showingFrom: 1,
    showingTo: 10,
    totalResults: 15,
  },
};

export const companiesPage2MockData = {
  pagination: {
    currentPage: 1,
    total: 3,    showingFrom: 1,
    showingTo: 10,
    totalResults: 15,  },
  message: 'Lista de empresas registradas en el sistema.',
  companies: [
    {
      id: 1,
      name: 'Minera ABC',
      rut: '12.345.678-9',
      avatarBgColor: 'indigo',
      initials: 'MA',
      costCenter: 'CC-001',
      costCenterDesc: 'Centro de Costo Principal',
      contact: {
        name: 'Juan Pérez',
        email: 'juan@mineraabc.cl',
      },
      statusColor: 'green',
      status: 'Activo',
    },
  ],
};

export const companyDetailMockData = {
  company: {
    name: 'Minera ABC',
    rut: '12.345.678-9',
    address: 'Av. Granaderos 2550, Calama',
    description: 'Empresa líder en minería con operaciones en la región de Antofagasta.',
    contact: {
      name: 'Juan Pérez',
      email: 'juan@mineraabc.cl',
    },
    phone: '+56 9 1234 5678',
    contractStart: '2024-01-01',
    contractEnd: '2026-12-31',
    status: 'Activo',
  },
  stats: {
    totalTrips: 1250,
    tripsThisMonth: 45,
    totalBilled: 2500000,
    pendingPayments: 150000,
  },
  recentTrips: [
    {
      id: 'VJ-2601',
      date: '2026-01-20',
      origin: 'Aeropuerto',
      dest: 'Faena',
      driver: 'Carlos López',
      fare: 85000,
      status: 'Completado',
    },
  ],
};

export const companyEditMockData = {
  company: {
    name: 'Minera ABC',
    razónSocial: 'Minera ABC SpA',
    rut: '12.345.678-9',
    address: 'Av. Granaderos 2550, Calama',
    contact: 'Juan Pérez',
    contacto: 'Juan Pérez',
    email: 'juan@mineraabc.cl',
    phone: '+56 9 1234 5678',
    contractStart: '2024-01-01',
    contractEnd: '2026-12-31',
  },
};

export const complaintsMockData = {
  pageTitle: 'Portal de Denuncias',
  description: 'Aquí puedes registrar una denuncia o reclamo relacionado con nuestros servicios.',
};

export const driverDashboardMockData = {
  header: {
    title: 'Panel de Chofer',
    subtitle: 'Gestión de viajes y rendimiento',
  },
  driver: {
    name: 'Carlos López',
    id: 'DRV-001',
    vehicle: 'Toyota Hilux - ABC-123',
  },
  kpis: [
    { label: 'Viajes Hoy', value: 3, icon: 'directions_car', color: 'primary', sub: '2 completados' },
    { label: 'Horas Trabajadas', value: '8.5h', icon: 'schedule', color: 'secondary' },
    { label: 'Ingresos Hoy', value: '$125.000', icon: 'attach_money', color: 'secondary' },
    { label: 'Calificación', value: '4.8', icon: 'star', color: 'secondary' },
  ],
  chartGanancias: { labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'], datasets: [{ data: [50000, 60000, 55000, 70000, 65000] }] },
  chartDistribucion: { labels: ['Persona', 'Empresa'], datasets: [{ data: [30, 70] }] },
  nextTrips: [
    {
      id: 'VJ-2605',
      time: '14:30',
      origin: 'Aeropuerto',
      dest: 'Hotel Radisson',
      client: 'Minera ABC',
      fare: 45000,
      level: 'yellow',
      title: 'Traslado Ejecutivo',
      passenger: 'Ing. Juan Perez',
      routeInfo: 'Ruta directa, 25 km',
      price: '$45.000',
      status: 'Asignado',
    },
  ],
  completed: [
    {
      id: 'VJ-2601',
      time: '08:30',
      origin: 'Aeropuerto',
      dest: 'Faena',
      fare: 85000,
      client: 'Minera ABC',
      route: 'Aeropuerto → Faena',
      km: 150,
      stars: '★★★★★',
      rating: '5.0',
    },
  ],
};

export const logoutMockData = {
  message: 'Sesión cerrada exitosamente',
  redirectDelayMs: 2000,
  icon: 'logout',
  title: 'Cerrando Sesión',
};

export const paymentMockData = {
  stats: {
    pending: 3,
    inRoute: 2,
  },
  requests: [
    {
      id: 'REQ-001',
      date: '2026-01-15',
      origin: 'Aeropuerto',
      dest: 'Centro Calama',
      destination: 'Centro Calama',
      passengers: 2,
      estimatedFare: 35000,
      borderColor: 'yellow',
      client: 'Juan Pérez',
      statusColor: 'yellow',
      status: 'Pendiente',
    },
  ],
  drivers: [
    { id: 'DRV-001', name: 'Carlos López', rating: 4.8, vehicle: 'Toyota Hilux', status: 'Disponible' },
  ],
  vehicles: [
    { id: 'VH-001', model: 'Toyota Hilux', capacity: 4, name: 'Hilux Azul', plate: 'ABC-123' },
  ],
};

export const privacyMockData = {
  title: 'Política de Privacidad',
  pageTitle: 'Política de Privacidad',
  content: 'Contenido de la política de privacidad...',
};

export const reportsMockData = {
  results: {
    month: 'Enero 2026',
    rows: [
      {
        date: '2026-01-20',
        client: 'Minera ABC',
        trip: 'VJ-2601',
        trips: 1,
        driver: 'Carlos López',
        fare: 85000,
        kilometers: 150,
        total: 85000,
        status: 'Completado',
      },
    ],
    totalGeneral: 85000,
  },
  filters: {
    clients: ['Todas las empresas', 'Minera ABC', 'Constructora XYZ'],
  },
};

// Export individual mock data for backward compatibility with mockApi.ts
export const usersMockData = {
  stats: {
    totalUsers: 45,
    activeUsers: 38,
    pendingUsers: 7,
  },
  users: [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@mineraabc.cl',
      role: 'Cliente',
      status: 'Activo',
      lastLogin: '2026-01-20',
      company: 'Minera ABC'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@xyz.cl',
      role: 'Cliente',
      status: 'Activo',
      lastLogin: '2026-01-19',
      company: 'Constructora XYZ'
    }
  ]
};

export const usersPage2MockData = {
  stats: {
    totalUsers: 45,
    activeUsers: 38,
    pendingUsers: 7,
  },
  users: [
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@norte.cl',
      role: 'Chofer',
      status: 'Activo',
      lastLogin: '2026-01-18',
      company: 'Transportes Norte'
    }
  ]
};

export const userDetailMockData = {
  user: {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@mineraabc.cl',
    role: 'Cliente',
    status: 'Activo',
    phone: '+56 9 8765 4321',
    company: 'Minera ABC',
    lastLogin: '2026-01-20 14:30',
    createdAt: '2025-03-15'
  }
};

export const userEditMockData = {
  user: {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@mineraabc.cl',
    role: 'Cliente',
    phone: '+56 9 8765 4321',
    company: 'Minera ABC'
  }
};

export const vehiclesMockData = {
  stats: {
    totalVehicles: 20,
    activeVehicles: 18,
    maintenanceVehicles: 2,
  },
  vehicles: [
    {
      id: 1,
      patente: 'ABCD-12',
      marca: 'Mercedes-Benz',
      modelo: 'Sprinter 515 CDI',
      tipo: 'Van Pasajeros',
      capacidad: 19,
      status: 'Activo',
      color: 'Blanco',
      kilometraje: 125000
    },
    {
      id: 2,
      patente: 'EFGH-34',
      marca: 'Toyota',
      modelo: 'Hiace',
      tipo: 'Van Pasajeros',
      capacidad: 15,
      status: 'Activo',
      color: 'Azul',
      kilometraje: 98000
    }
  ]
};

export const vehicleDetailMockData = {
  vehicle: {
    id: 1,
    patente: 'ABCD-12',
    marca: 'Mercedes-Benz',
    modelo: 'Sprinter 515 CDI',
    tipo: 'Van Pasajeros',
    capacidad: 19,
    status: 'Activo',
    color: 'Blanco',
    kilometraje: 125000,
    anio: 2020,
    combustible: 'Diésel',
    fechaCompra: '2020-05-15',
    fechaRevision: '2025-12-01',
    observaciones: 'Vehículo en excelente estado'
  }
};

export const vehicleEditMockData = {
  vehicle: {
    id: 1,
    patente: 'ABCD-12',
    marca: 'Mercedes-Benz',
    modelo: 'Sprinter 515 CDI',
    tipo: 'Van Pasajeros',
    capacidad: 19,
    color: 'Blanco',
    kilometraje: 125000,
    anio: 2020,
    combustible: 'Diésel',
    fechaCompra: '2020-05-15',
    fechaRevision: '2025-12-01',
    observaciones: 'Vehículo en excelente estado'
  }
};

export const tripsMockData = site.tripsMockData;
export const termsMockData = {
  pageTitle: 'Términos y Condiciones',
  description: 'Lee nuestros términos y condiciones de servicio.'
};

export const loginMockData = site.loginMockData;
export const homeMockData = site;
export const contactMockData = {
  pageTitle: 'Contáctanos',
  description: 'Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo.'
};

export const companiesMockRaw = companiesMockData;