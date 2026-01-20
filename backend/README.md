# Servicios El Loa - Backend API

## Descripción
Backend robusto y escalable para el sistema de **Fleet Management y Transporte Corporativo** de Servicios El Loa.

Este sistema gestiona la operación completa de transporte, incluyendo:
- Gestión de Flota (Vehículos y mantenimiento)
- Asignación de Choferes y Usuarios
- Clientes Corporativos y Centros de Costo
- Solicitudes de Servicio (Agendamiento)
- Operación Móvil en tiempo real (Viajes, inicio/fin, evidencia)
- Reportabilidad y KPIs

---

## 📋 Tabla de Contenidos
- [Autoría](#autoría)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Arquitectura y Módulos](#arquitectura-y-módulos)
- [Documentación API (Swagger)](#documentación-api-swagger)
- [Infraestructura (Docker)](#infraestructura-docker)

---

## 👩‍💻 Autoría
**Autor:** Zaida Konig  
**Rol:** Desarrollador Backend

---

## 🛠 Stack Tecnológico

El proyecto está construido bajo los principios de **Clean Architecture** y **SOLID**.

- **Framework Principal:** [NestJS](https://nestjs.com/) (Node.js + TypeScript)
- **Base de Datos:** [PostgreSQL 16](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Caché / Colas:** [Redis](https://redis.io/)
- **Containerización:** Docker & Docker Compose
- **Validación:** Class-Validator & Class-Transformer
- **Seguridad:** Helmet, CORS, JWT Strategy (Passport)
- **Documentación:** Swagger (OpenAPI)
- **Calidad de Código:** ESLint, Prettier, Husky

---

## ⚙ Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (v20 o superior recomendado)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPO>
   cd backend
   ```

2. **Configurar Variables de Entorno:**
   Copia el archivo de ejemplo y configura tus credenciales.
   ```bash
   cp .env.example .env
   ```

3. **Instalar Dependencias:**
   ```bash
   npm install
   ```

---

## ▶ Ejecución del Proyecto

### Opción A: Ejecución con Docker (Recomendada)
Levanta todo el ecosistema (Base de datos, Redis, Admin DB y Backend) con un solo comando.

```bash
docker-compose up -d --build
```
- **Backend API:** http://localhost:3000
- **PgAdmin:** http://localhost:5050
- **Base de Datos:** Puerto 5432

### Opción B: Ejecución Híbrida (Desarrollo Local)
Si deseas ejecutar Node.js en tu máquina local pero usar Docker para la base de datos.

1. Levantar solo la infraestructura:
   ```bash
   docker-compose up -d postgres_db redis_cache
   ```
2. Ejecutar migraciones de base de datos:
   ```bash
   npm run prisma:migrate
   ```
3. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

---

## 🏗 Arquitectura y Módulos

El sistema está dividido en módulos funcionales desacoplados:

| Módulo | Descripción |
| :--- | :--- |
| **Auth** | Autenticación JWT, Refresh Tokens, Recuperación de contraseña. |
| **Vehicles** | CRUD de flota, gestión de estados y disponibilidad. |
| **Users** | Gestión de usuarios (Admin, Chofer, Cliente). |
| **Companies** | Clientes corporativos y centros de costo. |
| **Service Requests** | Core del negocio: Creación, asignación y cancelación de viajes. |
| **Trips** | Ciclo de vida del viaje (Inicio, Fin, Evidencia) para app móvil. |
| **Reports** | Generación de reportes de facturación y Dashboard de operaciones. |

---

## 📚 Documentación API (Swagger)

La documentación interactiva de todos los endpoints está disponible automáticamente cuando el servidor está corriendo.

👉 **Ver Documentación:** [http://localhost:3000/docs](http://localhost:3000/docs)

Aquí podrás probar peticiones, ver los esquemas de datos (DTOs) y las respuestas esperadas.

---

## 🐳 Infraestructura (Docker)

El archivo `docker-compose.yml` orquesta los siguientes servicios:

- **postgres_db**: Base de datos principal. Persistencia en volumen `postgres_data`.
- **redis_cache**: Almacenamiento en memoria para sesiones ágiles y caché.
- **pgadmin**: Interfaz web para gestión visual de PostgreSQL.
- **backend_app**: La aplicación NestJS compilada en etapas (Multi-stage build).

---

## 🧪 Comandos Útiles

```bash
# Formatear código
npm run format

# Ejecutar Linter
npm run lint

# Ver base de datos con Prisma Studio
npx prisma studio

# Generar cliente de Prisma (si cambia el schema)
npm run prisma:generate
```
