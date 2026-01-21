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
    { label: 'Dashboard Admin', href: '/dashboard-admin' },
    { label: 'Dashboard Cliente', href: '/dashboard-client' },
    { label: 'Dashboard Chofer', href: '/dashboard-driver' },
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
    { label: 'Iniciar sesión', href: '/login' },
    { label: 'Registrarse', href: '/register' },
    { label: 'Términos y Condiciones', href: '/terms' },
    { label: 'Política de Privacidad', href: '/privacy' },
    { label: 'Portal de Denuncias', href: '/complaints' }
  ]
}

export const profileMockData = {
  user: {
    id: "user-001",
    fullName: "Zaida König",
    email: "zaida@elloa.cl",
    phone: "+56 9 1234 5678",
    role: "Administrador",
    initials: "ZK",
    avatar: null,
  },
};

export const clientPortalMockData = {
  company: {
    id: "company-001",
    name: "Minera Escondida",
    initials: "ME",
  },
  stats: {
    tripsThisMonth: 24,
    tripsInRoute: 2,
    estimatedSpending: "$450.000",
  },
  recentTrips: [
    {
      id: "#REQ-890",
      route: "Aeropuerto -> Faena",
      date: "22 Ene, 10:00",
      passenger: "Ing. Juan Perez",
      status: "FINALIZADO",
      statusColor: "green",
    },
  ],
};

export const companiesMockData = {
  stats: {
    totalCompanies: 8,
    expiringContracts: 2,
    billedTripsMonth: 142,
  },
  companies: [
    {
      id: "company-001",
      name: "Minera Escondida Ltda.",
      rut: "76.123.456-K",
      initials: "ME",
      avatarBgColor: "indigo",
      costCenter: "CC-2025-OPS",
      costCenterDesc: "Operaciones Mina",
      contact: {
        name: "Roberto Díaz",
        email: "rdiaz@escondida.cl",
      },
      status: "Activo",
      statusColor: "green",
    },
    {
      id: "company-002",
      name: "Codelco División Norte",
      rut: "90.111.222-3",
      initials: "CO",
      avatarBgColor: "orange",
      costCenter: "CC-EXT-GABY",
      costCenterDesc: "Extracción Gaby",
      contact: {
        name: "Ana María Silva",
        email: "asilva@codelco.cl",
      },
      status: "Activo",
      statusColor: "green",
    },
    {
      id: "company-003",
      name: "SQM Salar",
      rut: "88.999.000-1",
      initials: "SQ",
      avatarBgColor: "gray",
      costCenter: "CC-LITIO-01",
      costCenterDesc: "Planta Litio",
      contact: {
        name: "Juan Torres",
        email: "jtorres@sqm.com",
      },
      status: "Suspendido",
      statusColor: "red",
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalResults: 8,
    showingFrom: 1,
    showingTo: 3,
  },
};

export const companiesPage2MockData = {
  message: "Página de ejemplo con más empresas. Reemplazar contenido según necesidad.",
  pageNumber: 2,
  companies: [
    {
      id: "company-004",
      name: "Anglo American Chile",
      rut: "77.123.456-K",
      initials: "AA",
      avatarBgColor: "blue",
      costCenter: "CC-LOS-BRONCES",
      costCenterDesc: "Mina Los Bronces",
      contact: {
        name: "Carlos Mendoza",
        email: "cmendoza@angloamerican.com",
      },
      status: "Activo",
      statusColor: "green",
    },
    {
      id: "company-005",
      name: "BHP Billiton",
      rut: "85.555.888-9",
      initials: "BH",
      avatarBgColor: "yellow",
      costCenter: "CC-SPENCE",
      costCenterDesc: "Mina Spence",
      contact: {
        name: "María González",
        email: "mgonzalez@bhpbilliton.com",
      },
      status: "Activo",
      statusColor: "green",
    },
    {
      id: "company-006",
      name: "Xstrata Copper",
      rut: "79.654.321-7",
      initials: "XC",
      avatarBgColor: "red",
      costCenter: "CC-COLLAHUASI",
      costCenterDesc: "Mina Collahuasi",
      contact: {
        name: "Pedro Ramírez",
        email: "pramirez@xstratacopper.com",
      },
      status: "Activo",
      statusColor: "green",
    },
    {
      id: "company-007",
      name: "Pan American Silver",
      rut: "82.777.999-5",
      initials: "PAS",
      avatarBgColor: "purple",
      costCenter: "CC-MINERA-LA",
      costCenterDesc: "Minera La Laguna",
      contact: {
        name: "Sandra Cortés",
        email: "scortes@panamericansilver.com",
      },
      status: "Suspendido",
      statusColor: "red",
    },
    {
      id: "company-008",
      name: "Antofagasta Minerals",
      rut: "81.444.666-2",
      initials: "AM",
      avatarBgColor: "green",
      costCenter: "CC-ZALDÍVAR",
      costCenterDesc: "Mina Zaldívar",
      contact: {
        name: "Jorge Valenzuela",
        email: "jvalenzuela@aminerals.com",
      },
      status: "Activo",
      statusColor: "green",
    },
  ],
  pagination: {
    currentPage: 2,
    totalPages: 3,
    totalResults: 8,
    showingFrom: 4,
    showingTo: 8,
  },
};

export const companyDetailMockData = {
  company: {
    id: "company-001",
    name: "Minera Escondida Ltda.",
    rut: "76.123.456-K",
    contact: {
      name: "Roberto Díaz",
      email: "rdiaz@escondida.cl",
    },
    description: "Centros de costo y contratos asociados.",
  },
};

export const companyEditMockData = {
  company: {
    id: "company-001",
    razónSocial: "Minera Escondida Ltda.",
    rut: "76.123.456-K",
    contacto: "rdiaz@escondida.cl",
  },
};

export const complaintsMockData = {
  pageTitle: "Portal de Denuncias",
  description: "En este espacio puedes enviar una denuncia o reclamo. Reemplazar con el formulario real según corresponda.",
};

export const paymentMockData = {
  user: {
    name: "Zaida K.",
    role: "Dispatcher",
  },
  requests: [
    {
      id: "#REQ-101",
      client: "Minera Gaby",
      origin: "Aeropuerto",
      destination: "Faena",
      date: "20/01 - 08:30",
      status: "Pendiente",
      statusColor: "yellow",
      borderColor: "yellow",
    },
    {
      id: "#REQ-099",
      client: "Part: Juan Perez",
      origin: "Hotel Diego",
      destination: "Aeropuerto",
      date: "20/01 - 14:00",
      status: "Agendado",
      statusColor: "green",
      borderColor: "green",
    },
  ],
  stats: {
    pending: 5,
    inRoute: 3,
  },
  drivers: [
    { id: "1", name: "Juan Pérez", status: "Disponible" },
    { id: "2", name: "Pedro Soto", status: "En Ruta - Termina 10min" },
  ],
  vehicles: [
    { id: "1", name: "Toyota Hilux", plate: "LHYT-88" },
    { id: "2", name: "Van Mercedes", plate: "KJSD-22" },
  ],
};

export const privacyMockData = {
  pageTitle: "Política de Privacidad",
  content: "Texto de ejemplo de la política de privacidad. Reemplazar con el contenido legal real según corresponda.",
};

export const recoverPasswordMockData = {
  title: "¿Olvidaste tu clave?",
  description: "Ingresa tu correo y te enviaremos un enlace para restablecerla.",
  placeholder: "correo@ejemplo.com",
  buttonText: "Enviar Enlace",
};

export const loginMockData = {
  title: "Inicio de Sesión",
  subtitle: "Servicios de Transporte El Loa",
  emailPlaceholder: "Ej: juanito.perez@correo.cl",
  passwordPlaceholder: "Ingresa tu contraseña",
  roles: [
    { value: "admin", label: "Administrador" },
    { value: "cliente", label: "Cliente" },
    { value: "chofer", label: "Chofer" }
  ],
  links: {
    recoverPassword: "/recover-password",
    register: "/register",
    home: "/"
  },
  buttonText: "Iniciar Sesión"
};

export const logoutMockData = {
  title: "Cerrando sesión",
  message: "Tu sesión será cerrada en unos momentos...",
  redirectDelayMs: 2000,
  icon: "logout"
};

export const termsMockData = {
  pageTitle: "Términos y Condiciones",
  content: "Texto de ejemplo de los términos y condiciones. Reemplazar con el contenido legal real según corresponda.",
};

export const tripsMockData = {
  driver: {
    name: "Juan Pérez",
    vehicle: "LHYT-88",
    initials: "JP",
  },
  currentDate: "Hoy, 22 Ene",
  activeTrip: {
    id: "#TRIP-101",
    title: "Traslado Turno B",
    client: "Minera Gaby",
    passengers: 4,
    status: "EN RUTA",
    startTime: "08:30",
    startLocation: "Aeropuerto El Loa",
    startDesc: "Sector Llegadas Nacionales",
    endTime: "Estimado 10:00",
    endLocation: "Faena Minera Gaby",
    endDesc: "Garita Principal de Acceso",
  },
  upcomingTrips: [
    {
      id: "#TRIP-102",
      time: "14:00",
      client: "Minera Escondida",
      route: "Hotel Diego → Aeropuerto",
      status: "Asignado",
      statusColor: "yellow",
    },
    {
      id: "#TRIP-100",
      title: "Traslado Ejecutivo",
      route: "Centro → Aeropuerto",
      status: "Finalizado",
      statusColor: "gray",
      date: "Ayer",
    },
  ],
};

export const userDetailMockData = {
  user: {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Cliente",
  },
};

export const userEditMockData = {
  user: {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Cliente",
  },
  roles: ["Cliente", "Chofer", "Administrador"],
};

export const usersPage2MockData = {
  users: [
    {
      name: "María López",
      email: "maria.lopez@example.com",
      role: "Cliente",
    },
    {
      name: "Carlos Silva",
      email: "carlos.silva@example.com",
      role: "Chofer",
    },
  ],
  pagination: {
    current: 2,
    total: 2,
  },
};

export const usersMockData = {
  stats: [
    {
      label: "Total Choferes",
      value: 15,
      icon: "badge",
      color: "blue",
    },
    {
      label: "Clientes Corporativos",
      value: 8,
      icon: "business_center",
      color: "green",
    },
    {
      label: "Administradores",
      value: 3,
      icon: "admin_panel_settings",
      color: "purple",
    },
  ],
  users: [
    {
      initials: "ZK",
      name: "Zaida König",
      email: "zaida@elloa.cl",
      role: "ADMIN",
      roleColor: "purple",
      status: "Activo",
      statusColor: "green",
      lastAccess: "Hace 5 mins",
    },
    {
      initials: "JP",
      name: "Juan Pérez",
      email: "juan.perez@elloa.cl",
      role: "CHOFER",
      roleColor: "blue",
      extraInfo: "Licencia A3",
      status: "Activo",
      statusColor: "green",
      lastAccess: "Ayer",
    },
    {
      initials: "RD",
      name: "Roberto Díaz",
      email: "contacto@minera.cl",
      role: "CLIENTE",
      roleColor: "green",
      extraInfo: "Minera Escondida",
      status: "Inactivo",
      statusColor: "gray",
      lastAccess: "Hace 1 semana",
    },
  ],
  pagination: {
    showing: { from: 1, to: 3 },
    total: 26,
    currentPage: 1,
    totalPages: 9,
  },
};

export const vehiclesMockData = {
  stats: [
    {
      label: "Total Flota",
      value: 12,
      borderColor: "primary",
    },
    {
      label: "Disponibles",
      value: 8,
      borderColor: "success",
    },
    {
      label: "En Ruta",
      value: 3,
      borderColor: "blue-400",
    },
    {
      label: "Taller / Mantención",
      value: 1,
      borderColor: "warning",
    },
  ],
  vehicles: [
    {
      icon: "directions_bus",
      model: "Mercedes-Benz Sprinter",
      type: "Van Ejecutiva (19 Pax)",
      plate: "LHYT-88",
      year: 2024,
      status: "Disponible",
      statusColor: "green",
      maintenanceDate: "15 Mar 2026",
      maintenanceStatus: "Al día",
      maintenanceColor: "green",
      driver: null,
    },
    {
      icon: "directions_car",
      model: "Toyota Hilux 4x4",
      type: "Camioneta Minera",
      plate: "KJSD-22",
      year: 2023,
      status: "En Ruta",
      statusColor: "blue",
      maintenanceDate: "20 Feb 2026",
      maintenanceStatus: "Al día",
      maintenanceColor: "green",
      driver: "Juan P.",
    },
    {
      icon: "build",
      model: "Hyundai H1",
      type: "Van Pasajeros",
      plate: "BB-CL-99",
      year: 2020,
      status: "En Taller",
      statusColor: "yellow",
      maintenanceDate: "19 Ene 2026",
      maintenanceStatus: "Vencida hoy",
      maintenanceColor: "red",
      driver: null,
    },
  ],
};

export const vehicleEditMockData = {
  vehicle: {
    plate: "LHYT-88",
    model: "Mercedes-Benz Sprinter",
    status: "Disponible",
  },
  statuses: ["Disponible", "En servicio", "Mantenimiento"],
};

export const vehicleDetailMockData = {
  vehicle: {
    plate: "LHYT-88",
    model: "Mercedes-Benz Sprinter",
    status: "Disponible",
  },
  history: [
    {
      date: "15/03/2026",
      description: "Revisión general",
    },
    {
      date: "01/02/2026",
      description: "Cambio de aceite",
    },
  ],
};

export const tripDetailMockData = {
  trip: {
    id: "#REQ-890",
    status: "FINALIZADO",
    statusColor: "green",
    origin: {
      name: "Aeropuerto El Loa",
      time: "08:30 AM",
    },
    destination: {
      name: "Minera Escondida (Garita)",
      time: "09:45 AM",
    },
    driver: "Juan Pérez",
    vehicle: "Toyota Hilux (LHYT-88)",
    driverComment:
      '"Pasajero dejado en garita principal sin novedades. Se firmó vale físico N° 4402."',
    evidenceImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
  },
};

export const reportsMockData = {
  filters: {
    clients: ["Todas", "Minera Escondida", "Codelco Norte"],
  },
  results: {
    month: "Enero 2026",
    rows: [
      {
        client: "Minera Escondida - OPS",
        trips: 45,
        kilometers: "2.400 km",
        total: "$1.200.000",
      },
      {
        client: "Codelco - Gaby",
        trips: 20,
        kilometers: "800 km",
        total: "$600.000",
      },
    ],
    totalGeneral: "$1.800.000",
  },
};

export const adminDashboardMockData = {
  header: { title: "Panel de Control", subtitle: "Bienvenido, visualiza el desempeño de tu negocio" },
  kpis: [
    { label: "Total Viajes", value: 245, color: 'primary', delta: "+12% vs mes anterior", icon: "directions_car" },
    { label: "Ingresos Totales", value: "$1.245.000", color: 'secondary', delta: "+18% vs mes anterior", icon: "attach_money" },
    { label: "Viajes Pendientes", value: 23, color: 'yellow', icon: "schedule" },
    { label: "Vehículos Activos", value: "18 / 20", color: 'green', icon: "directions_bus" },
  ],
  topClients: [
    { name: "Minera ABC", total: "$450.000" },
    { name: "Constructora XYZ", total: "$320.000" },
    { name: "Transportes ABC", total: "$250.000" },
    { name: "Empresas LMN", total: "$150.000" },
    { name: "Otros Clientes", total: "$75.000" },
  ],
  recentTrips: [
    { id: "VJ-2601", client: "Minera ABC", driver: "Juan Pérez", origin: "Aeropuerto", destination: "Faena Atacama", date: "20/01/2026 08:30", fare: "$85.000", status: "Completado", statusColor: "green" },
    { id: "VJ-2600", client: "Constructora XYZ", driver: "Carlos López", origin: "Centro Calama", destination: "Obra Construcción", date: "20/01/2026 07:15", fare: "$42.000", status: "Completado", statusColor: "green" },
    { id: "VJ-2599", client: "Transportes ABC", driver: "Miguel González", origin: "Estación de Bus", destination: "Terminal Aéreo", date: "20/01/2026 06:45", fare: "$28.000", status: "Completado", statusColor: "green" },
    { id: "VJ-2598", client: "Empresas LMN", driver: "Roberto Sáez", origin: "Hotel Atacama", destination: "Complejo Turístico", date: "19/01/2026 19:30", fare: "$65.000", status: "Completado", statusColor: "green" },
    { id: "VJ-2597", client: "Minera ABC", driver: "Francisco Silva", origin: "Oficina Central", destination: "Faena Norte", date: "19/01/2026 14:20", fare: "$95.000", status: "En Curso", statusColor: "yellow" },
  ],
  // Chart data
  chartServices: {
    labels: ['Transporte Personal', 'Corporativo', 'Turismo', 'Otros'],
    datasets: [
      { label: 'Ingresos ($)', data: [450000, 520000, 180000, 95000], backgroundColor: ['#003366', '#FF6600', '#0066CC', '#66BB6A'] }
    ]
  },
  chartViajesPorMes: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      { label: 'Viajes Realizados', data: [180, 195, 210, 225, 235, 245], borderColor: '#003366', backgroundColor: 'rgba(0, 51, 102, 0.1)', fill: true }
    ]
  },
  chartOcupacion: {
    labels: ['Ocupados', 'Disponibles', 'Mantenimiento'],
    datasets: [
      { data: [12, 6, 2], backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'] }
    ]
  }
};

export const clientDashboardMockData = {
  header: { title: "Mi Panel de Control", subtitle: "Bienvenido, gestiona tus viajes y pagos" },
  kpis: [
    { label: "Viajes Realizados", value: 12, icon: "directions_car" },
    { label: "Gasto Total", value: "$285.000", color: 'secondary', icon: "credit_card" },
    { label: "Viajes Pendientes", value: 2, color: 'yellow', icon: "schedule" },
    { label: "Calificación", value: "4.8 ⭐", color: 'green', icon: "star" },
  ],
  upcomingTrips: [
    { title: "Viaje a Faena - 22/01/2026", route: "Hotel Atacama → Faena Minera", time: "08:30 AM", driver: "Juan Pérez", price: "$75.000", status: "Confirmado" },
    { title: "Viaje al Centro - 23/01/2026", route: "Aeropuerto → Centro Calama", time: "10:15 AM", driver: "Carlos López", price: "$35.000", status: "Pendiente" },
  ],
  history: [
    { date: "20/01/2026", origin: "Aeropuerto", destination: "Hotel Atacama", driver: "Juan Pérez", amount: "$65.000", status: "Completado" },
    { date: "19/01/2026", origin: "Centro Calama", destination: "Complejo Turístico", driver: "Carlos López", amount: "$45.000", status: "Completado" },
  ],
  // Charts
  chartGasto: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [{ label: 'Gasto ($)', data: [180000, 195000, 165000, 225000, 240000, 285000], borderColor: '#FF6600', backgroundColor: 'rgba(255, 102, 0, 0.1)', fill: true }]
  },
  chartTipos: {
    labels: ['Trabajo', 'Turismo', 'Personal'],
    datasets: [{ data: [6, 3, 3], backgroundColor: ['#003366', '#FF6600', '#0066CC'] }]
  }
};

export const driverDashboardMockData = {
  header: { title: "Mi Panel Chofer", subtitle: "Gestiona tus viajes y controla tus ganancias" },
  kpis: [
    { label: "Viajes Hoy", value: 5, color: 'primary', icon: "route", sub: "2 pendientes" },
    { label: "Ganancias Hoy", value: "$245.000", color: 'secondary', icon: "attach_money" },
    { label: "Mi Calificación", value: "4.9 ⭐", color: 'yellow', icon: "star" },
    { label: "Vehículo", value: "Toyota Hiace", color: 'green', icon: "directions_bus" },
  ],
  nextTrips: [
    { title: "Viaje #VJ-2601", passenger: "Juan Pérez", client: "Minera ABC", time: "08:30 AM", routeInfo: "Aeropuerto → Faena Atacama | 45 km aprox", price: "$85.000", status: "En Ruta", level: 'green' },
    { title: "Viaje #VJ-2602", passenger: "Carlos López", client: "Constructora XYZ", time: "10:45 AM", routeInfo: "Centro Calama → Complejo Turístico | 12 km", price: "$42.000", status: "Confirmado", level: 'yellow' },
    { title: "Viaje #VJ-2603", passenger: "María García", client: "Turismo", time: "14:00 PM", routeInfo: "Hotel Atacama → Aeropuerto | 25 km", price: "$60.000", status: "Pendiente", level: 'blue' },
  ],
  completed: [
    { time: "06:30", client: "Juan Pérez", route: "Hotel → Faena", km: "35 km", fare: "$65.000", stars: '⭐⭐⭐⭐⭐', rating: '5.0' },
    { time: "08:00", client: "Ana García", route: "Aeropuerto → Centro", km: "18 km", fare: "$42.000", stars: '⭐⭐⭐⭐⭐', rating: '5.0' },
    { time: "09:30", client: "Roberto Sáez", route: "Centro → Complejo", km: "12 km", fare: "$28.000", stars: '⭐⭐⭐⭐', rating: '4.8' },
  ],
  // Charts
  chartGanancias: {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{ label: 'Ganancias ($)', data: [185000, 210000, 195000, 225000, 240000, 260000, 0], backgroundColor: ['#FF6600', '#FF8533', '#FF6600', '#FF8533', '#FF6600', '#FF8533', '#E0E0E0'] }]
  },
  chartDistribucion: {
    labels: ['Corta Distancia', 'Media Distancia', 'Larga Distancia'],
    datasets: [{ data: [35, 45, 20], backgroundColor: ['#66BB6A', '#FFA726', '#EF5350'] }]
  }
};

export default site
