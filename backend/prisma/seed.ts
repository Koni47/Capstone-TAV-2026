import { PrismaClient, VehicleStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando poblamiento de base de datos...');

  // 1. Limpiar datos previos
  await prisma.trip.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.role.deleteMany();

  // 0. Crear Roles
  const adminRole = await prisma.role.create({
    data: { nombre: 'ADMIN', descripcion: 'Administrador del sistema' },
  });
  const choferRole = await prisma.role.create({
    data: { nombre: 'CHOFER', descripcion: 'Conductor de vehículos' },
  });
  const clienteRole = await prisma.role.create({
    data: { nombre: 'CLIENTE', descripcion: 'Cliente empresa' },
  });

  // 2. Crear Empresas
  const minera = await prisma.company.create({
    data: {
      rut: '76.111.222-3',
      name: 'Minera Escondida Ltda',
      costCenter: 'CC-MIN-001',
      contactEmail: 'pedro.minero@minera.cl',
    },
  });

  const hotel = await prisma.company.create({
    data: {
      rut: '78.555.666-7',
      name: 'Hotel Calama Inn',
      costCenter: 'CC-HOTEL-99',
      contactEmail: 'carlos.recepcion@hotel.cl',
    },
  });

  console.log('✅ Empresas creadas');

  // 3. Crear Vehículos
  await prisma.vehicle.createMany({
    data: [
      { licensePlate: 'GHTR-12', model: 'Sprinter', type: 'Van', capacity: 20, year: 2020, status: VehicleStatus.DISPONIBLE },
      { licensePlate: 'LKJH-98', model: 'Hiace', type: 'Van', capacity: 15, year: 2019, status: VehicleStatus.EN_RUTA },
      { licensePlate: 'ABCD-10', model: 'H1', type: 'Van', capacity: 12, year: 2021, status: VehicleStatus.DISPONIBLE },
      { licensePlate: 'ZXCV-45', model: 'Traveller', type: 'Van', capacity: 9, year: 2018, status: VehicleStatus.MANTENCION },
    ],
  });
  console.log('✅ Vehículos creados');

  // 4. Crear Usuarios
  const passwordHash = await bcrypt.hash('123456', 10);
  const customPasswordHash = await bcrypt.hash('duuocuc', 10);

  // 4.0 Usuario Personalizado
  await prisma.user.create({
    data: {
      email: 'za.konig@duocuc.cl',
      password: customPasswordHash,
      fullName: 'Za Konig',
      name: 'Za Konig',
      roleId: adminRole.id,
    },
  });

  // 4.1 Admin
  await prisma.user.create({
    data: {
      email: 'admin@serviciosloa.cl',
      password: passwordHash,
      fullName: 'Roberto Administrador',
      name: 'Roberto',
      roleId: adminRole.id,
    },
  });

  // 4.2 Choferes
  await prisma.user.create({
    data: {
      email: 'juan.chofer@serviciosloa.cl',
      password: passwordHash,
      fullName: 'Juan Pérez',
      name: 'Juan',
      roleId: choferRole.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'luis.chofer@serviciosloa.cl',
      password: passwordHash,
      fullName: 'Luis González',
      name: 'Luis',
      roleId: choferRole.id,
    },
  });

  // 4.3 Clientes
  await prisma.user.create({
    data: {
      email: 'contacto@minera.cl',
      password: passwordHash,
      fullName: 'Gerente Minera',
      name: 'Gerente Minera',
      roleId: clienteRole.id,
      companyId: minera.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'logistica@hotel.cl',
      password: passwordHash,
      fullName: 'Jefe Logística Hotel',
      name: 'Jefe Logística',
      roleId: clienteRole.id,
      companyId: hotel.id,
    },
  });

  console.log('✅ Usuarios creados');

  // 5. Crear Solicitudes de Servicio
  const vehiculos = await prisma.vehicle.findMany();
  const usuarios = await prisma.user.findMany();
  const chofer1 = usuarios.find(u => u.email === 'juan.chofer@serviciosloa.cl');
  const chofer2 = usuarios.find(u => u.email === 'luis.chofer@serviciosloa.cl');
  const clienteMinera = usuarios.find(u => u.email === 'contacto@minera.cl');
  const clienteHotel = usuarios.find(u => u.email === 'logistica@hotel.cl');
  const vehiculo1 = vehiculos.find(v => v.licensePlate === 'GHTR-12');
  const vehiculo2 = vehiculos.find(v => v.licensePlate === 'LKJH-98');
  const vehiculo3 = vehiculos.find(v => v.licensePlate === 'ABCD-10');

  await prisma.serviceRequest.createMany({
    data: [
      {
        origin: 'Aeropuerto El Loa',
        destination: 'Minera Escondida',
        passengerCount: 8,
        requestedAt: new Date('2026-01-25T08:00:00'),
        status: 'PENDIENTE',
        clientId: clienteMinera!.id,
        companyId: minera.id,
      },
      {
        origin: 'Hotel Calama Inn',
        destination: 'Terminal de Buses',
        passengerCount: 4,
        requestedAt: new Date('2026-01-26T14:30:00'),
        status: 'AGENDADO',
        clientId: clienteHotel!.id,
        companyId: hotel.id,
      },
      {
        origin: 'Centro Calama',
        destination: 'Faena Minera',
        passengerCount: 12,
        requestedAt: new Date('2026-01-24T06:00:00'),
        status: 'CANCELADO',
        clientId: clienteMinera!.id,
        companyId: minera.id,
      },
    ],
  });
  console.log('✅ Solicitudes de servicio creadas');

  // 6. Crear Viajes
  await prisma.trip.createMany({
    data: [
      {
        title: 'Traslado Turno B',
        origin: 'Aeropuerto El Loa',
        destination: 'Faena Minera Escondida',
        scheduledDate: new Date('2026-01-20T08:30:00'),
        startTime: new Date('2026-01-20T08:30:00'),
        endTime: new Date('2026-01-20T10:15:00'),
        status: 'FINALIZADO',
        clientId: minera.id,
        driverId: chofer1?.id,
        vehicleId: vehiculo1?.id,
        fare: 85000,
      },
      {
        title: 'Traslado Ejecutivo',
        origin: 'Centro Calama',
        destination: 'Hotel Calama Inn',
        scheduledDate: new Date('2026-01-21T18:00:00'),
        startTime: new Date('2026-01-21T18:00:00'),
        endTime: new Date('2026-01-21T18:25:00'),
        status: 'FINALIZADO',
        clientId: hotel.id,
        driverId: chofer2?.id,
        vehicleId: vehiculo3?.id,
        fare: 25000,
      },
      {
        title: 'Traslado Personal',
        origin: 'Terminal de Buses',
        destination: 'Minera Escondida',
        scheduledDate: new Date('2026-01-24T06:00:00'),
        startTime: new Date('2026-01-24T06:00:00'),
        status: 'EN_RUTA',
        clientId: minera.id,
        driverId: chofer1?.id,
        vehicleId: vehiculo2?.id,
        fare: 95000,
      },
      {
        title: 'Traslado al Aeropuerto',
        origin: 'Calama Centro',
        destination: 'Aeropuerto El Loa',
        scheduledDate: new Date('2026-01-27T10:00:00'),
        status: 'ASIGNADO',
        clientId: hotel.id,
        driverId: chofer2?.id,
        vehicleId: vehiculo1?.id,
        fare: 30000,
      },
      {
        title: 'Traslado Fin de Turno',
        origin: 'Minera Escondida',
        destination: 'Calama Centro',
        scheduledDate: new Date('2026-01-28T16:00:00'),
        status: 'PENDIENTE',
        clientId: minera.id,
        driverId: chofer1?.id,
        vehicleId: vehiculo3?.id,
        fare: 75000,
      },
    ],
  });
  console.log('✅ Viajes creados');

  console.log('🚀 Poblamiento finalizado correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
