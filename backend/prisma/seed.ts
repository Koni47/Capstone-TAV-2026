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
  await prisma.userRoleModel.deleteMany();

  // 0. Crear Roles
  const adminRole = await prisma.userRoleModel.create({
    data: { nombre: 'ADMIN', descripcion: 'Administrador del sistema' },
  });
  const choferRole = await prisma.userRoleModel.create({
    data: { nombre: 'CHOFER', descripcion: 'Conductor de vehículos' },
  });
  const clienteRole = await prisma.userRoleModel.create({
    data: { nombre: 'CLIENTE', descripcion: 'Cliente empresa' },
  });

  // 2. Crear Empresas (Antes: empresas_cliente)
  const minera = await prisma.company.create({
    data: {
      rutEmpresa: '76.111.222-3',
      razonSocial: 'Minera Escondida Ltda',
      centroCosto: 'CC-MIN-001',
      contactoComercial: 'pedro.minero@minera.cl',
    },
  });

  const hotel = await prisma.company.create({
    data: {
      rutEmpresa: '78.555.666-7',
      razonSocial: 'Hotel Calama Inn',
      centroCosto: 'CC-HOTEL-99',
      contactoComercial: 'carlos.recepcion@hotel.cl',
    },
  });

  console.log('✅ Empresas creadas');

  // 3. Crear Vehículos (Antes: vehiculos)
  await prisma.vehicle.createMany({
    data: [
      { patente: 'GHTR-12', marca: 'Mercedes-Benz', modelo: 'Sprinter', capacidadPax: 20, estado: VehicleStatus.DISPONIBLE },
      { patente: 'LKJH-98', marca: 'Toyota', modelo: 'Hiace', capacidadPax: 15, estado: VehicleStatus.EN_RUTA },
      { patente: 'ABCD-10', marca: 'Hyundai', modelo: 'H1', capacidadPax: 12, estado: VehicleStatus.DISPONIBLE },
      { patente: 'ZXCV-45', marca: 'Peugeot', modelo: 'Traveller', capacidadPax: 9, estado: VehicleStatus.MANTENCION },
    ],
  });
  console.log('✅ Vehículos creados');

  // 4. Crear Usuarios (Antes: usuarios)
  const passwordHash = await bcrypt.hash('123456', 10); // Clave genérica para todos
  const customPasswordHash = await bcrypt.hash('duuocuc', 10);

  // 4.0 Usuario Personalizado
  await prisma.user.create({
    data: {
      rut: '12345678-9',
      email: 'za.konig@duocuc.cl',
      password: customPasswordHash, // 'duuocuc'
      nombreCompleto: 'Za Konig',
      role: { connect: { id: adminRole.id } },
    },
  });

  // 4.1 Admin
  await prisma.user.create({
    data: {
      rut: '11111111-1',
      email: 'admin@serviciosloa.cl',
      password: passwordHash,
      nombreCompleto: 'Roberto Administrador',
      role: { connect: { id: adminRole.id } },
    },
  });

  // 4.2 Choferes
  await prisma.user.create({
    data: {
      rut: '22222222-2',
      email: 'juan.chofer@serviciosloa.cl',
      password: passwordHash,
      nombreCompleto: 'Juan Pérez',
      role: { connect: { id: choferRole.id } },
    },
  });

  await prisma.user.create({
    data: {
      rut: '33333333-3',
      email: 'luis.chofer@serviciosloa.cl',
      password: passwordHash,
      nombreCompleto: 'Luis González',
      role: { connect: { id: choferRole.id } },
    },
  });

  // 4.3 Clientes (Asignados a Empresas)
  await prisma.user.create({
    data: {
      rut: '44444444-4',
      email: 'contacto@minera.cl',
      password: passwordHash,
      nombreCompleto: 'Gerente Minera',
      role: { connect: { id: clienteRole.id } },
      company: { connect: { id: minera.id } },
    },
  });

  await prisma.user.create({
    data: {
      rut: '55555555-5',
      email: 'logistica@hotel.cl',
      password: passwordHash,
      nombreCompleto: 'Jefe Logística Hotel',
      role: { connect: { id: clienteRole.id } },
      company: { connect: { id: hotel.id } },
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
