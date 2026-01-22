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

// HTML page mocks (exported as identical strings to the `html/` files)
export const htmlMocks: Record<string, string> = {
  'index.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Servicios de Transporte El Loa - Inicio</title>
    
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#003366',    /* Azul Corporativo */
            secondary: '#FF6600',  /* Naranja Acción */
            surface: '#F3F4F6',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="assets/css/custom.css" />
</head>
<body class="font-sans bg-gray-50 text-gray-800 flex flex-col min-h-screen">

  <nav class="bg-primary text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
                
        <div class="flex items-center gap-3 cursor-pointer">
          <div class="w-10 h-10 bg-white rounded-md flex items-center justify-center text-primary font-bold text-xl">EL</div>
          <span class="font-bold text-xl tracking-wide">Servicios El Loa</span>
        </div>

        <div class="hidden md:flex space-x-6">
          <a href="index.html" class="text-secondary font-bold border-b-2 border-secondary px-1 pb-1">Inicio</a>
          <a href="service-request.html" class="hover:text-gray-300 transition px-1 pb-1">Solicitudes</a>
          <a href="trips.html" class="hover:text-gray-300 transition px-1 pb-1">Viajes</a>
          <a href="vehicles.html" class="hover:text-gray-300 transition px-1 pb-1">Vehículos</a>
          <a href="companies.html" class="hover:text-gray-300 transition px-1 pb-1">Clientes</a>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <a href="login.html" class="text-sm font-semibold hover:text-gray-300">Iniciar sesión</a>
          <a href="register.html" class="bg-secondary hover:bg-orange-600 text-white text-sm font-bold py-2 px-5 rounded-md transition shadow-md">
            Registrarse
          </a>
        </div>

        <div class="md:hidden">
          <button class="text-white hover:text-secondary">
            <span class="material-icons text-3xl">menu</span>
          </button>
        </div>
      </div>
    </div>
  </nav>

<section class="relative min-h-[650px] flex items-center pt-20 pb-20">
    
<img 
  src="assets/img/hero.jpg" 
  alt="Vista Pasajero Carretera" 
  class="absolute inset-0 w-full h-full object-cover"
>

  <div class="absolute inset-0 bg-gradient-to-r from-[#002244]/95 via-[#003366]/80 to-transparent"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        
    <div class="text-white space-y-6">
      <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold text-[#FF6600]">
        <span class="material-icons text-sm">verified_user</span> Estándar de Seguridad en Transporte
      </div>
            
      <h1 class="text-4xl lg:text-6xl font-extrabold leading-tight">
        Viaja seguro. <br>
        <span class="text-gray-200 font-medium text-3xl block mt-2">Ya seas una gran empresa o un particular.</span>
      </h1>
            
      <p class="text-lg text-gray-300 max-w-lg leading-relaxed">
        Llevamos la excelencia operativa de la minería a tus traslados personales. Aeropuerto, turismo o faena, llegamos donde necesites.
      </p>

      <div class="flex items-center gap-6 pt-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
        <div class="flex flex-col items-center">
          <span class="material-icons text-3xl mb-1">gps_fixed</span>
          <span class="text-xs uppercase tracking-widest">GPS 24/7</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="material-icons text-3xl mb-1">airline_seat_recline_extra</span>
          <span class="text-xs uppercase tracking-widest">Confort</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="material-icons text-3xl mb-1">receipt_long</span>
          <span class="text-xs uppercase tracking-widest">Facturación</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform lg:translate-y-8 border-t-8 border-[#FF6600]">
      <h3 class="text-primary font-bold text-xl mb-6 flex items-center gap-2">
        <span class="material-icons">directions_car</span> Cotiza tu traslado ahora
      </h3>

      <div class="flex bg-gray-100 p-1 rounded-lg mb-6">
        <button class="flex-1 py-2 px-4 rounded-md bg-white text-primary font-bold shadow-sm transition">
          Persona Natural
        </button>
        <button class="flex-1 py-2 px-4 rounded-md text-gray-500 hover:text-primary font-medium transition">
          Empresa / Convenio
        </button>
      </div>

      <form class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <label class="text-xs font-bold text-gray-500 uppercase ml-1">Origen</label>
            <div class="relative mt-1">
              <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">trip_origin</span>
              <input type="text" placeholder="Aeropuerto, Casa..." class="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6600] outline-none">
            </div>
          </div>
          <div class="relative">
            <label class="text-xs font-bold text-gray-500 uppercase ml-1">Destino</label>
            <div class="relative mt-1">
              <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">location_on</span>
              <input type="text" placeholder="Hotel, Faena..." class="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6600] outline-none">
            </div>
          </div>
        </div>

        <div>
          <label class="text-xs font-bold text-gray-500 uppercase ml-1">Fecha y Hora</label>
          <input type="datetime-local" class="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6600] outline-none text-gray-600">
        </div>

        <button class="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2 transition group">
          Ver Precios y Disponibilidad
          <span class="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
                
        <p class="text-center text-xs text-gray-400 mt-2">
          Pago seguro con WebPay y Transferencia
        </p>
      </form>
    </div>

  </div>
</section>

  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-secondary font-bold tracking-widest uppercase text-sm">Soluciones Integrales</span>
        <h2 class="text-3xl font-bold text-primary mt-2">Nuestros Servicios</h2>
        <div class="w-20 h-1 bg-secondary mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
          <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
            <span class="material-icons text-3xl">groups</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Transporte de Personal</h3>
          <p class="text-gray-600 text-sm mb-6">Traslado seguro y puntual para trabajadores y colaboradores hacia faenas o plantas.</p>
          <a href="service-request.html" class="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Solicitar servicio <span class="material-icons text-sm">arrow_forward</span>
          </a>
        </div>

        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
          <div class="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition">
            <span class="material-icons text-3xl">apartment</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Servicios Corporativos</h3>
          <p class="text-gray-600 text-sm mb-6">Soluciones de transporte exclusivas para empresas con contratos mensuales y facturación.</p>
          <a href="companies.html" class="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Ver clientes <span class="material-icons text-sm">arrow_forward</span>
          </a>
        </div>

        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
          <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition">
            <span class="material-icons text-3xl">event_available</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Viajes Programados</h3>
          <p class="text-gray-600 text-sm mb-6">Reserva anticipada y seguimiento de viajes en tiempo real con nuestra App.</p>
          <a href="trips.html" class="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Ver viajes <span class="material-icons text-sm">arrow_forward</span>
          </a>
        </div>

        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition border border-gray-100 group hover:-translate-y-1 duration-300">
          <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
            <span class="material-icons text-3xl">credit_card</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Pago de Servicios</h3>
          <p class="text-gray-600 text-sm mb-6">Paga tus servicios particulares de forma segura mediante nuestra pasarela web.</p>
          <a href="payment.html" class="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Ir a pagos <span class="material-icons text-sm">arrow_forward</span>
          </a>
        </div>

      </div>
    </div>
  </section>

<footer class="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
        
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
        <div class="space-y-4">
          <div class="flex items-center gap-2 text-white">
            <span class="material-icons text-secondary text-3xl">local_shipping</span>
            <span class="font-bold text-xl tracking-wide">Servicios El Loa</span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">
            Líderes en transporte corporativo y privado en la región de Antofagasta. Seguridad, puntualidad y tecnología al servicio de la minería.
          </p>
          <div class="flex gap-4 pt-2">
            <a href="https://facebook.com" target="_blank" class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
              <span class="material-icons text-sm">facebook</span>
            </a>
            <a href="https://elloa.cl" target="_blank" class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
              <span class="material-icons text-sm">public</span> </a>
            <a href="https://instagram.com" target="_blank" class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-secondary transition text-white">
              <span class="material-icons text-sm">photo_camera</span> </a>
          </div>
        </div>

        <div>
          <h3 class="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Navegación</h3>
          <ul class="space-y-3 text-sm">
            <li><a href="index.html" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
            <li><a href="service-request.html" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
            <li><a href="companies.html" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
            <li><a href="portal-choferes.html" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
            <li><a href="contacto.html" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
            <li><a href="trabaja-nosotros.html" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Contacto Central</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <span class="material-icons text-secondary text-sm mt-1">location_on</span>
              <span>Av. Granaderos 2550, Of. 304<br>Calama, Región de Antofagasta</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-secondary text-sm">phone</span>
              <span>+56 55 234 5678</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-secondary text-sm">email</span>
              <span>operaciones@elloa.cl</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-secondary text-sm">access_time</span>
              <span>24/7 Soporte en Ruta</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Descarga la App</h3>
          <p class="text-xs text-gray-400 mb-4">Gestiona tus viajes y monitorea la ruta en tiempo real.</p>
                    
          <div class="space-y-3">
            <button class="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
              <span class="material-icons text-3xl">apple</span>
              <div class="text-left">
                <div class="text-[10px] uppercase">Disponible en</div>
                <div class="font-bold text-sm text-white">App Store</div>
              </div>
            </button>
            <button class="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-2 flex items-center gap-3 transition">
              <span class="material-icons text-3xl">android</span>
              <div class="text-left">
                <div class="text-[10px] uppercase">Disponible en</div>
                <div class="font-bold text-sm text-white">Google Play</div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>

    <div class="bg-[#001a33] py-6 border-t border-blue-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-xs text-gray-500 text-center md:text-left">
          &copy; 2026 Servicios de Transporte El Loa SpA. Todos los derechos reservados.
        </div>
        <div class="flex gap-6 text-xs text-gray-400 font-medium">
          <a href="terms.html" class="hover:text-white transition">Términos y Condiciones</a>
          <a href="privacy.html" class="hover:text-white transition">Política de Privacidad</a>
          <a href="complaints.html" class="hover:text-white transition">Portal de Denuncias</a>
        </div>
      </div>
    </div>
  </footer>`,
};

export function getHtmlMock(name: string) {
  return htmlMocks[name] || null
}

// Note: keep single default export (`site`) earlier in this file.

export const termsMockData = {
  title: 'Términos y Condiciones',
  pageTitle: 'Términos y Condiciones',
  content: 'Contenido de términos y condiciones...',
};

export const tripsMockData = {
  trips: [
    {
      id: 'VJ-2601',
      title: 'Traslado Turno B',
      date: '22 Ene',
      time: '08:30',
      origin: 'Aeropuerto',
      dest: 'Faena Minera Gaby',
      client: 'Minera ABC',
      driver: 'Juan Pérez',
      fare: 85000,
      status: 'En ruta',
    },
  ],
};

export const userDetailMockData = {
  user: {
    name: 'Juan Pérez',
    email: 'juan@empresa.cl',
    role: 'Cliente',
    phone: '+56 9 1234 5678',
    status: 'Activo',
  },
};

export const userEditMockData = {
  user: {
    name: 'Juan Pérez',
    email: 'juan@empresa.cl',
    role: 'Cliente',
    phone: '+56 9 1234 5678',
  },
  roles: ['Administrador', 'Cliente', 'Chofer'],
};

export const usersMockData = {
  stats: [
    { label: 'Total Usuarios', value: 125, color: 'blue', icon: 'groups' },
    { label: 'Activos', value: 98, color: 'green', icon: 'check_circle' },
    { label: 'Inactivos', value: 27, color: 'red', icon: 'cancel' },
  ],
  users: [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@empresa.cl',
      role: 'Cliente',
      roleColor: 'blue',
      status: 'Activo',
      statusColor: 'green',
      lastLogin: '2026-01-20',
      initials: 'JP',
      extraInfo: 'Cliente Corporativo',
      lastAccess: 'Hace 2 horas',
    },
  ],
  pagination: {
    showing: {
      from: 1,
      to: 10,
    },
    total: 125,
  },
};

export const usersPage2MockData = {
  pagination: {
    current: 1,
    total: 5,
  },
  users: [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@empresa.cl',
      role: 'Cliente',
      status: 'Activo',
    },
  ],
};

export const vehicleDetailMockData = {
  vehicle: {
    id: 'VH-001',
    model: 'Toyota Hilux',
    plate: 'ABC-123',
    capacity: 4,
    status: 'Activo',
  },
  history: [
    {
      date: '2026-01-20',
      trip: 'VJ-2601',
      driver: 'Carlos López',
      mileage: 150,
      description: 'Traslado aeropuerto-faena',
    },
  ],
};

export const vehicleEditMockData = {
  vehicle: {
    id: 'VH-001',
    model: 'Toyota Hilux',
    plate: 'ABC-123',
    capacity: 4,
    status: 'Activo',
  },
  statuses: ['Disponible', 'En Ruta', 'En Mantención'],
};

export const vehiclesMockData = {
  stats: [
    { label: 'Total Vehículos', value: 20, borderColor: 'primary' },
    { label: 'Activos', value: 18, borderColor: 'success' },
    { label: 'En Mantenimiento', value: 2, borderColor: 'warning' },
  ],
  vehicles: [
    {
      model: 'Toyota Hilux',
      type: 'Camioneta 4x4',
      plate: 'ABC-123',
      year: 2022,
      status: 'Disponible',
      statusColor: 'green',
      icon: 'local_shipping',
      driver: 'Carlos López',
      maintenanceDate: '20/02/2026',
      maintenanceColor: 'green',
      maintenanceStatus: 'Al día',
    },
    {
      model: 'Hyundai H1',
      type: 'Van Pasajeros',
      plate: 'XYZ-987',
      year: 2021,
      status: 'En Taller',
      statusColor: 'red',
      icon: 'minor_crash',
      driver: 'Miguel González',
      maintenanceDate: '15/01/2026',
      maintenanceColor: 'red',
      maintenanceStatus: 'Vencida',
    },
  ],
};

export default site;
