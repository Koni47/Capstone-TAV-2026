-- ----------------------------------------------------------------------------
-- 1. CONFIGURACIÓN INICIAL Y EXTENSIONES
-- ----------------------------------------------------------------------------
-- Habilitar extensión para generar UUIDs (versión 4) automáticamente
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 2. ENUMS (Tipos Enumerados para restringir valores)
-- ----------------------------------------------------------------------------
-- Define los estados posibles del vehículo
CREATE TYPE estado_vehiculo_enum AS ENUM ('DISPONIBLE', 'MANTENCION', 'EN_RUTA');

-- Define los estados del ciclo de vida de la solicitud
CREATE TYPE estado_solicitud_enum AS ENUM ('PENDIENTE', 'AGENDADO', 'CANCELADO');

-- Define los estados operativos del viaje en curso
CREATE TYPE estado_viaje_enum AS ENUM ('EN_RUTA', 'FINALIZADO');

-- ----------------------------------------------------------------------------
-- 3. TABLAS MAESTRAS (Lookups y Entidades Fuertes)
-- ----------------------------------------------------------------------------

-- Tabla: ROLES
-- Uso JSONB para los permisos porque permite indexación y es más rápido que JSON
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE, -- Ej: 'ADMIN', 'CHOFER', 'CLIENTE'
    permisos JSONB DEFAULT '{}'::jsonb, -- Estructura flexible de permisos
    descripcion TEXT
);

-- Tabla: EMPRESAS_CLIENTE
-- Representa a las empresas que contratan el servicio
CREATE TABLE empresas_cliente (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razon_social VARCHAR(150) NOT NULL,
    rut_empresa VARCHAR(20) NOT NULL UNIQUE,
    centro_costo VARCHAR(50),
    contacto_comercial VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: VEHICULOS
-- Flota de transporte
CREATE TABLE vehiculos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patente VARCHAR(10) NOT NULL UNIQUE, -- Clave candidata
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    capacidad_pax INT NOT NULL CHECK (capacidad_pax > 0),
    estado estado_vehiculo_enum DEFAULT 'DISPONIBLE',
    vencimiento_rev_tec DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. TABLAS DE USUARIOS Y SEGURIDAD
-- ----------------------------------------------------------------------------


-- Tabla: USERS (compatible con Prisma y backend)
CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'CLIENTE', 'CHOFER');
CREATE TYPE user_status_enum AS ENUM ('ACTIVO', 'PENDIENTE', 'INACTIVO');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(150) NOT NULL,
    name VARCHAR(150) NOT NULL DEFAULT '',
    role user_role_enum NOT NULL DEFAULT 'CLIENTE',
    phone VARCHAR(30),
    status user_status_enum NOT NULL DEFAULT 'ACTIVO',
    lastLogin TIMESTAMPTZ,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    companyId UUID,
    -- Relaciones
    CONSTRAINT fk_users_company FOREIGN KEY (companyId) REFERENCES empresas_cliente(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------------------
-- 5. TABLAS TRANSACCIONALES (Operación del Negocio)
-- ----------------------------------------------------------------------------

-- Tabla: SOLICITUDES_SERVICIO
-- El requerimiento inicial del cliente
CREATE TABLE solicitudes_servicio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    empresa_id UUID NOT NULL,
    
    -- Datos del servicio
    fecha_hora_requerida TIMESTAMPTZ NOT NULL,
    origen_direccion TEXT NOT NULL,
    destino_direccion TEXT NOT NULL,
    cantidad_pasajeros INT NOT NULL CHECK (cantidad_pasajeros > 0),
    nomina_pasajeros TEXT, -- URL al archivo o JSON stringificado
    estado estado_solicitud_enum DEFAULT 'PENDIENTE',
    
    -- Auditoría
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_solicitud_empresa FOREIGN KEY (empresa_id) REFERENCES empresas_cliente(id) ON DELETE CASCADE
);

-- Tabla: VIAJES_ASIGNADO
-- La ejecución real del servicio (Relación 1 a 1 con Solicitud según tu ERD)
CREATE TABLE viajes_asignado (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relación 1:1 estricta con solicitud (UNIQUE asegura que una solicitud no tenga 2 viajes)
    solicitud_id UUID NOT NULL UNIQUE, 
    
    -- Recursos asignados
    chofer_id UUID NOT NULL,
    vehiculo_id UUID NOT NULL,
    
    -- Ejecución
    hora_inicio_real TIMESTAMPTZ, -- Check-in
    hora_fin_real TIMESTAMPTZ,    -- Check-out
    estado_actual estado_viaje_enum DEFAULT 'EN_RUTA',
    observaciones TEXT,
    
    -- Auditoría
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT fk_viaje_solicitud FOREIGN KEY (solicitud_id) REFERENCES solicitudes_servicio(id) ON DELETE CASCADE,
    CONSTRAINT fk_viaje_chofer FOREIGN KEY (chofer_id) REFERENCES users(id) ON DELETE RESTRICT,    CONSTRAINT fk_viaje_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id) ON DELETE RESTRICT,
    
    -- Validación lógica: Fin no puede ser antes que inicio
    CONSTRAINT chk_tiempos_viaje CHECK (hora_fin_real >= hora_inicio_real)
);

-- ----------------------------------------------------------------------------
-- 6. ÍNDICES (Performance Tuning)
-- ----------------------------------------------------------------------------
-- Índices para claves foráneas (Postgres no los crea automáticamente)
CREATE INDEX idx_users_companyId ON users(companyId);
CREATE INDEX idx_solicitudes_empresa_id ON solicitudes_servicio(empresa_id);
CREATE INDEX idx_viajes_chofer_id ON viajes_asignado(chofer_id);
CREATE INDEX idx_viajes_vehiculo_id ON viajes_asignado(vehiculo_id);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_solicitudes_fecha ON solicitudes_servicio(fecha_hora_requerida);
CREATE INDEX idx_solicitudes_estado ON solicitudes_servicio(estado);
CREATE INDEX idx_users_email ON users(email);

-- ----------------------------------------------------------------------------
-- 7. TRIGGER PARA UPDATED_AT AUTOMÁTICO
-- ----------------------------------------------------------------------------
-- Función genérica para actualizar la columna updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar el trigger a todas las tablas relevantes
CREATE TRIGGER trg_empresas_updated_at BEFORE UPDATE ON empresas_cliente FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_vehiculos_updated_at BEFORE UPDATE ON vehiculos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_solicitudes_updated_at BEFORE UPDATE ON solicitudes_servicio FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_viajes_updated_at BEFORE UPDATE ON viajes_asignado FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();