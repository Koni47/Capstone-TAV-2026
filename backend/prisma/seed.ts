import { PrismaClient, Role, VehicleStatus } from '@prisma/client';
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

  // 2. Crear Empresas (Antes: empresas_cliente)
  const minera = await prisma.company.create({
    data: {
      rut: '76.111.222-3',
      name: 'Minera Escondida Ltda',
      costCenter: 'CC-MIN-001',
      contactEmail: 'pedro.minero@minera.cl',
      address: 'Faena Escondida, Antofagasta',
    },
  });

  const hotel = await prisma.company.create({
    data: {
      rut: '78.555.666-7',
      name: 'Hotel Calama Inn',
      costCenter: 'CC-HOTEL-99',
      contactEmail: 'carlos.recepcion@hotel.cl',
      address: 'Av. Granaderos 1234, Calama',
    },
  });

  console.log('✅ Empresas creadas');

  // 3. Crear Vehículos (Antes: vehiculos)
  await prisma.vehicle.createMany({
    data: [
      { licensePlate: 'GHTR-12', model: 'Mercedes-Benz Sprinter', year: 2024, status: VehicleStatus.DISPONIBLE },
      { licensePlate: 'LKJH-98', model: 'Toyota Hiace', year: 2023, status: VehicleStatus.EN_RUTA },
      { licensePlate: 'ABCD-10', model: 'Hyundai H1', year: 2022, status: VehicleStatus.DISPONIBLE },
      { licensePlate: 'ZXCV-45', model: 'Peugeot Traveller', year: 2021, status: VehicleStatus.MANTENCION },
    ],
  });
  console.log('✅ Vehículos creados');

  // 4. Crear Usuarios (Antes: usuarios)
  const passwordHash = await bcrypt.hash('123456', 10); // Clave genérica para todos
  const customPasswordHash = await bcrypt.hash('duuocuc', 10);

  // 4.0 Usuario Personalizado
  await prisma.user.create({
    data: {
      email: 'za.konig@duocuc.cl',
      password: customPasswordHash, // 'duuocuc'
      fullName: 'Za Konig',
      role: Role.ADMIN, // Le damos rol Admin para que puedas probar todo
      phone: '+56999999999',
    },
  });

  // 4.1 Admin
  await prisma.user.create({
    data: {
      email: 'admin@serviciosloa.cl',
      password: passwordHash,
      fullName: 'Roberto Administrador',
      role: Role.ADMIN,
      phone: '+56911111111',
    },
  });

  // 4.2 Choferes
  await prisma.user.createMany({
    data: [
      { email: 'juan.chofer@serviciosloa.cl', password: passwordHash, fullName: 'Juan Pérez', role: Role.CHOFER, phone: '+56922222222' },
      { email: 'luis.chofer@serviciosloa.cl', password: passwordHash, fullName: 'Luis González', role: Role.CHOFER, phone: '+56933333333' },
    ],
  });

  // 4.3 Clientes (Asignados a Empresas)
  await prisma.user.create({
    data: {
      email: 'contacto@minera.cl',
      password: passwordHash,
      fullName: 'Gerente Minera',
      role: Role.CLIENTE,
      companyId: minera.id, // Relación automática con UUID
    },
  });

  await prisma.user.create({
    data: {
      email: 'logistica@hotel.cl',
      password: passwordHash,
      fullName: 'Jefe Logística Hotel',
      role: Role.CLIENTE,
      companyId: hotel.id,
    },
  });

  console.log('✅ Usuarios creados');
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
