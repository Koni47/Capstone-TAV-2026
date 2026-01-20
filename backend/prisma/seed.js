"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando poblamiento de base de datos...');
    await prisma.trip.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();
    await prisma.vehicle.deleteMany();
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
    await prisma.vehicle.createMany({
        data: [
            { licensePlate: 'GHTR-12', model: 'Mercedes-Benz Sprinter', year: 2024, status: client_1.VehicleStatus.DISPONIBLE },
            { licensePlate: 'LKJH-98', model: 'Toyota Hiace', year: 2023, status: client_1.VehicleStatus.EN_RUTA },
            { licensePlate: 'ABCD-10', model: 'Hyundai H1', year: 2022, status: client_1.VehicleStatus.DISPONIBLE },
            { licensePlate: 'ZXCV-45', model: 'Peugeot Traveller', year: 2021, status: client_1.VehicleStatus.MANTENCION },
        ],
    });
    console.log('✅ Vehículos creados');
    const passwordHash = await bcrypt.hash('123456', 10);
    await prisma.user.create({
        data: {
            email: 'admin@serviciosloa.cl',
            password: passwordHash,
            fullName: 'Roberto Administrador',
            role: client_1.Role.ADMIN,
            phone: '+56911111111',
        },
    });
    await prisma.user.createMany({
        data: [
            { email: 'juan.chofer@serviciosloa.cl', password: passwordHash, fullName: 'Juan Pérez', role: client_1.Role.CHOFER, phone: '+56922222222' },
            { email: 'luis.chofer@serviciosloa.cl', password: passwordHash, fullName: 'Luis González', role: client_1.Role.CHOFER, phone: '+56933333333' },
        ],
    });
    await prisma.user.create({
        data: {
            email: 'contacto@minera.cl',
            password: passwordHash,
            fullName: 'Gerente Minera',
            role: client_1.Role.CLIENTE,
            companyId: minera.id,
        },
    });
    await prisma.user.create({
        data: {
            email: 'logistica@hotel.cl',
            password: passwordHash,
            fullName: 'Jefe Logística Hotel',
            role: client_1.Role.CLIENTE,
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
//# sourceMappingURL=seed.js.map