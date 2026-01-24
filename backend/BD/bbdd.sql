-- ============================================================================
-- BASE DE DATOS: SERVICIOS EL LOA
-- Generado desde Prisma Schema
-- Fecha: 2026-01-24
-- ============================================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE "UserStatus" AS ENUM ('ACTIVO', 'INACTIVO', 'PENDIENTE');
CREATE TYPE "CompanyStatus" AS ENUM ('ACTIVO', 'INACTIVO');
CREATE TYPE "VehicleStatus" AS ENUM ('DISPONIBLE', 'MANTENCION', 'EN_RUTA');
CREATE TYPE "RequestStatus" AS ENUM ('PENDIENTE', 'AGENDADO', 'CANCELADO');
CREATE TYPE "TripStatus" AS ENUM ('PENDIENTE', 'ASIGNADO', 'EN_RUTA', 'FINALIZADO', 'CANCELADO');
CREATE TYPE "ComplaintStatus" AS ENUM ('PENDIENTE', 'EN_REVISION', 'RESUELTO', 'CERRADO');

-- ============================================================================
-- TABLAS
-- ============================================================================

-- Tabla: roles
CREATE TABLE "roles" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL UNIQUE,
    "permisos" JSONB DEFAULT '{}',
    "descripcion" TEXT
);

-- Tabla: users
CREATE TABLE "users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "role_id" INTEGER NOT NULL,
    "phone" VARCHAR(255),
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVO',
    "lastlogin" TIMESTAMPTZ,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedat" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "companyid" UUID,
    CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla: empresas_cliente (Company)
CREATE TABLE "empresas_cliente" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "rut" VARCHAR(255) NOT NULL UNIQUE,
    "name" VARCHAR(255) NOT NULL,
    "costCenter" VARCHAR(255),
    "costCenterDesc" VARCHAR(255),
    "address" TEXT,
    "contactName" VARCHAR(255),
    "contactEmail" VARCHAR(255),
    "phone" VARCHAR(255),
    "contractStart" TIMESTAMPTZ,
    "contractEnd" TIMESTAMPTZ,
    "status" "CompanyStatus" NOT NULL DEFAULT 'ACTIVO',
    "description" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla: vehiculos (Vehicle)
CREATE TABLE "vehiculos" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "licensePlate" VARCHAR(255) NOT NULL UNIQUE,
    "model" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255),
    "capacity" INTEGER,
    "color" VARCHAR(255),
    "year" INTEGER NOT NULL,
    "mileage" INTEGER,
    "status" "VehicleStatus" NOT NULL DEFAULT 'DISPONIBLE',
    "technicalReviewDate" TIMESTAMPTZ,
    "purchaseDate" TIMESTAMPTZ,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla: solicitudes_servicio (ServiceRequest)
CREATE TABLE "solicitudes_servicio" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "passengerCount" INTEGER NOT NULL,
    "requestedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "estimatedFare" INTEGER,
    "notes" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "clientId" UUID NOT NULL,
    "companyId" UUID,
    "driverId" UUID,
    CONSTRAINT "solicitudes_servicio_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "solicitudes_servicio_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "empresas_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: trips (Trip)
CREATE TABLE "trips" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255),
    "status" "TripStatus" NOT NULL DEFAULT 'PENDIENTE',
    "scheduledDate" TIMESTAMPTZ,
    "startTime" TIMESTAMPTZ,
    "endTime" TIMESTAMPTZ,
    "origin" TEXT,
    "destination" TEXT,
    "fare" INTEGER,
    "rating" INTEGER,
    "comment" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "serviceRequestId" UUID UNIQUE,
    "clientId" UUID,
    "driverId" UUID,
    "vehicleId" UUID,
    CONSTRAINT "trips_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "trips_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "solicitudes_servicio"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "trips_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehiculos"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "trips_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "empresas_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: complaints (Complaint)
CREATE TABLE "complaints" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "type" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "tripReference" VARCHAR(255),
    "status" "ComplaintStatus" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- FOREIGN KEYS ADICIONALES
-- ============================================================================

ALTER TABLE "users" ADD CONSTRAINT "users_companyid_fkey" 
    FOREIGN KEY ("companyid") REFERENCES "empresas_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================================================
-- ÍNDICES
-- ============================================================================

CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_companyid_idx" ON "users"("companyid");
CREATE INDEX "solicitudes_servicio_clientId_idx" ON "solicitudes_servicio"("clientId");
CREATE INDEX "solicitudes_servicio_companyId_idx" ON "solicitudes_servicio"("companyId");
CREATE INDEX "solicitudes_servicio_status_idx" ON "solicitudes_servicio"("status");
CREATE INDEX "trips_driverId_idx" ON "trips"("driverId");
CREATE INDEX "trips_vehicleId_idx" ON "trips"("vehicleId");
CREATE INDEX "trips_clientId_idx" ON "trips"("clientId");

-- ============================================================================
-- TRIGGERS PARA updated_at AUTOMÁTICO
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updatedat_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updatedat 
    BEFORE UPDATE ON "users" 
    FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

CREATE TRIGGER trg_empresas_updatedat 
    BEFORE UPDATE ON "empresas_cliente" 
    FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

CREATE TRIGGER trg_vehiculos_updatedat 
    BEFORE UPDATE ON "vehiculos" 
    FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

CREATE TRIGGER trg_solicitudes_updatedat 
    BEFORE UPDATE ON "solicitudes_servicio" 
    FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

CREATE TRIGGER trg_trips_updatedat 
    BEFORE UPDATE ON "trips" 
    FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

CREATE TRIGGER trg_complaints_updatedat 
    BEFORE UPDATE ON "complaints" 
    FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

-- ============================================================================
-- DATOS INICIALES (SEED)
-- ============================================================================

-- Insertar roles
INSERT INTO "roles" ("nombre", "permisos", "descripcion") VALUES
('ADMIN', '{"all": true}', 'Administrador del sistema'),
('CLIENTE', '{"view_trips": true, "create_requests": true}', 'Cliente del servicio'),
('CHOFER', '{"update_trip_status": true, "view_assigned_trips": true}', 'Conductor');

-- Insertar usuario admin
-- Password: Admin123! (hash bcrypt con salt 10)
INSERT INTO "users" ("id", "email", "password", "fullName", "name", "role_id", "status") VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin@demo.com', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'Admin Demo', 'Admin Demo', 1, 'ACTIVO');

-- ============================================================================
-- DATOS DE PRUEBA ADICIONALES
-- ============================================================================

-- Insertar más empresas cliente
INSERT INTO "empresas_cliente" ("id", "rut", "name", "costCenter", "contactName", "contactEmail", "phone", "status") VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '76.111.222-3', 'Minera Escondida Ltda', 'CC-MIN-001', 'Pedro Minero', 'contacto@minera.cl', '+56912345001', 'ACTIVO'),
('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '77.333.444-5', 'Ingeniería y Construcción Norte', 'CC-CONST-55', 'Ana Ingeniera', 'contacto@ingenieria.cl', '+56912345002', 'ACTIVO'),
('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '78.555.666-7', 'Hotel Calama Inn', 'CC-HOTEL-99', 'Carlos Recepción', 'logistica@hotel.cl', '+56912345003', 'ACTIVO');

-- Insertar vehículos
INSERT INTO "vehiculos" ("id", "licensePlate", "model", "type", "capacity", "year", "status", "technicalReviewDate") VALUES
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'GHTR-12', 'Mercedes-Benz Sprinter', 'Van', 19, 2022, 'DISPONIBLE', '2026-12-31'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'LKJH-98', 'Toyota Hiace', 'Van', 12, 2021, 'EN_RUTA', '2026-06-30'),
('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'ABCD-10', 'Hyundai H1', 'Van', 10, 2023, 'DISPONIBLE', '2026-08-15'),
('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'ZXCV-45', 'Peugeot Traveller', 'Van', 8, 2020, 'MANTENCION', '2026-03-20'),
('c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'QWER-77', 'Maxus V80', 'Van', 15, 2022, 'DISPONIBLE', '2026-11-10');

-- Insertar más usuarios
-- Choferes (password: Chofer123!)
INSERT INTO "users" ("id", "email", "password", "fullName", "name", "role_id", "phone", "status") VALUES
('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'juan.chofer@serviciosloa.cl', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'Juan Pérez Conductor', 'Juan Pérez', 3, '+56912345010', 'ACTIVO'),
('d2eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'luis.chofer@serviciosloa.cl', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'Luis González Conductor', 'Luis González', 3, '+56912345011', 'ACTIVO'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'maria.chofer@serviciosloa.cl', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'María Conductora', 'María', 3, '+56912345012', 'ACTIVO');

-- Clientes (password: Cliente123!)
INSERT INTO "users" ("id", "email", "password", "fullName", "name", "role_id", "companyid", "phone", "status") VALUES
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'gerente@minera.cl', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'Gerente Minera', 'Gerente Minera', 2, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '+56912345020', 'ACTIVO'),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'jefe@hotel.cl', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'Jefe Logística Hotel', 'Jefe Hotel', 2, 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '+56912345021', 'ACTIVO'),
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'contacto@ingenieria.cl', '$2b$10$iqI.yOF7.BccQF9SPN5aAu1kIA94IT8azbC97ERxi6b9d.9W99iDu', 'Supervisor Ingeniería', 'Supervisor', 2, 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '+56912345022', 'ACTIVO');

-- Insertar solicitudes de servicio
INSERT INTO "solicitudes_servicio" ("id", "origin", "destination", "passengerCount", "requestedAt", "estimatedFare", "status", "clientId", "companyId") VALUES
('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'Aeropuerto El Loa', 'Faena Escondida', 15, NOW() + INTERVAL '1 day', 150000, 'AGENDADO', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
('f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'Faena Escondida', 'Aeropuerto El Loa', 12, NOW() + INTERVAL '2 days', 130000, 'PENDIENTE', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
('f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'Calama Centro', 'Faena Escondida', 5, NOW() - INTERVAL '2 days', 80000, 'AGENDADO', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
('f4eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'Faena Escondida', 'Hotel Diego de Almagro', 8, NOW() - INTERVAL '5 days', 95000, 'AGENDADO', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a30', 'Oficina Centro', 'Planta Solar', 4, NOW() + INTERVAL '5 hours', 60000, 'PENDIENTE', 'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
('f6eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Planta Solar', 'Oficina Centro', 4, NOW() + INTERVAL '3 days', 60000, 'CANCELADO', 'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
('f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Hotel Calama Inn', 'San Pedro de Atacama', 10, NOW() - INTERVAL '1 hour', 120000, 'AGENDADO', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
('f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Aeropuerto El Loa', 'Hotel Calama Inn', 2, NOW() + INTERVAL '1 week', 35000, 'PENDIENTE', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
('f9eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 'Hotel Calama Inn', 'Geysers del Tatio', 18, NOW() + INTERVAL '1 week', 180000, 'PENDIENTE', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
('f10eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'Aeropuerto', 'Hotel', 3, NOW() - INTERVAL '1 month', 45000, 'AGENDADO', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14');

-- Insertar viajes (trips)
INSERT INTO "trips" ("id", "title", "status", "scheduledDate", "startTime", "endTime", "origin", "destination", "fare", "serviceRequestId", "clientId", "driverId", "vehicleId", "rating", "comment") VALUES
('g1eebc99-9c0b-4ef8-bb6d-6bb9bd380a36', 'Traslado Aeropuerto-Faena', 'EN_RUTA', NOW() + INTERVAL '1 day', NULL, NULL, 'Aeropuerto El Loa', 'Faena Escondida', 150000, 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', NULL, NULL),
('g2eebc99-9c0b-4ef8-bb6d-6bb9bd380a37', 'Traslado Calama-Faena', 'FINALIZADO', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days 2 hours', NOW() - INTERVAL '2 days', 'Calama Centro', 'Faena Escondida', 80000, 'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 5, 'Todo sin novedades. Pasajeros llegaron bien.'),
('g3eebc99-9c0b-4ef8-bb6d-6bb9bd380a38', 'Traslado Faena-Hotel', 'FINALIZADO', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days 4 hours', NOW() - INTERVAL '5 days 1 hour', 'Faena Escondida', 'Hotel Diego de Almagro', 95000, 'f4eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 4, NULL),
('g4eebc99-9c0b-4ef8-bb6d-6bb9bd380a39', 'Tour San Pedro', 'EN_RUTA', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', NULL, 'Hotel Calama Inn', 'San Pedro de Atacama', 120000, 'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', NULL, NULL),
('g5eebc99-9c0b-4ef8-bb6d-6bb9bd380a40', 'Transfer Aeropuerto', 'FINALIZADO', NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 month 2 hours', NOW() - INTERVAL '1 month', 'Aeropuerto', 'Hotel', 45000, 'f10eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 5, 'Servicio excelente');

-- Insertar algunas denuncias de ejemplo
INSERT INTO "complaints" ("id", "name", "email", "phone", "type", "subject", "description", "tripReference", "status") VALUES
('h1eebc99-9c0b-4ef8-bb6d-6bb9bd380a41', 'Cliente Anónimo', 'cliente@example.com', '+56912345999', 'SERVICIO', 'Retraso en recogida', 'El vehículo llegó 30 minutos tarde al punto de encuentro', 'g2eebc99-9c0b-4ef8-bb6d-6bb9bd380a37', 'EN_REVISION'),
('h2eebc99-9c0b-4ef8-bb6d-6bb9bd380a42', 'María González', 'maria.g@example.com', '+56912345888', 'CONDUCTOR', 'Exceso de velocidad', 'El conductor manejaba muy rápido en zona urbana', 'g3eebc99-9c0b-4ef8-bb6d-6bb9bd380a38', 'RESUELTO');
