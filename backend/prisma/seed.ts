import { PrismaClient, Role, VehicleStatus, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando poblamiento de base de datos...');

  // 1. Limpiar datos previos
  await prisma.transaction.deleteMany(); // <--- IMPORTANTE: Borrar hijos antes que padres
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

  // 4.4 Cliente Particular (Sin Empresa)
  await prisma.user.create({
    data: {
      email: 'particular@gmail.com',
      password: passwordHash, 
      fullName: 'Cliente Particular',
      role: Role.CLIENTE,
      // Sin companyId
    },
  });

  console.log('✅ Usuarios creados');

  // 5. Crear Solicitud y Viaje de Prueba (Para probar pagos)
  const clientUser = await prisma.user.findUnique({ where: { email: 'contacto@minera.cl' } });
  
  if (clientUser) {
      const request = await prisma.serviceRequest.create({
        data: {
            origin: 'Aeropuerto Calama',
            destination: 'Minera Escondida',
            passengerCount: 3,
            clientId: clientUser.id,
            // companyId removido por 3FN
            notes: 'Viaje urgente de prueba de pagos'
        }
      });

      const trip = await prisma.trip.create({
          data: {
              serviceRequestId: request.id,
              status: 'PENDIENTE',
              fare: 50000 // Monto de prueba para transbank
          }
      });
      
      console.log('✅ Viaje de Prueba creado con ID:', trip.id);
      console.log('   -> Usa este ID para probar el endpoint: POST /api/v1/payments/webpay/init');
  }

  // 6. Generación Masiva (Relleno hasta 20 registros)
  console.log('📦 Generando datos masivos de prueba (20 registros por entidad)...');

  // 6.1 Empresas Adicionales (Total 20)
  // Ya tenemos 2, creamos 18
  const extraCompanies = [];
  for (let i = 1; i <= 18; i++) {
    extraCompanies.push({
      rut: `${50 + i}.000.000-${i % 10}`,
      name: `Empresa Fantasma ${i} S.A.`,
      costCenter: `CC-FANT-${i}`,
      contactEmail: `contacto@fantasma${i}.cl`,
      address: `Calle Desconocida ${i}, Calama`,
    });
  }
  await prisma.company.createMany({ data: extraCompanies });

  // 6.2 Vehículos Adicionales (Total 20)
  // Ya tenemos 4, creamos 16
  const extraVehicles = [];
  const models = ['Toyota Hilux', 'Mitsubishi L200', 'Nissan Navara', 'Ford Ranger'];
  for (let i = 1; i <= 16; i++) {
    extraVehicles.push({
      licensePlate: `WXYZ-${100 + i}`,
      model: models[i % models.length],
      year: 2020 + (i % 5),
      status: VehicleStatus.DISPONIBLE,
    });
  }
  await prisma.vehicle.createMany({ data: extraVehicles });

  // 6.3 Usuarios Adicionales (Total 20 - ya tenemos ~5-6)
  // Crear ~15 usuarios random para rellenar, algunos choferes extra
  const extraUsersData = [];
  for (let i = 1; i <= 15; i++) {
    const isDriver = i % 5 === 0; // Cada 5to es chofer
    extraUsersData.push({
      email: `usuario.extra.${i}@test.com`,
      password: passwordHash,
      fullName: `Usuario Extra ${i}`,
      role: isDriver ? Role.CHOFER : Role.CLIENTE,
      phone: `+569000000${i}`,
      status: UserStatus.ACTIVO,
    });
  }
  await prisma.user.createMany({ data: extraUsersData });

  // 6.4 Solicitudes y Viajes (Total 20)
  // Ya tenemos 1, creamos 19 más variados
  
  // Recuperar pools de IDs
  const allClients = await prisma.user.findMany({ where: { role: Role.CLIENTE } });
  const allDrivers = await prisma.user.findMany({ where: { role: Role.CHOFER } });
  const allVehicles = await prisma.vehicle.findMany();
  
  if (allClients.length > 0 && allDrivers.length > 0 && allVehicles.length > 0) {
    for (let i = 1; i <= 19; i++) {
       const client = allClients[i % allClients.length];
       const driver = allDrivers[i % allDrivers.length];
       const vehicle = allVehicles[i % allVehicles.length];
       
       // Estado del viaje (Ciclo: Pendiente -> Asignado -> En Ruta -> Finalizado)
       const statusOptions = ['PENDIENTE', 'ASIGNADO', 'EN_RUTA', 'FINALIZADO', 'CANCELADO'];
       const status = statusOptions[i % statusOptions.length] as any; // Cast rápido

       // Crear Solicitud
       const request = await prisma.serviceRequest.create({
         data: {
           origin: `Origen Aleatorio ${i}`,
           destination: `Destino Aleatorio ${i}`,
           passengerCount: (i % 4) + 1,
           clientId: client.id,
           notes: `Solicitud masiva ${i}`,
           createdAt: new Date(Date.now() - i * 10000000), // Fechas pasadas
         }
       });

       // Datos variables según estado
       const tripData: any = {
         serviceRequestId: request.id,
         status: status,
         fare: 1500 + (i * 1000),
         createdAt: request.createdAt,
       };

       if (status !== 'PENDIENTE' && status !== 'CANCELADO') {
         tripData.driverId = driver.id;
         tripData.vehicleId = vehicle.id;
         tripData.startTime = new Date(tripData.createdAt.getTime() + 3600000);
       }

       if (status === 'FINALIZADO') {
         tripData.endTime = new Date(tripData.startTime.getTime() + 3600000);
         tripData.rating = (i % 5) + 1;
         tripData.comment = "Viaje generado automáticamente excelente servicio";
       }

       const trip = await prisma.trip.create({ data: tripData });

       // 6.5 Transacciones (Solo para finalizados/pagados)
       if (status === 'FINALIZADO' || status === 'ASIGNADO') {
          // Crear transacción mock
          await prisma.transaction.create({
            data: {
              tripId: trip.id,
              buyOrder: `MOCK-${i}-${Date.now()}`,
              sessionId: `S-${i}`,
              amount: tripData.fare,
              status: 'AUTHORIZED', // Asumimos pagado
              token: `token_mock_${i}_${Date.now()}`,
              transbankStatus: 'AUTHORIZED',
              responseCode: 0,
              authorizationCode: '121212',
              cardLast4Digits: '6623',
              transactionDate: new Date(),
            }
          });
       }
    }
  }

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
