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
      { id: 'uuid-trip-1', solicitudId: 'uuid-request-1', choferId: 'uuid-user-1', vehiculoId: 'uuid-vehicle-1', estadoActual: 'EN_RUTA', createdAt: '2026-01-22T08:30:00Z' },
      { id: 'uuid-trip-2', solicitudId: 'uuid-request-2', choferId: 'uuid-user-2', vehiculoId: 'uuid-vehicle-2', estadoActual: 'FINALIZADO', createdAt: '2026-01-22T10:00:00Z' }
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
      id: 'uuid-company-1',
      razonSocial: 'Minera ABC',
      rutEmpresa: '12.345.678-9',
      centroCosto: 'CC-001',
      contactoComercial: 'Juan Pérez',
      createdAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'uuid-company-2',
      razonSocial: 'Transportes Norte',
      rutEmpresa: '76.543.210-K',
      centroCosto: 'CC-002',
      contactoComercial: 'Ana María',
      createdAt: '2026-01-01T00:00:00Z',
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
      id: 'uuid-1',
      nombreCompleto: 'Juan Pérez',
      email: 'juan.perez@mineraabc.cl',
      role: 'CLIENTE',
      activo: true,
      createdAt: '2026-01-20T00:00:00Z',
      company: { razonSocial: 'Minera ABC' }
    },
    {
      id: 'uuid-2',
      nombreCompleto: 'María García',
      email: 'maria.garcia@xyz.cl',
      role: 'CLIENTE',
      activo: true,
      createdAt: '2026-01-19T00:00:00Z',
      company: { razonSocial: 'Constructora XYZ' }
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
    id: 'uuid-1',
    nombreCompleto: 'Juan Pérez',
    email: 'juan.perez@mineraabc.cl',
    role: 'CLIENTE',
    activo: true,
    phone: '+56 9 8765 4321',
    company: { razonSocial: 'Minera ABC' },
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
      id: 'uuid-vehicle-1',
      patente: 'ABCD-12',
      marca: 'Mercedes-Benz',
      modelo: 'Sprinter 515 CDI',
      capacidadPax: 19,
      estado: 'DISPONIBLE',
      vencimientoRevTec: '2025-12-01T00:00:00Z',
      createdAt: '2020-05-15T00:00:00Z',
    },
    {
      id: 'uuid-vehicle-2',
      patente: 'EFGH-34',
      marca: 'Toyota',
      modelo: 'Hiace',
      capacidadPax: 15,
      estado: 'DISPONIBLE',
      vencimientoRevTec: '2025-12-01T00:00:00Z',
      createdAt: '2020-05-15T00:00:00Z',
    }
  ]
};

export const vehicleDetailMockData = {
  vehicle: {
    id: 'uuid-vehicle-1',
    patente: 'ABCD-12',
    marca: 'Mercedes-Benz',
    modelo: 'Sprinter 515 CDI',
    capacidadPax: 19,
    estado: 'DISPONIBLE',
    vencimientoRevTec: '2025-12-01T00:00:00Z',
    createdAt: '2020-05-15T00:00:00Z',
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

export const htmlMocks: Record<string, string> = {
  'service-request.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solicitudes | Servicios de Transporte El Loa</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600', surface: '#F3F4F6' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }
    </script>
    <link rel="stylesheet" href="assets/css/tailwind.css" />
    <link rel="stylesheet" href="assets/css/custom.css" />
    <script src="assets/js/auth-helper.js"></script>
</head>
<body class="bg-surface font-sans text-gray-800">
    <script>
        // Proteger esta página - redirigir al login si no está autenticado
        protectPage();
    </script>

   <nav class="bg-primary text-white shadow-lg w-full sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <a href="index.html" class="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                        <span class="material-icons text-secondary">local_shipping</span> EL LOA
                    </a>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a id="dashboardLink" href="#" onclick="redirectToDashboard(event)" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                            <a href="service-request.html" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">Solicitudes</a>
                            
                            <a href="users.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                                Usuarios
                            </a>
                            
                            <a href="companies.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Clientes</a>
                            <a href="vehicles.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Flota</a>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <button class="bg-primary p-1 rounded-full text-gray-400 hover:text-white transition">
                        <span class="material-icons">notifications</span>
                    </button>
                    <div class="flex items-center gap-3 pl-4 border-l border-blue-800">
                        <div class="text-right hidden sm:block">
                            <p class="text-sm font-bold leading-none user-name">Usuario</p>
                            <p class="text-xs text-blue-300 user-role">Admin</p>
                        </div>
                        <div class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-900 user-initials">US</div>
                        <a href="logout.html" class="ml-2 text-sm font-semibold hover:text-gray-300">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</body>
</html>`,
  
  'vehicle-add.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>Agregar Nuevo Vehículo | Servicios de Transporte El Loa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#003366',
                        secondary: '#FF6600',
                        surface: '#F3F4F6',
                        success: '#10B981',
                        warning: '#F59E0B',
                        danger: '#EF4444',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-surface font-sans text-gray-800">
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
                <li><a href="/vehicles" class="hover:text-primary transition cursor-pointer">Flota</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li class="text-gray-800 font-medium">Agregar Vehículo</li>
            </ol>
        </nav>

        <div class="mb-8">
            <h1 class="text-3xl font-bold leading-7 text-primary flex items-center gap-3">
                <span class="material-icons text-4xl">add_circle</span>
                Agregar Nuevo Vehículo
            </h1>
            <p class="mt-2 text-lg text-gray-600">Complete la información del nuevo vehículo para agregarlo a la flota.</p>
        </div>

        <div class="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span class="material-icons text-primary">directions_car</span>
                    Información del Vehículo
                </h2>
            </div>

            <form id="vehicleForm" class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Patente *</label>
                        <input
                            type="text"
                            id="patente"
                            name="patente"
                            placeholder="ABCD-12"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm uppercase font-mono"
                            required
                            maxlength="8"
                        >
                        <p class="mt-1 text-xs text-gray-500">Formato: ABCD-12 o ABC-123</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Año *</label>
                        <input
                            type="number"
                            id="anio"
                            name="anio"
                            placeholder="2024"
                            min="1990"
                            max="2026"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        >
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                        <select
                            id="marca"
                            name="marca"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        >
                            <option value="">Seleccionar marca</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Hyundai">Hyundai</option>
                            <option value="Volkswagen">Volkswagen</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Ford">Ford</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Mitsubishi">Mitsubishi</option>
                            <option value="Iveco">Iveco</option>
                            <option value="Scania">Scania</option>
                            <option value="Otra">Otra</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
                        <input
                            type="text"
                            id="modelo"
                            name="modelo"
                            placeholder="Ej: Sprinter 515 CDI"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        >
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Vehículo *</label>
                        <select
                            id="tipo"
                            name="tipo"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="Van Pasajeros">Van Pasajeros (Sprinter/H1)</option>
                            <option value="Camioneta">Camioneta (Pickup)</option>
                            <option value="SUV">SUV / Auto</option>
                            <option value="Bus">Bus</option>
                            <option value="Camión">Camión</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Capacidad (Pasajeros)</label>
                        <input
                            type="number"
                            id="capacidad"
                            name="capacidad"
                            placeholder="19"
                            min="1"
                            max="50"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                        >
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Blanco"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                        >
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Kilometraje Actual</label>
                        <input
                            type="number"
                            id="kilometraje"
                            name="kilometraje"
                            placeholder="0"
                            min="0"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                        >
                        <p class="mt-1 text-xs text-gray-500">En kilómetros</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Combustible</label>
                        <select
                            id="combustible"
                            name="combustible"
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="">Seleccionar</option>
                            <option value="Diésel">Diésel</option>
                            <option value="Gasolina">Gasolina</option>
                            <option value="Eléctrico">Eléctrico</option>
                            <option value="Híbrido">Híbrido</option>
                        </select>
                    </div>
                </div>

                <div class="border-t border-gray-200 pt-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <span class="material-icons text-primary">description</span>
                        Documentación
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Compra</label>
                            <input
                                type="date"
                                id="fechaCompra"
                                name="fechaCompra"
                                class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                            >
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Vencimiento Revisión Técnica</label>
                            <input
                                type="date"
                                id="fechaRevision"
                                name="fechaRevision"
                                class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                            >
                        </div>
                    </div>

                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                        <textarea
                            id="observaciones"
                            name="observaciones"
                            rows="3"
                            placeholder="Información adicional sobre el vehículo..."
                            class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                        ></textarea>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        class="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
                    >
                        <span class="material-icons mr-2">save</span>
                        Registrar Vehículo
                    </button>

                    <button
                        type="button"
                        onclick="window.history.back()"
                        class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
                    >
                        <span class="material-icons mr-2">arrow_back</span>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </main>
</body>
</html>`
};