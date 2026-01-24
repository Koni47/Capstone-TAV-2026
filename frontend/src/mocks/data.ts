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
  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
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

    'companies-page-2.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clientes - Página 2 | El Loa</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }</script>
    <link rel="stylesheet" href="assets/css/tailwind.css" />
    <link rel="stylesheet" href="assets/css/custom.css" />    <script src="assets/js/auth-helper.js"></script></head>
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
                <a id="dashboardLink" onclick="__redirect('/AdminDashboard')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                <a href="service-request.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</a>
                            
                <a href="users.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                  Usuarios
                </a>
                            
                <a href="companies.html" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">Clientes</a>
                <a href="vehicles.html" class="text-gray-303 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Flota</a>
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

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
      <!-- Breadcrumb & Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div class="flex-1 min-w-0">
          <nav class="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li><a href="index.html" class="hover:text-primary transition">Inicio</a></li>
              <li><span class="text-gray-400">/</span></li>
              <li><a href="companies.html" class="hover:text-primary transition">Gestión de Clientes</a></li>
              <li><span class="text-gray-400">/</span></li>
              <li class="text-gray-800 font-medium">Página 2</li>
            </ol>
          </nav>
          <h2 class="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate flex items-center gap-2">
            <span class="material-icons">business</span> Clientes Corporativos
          </h2>
          <p class="mt-1 text-sm text-gray-500">Mostrando registros 4-6 de 8.</p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <a href="company-edit.html" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition shadow-md">
            <span class="material-icons mr-2 text-sm">add_business</span>
            Nueva Empresa
          </a>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div class="p-5 flex items-center justify-between">
             <div>
              <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Empresas Activas</dt>
              <dd class="mt-1 text-3xl font-bold text-gray-900">8</dd>
            </div>
             <div class="bg-blue-50 p-2 rounded-full text-primary">
              <span class="material-icons">business</span>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div class="p-5 flex items-center justify-between">
             <div>
              <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Contratos x Vencer</dt>
              <dd class="mt-1 text-3xl font-bold text-orange-600">2</dd>
            </div>
             <div class="bg-orange-50 p-2 rounded-full text-orange-600">
              <span class="material-icons">warning</span>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
           <div class="p-5 flex items-center justify-between">
             <div>
              <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Viajes del Mes</dt>
              <dd class="mt-1 text-3xl font-bold text-blue-600">142</dd>
            </div>
             <div class="bg-blue-50 p-2 rounded-full text-blue-600">
              <span class="material-icons">commute</span>
            </div>
          </div>
        </div>

         <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
          <div class="p-5 flex items-center justify-between">
             <div>
              <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Facturación</dt>
              <dd class="mt-1 text-3xl font-bold text-green-600">OK</dd>
            </div>
             <div class="bg-green-50 p-2 rounded-full text-green-600">
              <span class="material-icons">receipt_long</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters & Actions -->
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div class="relative w-full sm:w-96">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-icons text-gray-400">search</span>
          </div>
          <input type="text" class="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 transition" placeholder="Buscar por RUT o Razón Social...">
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <select class="focus:ring-primary focus:border-primary block w-full sm:w-auto sm:text-sm border-gray-300 rounded-lg p-2.5 bg-white cursor-pointer hover:border-blue-400 transition">
            <option value="">Estado: Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
          <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition">
            <span class="material-icons text-gray-500 text-sm mr-2">file_download</span> Exportar
          </button>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa / RUT
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Centro de Costo
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Contacto
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
                    
            <tr class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    ME
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-bold text-gray-900">Minera Escondida Ltda.</div>
                    <div class="text-sm text-gray-500">76.123.456-K</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-medium">CC-2025-OPS</div>
                <div class="text-xs text-gray-500">Operaciones Mina</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div class="text-sm text-gray-900">Roberto Díaz</div>
                <div class="text-xs text-gray-500">rdiaz@escondida.cl</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                  Activo
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="company-detail.html" class="text-primary hover:text-blue-900 mr-3">Editar</a>
                <a href="company-detail.html" class="text-gray-400 hover:text-gray-600"><span class="material-icons text-sm">more_vert</span></a>
              </td>
            </tr>

          </tbody>
        </table>
            
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Mostrando <span class="font-medium">1</span> a <span class="font-medium">3</span> de <span class="font-medium">8</span> resultados
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="companies.html" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="material-icons text-sm">chevron_left</span>
                </a>
                <a href="companies.html" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-primary hover:bg-gray-50">
                  1
                </a>
                <a href="companies-page-2.html" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="companies-page-2.html" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <a href="companies-page-2.html" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="material-icons text-sm">chevron_right</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

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
        </div>
      </div>
    </footer>`,

    'company-detail.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Detalle Empresa | El Loa</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }</script>
    <link rel="stylesheet" href="assets/css/tailwind.css" />
    <link rel="stylesheet" href="assets/css/custom.css" />    <script src="assets/js/auth-helper.js"></script></head>
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
                <a href="index.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                <a href="service-request.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</a>
                            
                <a href="users.html" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">
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

    <main class="max-w-7xl mx-auto p-6 space-y-6">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <nav class="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li><a href="index.html" class="hover:text-primary transition">Inicio</a></li>
            <li><span class="text-gray-400">/</span></li>
            <li><a href="companies.html" class="hover:text-primary transition">Clientes</a></li>
            <li><span class="text-gray-400">/</span></li>
            <li class="text-gray-800 font-medium">Detalle Empresa</li>
          </ol>
        </nav>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <span class="material-icons text-4xl">business</span>
          Minera Escondida Ltda.
        </h1>
      </div>
      <div class="flex gap-3">
        <a href="company-edit.html" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm">
          <span class="material-icons text-sm">edit</span> Editar
        </a>
        <a href="companies.html" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm">
          <span class="material-icons text-sm">arrow_back</span> Volver
        </a>
      </div>
    </div>

    <!-- Info Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
      <!-- Main Info Card -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden lg:col-span-2">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Información General</h2>
          <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Activo</span>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500 mb-1">Razón Social</p>
              <p class="font-medium text-gray-900 text-lg">Minera Escondida Limitada</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">RUT</p>
              <p class="font-medium text-gray-900 text-lg">76.123.456-K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>

    <footer class="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-white">
              <span class="material-icons text-secondary text-3xl">local_shipping</span>
              <span class="font-bold text-xl tracking-wide">Servicios El Loa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>`,




    'complaints.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portal de Denuncias | El Loa</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }</script>
    <link rel="stylesheet" href="assets/css/tailwind.css" />
    <link rel="stylesheet" href="assets/css/custom.css" />    <script src="assets/js/auth-helper.js"></script></head>
  <body class="bg-surface font-sans text-gray-800">
    <script>
      // Proteger esta página - redirigir al login si no está autenticado
      protectPage();
    </script>
    <main class="max-w-6xl mx-auto p-6">
      <h1 class="text-2xl font-bold text-primary mb-4">Denuncias y Reclamaciones</h1>
      <p class="text-sm text-gray-600 mb-6">Si necesita reportar un incidente, por favor complete el formulario. Nuestra área de calidad revisará el caso.</p>
      <div class="bg-white rounded-lg shadow p-6">
        <form class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Asunto</label>
            <input type="text" class="w-full border-gray-200 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary">
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Detalle</label>
            <textarea rows="6" class="w-full border-gray-200 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <div class="flex justify-end">
            <button class="bg-secondary text-white px-4 py-2 rounded-lg">Enviar</button>
          </div>
        </form>
      </div>
    </main>
    <footer class="bg-[#002244] text-gray-300 border-t-4 border-secondary mt-auto p-6">
      <div class="max-w-7xl mx-auto text-center">
        <p>© 2026 Servicios El Loa. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,

    'contacto.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto | Servicios de Transporte El Loa</title>
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
  <body class="bg-surface font-sans text-gray-800 min-h-screen flex flex-col">
    <main class="max-w-5xl mx-auto p-6 flex-1">
      <h1 class="text-3xl font-bold text-primary mb-4">Contacto</h1>
      <p class="text-gray-600 mb-6">Para consultas comerciales o soporte, complete el formulario o escríbanos a contacto@elloa.cl</p>
      <div class="bg-white rounded-lg shadow p-6">
        <form class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" class="w-full border-gray-200 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary">
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input type="email" class="w-full border-gray-200 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary">
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Mensaje</label>
            <textarea rows="6" class="w-full border-gray-200 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <div class="flex justify-end">
            <button class="bg-secondary text-white px-4 py-2 rounded-lg">Enviar</button>
          </div>
        </form>
      </div>
    </main>
    <footer class="bg-[#002244] text-gray-300 p-6">
      <div class="max-w-7xl mx-auto text-center">
        <p>© 2026 Servicios El Loa. Todos los derechos reservados.</p>
      </div>
    </footer>
  </body>
  </html>`,

    'dashboard_adm.html': `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard Administrador - Servicios El Loa</title>
    
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="assets/js/auth-helper.js"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '#003366',
                secondary: '#FF6600',
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

    <!-- Navbar -->
    <nav class="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <div class="flex items-center gap-3 cursor-pointer">
                    <span class="material-icons text-secondary">local_shipping</span>
                    <span class="font-bold text-xl tracking-wide">Dashboard Administrador</span>
                </div>

                <div class="hidden md:flex space-x-6">
                    <a onclick="__redirect('/dashboard/admin')" class="text-secondary font-bold border-b-2 border-secondary px-1 pb-1 cursor-pointer">Dashboard</a>
                    <a onclick="__redirect('/trips')" class="hover:text-gray-300 transition px-1 pb-1 cursor-pointer">Viajes</a>
                    <a onclick="__redirect('/vehicles')" class="hover:text-gray-300 transition px-1 pb-1 cursor-pointer">Vehículos</a>
                    <a onclick="__redirect('/users')" class="hover:text-gray-300 transition px-1 pb-1 cursor-pointer">Usuarios</a>
                    <a onclick="__redirect('/companies')" class="hover:text-gray-300 transition px-1 pb-1 cursor-pointer">Clientes</a>
                </div>

                <div class="hidden md:flex items-center gap-3">
                    <button class="bg-primary p-1 rounded-full text-gray-400 hover:text-white transition">
                        <span class="material-icons">notifications</span>
                    </button>
                    <div class="flex items-center gap-3 pl-4 border-l border-blue-800">
                        <div class="text-right hidden sm:block">
                            <p class="text-sm font-bold leading-none user-name">Usuario</p>
                            <p class="text-xs text-blue-300 user-role">Admin</p>
                        </div>
                        <div class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-900 user-initials">US</div>
                        <a onclick="__redirect('logout.html')" class="ml-2 text-sm font-semibold hover:text-gray-300 cursor-pointer">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div class="max-w-7xl mx-auto space-y-8">

            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Panel de Control</h1>
                    <p class="text-gray-500 mt-1">Resumen general del rendimiento de la flota y servicios.</p>
                </div>
                <div class="flex gap-3">
                    <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                        <span class="material-icons text-base">file_download</span> Exportar
                    </button>
                    <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition shadow-sm">
                        <span class="material-icons text-base">add</span> Nuevo Reporte
                    </button>
                </div>
            </div>

            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <!-- Total Viajes -->
                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span class="material-icons text-6xl text-primary transform rotate-12">directions_car</span>
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="p-1.5 bg-blue-50 rounded-lg text-primary">
                                <span class="material-icons text-xl">directions_car</span>
                            </span>
                            <span class="text-sm font-semibold text-gray-600">Total Viajes</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                             <h3 class="text-3xl font-bold text-gray-900">245</h3>
                             <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                +12%
                             </span>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">Mes actual</p>
                    </div>
                    <div class="absolute bottom-0 left-0 h-1 bg-primary w-full"></div>
                </div>

                <!-- Ingresos Totales -->
                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span class="material-icons text-6xl text-secondary transform rotate-12">payments</span>
                    </div>
                     <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="p-1.5 bg-orange-50 rounded-lg text-secondary">
                                <span class="material-icons text-xl">payments</span>
                            </span>
                            <span class="text-sm font-semibold text-gray-600">Ingresos Totales</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                             <h3 class="text-3xl font-bold text-gray-900">$1.2M</h3>
                             <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                +18%
                             </span>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">Mes actual</p>
                    </div>
                     <div class="absolute bottom-0 left-0 h-1 bg-secondary w-full"></div>
                </div>

                <!-- Viajes Pendientes -->
                 <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
                     <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span class="material-icons text-6xl text-primary transform rotate-12">pending_actions</span>
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="p-1.5 bg-blue-50 rounded-lg text-primary">
                                <span class="material-icons text-xl">pending_actions</span>
                            </span>
                            <span class="text-sm font-semibold text-gray-600">Pendientes</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                             <h3 class="text-3xl font-bold text-gray-900">23</h3>
                        </div>
                         <p class="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                            <span class="material-icons text-xs">priority_high</span> Requieren atención
                        </p>
                    </div>
                    <div class="absolute bottom-0 left-0 h-1 bg-primary w-full opacity-60"></div>
                </div>

                <!-- Vehículos Activos -->
                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
                     <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span class="material-icons text-6xl text-secondary transform rotate-12">local_shipping</span>
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                             <span class="p-1.5 bg-orange-50 rounded-lg text-secondary">
                                <span class="material-icons text-xl">local_shipping</span>
                            </span>
                            <span class="text-sm font-semibold text-gray-600">Flota Activa</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                             <h3 class="text-3xl font-bold text-gray-900">90%</h3>
                             <span class="text-sm text-gray-500 font-medium">18/20</span>
                        </div>
                         <p class="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                            <span class="material-icons text-xs">check_circle</span> Operatividad óptima
                        </p>
                    </div>
                     <div class="absolute bottom-0 left-0 h-1 bg-secondary w-full opacity-60"></div>
                </div>

            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- Ingresos por Tipo de Servicio -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
                    <div class="flex items-center justify-between mb-6">
                         <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                            Ingresos por Servicio
                        </h3>
                         <button class="text-gray-400 hover:text-primary transition">
                            <span class="material-icons">more_horiz</span>
                        </button>
                    </div>
                    <canvas id="chartServicios" height="100"></canvas>
                </div>

                <!-- Top Clientes -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-gray-900">Top Clientes</h3>
                         <button class="text-xs font-semibold text-primary hover:text-secondary transition uppercase">Ver Todos</button>
                    </div>
                    
                    <div class="space-y-5">
                        <div class="flex items-center justify-between group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs">MA</div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Minera ABC</p>
                                    <p class="text-xs text-gray-500">12 Viajes</p>
                                </div>
                            </div>
                            <span class="text-sm font-bold text-gray-900">$450k</span>
                        </div>

                         <div class="flex items-center justify-between group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-secondary font-bold text-xs">CX</div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Constructora XYZ</p>
                                    <p class="text-xs text-gray-500">8 Viajes</p>
                                </div>
                            </div>
                            <span class="text-sm font-bold text-gray-900">$320k</span>
                        </div>

                         <div class="flex items-center justify-between group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">TA</div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Transportes ABC</p>
                                    <p class="text-xs text-gray-500">6 Viajes</p>
                                </div>
                            </div>
                            <span class="text-sm font-bold text-gray-900">$250k</span>
                        </div>
                        
                         <div class="flex items-center justify-between group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">EL</div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-800 group-hover:text-primary transition">Empresas LMN</p>
                                    <p class="text-xs text-gray-500">4 Viajes</p>
                                </div>
                            </div>
                            <span class="text-sm font-bold text-gray-900">$150k</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Monthly Stats Row 2 -->
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Viajes por Mes -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-gray-900">Evolución de Viajes</h3>
                    </div>
                    <canvas id="chartViajes" height="150"></canvas>
                </div>

                <!-- Ocupación de Vehículos -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                     <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-gray-900">Estado de la Flota</h3>
                    </div>
                    <div class="flex items-center justify-center h-[200px]">
                         <canvas id="chartOcupacion"></canvas>
                    </div>
                </div>
            </div>

            <!-- Table Section -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-gray-900">Últimos Viajes</h3>
                     <a onclick="__redirect('/trips')" class="text-sm font-medium text-primary hover:text-secondary transition cursor-pointer">Ver historial completo &rarr;</a>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50/50">
                            <tr>
                                <th class="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                <th class="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th class="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chofer</th>
                                <th class="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Origen / Destino</th>
                                <th class="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th class="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th class="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                             <!-- Item 1 -->
                            <tr class="hover:bg-blue-50/30 transition">
                                <td class="py-4 px-6 text-sm font-medium text-primary">#VJ-2601</td>
                                <td class="py-4 px-6 text-sm text-gray-700">Minera ABC</td>
                                <td class="py-4 px-6 text-sm text-gray-500">Juan Pérez</td>
                                <td class="py-4 px-6 text-sm text-gray-700">
                                    <div class="flex flex-col">
                                        <span class="font-medium">Aeropuerto</span>
                                        <span class="text-xs text-gray-400">Faena Atacama</span>
                                    </div>
                                </td>
                                <td class="py-4 px-6 text-sm text-gray-500">20 Ene, 08:30</td>
                                <td class="py-4 px-6 text-sm">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Completado
                                    </span>
                                </td>
                                <td class="py-4 px-6 text-sm font-bold text-gray-900 text-right">$85.000</td>
                            </tr>
                             <!-- Item 2 -->
                            <tr class="hover:bg-blue-50/30 transition">
                                <td class="py-4 px-6 text-sm font-medium text-primary">#VJ-2600</td>
                                <td class="py-4 px-6 text-sm text-gray-700">Constructora XYZ</td>
                                <td class="py-4 px-6 text-sm text-gray-500">Carlos López</td>
                                <td class="py-4 px-6 text-sm text-gray-700">
                                    <div class="flex flex-col">
                                        <span class="font-medium">Centro Calama</span>
                                        <span class="text-xs text-gray-400">Obra Norte</span>
                                    </div>
                                </td>
                                <td class="py-4 px-6 text-sm text-gray-500">20 Ene, 07:15</td>
                                <td class="py-4 px-6 text-sm">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Completado
                                    </span>
                                </td>
                                <td class="py-4 px-6 text-sm font-bold text-gray-900 text-right">$42.000</td>
                            </tr>
                            <!-- Item 3 -->
                             <tr class="hover:bg-blue-50/30 transition">
                                <td class="py-4 px-6 text-sm font-medium text-primary">#VJ-2597</td>
                                <td class="py-4 px-6 text-sm text-gray-700">Minera ABC</td>
                                <td class="py-4 px-6 text-sm text-gray-500">Francisco Silva</td>
                                <td class="py-4 px-6 text-sm text-gray-700">
                                    <div class="flex flex-col">
                                        <span class="font-medium">Oficina Central</span>
                                        <span class="text-xs text-gray-400">Faena Norte</span>
                                    </div>
                                </td>
                                <td class="py-4 px-6 text-sm text-gray-500">19 Ene, 14:20</td>
                                <td class="py-4 px-6 text-sm">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        En Curso
                                    </span>
                                </td>
                                <td class="py-4 px-6 text-sm font-bold text-gray-900 text-right">$95.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </main>

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
                        <li><a onclick="__redirect('/')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                        <li><a onclick="__redirect('service-request.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                        <li><a onclick="__redirect('companies.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                        <li><a onclick="__redirect('portal-choferes.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                        <li><a onclick="__redirect('contacto.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                        <li><a onclick="__redirect('trabaja-nosotros.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</a></li>
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
                    <a onclick="__redirect('terms.html')" class="hover:text-white transition cursor-pointer">Términos y Condiciones</a>
                    <a onclick="__redirect('privacy.html')" class="hover:text-white transition cursor-pointer">Política de Privacidad</a>
                    <a onclick="__redirect('complaints.html')" class="hover:text-white transition cursor-pointer">Portal de Denuncias</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Función para inicializar gráficos con delay
        function initCharts() {
            // Chart: Ingresos por Tipo de Servicio
            const ctxServicios = document.getElementById('chartServicios');
            if (ctxServicios) {
                new Chart(ctxServicios.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Transporte Personal', 'Corporativo', 'Turismo', 'Otros'],
                        datasets: [{
                            label: 'Ingresos ($)',
                            data: [450000, 520000, 180000, 95000],
                            backgroundColor: ['#003366', '#FF6600', '#0066CC', '#66BB6A'],
                            borderRadius: 8,
                            borderSkipped: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            }

            // Chart: Viajes por Mes
            const ctxViajes = document.getElementById('chartViajes');
            if (ctxViajes) {
                new Chart(ctxViajes.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                        datasets: [{
                            label: 'Viajes Realizados',
                            data: [180, 195, 210, 225, 235, 245],
                            borderColor: '#003366',
                            backgroundColor: 'rgba(0, 51, 102, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 5,
                            pointBackgroundColor: '#FF6600',
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Chart: Ocupación de Vehículos
            const ctxOcupacion = document.getElementById('chartOcupacion');
            if (ctxOcupacion) {
                new Chart(ctxOcupacion.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Ocupados', 'Disponibles', 'Mantenimiento'],
                        datasets: [{
                            data: [12, 6, 2],
                            backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'],
                            borderColor: '#fff',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }

        // Intentar inicializar inmediatamente
        initCharts();

        // Si no funciona, intentar con delay
        setTimeout(initCharts, 100);
        setTimeout(initCharts, 500);
        setTimeout(initCharts, 1000);
    </script>

    </body>
    </html>`,

    'login.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Login | Servicios El Loa</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }</script>
      <link rel="stylesheet" href="assets/css/tailwind.css" />
      <link rel="stylesheet" href="assets/css/custom.css" />
  </head>
  <body class="bg-gray-50 font-sans min-h-screen flex text-gray-800 selection:bg-secondary selection:text-white">

      <!-- Lado Izquierdo: Imagen Corporativa (Visible en pantallas grandes) -->
      <div class="hidden lg:flex w-full lg:w-5/12 bg-[#001a33] relative justify-center items-center overflow-hidden">
          <!-- Imagen de fondo -->
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
               alt="Transporte Corporativo Paisaje" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay">
        
          <!-- Gradiente Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-900/80 mix-blend-multiply"></div>

          <!-- Contenido Branding -->
          <div class="relative z-10 p-12 text-white max-w-lg">
              <div class="mb-8 flex items-center gap-3">
                   <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-2xl shadow-lg">EL</div>
                   <span class="text-3xl font-bold tracking-wide">Servicios El Loa</span>
              </div>
            
              <h2 class="text-3xl font-bold mb-6 leading-tight text-white">Tu socio confiable en rutas mineras y turismo.</h2>
              <p class="text-blue-100 text-lg leading-relaxed mb-8">
                  Gestiona tus viajes, monitorea tus rutas y accede a soporte 24/7 a través de nuestra plataforma digital integrada.
              </p>
            
              <div class="space-y-4">
                   <div class="flex items-center gap-4 text-sm font-medium bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                      <span class="material-icons text-secondary">verified_user</span> 
                      <span>Plataforma Segura SSL</span>
                   </div>
                   <div class="flex items-center gap-4 text-sm font-medium bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                      <span class="material-icons text-secondary">support_agent</span> 
                      <span>Soporte Técnico Especializado</span>
                   </div>
              </div>
          </div>

          <!-- Footer Izquierdo -->
          <div class="absolute bottom-8 left-12 text-xs text-blue-200/60 font-medium">
              &copy; 2026 Servicios El Loa SpA.
          </div>
      </div>

      <!-- Lado Derecho: Formulario de Login -->
      <div class="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 lg:p-20 bg-white relative">
          <!-- Botón Volver Absoluto -->
          <a href="index.html" class="absolute top-6 right-6 lg:top-10 lg:right-10 text-gray-400 hover:text-primary transition flex items-center gap-2 text-sm font-medium group">
              <span class="group-hover:-translate-x-1 transition-transform duration-200">Volver al inicio</span> 
              <span class="material-icons text-lg">arrow_forward</span>
          </a>

          <div class="w-full max-w-md">
            
              <!-- Cabecera Mobile (Logo) -->
              <div class="lg:hidden flex justify-center mb-8">
                  <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-md">EL</div>
              </div>

              <!-- Título Formulario -->
              <div class="text-center lg:text-left mb-10">
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de nuevo!</h1>
                  <p class="text-gray-500">Ingresa tus credenciales para acceder a tu panel.</p>
              </div>

              <form id="loginForm" class="space-y-6">
                
                  <!-- Input Email -->
                  <div>
                      <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                      <div class="relative group">
                          <span class="material-icons absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors text-xl">email</span>
                          <input type="email" id="email" name="email" 
                                 placeholder="nombre@empresa.com" 
                                 class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200" 
                                 required>
                      </div>
                  </div>

                  <!-- Input Password -->
                  <div>
                      <div class="flex justify-between items-center mb-2">
                          <label for="password" class="block text-sm font-semibold text-gray-700">Contraseña</label>
                          <a href="recover-password.html" class="text-xs font-semibold text-primary hover:text-secondary transition">¿Olvidaste tu contraseña?</a>
                      </div>
                      <div class="relative group">
                          <span class="material-icons absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors text-xl">lock</span>
                          <input type="password" id="password" name="password" 
                                 placeholder="••••••••" 
                                 class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-200" 
                                 required>
                      </div>
                  </div>

                   <button type="submit" class="w-full bg-primary hover:bg-[#002244] text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2">
                      <span>Iniciar Sesión</span>
                      <span class="material-icons text-sm">login</span>
                  </button>

              </form>

              <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p class="text-sm text-gray-500">
                      ¿Aún no tienes una cuenta? 
                      <a href="register.html" class="font-bold text-secondary hover:text-orange-700 transition">Regístrate aquí</a>
                  </p>
              </div>

          </div>
      </div>

      <script>
          // Manejar el envío del formulario de login
          document.getElementById('loginForm').addEventListener('submit', function(event) {
              event.preventDefault();
            
              // Obtener los valores del formulario
              const email = document.getElementById('email').value;
              const password = document.getElementById('password').value;
            
              // Validar que todos los campos estén completos
              if (!email || !password) {
                  alert('Por favor completa todos los campos');
                  return;
              }
            
              // Guardar el rol del usuario en localStorage (siempre admin)
              localStorage.setItem('userRole', 'admin');
              localStorage.setItem('userEmail', email);
              localStorage.setItem('loginTime', new Date().toISOString());
            
              // Redirigir directamente al AdminDashboard
              alert('¡Bienvenido! Redirigiendo al dashboard...');
              if (window.__redirect) {
                  window.__redirect('/admindashboard');
              } else {
                  window.location.href = '/admindashboard';
              }
          });
      </script>
  </body>
  </html>`,

    'register.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registro | Servicios El Loa</title>
    
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
  <body class="bg-gray-50 font-sans min-h-screen flex text-gray-800 selection:bg-secondary selection:text-white">

      <!-- Lado Izquierdo: Branding (Visible en pantallas grandes) -->
      <div class="hidden lg:flex w-full lg:w-5/12 bg-[#001a33] relative justify-center items-center overflow-hidden">
          <!-- Imagen de fondo -->
          <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop" 
               alt="Ruta del Desierto" 
               class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay">
        
          <!-- Gradiente Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/95 to-blue-900/90 mix-blend-multiply"></div>

          <!-- Contenido Branding -->
          <div class="relative z-10 p-12 text-white max-w-lg">
              <div class="mb-8 flex items-center gap-3">
                   <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-2xl shadow-lg">EL</div>
                   <span class="text-3xl font-bold tracking-wide">Servicios El Loa</span>
              </div>
            
              <h2 class="text-3xl font-bold mb-6 leading-tight text-white">Únete a nuestra red de transporte de primer nivel.</h2>
              <p class="text-blue-100 text-lg leading-relaxed mb-8">
                  Registra tu cuenta para gestionar solicitudes de transporte, consultar estados de flota y acceder a reportes detallados.
              </p>
            
              <ul class="space-y-4 text-blue-100/90">
                   <li class="flex items-center gap-3">
                      <span class="material-icons text-secondary">check_circle</span>
                      <span>Acceso a monitoreo en tiempo real</span>
                   </li>
                   <li class="flex items-center gap-3">
                      <span class="material-icons text-secondary">check_circle</span>
                      <span>Gestión centralizada de facturación</span>
                   </li>
                   <li class="flex items-center gap-3">
                      <span class="material-icons text-secondary">check_circle</span>
                      <span>Soporte dedicado para empresas</span>
                   </li>
              </ul>
          </div>

          <!-- Footer Izquierdo -->
          <div class="absolute bottom-8 left-12 text-xs text-blue-200/60 font-medium">
              &copy; 2026 Servicios El Loa SpA.
          </div>
      </div>

      <!-- Lado Derecho: Formulario de Registro -->
      <div class="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 lg:p-12 bg-white relative overflow-y-auto h-screen">
          <!-- Botón Volver Absoluto -->
          <a onclick="__redirect('/')" class="absolute top-6 right-6 lg:top-10 lg:right-10 text-gray-400 hover:text-primary transition flex items-center gap-2 text-sm font-medium group z-20 cursor-pointer">
              <span class="group-hover:-translate-x-1 transition-transform duration-200">Volver al inicio</span> 
              <span class="material-icons text-lg">arrow_forward</span>
          </a>

          <div class="w-full max-w-lg my-auto">
            
              <!-- Cabecera Mobile (Logo) -->
              <div class="lg:hidden flex justify-center mb-6">
                  <div class="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md">EL</div>
              </div>

              <!-- Título Formulario -->
              <div class="text-center lg:text-left mb-8">
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
                  <p class="text-gray-500">Completa tus datos para comenzar.</p>
              </div>

              <form id="registerForm" class="space-y-5">

                  <!-- Grid de Inputs -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                      <!-- Nombre -->
                      <div class="md:col-span-2">
                          <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo / Razón Social</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">person</span>
                              <input type="text" name="fullname" placeholder="Ej: Juan Pérez o Empresa Ltda." class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>

                      <!-- RUT -->
                      <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-1">RUT</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">badge</span>
                              <input type="text" name="rut" placeholder="Ej: 12.345.678-9" class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>

                      <!-- Teléfono -->
                      <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">phone</span>
                              <input type="tel" name="phone" placeholder="+56 9 ..." class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>

                      <!-- Email -->
                      <div class="md:col-span-2">
                          <label class="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">email</span>
                              <input type="email" name="email" placeholder="nombre@ejemplo.com" class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>

                      <!-- Dirección -->
                      <div class="md:col-span-2">
                           <label class="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">location_on</span>
                              <input type="text" name="address" placeholder="Ej: Av. Granaderos 1234, Calama" class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>

                      <!-- Passwords -->
                      <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">lock</span>
                              <input type="password" name="password" placeholder="••••••••" class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>
                      <div>
                          <label class="block text-sm font-semibold text-gray-700 mb-1">Confirmar</label>
                          <div class="relative group">
                              <span class="material-icons absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors text-lg">lock_outline</span>
                              <input type="password" name="confirmPassword" placeholder="••••••••" class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                          </div>
                      </div>
                  </div>

                  <!-- Términos -->
                  <div class="flex items-start mt-4">
                      <div class="flex items-center h-5">
                          <input id="terms" name="terms" type="checkbox" class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                      </div>
                      <div class="ml-3 text-sm">
                          <label for="terms" class="font-medium text-gray-700">Acepto los <a onclick="__redirect('terms.html')" class="text-primary hover:text-secondary font-bold hover:underline cursor-pointer">términos y condiciones</a></label>
                      </div>
                  </div>

                  <!-- Botón -->
                  <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 mt-6">
                      Crear mi cuenta
                  </button>
              </form>

               <div class="mt-8 text-center text-sm text-gray-500">
                  <p>¿Ya tienes una cuenta? <a onclick="__redirect('login.html')" class="font-bold text-primary hover:text-secondary transition cursor-pointer">Inicia sesión aquí</a></p>
              </div>

          </div>
      </div>

      <script>
          // Manejar el envío del formulario de registro
          document.getElementById('registerForm').addEventListener('submit', function(event) {
              event.preventDefault();
            
              // Obtener los valores del formulario
              const fullname = document.querySelector('input[name="fullname"]').value;
              const email = document.querySelector('input[name="email"]').value;
              const password = document.querySelector('input[name="password"]').value;
              const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
              const terms = document.getElementById('terms').checked;
            
              // Validar que todos los campos estén completos
              if (!fullname || !email || !password || !confirmPassword) {
                  alert('Por favor completa todos los campos obligatorios');
                  return;
              }
            
              // Validar que las contraseñas coincidan
              if (password !== confirmPassword) {
                  alert('Las contraseñas no coinciden');
                  return;
              }
            
              // Validar términos y condiciones
              if (!terms) {
                  alert('Debes aceptar los términos y condiciones');
                  return;
              }
            
              // Simular registro exitoso
              localStorage.setItem('userRole', 'cliente'); // Por defecto cliente
              localStorage.setItem('userEmail', email);
              localStorage.setItem('loginTime', new Date().toISOString());
            
              // Mostrar mensaje de éxito y redirigir
              alert('¡Cuenta creada exitosamente! Redirigiendo al login...');
              if (window.__redirect) {
                  window.__redirect('login.html');
              } else {
                  window.location.href = 'login.html';
              }
          });
      </script>
  </body>
  </html>`,

    'companies.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Clientes | Servicios de Transporte El Loa</title>
    
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
                    <a onclick="__redirect('/')" class="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                        <span class="material-icons text-secondary">local_shipping</span> EL LOA
                    </a>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a id="dashboardLink" onclick="__redirect('/AdminDashboard')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Dashboard</a>
                            <a onclick="__redirect('service-request.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Solicitudes</a>
                            
                            <a onclick="__redirect('users.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">
                                Usuarios
                            </a>
                            
                            <a onclick="__redirect('companies.html')" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1 cursor-pointer">Clientes</a>
                            <a onclick="__redirect('vehicles.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Flota</a>
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
                        <a onclick="__redirect('logout.html')" class="ml-2 text-sm font-semibold hover:text-gray-300 cursor-pointer">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Breadcrumb & Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div class="flex-1 min-w-0">
                <nav class="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li><a onclick="__redirect('/')" class="hover:text-primary transition cursor-pointer">Inicio</a></li>
                        <li><span class="text-gray-400">/</span></li>
                        <li class="text-gray-800 font-medium">Gestión de Clientes</li>
                    </ol>
                </nav>
                <h2 class="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate flex items-center gap-2">
                    <span class="material-icons">business</span> Clientes Corporativos
                </h2>
                <p class="mt-1 text-sm text-gray-500">Gestión de empresas mineras, contratos y centros de costo.</p>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
                <a onclick="__redirect('company-edit.html')" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition shadow-md cursor-pointer">
                    <span class="material-icons mr-2 text-sm">add_business</span>
                    Nueva Empresa
                </a>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Empresas Activas</dt>
                        <dd class="mt-1 text-3xl font-bold text-gray-900">8</dd>
                    </div>
                     <div class="bg-blue-50 p-2 rounded-full text-primary">
                        <span class="material-icons">business</span>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Contratos x Vencer</dt>
                        <dd class="mt-1 text-3xl font-bold text-orange-600">2</dd>
                    </div>
                     <div class="bg-orange-50 p-2 rounded-full text-orange-600">
                        <span class="material-icons">warning</span>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                 <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Viajes del Mes</dt>
                        <dd class="mt-1 text-3xl font-bold text-blue-600">142</dd>
                    </div>
                     <div class="bg-blue-50 p-2 rounded-full text-blue-600">
                        <span class="material-icons">commute</span>
                    </div>
                </div>
            </div>

             <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Facturación</dt>
                        <dd class="mt-1 text-3xl font-bold text-green-600">OK</dd>
                    </div>
                     <div class="bg-green-50 p-2 rounded-full text-green-600">
                        <span class="material-icons">receipt_long</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters & Actions -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div class="relative w-full sm:w-96">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="material-icons text-gray-400">search</span>
                </div>
                <input type="text" class="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 transition" placeholder="Buscar por RUT o Razón Social...">
            </div>
            <div class="flex gap-2 w-full sm:w-auto">
                <select class="focus:ring-primary focus:border-primary block w-full sm:w-auto sm:text-sm border-gray-300 rounded-lg p-2.5 bg-white cursor-pointer hover:border-blue-400 transition">
                    <option value="">Estado: Todos</option>
                    <option value="activo">Activos</option>
                    <option value="inactivo">Inactivos</option>
                </select>
                <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition">
                    <span class="material-icons text-gray-500 text-sm mr-2">file_download</span> Exportar
                </button>
            </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Empresa / RUT
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Centro de Costo
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Contacto
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                    ME
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">Minera Escondida Ltda.</div>
                                    <div class="text-sm text-gray-500">76.123.456-K</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-medium">CC-2025-OPS</div>
                            <div class="text-xs text-gray-500">Operaciones Mina</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div class="text-sm text-gray-900">Roberto Díaz</div>
                            <div class="text-xs text-gray-500">rdiaz@escondida.cl</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                                Activo
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a onclick="__redirect('company-detail.html')" class="text-primary hover:text-blue-900 mr-3 cursor-pointer">Editar</a>
                            <a onclick="__redirect('company-detail.html')" class="text-gray-400 hover:text-gray-600 cursor-pointer"><span class="material-icons text-sm">more_vert</span></a>
                        </td>
                    </tr>

                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-secondary font-bold">
                                    CO
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">Codelco División Norte</div>
                                    <div class="text-sm text-gray-500">90.111.222-3</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-medium">CC-EXT-GABY</div>
                            <div class="text-xs text-gray-500">Extracción Gaby</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div class="text-sm text-gray-900">Ana María Silva</div>
                            <div class="text-xs text-gray-500">asilva@codelco.cl</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                                Activo
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a onclick="__redirect('company-detail.html')" class="text-primary hover:text-blue-900 mr-3 cursor-pointer">Editar</a>
                            <a onclick="__redirect('company-detail.html')" class="text-gray-400 hover:text-gray-600 cursor-pointer"><span class="material-icons text-sm">more_vert</span></a>
                        </td>
                    </tr>

                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                    SQ
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">SQM Salar</div>
                                    <div class="text-sm text-gray-500">88.999.000-1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-medium">CC-LITIO-01</div>
                            <div class="text-xs text-gray-500">Planta Litio</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div class="text-sm text-gray-900">Juan Torres</div>
                            <div class="text-xs text-gray-500">jtorres@sqm.com</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                                Suspendido
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a onclick="__redirect('company-detail.html')" class="text-primary hover:text-blue-900 mr-3 cursor-pointer">Editar</a>
                            <a onclick="__redirect('company-detail.html')" class="text-gray-400 hover:text-gray-600 cursor-pointer"><span class="material-icons text-sm">more_vert</span></a>
                        </td>
                    </tr>

                </tbody>
            </table>
            
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Mostrando <span class="font-medium">1</span> a <span class="font-medium">3</span> de <span class="font-medium">8</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a onclick="__redirect('companies.html')" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                <span class="material-icons text-sm">chevron_left</span>
                            </a>
                            <a onclick="__redirect('companies.html')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer">
                                1
                            </a>
                            <a onclick="__redirect('companies-page-2.html')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                2
                            </a>
                            <a onclick="__redirect('companies-page-2.html')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                3
                            </a>
                            <a onclick="__redirect('companies-page-2.html')" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                <span class="material-icons text-sm">chevron_right</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    </main>
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
                        <li><a onclick="__redirect('/')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                        <li><a onclick="__redirect('service-request.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                        <li><a onclick="__redirect('companies.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                        <li><a onclick="__redirect('portal-choferes.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                        <li><a onclick="__redirect('contacto.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                        <li><a onclick="__redirect('trabaja-nosotros.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</a></li>
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
                    <a onclick="__redirect('terms.html')" class="hover:text-white transition cursor-pointer">Términos y Condiciones</a>
                    <a onclick="__redirect('privacy.html')" class="hover:text-white transition cursor-pointer">Política de Privacidad</a>
                    <a onclick="__redirect('complaints.html')" class="hover:text-white transition cursor-pointer">Portal de Denuncias</a>
                </div>
            </div>
        </div>
    </footer>
    
    <script>
        // Redirección dinámica al Dashboard según el rol del usuario
        function redirectToDashboard(event) {
            event.preventDefault();
            
            // Obtener el rol del usuario del localStorage o sessionStorage
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || 'cliente';
            
            let dashboardUrl = 'dashboard.html'; // URL por defecto
            
            switch(userRole.toLowerCase()) {
                case 'admin':
                case 'administrador':
                    dashboardUrl = '/AdminDashboard';
                    break;
                case 'cliente':
                    dashboardUrl = 'dashboard-cli.html';
                    break;
                case 'chofer':
                    dashboardUrl = 'dashboard-chof.html';
                    break;
                default:
                    dashboardUrl = 'dashboard.html';
            }
            
            // Redirigir a la URL correspondiente
            if (window.__redirect) {
                window.__redirect(dashboardUrl);
            } else {
                window.location.href = dashboardUrl;
            }
        }
    </script>
  </body>
  </html>`,

    'recover-password.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Recuperar Contraseña | Servicios El Loa</title>
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
  <body class="bg-gray-900 font-sans flex items-center justify-center min-h-screen relative overflow-hidden">

      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
               alt="Road Background" 
               class="w-full h-full object-cover opacity-30">
          <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-black/60"></div>
      </div>

      <!-- Card Container -->
      <div class="relative z-10 w-full max-w-md px-4">
        
          <!-- Logo -->
          <div class="flex justify-center mb-8">
              <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-3xl shadow-2xl ring-4 ring-white/10">EL</div>
          </div>

          <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
              <!-- Decorative Pattern -->
              <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

              <div class="text-center mb-8">
                  <h1 class="text-2xl font-bold text-gray-900 mb-2">Recuperar Acceso</h1>
                  <p class="text-gray-500 text-sm leading-relaxed">
                      Ingresa tu correo electrónico registrado y te enviaremos instrucciones para restablecer tu contraseña.
                  </p>
              </div>
            
              <form class="space-y-6">
                  <div>
                      <label class="block text-xs font-bold text-gray-500 uppercase mb-2 pl-1">Correo Electrónico</label>
                      <div class="relative group">
                          <span class="material-icons absolute left-3 top-3.5 text-gray-400 group-focus-within:text-secondary transition-colors text-xl">email</span>
                          <input type="email" 
                                 placeholder="nombre@empresa.com" 
                                 class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all duration-200 shadow-sm"
                                 required>
                      </div>
                  </div>

                  <button class="w-full bg-primary hover:bg-blue-900 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                      <span>Enviar Enlace de Recuperación</span>
                      <span class="material-icons text-sm">send</span>
                  </button>
              </form>
            
              <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                  <a href="login.html" class="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-primary transition-colors group">
                      <span class="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                      Volver al Inicio de Sesión
                  </a>
              </div>
          </div>

          <div class="text-center mt-8 text-white/40 text-xs">
              &copy; 2026 Servicios El Loa SpA. Todos los derechos reservados.
          </div>
      </div>

  </body>
  </html>`,

    'users.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Gestión de Usuarios | Servicios de Transporte El Loa</title>

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
                      <a onclick="__redirect('/')" class="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                          <span class="material-icons text-secondary">local_shipping</span> EL LOA
                      </a>
                      <div class="hidden md:block">
                          <div class="ml-10 flex items-baseline space-x-4">
                              <a onclick="__redirect('/dashboard/admin')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Dashboard</a>
                              <a onclick="__redirect('/service-request')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Solicitudes</a>

                              <a onclick="__redirect('/users')" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1 cursor-pointer">
                                  Usuarios
                              </a>

                              <a onclick="__redirect('/companies')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Clientes</a>
                              <a onclick="__redirect('/vehicles')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Flota</a>
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
                          <a onclick="__redirect('/logout')" class="ml-2 text-sm font-semibold hover:text-gray-300 cursor-pointer">Salir</a>
                      </div>
                  </div>
              </div>
          </div>
      </nav>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="mb-4">
              <button onclick="__redirect(-1)" class="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors cursor-pointer">
                  <span class="material-icons text-sm">arrow_back</span>
                  Volver
              </button>
          </div>

          <!-- Header -->
          <div class="md:flex md:items-center md:justify-between mb-8">
              <div class="flex-1 min-w-0">
                  <h2 class="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate">
                      Usuarios del Sistema
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">
                      Administra accesos, roles y perfiles de conductores y clientes.
                  </p>
              </div>
              <div class="mt-4 flex md:mt-0 md:ml-4">
                  <button data-navigate="/register" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none transition cursor-pointer">
                      <span class="material-icons text-sm mr-2">person_add</span>
                      Nuevo Usuario
                  </button>
              </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
              <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-primary">
                  <div class="px-4 py-5 sm:p-6 flex items-center">
                      <div class="p-3 rounded-full bg-blue-50 text-primary mr-4">
                          <span class="material-icons">group</span>
                      </div>
                      <div>
                          <p class="text-sm font-medium text-gray-500 truncate">
                              Total Usuarios
                          </p>
                          <p class="text-2xl font-bold text-gray-900">
                              24
                          </p>
                      </div>
                  </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-secondary">
                  <div class="px-4 py-5 sm:p-6 flex items-center">
                      <div class="p-3 rounded-full bg-orange-50 text-secondary mr-4">
                          <span class="material-icons">local_shipping</span>
                      </div>
                      <div>
                          <p class="text-sm font-medium text-gray-500 truncate">
                              Choferes Activos
                          </p>
                          <p class="text-2xl font-bold text-gray-900">
                              18
                          </p>
                      </div>
                  </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
                  <div class="px-4 py-5 sm:p-6 flex items-center">
                      <div class="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                          <span class="material-icons">business</span>
                      </div>
                      <div>
                          <p class="text-sm font-medium text-gray-500 truncate">
                              Clientes Activos
                          </p>
                          <p class="text-2xl font-bold text-gray-900">
                              6
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Search and Filters -->
          <div class="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div class="relative w-full md:w-1/3">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="material-icons text-gray-400">search</span>
                  </div>
                  <input type="text" id="searchInput" placeholder="Buscar por nombre o email..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" />
              </div>

              <div class="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  <select id="roleFilter" class="block pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border">
                      <option value="">Rol: Todos</option>
                      <option value="ADMIN">Administrador</option>
                      <option value="CHOFER">Chofer</option>
                      <option value="CLIENTE">Cliente</option>
                  </select>

                  <button class="inline-flex items-center px-4 py-2 border border-green-300 shadow-sm text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 transition cursor-pointer">
                      <span class="material-icons text-sm mr-2">fact_check</span>
                      Choferes Disponibles
                  </button>
              </div>
          </div>

          <!-- Users Table -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                      <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Usuario
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rol
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                              Último Acceso
                          </th>
                          <th class="relative px-6 py-3">
                              <span class="sr-only">Acciones</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                      <tr class="hover:bg-gray-50 transition">
                          <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                  <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                                      JP
                                  </div>
                                  <div class="ml-4">
                                      <div class="text-sm font-medium text-gray-900">
                                          Juan Pérez
                                      </div>
                                      <div class="text-sm text-gray-500">
                                          juan.perez@elloa.cl
                                      </div>
                                  </div>
                              </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Administrador
                              </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Activo
                              </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                              Hace 2 horas
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onclick="__redirect('/user/1')" class="text-primary hover:text-secondary transition cursor-pointer">Ver</button>
                              <button onclick="__redirect('/user/1/edit')" class="ml-4 text-gray-500 hover:text-primary transition cursor-pointer">Editar</button>
                          </td>
                      </tr>

                      <tr class="hover:bg-gray-50 transition">
                          <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                  <div class="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold border border-orange-200">
                                      CL
                                  </div>
                                  <div class="ml-4">
                                      <div class="text-sm font-medium text-gray-900">
                                          Carlos López
                                      </div>
                                      <div class="text-sm text-gray-500">
                                          carlos.lopez@elloa.cl
                                      </div>
                                  </div>
                              </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                  Chofer
                              </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Activo
                              </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                              Hace 1 día
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onclick="__redirect('/user/2')" class="text-primary hover:text-secondary transition cursor-pointer">Ver</button>
                              <button onclick="__redirect('/user/2/edit')" class="ml-4 text-gray-500 hover:text-primary transition cursor-pointer">Editar</button>
                          </td>
                      </tr>

                      <tr class="hover:bg-gray-50 transition">
                          <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                  <div class="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold border border-green-200">
                                      MS
                                  </div>
                                  <div class="ml-4">
                                      <div class="text-sm font-medium text-gray-900">
                                          María Silva
                                      </div>
                                      <div class="text-sm text-gray-500">
                                          maria.silva@empresa.cl
                                      </div>
                                  </div>
                              </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Cliente
                              </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Activo
                              </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                              Hace 3 días
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onclick="__redirect('/user/3')" class="text-primary hover:text-secondary transition cursor-pointer">Ver</button>
                              <button onclick="__redirect('/user/3/edit')" class="ml-4 text-gray-500 hover:text-primary transition cursor-pointer">Editar</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </main>

      <!-- Footer -->
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
                  </div>

                  <div>
                      <h3 class="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-blue-800 pb-2 inline-block">Navegación</h3>
                      <ul class="space-y-3 text-sm">
                          <li><a onclick="__redirect('/')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                          <li><a onclick="__redirect('/service-request')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                          <li><a onclick="__redirect('/companies')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                          <li><a onclick="__redirect('/dashboard/driver')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                          <li><a onclick="__redirect('/contact')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
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
                      <a onclick="__redirect('/terms')" class="hover:text-white transition cursor-pointer">Términos y Condiciones</a>
                      <a onclick="__redirect('/privacy')" class="hover:text-white transition cursor-pointer">Política de Privacidad</a>
                      <a onclick="__redirect('/complaints')" class="hover:text-white transition cursor-pointer">Portal de Denuncias</a>
                  </div>
              </div>
          </div>
      </footer>

      <script>
          // Redirect functions for navigation
          function redirectToDashboard(event) {
              event.preventDefault();
              const userRole = localStorage.getItem('userRole') || 'admin';
              let dashboardUrl = '/dashboard/admin';
              if (userRole === 'cliente') {
                  dashboardUrl = '/dashboard/client';
              } else if (userRole === 'chofer') {
                  dashboardUrl = '/dashboard/driver';
              }
              window.__redirect(dashboardUrl);
          }

          function showNewUserModal() {
              // Placeholder for new user modal
              alert('Funcionalidad de nuevo usuario próximamente');
          }

          // Search functionality
          document.getElementById('searchInput').addEventListener('input', function(e) {
              const searchTerm = e.target.value.toLowerCase();
              const rows = document.querySelectorAll('tbody tr');
              rows.forEach(row => {
                  const name = row.querySelector('.text-sm.font-medium').textContent.toLowerCase();
                  const email = row.querySelector('.text-sm.text-gray-500').textContent.toLowerCase();
                  if (name.includes(searchTerm) || email.includes(searchTerm)) {
                      row.style.display = '';
                  } else {
                      row.style.display = 'none';
                  }
              });
          });

          // Role filter functionality
          document.getElementById('roleFilter').addEventListener('change', function(e) {
              const roleFilter = e.target.value;
              const rows = document.querySelectorAll('tbody tr');
              rows.forEach(row => {
                  const roleSpan = row.querySelector('span.inline-flex');
                  const roleText = roleSpan.textContent.trim();
                  if (!roleFilter || roleText.includes(roleFilter === 'ADMIN' ? 'Administrador' : roleFilter === 'CHOFER' ? 'Chofer' : 'Cliente')) {
                      row.style.display = '';
                  } else {
                      row.style.display = 'none';
                  }
              });
          });
      </script>
  </body>
  </html>`,

    'trips.html': ` <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Mis Viajes (Chofer) | Servicios El Loa</title>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
                          success: '#10B981',
                          danger: '#EF4444',
                      },
                      fontFamily: {
                          sans: ['Inter', 'sans-serif'],
                      }
                  }
              }
          }
      </script>
      <style>
          /* Evitar rebote en iOS */
          body { overscroll-behavior-y: none; }
      </style>
      <link rel="stylesheet" href="assets/css/custom.css" />
      <script src="assets/js/auth-helper.js"></script>
  </head>
  <body class="bg-gray-100 font-sans text-gray-800 pb-24 md:pb-0">
      <script>
          // Proteger esta página - redirigir al login si no está autenticado
          protectPage();
      </script>`,

    'terms.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Términos y Condiciones | El Loa</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/custom.css">
  </head>
  <body class="bg-gray-50 font-sans text-gray-800">`,

    'client-portal.html': `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Portal Cliente | El Loa</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/custom.css">
  </head>
  <body class="bg-gray-50 font-sans text-gray-800">`,

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
                    <a onclick="__redirect('/')" class="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                        <span class="material-icons text-secondary">local_shipping</span> EL LOA
                    </a>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a id="dashboardLink" onclick="__redirect('/AdminDashboard')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Dashboard</a>
                            <a onclick="__redirect('service-request.html')" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1 cursor-pointer">Solicitudes</a>
                            
                            <a onclick="__redirect('trips.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Viajes</a>
                            <a onclick="__redirect('companies.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Clientes</a>
                            <a onclick="__redirect('users.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Usuarios</a>
                            <a onclick="__redirect('vehicles.html')" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">Flota</a>
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
                        <a onclick="__redirect('logout.html')" class="ml-2 text-sm font-semibold hover:text-gray-300 cursor-pointer">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Breadcrumb & Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div class="flex-1 min-w-0">
                <nav class="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li><a onclick="__redirect('/')" class="hover:text-primary transition cursor-pointer">Inicio</a></li>
                        <li><span class="text-gray-400">/</span></li>
                        <li class="text-gray-800 font-medium">Solicitudes de Servicio</li>
                    </ol>
                </nav>
                <h2 class="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate flex items-center gap-2">
                    <span class="material-icons">assignment</span> Solicitudes de Servicio
                </h2>
                <p class="mt-1 text-sm text-gray-500">Gestión de solicitudes de transporte y reservas.</p>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
                <a onclick="__redirect('service-request-create.html')" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition shadow-md cursor-pointer">
                    <span class="material-icons mr-2 text-sm">add</span>
                    Nueva Solicitud
                </a>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Solicitudes Hoy</dt>
                        <dd class="mt-1 text-3xl font-bold text-gray-900">12</dd>
                    </div>
                     <div class="bg-blue-50 p-2 rounded-full text-primary">
                        <span class="material-icons">assignment</span>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Pendientes</dt>
                        <dd class="mt-1 text-3xl font-bold text-orange-600">5</dd>
                    </div>
                     <div class="bg-orange-50 p-2 rounded-full text-orange-600">
                        <span class="material-icons">schedule</span>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                 <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Aprobadas</dt>
                        <dd class="mt-1 text-3xl font-bold text-green-600">7</dd>
                    </div>
                     <div class="bg-green-50 p-2 rounded-full text-green-600">
                        <span class="material-icons">check_circle</span>
                    </div>
                </div>
            </div>

             <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Rechazadas</dt>
                        <dd class="mt-1 text-3xl font-bold text-red-600">2</dd>
                    </div>
                     <div class="bg-red-50 p-2 rounded-full text-red-600">
                        <span class="material-icons">cancel</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters & Actions -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div class="relative w-full sm:w-96">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="material-icons text-gray-400">search</span>
                </div>
                <input type="text" class="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 transition" placeholder="Buscar por ID, cliente o destino...">
            </div>
            <div class="flex gap-2 w-full sm:w-auto">
                <select class="focus:ring-primary focus:border-primary block w-full sm:w-auto sm:text-sm border-gray-300 rounded-lg p-2.5 bg-white cursor-pointer hover:border-blue-400 transition">
                    <option value="">Estado: Todos</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobada">Aprobada</option>
                    <option value="rechazada">Rechazada</option>
                    <option value="completada">Completada</option>
                </select>
                <select class="focus:ring-primary focus:border-primary block w-full sm:w-auto sm:text-sm border-gray-300 rounded-lg p-2.5 bg-white cursor-pointer hover:border-blue-400 transition">
                    <option value="">Tipo: Todos</option>
                    <option value="personal">Personal</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="turismo">Turismo</option>
                </select>
                <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition">
                    <span class="material-icons text-gray-500 text-sm mr-2">file_download</span> Exportar
                </button>
            </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Solicitud
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Ruta
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                    SR
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">#SR-2026-001</div>
                                    <div class="text-sm text-gray-500">20/01/2026 09:30</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-medium">Minera Escondida Ltda.</div>
                            <div class="text-xs text-gray-500">Roberto Díaz</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div class="text-sm text-gray-900">Aeropuerto → Faena Atacama</div>
                            <div class="text-xs text-gray-500">4 pasajeros</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                                Corporativo
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                Pendiente
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a onclick="__redirect('service-request.html')" class="text-primary hover:text-blue-900 mr-3 cursor-pointer">Ver</a>
                            <a onclick="__redirect('service-request.html')" class="text-green-600 hover:text-green-900 mr-3 cursor-pointer">Aprobar</a>
                            <a onclick="__redirect('service-request.html')" class="text-red-600 hover:text-red-900 cursor-pointer">Rechazar</a>
                        </td>
                    </tr>

                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                    SR
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">#SR-2026-002</div>
                                    <div class="text-sm text-gray-500">19/01/2026 14:15</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-medium">Codelco División Norte</div>
                            <div class="text-xs text-gray-500">Ana María Silva</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div class="text-sm text-gray-900">Centro Calama → Mina Gaby</div>
                            <div class="text-xs text-gray-500">2 pasajeros</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                                Corporativo
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                                Aprobada
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a onclick="__redirect('service-request.html')" class="text-primary hover:text-blue-900 mr-3 cursor-pointer">Ver</a>
                            <a onclick="__redirect('trips.html')" class="text-blue-600 hover:text-blue-900 cursor-pointer">Asignar Viaje</a>
                        </td>
                    </tr>

                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-secondary font-bold">
                                    SR
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">#SR-2026-003</div>
                                    <div class="text-sm text-gray-500">18/01/2026 11:45</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-medium">Juan Pérez</div>
                            <div class="text-xs text-gray-500">juan@email.com</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div class="text-sm text-gray-900">Hotel → Aeropuerto</div>
                            <div class="text-xs text-gray-500">1 pasajero</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                Personal
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                                Rechazada
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a onclick="__redirect('service-request.html')" class="text-primary hover:text-blue-900 cursor-pointer">Ver</a>
                        </td>
                    </tr>

                </tbody>
            </table>
            
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Mostrando <span class="font-medium">1</span> a <span class="font-medium">3</span> de <span class="font-medium">12</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a onclick="__redirect('service-request.html')" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                <span class="material-icons text-sm">chevron_left</span>
                            </a>
                            <a onclick="__redirect('service-request.html')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer">
                                1
                            </a>
                            <a onclick="__redirect('service-request.html')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                2
                            </a>
                            <a onclick="__redirect('service-request.html')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                3
                            </a>
                            <a onclick="__redirect('service-request.html')" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                <span class="material-icons text-sm">chevron_right</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    </main>
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
                        <li><a onclick="__redirect('/')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                        <li><a onclick="__redirect('service-request.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                        <li><a onclick="__redirect('companies.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                        <li><a onclick="__redirect('portal-choferes.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                        <li><a onclick="__redirect('contacto.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                        <li><a onclick="__redirect('trabaja-nosotros.html')" class="hover:text-secondary transition flex items-center gap-2 cursor-pointer"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</a></li>
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
                    <a onclick="__redirect('terms.html')" class="hover:text-white transition cursor-pointer">Términos y Condiciones</a>
                    <a onclick="__redirect('privacy.html')" class="hover:text-white transition cursor-pointer">Política de Privacidad</a>
                    <a onclick="__redirect('complaints.html')" class="hover:text-white transition cursor-pointer">Portal de Denuncias</a>
                </div>
            </div>
        </div>
    </footer>
    
    <script>
        // Redirección dinámica al Dashboard según el rol del usuario
        function redirectToDashboard(event) {
            event.preventDefault();
            
            // Obtener el rol del usuario del localStorage o sessionStorage
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || 'cliente';
            
            let dashboardUrl = 'dashboard.html'; // URL por defecto
            
            switch(userRole.toLowerCase()) {
                case 'admin':
                case 'administrador':
                    dashboardUrl = '/AdminDashboard';
                    break;
                case 'cliente':
                    dashboardUrl = 'dashboard-cli.html';
                    break;
                case 'chofer':
                    dashboardUrl = 'dashboard-chof.html';
                    break;
                default:
                    dashboardUrl = 'dashboard.html';
            }
            
            // Redirigir a la URL correspondiente
            if (window.__redirect) {
                window.__redirect(dashboardUrl);
            } else {
                window.location.href = dashboardUrl;
            }
        }
    </script>
  </body>
  </html>`,

  'company-edit.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Editar Empresa | El Loa</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }</script>
  <link rel="stylesheet" href="assets/css/tailwind.css" />
  <link rel="stylesheet" href="assets/css/custom.css" />    <script src="assets/js/auth-helper.js"></script></head>
<body class="bg-surface font-sans text-gray-800">
    <script>
        // Proteger esta página - redirigir al login si no está autenticado
        // protectPage();
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
                            <a href="index.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                            <a href="service-request.html" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</a>
                            
                            <a href="users.html" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">
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

    <main class="flex-grow flex flex-col lg:flex-row w-full min-h-[calc(100vh-4rem)]">
        
        <!-- Decorative Image Section (Left) -->
        <div class="relative lg:w-5/12 hidden lg:block">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Office Placeholder" class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
            <div class="absolute bottom-0 left-0 p-12 text-white">
                <blockquote class="border-l-4 border-secondary pl-4 mb-4">
                     <p class="text-xl font-medium italic">"Gestión eficiente para relaciones duraderas."</p>
                </blockquote>
                <h2 class="text-3xl font-bold">Servicios Corporativos</h2>
                <p class="text-blue-200 mt-2">Administración centralizada de clientes y convenios.</p>
            </div>
        </div>

        <!-- Form Section (Right) -->
        <div class="flex-1 flex flex-col justify-center p-6 md:p-12 bg-gray-50 overflow-y-auto">
            <div class="max-w-2xl w-full mx-auto">
                
                <!-- Breadcrumb -->
                <nav class="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li><a href="index.html" class="hover:text-primary transition">Inicio</a></li>
                        <li><span class="text-gray-400">/</span></li>
                        <li><a href="companies.html" class="hover:text-primary transition">Clientes</a></li>
                        <li><span class="text-gray-400">/</span></li>
                        <li class="text-gray-800 font-medium">Editar Empresa</li>
                    </ol>
                </nav>

                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Editar Empresa</h1>
                    <p class="text-gray-600">Actualice la información comercial y puntos de contacto.</p>
                </div>

                <form class="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    
                    <!-- Section: Datos Empresa -->
                    <div class="space-y-6">
                        <div class="border-b border-gray-100 pb-2">
                            <h2 class="text-lg font-bold text-primary flex items-center gap-2">
                                <span class="material-icons text-secondary text-base">domain</span> Información Corporativa
                            </h2>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Razón Social</label>
                                <input type="text" value="Minera Escondida Ltda." class="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition font-medium">
                            </div>
                             <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                                <input type="text" value="76.123.456-K" class="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition bg-gray-50 text-gray-500 cursor-not-allowed" readonly>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Rubro</label>
                                <select class="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition bg-white">
                                    <option selected>Minería</option>
                                    <option>Transporte</option>
                                    <option>Industrial</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Section: Contacto -->
                    <div class="space-y-6">
                        <div class="border-b border-gray-100 pb-2">
                            <h2 class="text-lg font-bold text-primary flex items-center gap-2">
                                <span class="material-icons text-secondary text-base">contacts</span> Contacto & Ubicación
                            </h2>
                        </div>

                         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Contacto</label>
                                <div class="relative">
                                    <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">person</span>
                                    <input type="text" value="Roberto Díaz" class="pl-9 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <div class="relative">
                                    <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">phone</span>
                                    <input type="tel" value="+56 55 212 3456" class="pl-9 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition">
                                </div>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
                                <div class="relative">
                                    <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">email</span>
                                    <input type="email" value="rdiaz@escondida.cl" class="pl-9 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition">
                                </div>
                            </div>
                            
                            <div class="md:col-span-2 grid grid-cols-3 gap-4">
                                <div class="col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                    <input type="text" value="Av. La Minería 500" class="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition">
                                </div>
                                 <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                    <input type="text" value="Antofagasta" class="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary outline-none transition">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center justify-between pt-6 border-t border-gray-100">
                        <button type="button" class="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                            <span class="material-icons text-sm">delete</span> Eliminar
                        </button>
                        <div class="flex gap-3">
                            <a href="company-detail.html" data-navigate="/company-detail" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-white hover:text-primary transition font-medium bg-white">Cancelar</a>
                            <button type="submit" class="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-900 transition font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                <span class="material-icons text-sm">save</span> Guardar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>

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
                        <li><a href="index.html" data-navigate="/" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                        <li><a href="service-request.html" data-navigate="/service-request" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                        <li><a href="companies.html" data-navigate="/companies" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/portal-choferes" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                        <li><a href="contacto.html" data-navigate="/contact" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                        <li><a href="trabaja-nosotros.html" data-navigate="/work-with-us" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotros</a></li>
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
                    <a href="terms.html" data-navigate="/terms" class="hover:text-white transition">Términos y Condiciones</a>
                    <a href="privacy.html" data-navigate="/privacy" class="hover:text-white transition">Política de Privacidad</a>
                    <a href="complaints.html" data-navigate="/complaints" class="hover:text-white transition">Portal de Denuncias</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`,
  'vehicles.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>Gestión de Vehículos | Servicios de Transporte El Loa</title>

    <!-- Responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }
    </script>
    <link rel="stylesheet" href="assets/css/tailwind.css" />
    <link rel="stylesheet" href="assets/css/custom.css" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#003366',    /* Azul Corporativo */
                        secondary: '#FF6600',  /* Naranja Acción */
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
                    <a href="index.html" data-navigate="/" class="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                        <span class="material-icons text-secondary">local_shipping</span> EL LOA
                    </a>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a id="dashboardLink" href="#" onclick="redirectToDashboard(event)" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                            <a href="service-request.html" data-navigate="/service-request" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</a>
                            
                            <a href="users.html" data-navigate="/users" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                                Usuarios
                            </a>
                            
                            <a href="companies.html" data-navigate="/companies" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Clientes</a>
                            <a href="vehicles.html" data-navigate="/vehicles" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">Flota</a>
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
                        <a href="logout.html" data-navigate="/logout" class="ml-2 text-sm font-semibold hover:text-gray-300">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <!-- Breadcrumb & Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex-1 min-w-0">
                <nav class="flex text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li><a href="index.html" data-navigate="/" class="hover:text-primary transition">Inicio</a></li>
                        <li><span class="text-gray-400">/</span></li>
                        <li class="text-gray-800 font-medium">Gestión de Flota</li>
                    </ol>
                </nav>
                <h2 class="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate flex items-center gap-2">
                    <span class="material-icons">directions_bus</span> Flota de Vehículos
                </h2>
                <p class="mt-1 text-sm text-gray-500">Administra la flota, mantenciones y documentación.</p>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
                <a href="vehicle-add.html" data-navigate="/vehicle-add" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-md">
                    <span class="material-icons mr-2 text-sm">add</span>
                    Nuevo Vehículo
                </a>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Total Flota</dt>
                        <dd class="mt-1 text-3xl font-bold text-gray-900">12</dd>
                    </div>
                     <div class="bg-blue-50 p-2 rounded-full text-primary">
                        <span class="material-icons">local_shipping</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Disponibles</dt>
                        <dd class="mt-1 text-3xl font-bold text-green-600">8</dd>
                    </div>
                     <div class="bg-green-50 p-2 rounded-full text-green-600">
                        <span class="material-icons">check_circle</span>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                 <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">En Ruta</dt>
                        <dd class="mt-1 text-3xl font-bold text-blue-600">3</dd>
                    </div>
                     <div class="bg-blue-50 p-2 rounded-full text-blue-600">
                        <span class="material-icons">map</span>
                    </div>
                </div>
            </div>

             <div class="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition">
                <div class="p-5 flex items-center justify-between">
                     <div>
                        <dt class="text-sm font-medium text-gray-500 truncate uppercase tracking-wide">Taller / Mant.</dt>
                        <dd class="mt-1 text-3xl font-bold text-orange-600">1</dd>
                    </div>
                     <div class="bg-orange-50 p-2 rounded-full text-orange-600">
                        <span class="material-icons">build</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters & Actions -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="relative w-full sm:w-96">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="material-icons text-gray-400">search</span>
                </div>
                <input type="text" class="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 transition" placeholder="Buscar por patente, modelo...">
            </div>
            <div class="flex gap-2 w-full sm:w-auto">
                <select class="focus:ring-primary focus:border-primary block w-full sm:w-auto sm:text-sm border-gray-300 rounded-lg p-2.5 bg-white cursor-pointer hover:border-blue-400 transition">
                    <option value="">Estado: Todos</option>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="EN_RUTA">En Ruta</option>
                    <option value="MANTENCION">En Mantención</option>
                </select>
                <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition">
                    <span class="material-icons text-gray-500 text-sm mr-2">filter_list</span> Filtrar
                </button>
            </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patente / Año</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prox. Mantención</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    
                    <tr class="hover:bg-gray-50 transition duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-gray-500">directions_bus</span> </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">Mercedes-Benz Sprinter</div>
                                    <div class="text-xs text-gray-500">Van Ejecutiva (19 Pax)</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded inline-block border border-gray-300">LHYT-88</div>
                            <div class="text-xs text-gray-500 mt-1">Año 2024</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                                Disponible
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">15 Mar 2026</div>
                            <div class="text-xs text-green-600">Al día</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="vehicle-detail.html" data-navigate="/vehicle-detail" class="text-primary hover:text-blue-900 hover:underline flex items-center justify-end gap-1">Ver <span class="material-icons text-sm">arrow_forward</span></a>
                        </td>
                    </tr>

                    <tr class="hover:bg-gray-50 transition duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-gray-500">directions_car</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">Toyota Hilux 4x4</div>
                                    <div class="text-xs text-gray-500">Camioneta Minera</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded inline-block border border-gray-300">KJSD-22</div>
                            <div class="text-xs text-gray-500 mt-1">Año 2023</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                En Ruta
                            </span>
                            <div class="text-[10px] text-gray-500 mt-1">Chofer: Juan P.</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">20 Feb 2026</div>
                            <div class="text-xs text-green-600">Al día</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="vehicle-detail.html" data-navigate="/vehicle-detail" class="text-primary hover:text-blue-900 hover:underline flex items-center justify-end gap-1">Ver <span class="material-icons text-sm">arrow_forward</span></a>
                        </td>
                    </tr>

                    <tr class="bg-red-50 hover:bg-red-100 transition duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-white rounded-full flex items-center justify-center border border-red-200">
                                    <span class="material-icons text-danger">build</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-bold text-gray-900">Hyundai H1</div>
                                    <div class="text-xs text-gray-500">Van Pasajeros</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded inline-block border border-gray-300">BB-CL-99</div>
                            <div class="text-xs text-gray-500 mt-1">Año 2020</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                En Taller
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-danger font-bold">19 Ene 2026</div>
                            <div class="text-xs text-danger flex items-center gap-1">
                                <span class="material-icons text-[10px]">warning</span> Vencida hoy
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="vehicle-detail.html" data-navigate="/vehicle-detail" class="text-secondary hover:text-orange-900 mr-3 font-bold">Finalizar</a>
                            <a href="vehicle-edit.html" data-navigate="/vehicle-edit" class="text-gray-400 hover:text-gray-600"><span class="material-icons text-sm">edit</span></a>
                        </td>
                    </tr>

                </tbody>
            </table>
            
            <div class="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="flex-1 flex justify-between sm:hidden">
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Anterior
                    </a>
                    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Siguiente
                    </a>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Mostrando <span class="font-medium">1</span> a <span class="font-medium">3</span> de <span class="font-medium">12</span> vehículos
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span class="sr-only">Anterior</span>
                                <span class="material-icons text-sm">chevron_left</span>
                            </a>
                            <a href="#" aria-current="page" class="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                1
                            </a>
                            <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                2
                            </a>
                             <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                3
                            </a>
                            <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span class="sr-only">Siguiente</span>
                                <span class="material-icons text-sm">chevron_right</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </main>


    <div id="vehicleModal" class="fixed inset-0 z-50 hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onclick="toggleModal('vehicleModal')"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Registrar Nuevo Vehículo</h3>
                    <button onclick="toggleModal('vehicleModal')" class="text-gray-400 hover:text-gray-500"><span class="material-icons">close</span></button>
                </div>

                <form class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Patente</label>
                            <input type="text" placeholder="ABCD-12" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm uppercase">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Año</label>
                            <input type="number" placeholder="2024" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Marca y Modelo</label>
                        <input type="text" placeholder="Ej: Toyota Hilux 4x4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tipo</label>
                        <select class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                            <option>Van Pasajeros (Sprinter/H1)</option>
                            <option>Camioneta (Pickup)</option>
                            <option>SUV / Auto</option>
                            <option>Bus</option>
                        </select>
                    </div>

                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:col-start-2 sm:text-sm">
                            Guardar
                        </button>
                        <button type="button" onclick="toggleModal('vehicleModal')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function toggleModal(modalID) {
            document.getElementById(modalID).classList.toggle("hidden");
        }
    </script>
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
                        <li><a href="index.html" data-navigate="/" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                        <li><a href="service-request.html" data-navigate="/service-request" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                        <li><a href="companies.html" data-navigate="/companies" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/portal-choferes" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/contacto" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/trabaja-nosotros" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotoros</a></li>
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
                    <a href="terms.html" data-navigate="/terms" class="hover:text-white transition">Términos y Condiciones</a>
                    <a href="privacy.html" data-navigate="/privacy" class="hover:text-white transition">Política de Privacidad</a>
                    <a href="complaints.html" data-navigate="/complaints" class="hover:text-white transition">Portal de Denuncias</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Redirección dinámica al Dashboard según el rol del usuario
        function redirectToDashboard(event) {
            event.preventDefault();
            
            // Obtener el rol del usuario del localStorage o sessionStorage
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || 'cliente';
            
            let dashboardUrl = 'dashboard.html'; // URL por defecto
            
            switch(userRole.toLowerCase()) {
                case 'admin':
                case 'administrador':
                    dashboardUrl = 'dashboard_adm.html';
                    break;
                case 'cliente':
                    dashboardUrl = 'dashboard-cli.html';
                    break;
                case 'chofer':
                    dashboardUrl = 'dashboard-chof.html';
                    break;
                default:
                    dashboardUrl = 'dashboard.html';
            }
            
            // Redirigir a la URL correspondiente
            window.location.href = dashboardUrl;
        }
    </script>
</body>
</html>`,
  'vehicle-add.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>Agregar Nuevo Vehículo | Servicios de Transporte El Loa</title>

    <!-- Responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { theme: { extend: { colors: { primary: '#003366', secondary: '#FF6600' }, fontFamily: { sans: ['Inter','sans-serif'] } } } }
    </script>
    <link rel="stylesheet" href="assets/css/tailwind.css" />
    <link rel="stylesheet" href="assets/css/custom.css" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#003366',    /* Azul Corporativo */
                        secondary: '#FF6600',  /* Naranja Acción */
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
                    <a href="index.html" data-navigate="/" class="flex-shrink-0 text-white flex items-center gap-2 font-bold text-xl cursor-pointer">
                        <span class="material-icons text-secondary">local_shipping</span> EL LOA
                    </a>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a id="dashboardLink" href="#" onclick="redirectToDashboard(event)" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
                            <a href="service-request.html" data-navigate="/service-request" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Solicitudes</a>

                            <a href="users.html" data-navigate="/users" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                                Usuarios
                            </a>

                            <a href="companies.html" data-navigate="/companies" class="text-gray-300 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Clientes</a>
                            <a href="vehicles.html" data-navigate="/vehicles" class="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium border-b-4 border-secondary h-16 flex items-center pt-1">Flota</a>
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
                        <a href="logout.html" data-navigate="/logout" class="ml-2 text-sm font-semibold hover:text-gray-300">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
                <li><a href="index.html" data-navigate="/" class="hover:text-primary transition">Inicio</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li><a href="vehicles.html" data-navigate="/vehicles" class="hover:text-primary transition">Flota</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li class="text-gray-800 font-medium">Agregar Vehículo</li>
            </ol>
        </nav>

        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold leading-7 text-primary flex items-center gap-3">
                <span class="material-icons text-4xl">add_circle</span>
                Agregar Nuevo Vehículo
            </h1>
            <p class="mt-2 text-lg text-gray-600">Complete la información del nuevo vehículo para agregarlo a la flota.</p>
        </div>

        <!-- Form Card -->
        <div class="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span class="material-icons text-primary">directions_car</span>
                    Información del Vehículo
                </h2>
            </div>

            <form id="vehicleForm" class="p-6 space-y-6" onsubmit="handleSubmit(event)">
                <!-- Información Básica -->
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

                <!-- Marca y Modelo -->
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

                <!-- Tipo y Capacidad -->
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

                <!-- Información Técnica -->
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

                <!-- Documentación -->
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

                <!-- Botones de Acción -->
                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        class="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
                    >
                        <span class="material-icons mr-2">save</span>
                        Registrar Vehículo
                    </button>

                    <a
                        href="vehicles.html"
                        data-navigate="/vehicles"
                        class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
                    >
                        <span class="material-icons mr-2">arrow_back</span>
                        Cancelar
                    </a>
                </div>
            </form>
        </div>
    </main>

    <!-- Success Modal -->
    <div id="successModal" class="fixed inset-0 z-50 overflow-y-auto" style="display: none;" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <span class="material-icons text-green-600 text-2xl">check_circle</span>
                    </div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4" id="modal-title">¡Vehículo Registrado!</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            El vehículo ha sido registrado correctamente en el sistema.
                        </p>
                        <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm font-medium text-gray-900" id="vehicleInfo"></p>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-6">
                        <button
                            type="button"
                            onclick="closeSuccessModal()"
                            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Validación de patente chilena
        function validatePatente(patente) {
            const pattern = /^[A-Z]{2,4}-[0-9]{1,3}$|^[A-Z]{3,4}[0-9]{3}$/;
            return pattern.test(patente.toUpperCase());
        }

        // Formatear patente
        function formatPatente(input) {
            let value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (value.length <= 4) {
                // Para patentes antiguas o nuevas sin guión
                input.value = value;
            } else if (value.length <= 7) {
                // Insertar guión antes de los últimos 1-3 dígitos
                const letters = value.slice(0, -3);
                const numbers = value.slice(-3);
                input.value = letters + '-' + numbers;
            }
        }

        // Manejar envío del formulario
        function handleSubmit(event) {
            event.preventDefault();
            console.log('handleSubmit called');

            const form = event.target;
            const formData = new FormData(form);

            // Validar patente
            const patente = formData.get('patente');
            console.log('Patente:', patente);
            if (!validatePatente(patente)) {
                alert('Formato de patente inválido. Use formato ABCD-12 o ABC-123');
                return;
            }

            // Validar campos requeridos
            const requiredFields = ['patente', 'anio', 'marca', 'modelo', 'tipo'];
            let isValid = true;

            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                if (!formData.get(field)) {
                    element.classList.add('border-red-500');
                    isValid = false;
                } else {
                    element.classList.remove('border-red-500');
                }
            });

            if (!isValid) {
                alert('Por favor complete todos los campos requeridos.');
                return;
            }

            console.log('Form validation passed, showing modal');

            // Simular registro (aquí iría la llamada a la API)
            const vehicleData = {
                patente: formData.get('patente').toUpperCase(),
                anio: formData.get('anio'),
                marca: formData.get('marca'),
                modelo: formData.get('modelo'),
                tipo: formData.get('tipo'),
                capacidad: formData.get('capacidad') || 'N/A',
                color: formData.get('color') || 'N/A',
                kilometraje: formData.get('kilometraje') || '0',
                combustible: formData.get('combustible') || 'N/A',
                fechaCompra: formData.get('fechaCompra') || 'N/A',
                fechaRevision: formData.get('fechaRevision') || 'N/A',
                observaciones: formData.get('observaciones') || ''
            };

            // Mostrar modal de éxito
            showSuccessModal(vehicleData);

            // Limpiar formulario
            form.reset();
        }

        // Mostrar modal de éxito
        function showSuccessModal(vehicleData) {
            console.log('showSuccessModal called with:', vehicleData);
            const modal = document.getElementById('successModal');
            const vehicleInfo = document.getElementById('vehicleInfo');

            if (!modal) {
                console.error('Modal element not found');
                return;
            }

            vehicleInfo.textContent = \`\${vehicleData.marca} \${vehicleData.modelo} - Patente: \${vehicleData.patente}\`;

            modal.style.display = 'block';
            console.log('Modal displayed');
        }

        // Cerrar modal de éxito
        function closeSuccessModal() {
            const modal = document.getElementById('successModal');
            modal.style.display = 'none';

            // Redirigir a la lista de vehículos usando la función de navegación de React
            if (window.__redirect) {
                window.__redirect('vehicles.html');
            } else {
                window.location.href = 'vehicles.html';
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const patenteInput = document.getElementById('patente');
            patenteInput.addEventListener('input', function() {
                formatPatente(this);
            });

            // Auto-fill año actual si está vacío
            const anioInput = document.getElementById('anio');
            anioInput.addEventListener('focus', function() {
                if (!this.value) {
                    this.value = new Date().getFullYear();
                }
            });
        });

        // Redirección dinámica al Dashboard según el rol del usuario
        function redirectToDashboard(event) {
            event.preventDefault();

            // Obtener el rol del usuario del localStorage o sessionStorage
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || 'cliente';

            let dashboardUrl = 'dashboard.html'; // URL por defecto

            switch(userRole.toLowerCase()) {
                case 'admin':
                case 'administrador':
                    dashboardUrl = 'dashboard_adm.html';
                    break;
                case 'cliente':
                    dashboardUrl = 'dashboard-cli.html';
                    break;
                case 'chofer':
                    dashboardUrl = 'dashboard-chof.html';
                    break;
                default:
                    dashboardUrl = 'dashboard.html';
            }

            // Redirigir a la URL correspondiente
            window.location.href = dashboardUrl;
        }
    </script>

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
                        <li><a href="index.html" data-navigate="/" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Inicio</a></li>
                        <li><a href="service-request.html" data-navigate="/service-request" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Solicitudes</a></li>
                        <li><a href="companies.html" data-navigate="/companies" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Clientes</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/portal-choferes" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Portal Choferes</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/contacto" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Contáctanos</a></li>
                        <li><a href="portal-choferes.html" data-navigate="/trabaja-nosotros" class="hover:text-secondary transition flex items-center gap-2"><span class="material-icons text-xs">chevron_right</span> Trabaja con Nosotoros</a></li>
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
                    <a href="terms.html" data-navigate="/terms" class="hover:text-white transition">Términos y Condiciones</a>
                    <a href="privacy.html" data-navigate="/privacy" class="hover:text-white transition">Política de Privacidad</a>
                    <a href="complaints.html" data-navigate="/complaints" class="hover:text-white transition">Portal de Denuncias</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`,};

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