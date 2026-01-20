# Capstone TAV 2026 - Servicios El Loa

Sistema completo de gestión de flotas y transporte corporativo para Servicios El Loa.

## 📋 Descripción del Proyecto

Este proyecto es un sistema full-stack que incluye:
- **Backend**: API REST con NestJS y PostgreSQL
- **Frontend**: Aplicación React con Vite y TypeScript
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Infraestructura**: Docker y Docker Compose

---

## 🚀 Configuración en Visual Studio Code

### Paso 1: Instalar Visual Studio Code

Si aún no tienes VS Code instalado, descárgalo desde: https://code.visualstudio.com/

### Paso 2: Abrir el Proyecto

1. Abre Visual Studio Code
2. Ve a **File > Open Folder** (o **Archivo > Abrir Carpeta**)
3. Selecciona la carpeta raíz de este proyecto

### Paso 3: Instalar Extensiones Recomendadas

Cuando abras el proyecto, VS Code te mostrará una notificación para instalar las extensiones recomendadas. 

**Importante**: Haz clic en **"Install All"** (Instalar Todas) para obtener todas las herramientas necesarias.

#### Extensiones Principales:

1. **GitHub Copilot** 🤖 - Asistente de código con inteligencia artificial
   - Te ayuda a escribir código más rápido
   - Sugiere completaciones de código
   - Puedes hacer preguntas en el chat
   
2. **GitHub Copilot Chat** 💬 - Chat integrado con IA
   - Responde preguntas sobre tu código
   - Explica funciones complejas
   - Ayuda a depurar errores

3. **ESLint** - Linter para JavaScript/TypeScript
4. **Prettier** - Formateador de código
5. **Prisma** - Soporte para el ORM de base de datos
6. **Docker** - Gestión de contenedores
7. **GitLens** - Herramientas avanzadas de Git

### Paso 4: Configurar GitHub Copilot

Para usar GitHub Copilot necesitas:

1. **Tener una cuenta de GitHub**
2. **Suscripción a GitHub Copilot**
   - Visita: https://github.com/features/copilot para información actualizada sobre precios y disponibilidad
   - Para estudiantes: https://education.github.com/pack (incluye Copilot gratis)
   - Generalmente hay prueba gratuita disponible

3. **Iniciar sesión en VS Code**:
   - Haz clic en el ícono de cuenta en la esquina inferior izquierda
   - Selecciona **"Sign in with GitHub"**
   - Autoriza VS Code para acceder a tu cuenta

4. **Verificar que Copilot está activo**:
   - Busca el ícono de Copilot en la barra de estado (esquina inferior derecha)
   - Debe decir "GitHub Copilot: Active"

---

## 🛠️ Cómo Usar GitHub Copilot

### 1. Autocompletado de Código

Mientras escribes código, Copilot sugerirá automáticamente:
- **Tab**: Aceptar sugerencia
- **Esc**: Rechazar sugerencia
- **Alt + ]**: Ver siguiente sugerencia
- **Alt + [**: Ver sugerencia anterior

### 2. GitHub Copilot Chat

Abre el chat de Copilot:
- **Ctrl + I** (Windows/Linux) o **Cmd + I** (Mac): Chat inline
- O haz clic en el ícono de chat en la barra lateral

Ejemplos de preguntas que puedes hacer:
```
- "Explica este código"
- "¿Cómo puedo optimizar esta función?"
- "Crea una función para validar email"
- "¿Qué hace este componente de React?"
- "Ayúdame a corregir este error"
```

### 3. Generar Código con Comentarios

Escribe un comentario describiendo lo que necesitas y Copilot generará el código:

```typescript
// Función para calcular el total de un viaje incluyendo impuestos
// Copilot generará automáticamente la función
```

---

## 📦 Instalación de Dependencias

### Backend (NestJS)
```bash
cd backend
npm install
```

### Frontend (React)
```bash
cd frontend
npm install
```

---

## ▶️ Ejecutar el Proyecto en VS Code

### Opción 1: Usar Tareas de VS Code (Recomendado)

1. Presiona **Ctrl + Shift + P** (o **Cmd + Shift + P** en Mac)
2. Escribe "Tasks: Run Task"
3. Selecciona una de las siguientes opciones:
   - **Full Stack: Start Dev** - Inicia backend y frontend simultáneamente
   - **Backend: Start Dev** - Solo backend
   - **Frontend: Start Dev** - Solo frontend
   - **Docker: Up All Services** - Levantar toda la infraestructura

### Opción 2: Usar Terminal Integrada

Abre la terminal integrada: **Ctrl + `** (backtick)

**Backend:**
```bash
cd backend
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Docker (Infraestructura completa):**
```bash
cd backend
docker-compose up -d
```

---

## 🐛 Depuración (Debugging)

VS Code está configurado para depurar tu código:

1. Ve a la vista de **Debug** (icono de play con bicho en la barra lateral)
2. Selecciona una configuración:
   - **Backend: Debug** - Depurar el backend
   - **Frontend: Chrome Debug** - Depurar el frontend en Chrome (requiere que el servidor de desarrollo esté corriendo en el puerto 5173)
   - **Full Stack: Debug** - Depurar ambos simultáneamente

3. Presiona **F5** o haz clic en el botón verde de play

**Nota:** Asegúrate de que el frontend esté corriendo en el puerto 5173 (puerto por defecto de Vite) antes de usar la configuración de depuración del frontend.

**Puntos de interrupción:**
- Haz clic en el margen izquierdo del editor (junto a los números de línea)
- El código se detendrá en ese punto durante la ejecución

---

## 🔧 Comandos Útiles en VS Code

### Atajos de Teclado

- **Ctrl + P**: Búsqueda rápida de archivos
- **Ctrl + Shift + P**: Paleta de comandos
- **Ctrl + `**: Abrir/cerrar terminal
- **Ctrl + B**: Mostrar/ocultar barra lateral
- **Ctrl + Shift + F**: Buscar en todos los archivos
- **F2**: Renombrar símbolo (variable, función, etc.)
- **Alt + Shift + F**: Formatear documento

### Comandos de Terminal

**Backend:**
```bash
npm run start:dev      # Iniciar en modo desarrollo
npm run build          # Compilar proyecto
npm run lint           # Ejecutar linter
npm test               # Ejecutar tests
npm run prisma:studio  # Abrir Prisma Studio (GUI para DB)
```

**Frontend:**
```bash
npm run dev            # Iniciar en modo desarrollo
npm run build          # Compilar para producción
npm run lint           # Ejecutar linter
npm run format         # Formatear código
```

---

## 📚 Estructura del Proyecto

```
.
├── backend/           # API REST con NestJS
│   ├── src/          # Código fuente
│   ├── prisma/       # Schema de base de datos
│   └── README.md     # Documentación del backend
├── frontend/         # Aplicación React
│   ├── src/          # Código fuente
│   └── public/       # Archivos estáticos
├── .vscode/          # Configuración de VS Code
│   ├── extensions.json    # Extensiones recomendadas
│   ├── settings.json      # Configuración del workspace
│   ├── launch.json        # Configuración de debugging
│   └── tasks.json         # Tareas automatizadas
└── README.md         # Este archivo
```

---

## 🎓 Recursos Adicionales

### Documentación Oficial

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

### Tutoriales de GitHub Copilot

- [Guía de inicio rápido](https://docs.github.com/en/copilot/getting-started-with-github-copilot)
- [Mejores prácticas](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)

---

## 📝 Notas Importantes

1. **Formato Automático**: El código se formatea automáticamente al guardar (gracias a Prettier)
2. **Linting**: ESLint revisará tu código en tiempo real y mostrará advertencias
3. **Git**: Usa GitLens para ver el historial de cambios directamente en el editor
4. **Copilot**: Si una sugerencia no es correcta, simplemente recházala y continúa escribiendo

---

## 🔐 Variables de Entorno

Antes de ejecutar el proyecto, configura las variables de entorno:

**Backend:**
```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales
```

---

## 🆘 Solución de Problemas

### Copilot no funciona
1. Verifica que has iniciado sesión en GitHub
2. Verifica tu suscripción a Copilot en: https://github.com/settings/copilot
3. Reinicia VS Code

### Errores de TypeScript
1. Ejecuta: `npm install` en backend y frontend
2. Reinicia el servidor TypeScript: **Ctrl + Shift + P** > "TypeScript: Restart TS Server"

### Puerto ya en uso
Si recibes un error de puerto ocupado:
- Backend usa el puerto **3000**
- Frontend usa el puerto **5173**
- Cierra otras aplicaciones que puedan estar usando esos puertos

---

## 👥 Equipo

**Autor Backend:** Zaida Konig  
**Proyecto:** Capstone TAV 2026

---

## 📄 Licencia

Este proyecto es privado y está bajo licencia UNLICENSED.
