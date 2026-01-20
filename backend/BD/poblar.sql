-- ----------------------------------------------------------------------------
-- LIMPIEZA PREVIA (Opcional: Solo si necesitas reiniciar los datos)
-- ----------------------------------------------------------------------------
TRUNCATE TABLE viajes_asignado, solicitudes_servicio, usuarios, vehiculos, empresas_cliente, roles RESTART IDENTITY CASCADE;

-- ----------------------------------------------------------------------------
-- 1. INSERTAR ROLES
-- ----------------------------------------------------------------------------
INSERT INTO roles (nombre, descripcion, permisos) VALUES 
('ADMIN', 'Administrador total del sistema', '{"dashboard": true, "usuarios": true, "finanzas": true}'),
('CHOFER', 'Conductor de flota', '{"ver_viajes": true, "historial": true}'),
('CLIENTE', 'Representante de empresa', '{"crear_solicitud": true, "ver_estado": true}');

-- ----------------------------------------------------------------------------
-- 2. INSERTAR EMPRESAS CLIENTE
-- ----------------------------------------------------------------------------
INSERT INTO empresas_cliente (razon_social, rut_empresa, centro_costo, contacto_comercial) VALUES
('Minera Escondida Ltda', '76.111.222-3', 'CC-MIN-001', 'Pedro Minero'),
('Ingeniería y Construcción Norte', '77.333.444-5', 'CC-CONST-55', 'Ana Ingeniera'),
('Hotel Calama Inn', '78.555.666-7', 'CC-HOTEL-99', 'Carlos Recepción');

-- ----------------------------------------------------------------------------
-- 3. INSERTAR VEHÍCULOS
-- ----------------------------------------------------------------------------
INSERT INTO vehiculos (patente, marca, modelo, capacidad_pax, estado, vencimiento_rev_tec) VALUES
('GHTR-12', 'Mercedes-Benz', 'Sprinter', 19, 'DISPONIBLE', '2026-12-31'),
('LKJH-98', 'Toyota', 'Hiace', 12, 'EN_RUTA', '2026-06-30'),
('ABCD-10', 'Hyundai', 'H1', 10, 'DISPONIBLE', '2026-08-15'),
('ZXCV-45', 'Peugeot', 'Traveller', 8, 'MANTENCION', '2026-03-20'),
('QWER-77', 'Maxus', 'V80', 15, 'DISPONIBLE', '2026-11-10');

-- ----------------------------------------------------------------------------
-- 4. INSERTAR USUARIOS (Usamos subqueries para obtener IDs dinámicos)
-- ----------------------------------------------------------------------------
-- 4.1 Administrador
INSERT INTO usuarios (rut, email, password_hash, nombre_completo, rol_id, empresa_id) VALUES
('11.111.111-1', 'admin@serviciosloa.cl', 'hash_secreto_123', 'Roberto Administrador', (SELECT id FROM roles WHERE nombre = 'ADMIN'), NULL);

-- 4.2 Choferes
INSERT INTO usuarios (rut, email, password_hash, nombre_completo, rol_id, empresa_id) VALUES
('12.222.222-2', 'juan.chofer@serviciosloa.cl', 'hash_secreto', 'Juan Pérez (Chofer)', (SELECT id FROM roles WHERE nombre = 'CHOFER'), NULL),
('13.333.333-3', 'luis.chofer@serviciosloa.cl', 'hash_secreto', 'Luis González (Chofer)', (SELECT id FROM roles WHERE nombre = 'CHOFER'), NULL),
('14.444.444-4', 'maria.chofer@serviciosloa.cl', 'hash_secreto', 'María Conductora', (SELECT id FROM roles WHERE nombre = 'CHOFER'), NULL);

-- 4.3 Clientes (Asignados a empresas creadas arriba)
INSERT INTO usuarios (rut, email, password_hash, nombre_completo, rol_id, empresa_id) VALUES
('15.555.555-5', 'contacto@minera.cl', 'hash_secreto', 'Gerente Minera', (SELECT id FROM roles WHERE nombre = 'CLIENTE'), (SELECT id FROM empresas_cliente WHERE rut_empresa = '76.111.222-3')),
('16.666.666-6', 'logistica@hotel.cl', 'hash_secreto', 'Jefe Logística Hotel', (SELECT id FROM roles WHERE nombre = 'CLIENTE'), (SELECT id FROM empresas_cliente WHERE rut_empresa = '78.555.666-7'));

-- ----------------------------------------------------------------------------
-- 5. INSERTAR SOLICITUDES DE SERVICIO (10 Datos)
-- ----------------------------------------------------------------------------
INSERT INTO solicitudes_servicio (empresa_id, fecha_hora_requerida, origen_direccion, destino_direccion, cantidad_pasajeros, estado) VALUES
-- Solicitudes de Minera
((SELECT id FROM empresas_cliente WHERE rut_empresa = '76.111.222-3'), NOW() + INTERVAL '1 day', 'Aeropuerto El Loa', 'Faena Escondida', 15, 'AGENDADO'),
((SELECT id FROM empresas_cliente WHERE rut_empresa = '76.111.222-3'), NOW() + INTERVAL '2 days', 'Faena Escondida', 'Aeropuerto El Loa', 12, 'PENDIENTE'),
((SELECT id FROM empresas_cliente WHERE rut_empresa = '76.111.222-3'), NOW() - INTERVAL '2 days', 'Calama Centro', 'Faena Escondida', 5, 'AGENDADO'), -- Pasada
((SELECT id FROM empresas_cliente WHERE rut_empresa = '76.111.222-3'), NOW() - INTERVAL '5 days', 'Faena Escondida', 'Hotel Diego de Almagro', 8, 'AGENDADO'), -- Pasada

-- Solicitudes de Ingeniería
((SELECT id FROM empresas_cliente WHERE rut_empresa = '77.333.444-5'), NOW() + INTERVAL '5 hours', 'Oficina Centro', 'Planta Solar', 4, 'PENDIENTE'),
((SELECT id FROM empresas_cliente WHERE rut_empresa = '77.333.444-5'), NOW() + INTERVAL '3 days', 'Planta Solar', 'Oficina Centro', 4, 'CANCELADO'),

-- Solicitudes de Hotel
((SELECT id FROM empresas_cliente WHERE rut_empresa = '78.555.666-7'), NOW() - INTERVAL '1 hour', 'Hotel Calama Inn', 'San Pedro de Atacama', 10, 'AGENDADO'), -- En curso posible
((SELECT id FROM empresas_cliente WHERE rut_empresa = '78.555.666-7'), NOW() + INTERVAL '1 week', 'Aeropuerto El Loa', 'Hotel Calama Inn', 2, 'PENDIENTE'),
((SELECT id FROM empresas_cliente WHERE rut_empresa = '78.555.666-7'), NOW() + INTERVAL '1 week', 'Hotel Calama Inn', 'Geysers del Tatio', 18, 'PENDIENTE'),
((SELECT id FROM empresas_cliente WHERE rut_empresa = '78.555.666-7'), NOW() - INTERVAL '1 month', 'Aeropuerto', 'Hotel', 3, 'AGENDADO'); -- Pasada antigua

-- ----------------------------------------------------------------------------
-- 6. INSERTAR VIAJES ASIGNADOS (Asignamos viajes a 5 de las solicitudes de arriba)
-- ----------------------------------------------------------------------------
-- Nota: Usamos subqueries LIMIT 1 con OFFSET para pegarles a solicitudes específicas creadas arriba
-- Esto asume el orden de inserción. En producción usarías IDs específicos.

-- Viaje 1: Futuro, Asignado a Chofer Juan y Sprinter
INSERT INTO viajes_asignado (solicitud_id, chofer_id, vehiculo_id, estado_actual) 
VALUES (
    (SELECT id FROM solicitudes_servicio ORDER BY created_at ASC LIMIT 1 OFFSET 0), 
    (SELECT id FROM usuarios WHERE email = 'juan.chofer@serviciosloa.cl'),
    (SELECT id FROM vehiculos WHERE patente = 'GHTR-12'),
    'EN_RUTA' -- Aunque es futuro, lo ponemos en ruta para el ejemplo o lo dejamos NULL si no ha partido
);

-- Viaje 2: Pasado (Finalizado)
INSERT INTO viajes_asignado (solicitud_id, chofer_id, vehiculo_id, hora_inicio_real, hora_fin_real, estado_actual, observaciones) 
VALUES (
    (SELECT id FROM solicitudes_servicio ORDER BY created_at ASC LIMIT 1 OFFSET 2), 
    (SELECT id FROM usuarios WHERE email = 'luis.chofer@serviciosloa.cl'),
    (SELECT id FROM vehiculos WHERE patente = 'LKJH-98'),
    NOW() - INTERVAL '2 days 2 hours',
    NOW() - INTERVAL '2 days',
    'FINALIZADO',
    'Todo sin novedades. Pasajeros llegaron bien.'
);

-- Viaje 3: Pasado (Finalizado)
INSERT INTO viajes_asignado (solicitud_id, chofer_id, vehiculo_id, hora_inicio_real, hora_fin_real, estado_actual) 
VALUES (
    (SELECT id FROM solicitudes_servicio ORDER BY created_at ASC LIMIT 1 OFFSET 3), 
    (SELECT id FROM usuarios WHERE email = 'maria.chofer@serviciosloa.cl'),
    (SELECT id FROM vehiculos WHERE patente = 'ABCD-10'),
    NOW() - INTERVAL '5 days 4 hours',
    NOW() - INTERVAL '5 days 1 hour',
    'FINALIZADO'
);

-- Viaje 4: En Curso (Actual) - Hotel a San Pedro
INSERT INTO viajes_asignado (solicitud_id, chofer_id, vehiculo_id, hora_inicio_real, estado_actual) 
VALUES (
    (SELECT id FROM solicitudes_servicio ORDER BY created_at ASC LIMIT 1 OFFSET 6), 
    (SELECT id FROM usuarios WHERE email = 'juan.chofer@serviciosloa.cl'), -- Juan repite viaje
    (SELECT id FROM vehiculos WHERE patente = 'QWER-77'),
    NOW() - INTERVAL '30 minutes',
    'EN_RUTA'
);

-- Viaje 5: Histórico antiguo
INSERT INTO viajes_asignado (solicitud_id, chofer_id, vehiculo_id, hora_inicio_real, hora_fin_real, estado_actual) 
VALUES (
    (SELECT id FROM solicitudes_servicio ORDER BY created_at ASC LIMIT 1 OFFSET 9), 
    (SELECT id FROM usuarios WHERE email = 'luis.chofer@serviciosloa.cl'),
    (SELECT id FROM vehiculos WHERE patente = 'GHTR-12'),
    NOW() - INTERVAL '1 month 2 hours',
    NOW() - INTERVAL '1 month',
    'FINALIZADO'
);