# 🚀 Guía Rápida: Empezar con Visual Studio Code

## Para Empezar en 5 Minutos

### 1️⃣ Abre el Proyecto en VS Code

```bash
# En tu terminal
cd Capstone-TAV-2026
code .
```

O simplemente arrastra la carpeta del proyecto a VS Code.

---

### 2️⃣ Instala las Extensiones

Cuando abras el proyecto, verás una notificación:

```
"This workspace has extension recommendations"
```

**Haz clic en "Install All"** ✅

Las extensiones más importantes que se instalarán:
- ✨ **GitHub Copilot** - Tu asistente de código con IA
- 💬 **GitHub Copilot Chat** - Chat con IA para ayudarte a programar
- 🎨 **Prettier** - Formatea tu código automáticamente
- 🔍 **ESLint** - Detecta errores en tu código
- 🗄️ **Prisma** - Para trabajar con la base de datos

---

### 3️⃣ Configura GitHub Copilot

#### ¿Tienes GitHub Copilot?

**Si eres estudiante:** 
- Obtén Copilot GRATIS aquí: https://education.github.com/pack
- Incluye GitHub Copilot sin costo

**Si no eres estudiante:**
- Prueba gratuita: https://github.com/features/copilot
- Después: $10/mes o $100/año

#### Activar Copilot en VS Code

1. Haz clic en el ícono de cuenta (esquina inferior izquierda) 👤
2. Selecciona **"Sign in with GitHub"**
3. Autoriza VS Code
4. ¡Listo! Verás el ícono de Copilot activo en la barra inferior

---

### 4️⃣ Instala las Dependencias del Proyecto

Abre la terminal integrada en VS Code: **Ctrl + `** (tecla backtick)

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

O usa las tareas de VS Code:
- **Ctrl + Shift + P** → "Tasks: Run Task" → "Backend: Install Dependencies"
- **Ctrl + Shift + P** → "Tasks: Run Task" → "Frontend: Install Dependencies"

---

### 5️⃣ Ejecuta el Proyecto

#### Opción A: Con Docker (Más Fácil)

```bash
cd backend
docker-compose up -d
```

O con la tarea de VS Code:
- **Ctrl + Shift + P** → "Tasks: Run Task" → "Docker: Up All Services"

#### Opción B: Sin Docker

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

O usa la tarea combinada:
- **Ctrl + Shift + P** → "Tasks: Run Task" → "Full Stack: Start Dev"

---

## 🤖 Cómo Usar GitHub Copilot

### Autocompletado Inteligente

Simplemente escribe código y Copilot te sugerirá:

```typescript
// Escribe un comentario describiendo lo que necesitas
// función para validar un email

// Copilot sugerirá automáticamente la función completa
```

**Atajos:**
- **Tab** → Aceptar sugerencia
- **Esc** → Rechazar sugerencia
- **Alt + ]** → Siguiente sugerencia
- **Alt + [** → Sugerencia anterior

### Copilot Chat

Abre el chat: **Ctrl + I**

Ejemplos de lo que puedes preguntar:
```
🔹 "Explica qué hace esta función"
🔹 "Cómo puedo optimizar este código?"
🔹 "Crea un componente React para un formulario de login"
🔹 "¿Qué error tiene este código?"
🔹 "Genera tests para esta función"
```

### Ejemplos Prácticos

**1. Generar una función completa:**
```typescript
// función para calcular el costo total de un viaje
// incluye distancia en km, tiempo en minutos, y tarifa base
```

**2. Explicar código existente:**
Selecciona el código → **Click derecho** → "Copilot: Explain This"

**3. Generar tests:**
Selecciona una función → **Click derecho** → "Copilot: Generate Tests"

**4. Corregir errores:**
Haz clic en el error → Aparecerá un ícono de Copilot → Click para ver sugerencias

---

## ⌨️ Atajos de Teclado Esenciales

### Navegación
- **Ctrl + P** → Búsqueda rápida de archivos
- **Ctrl + Shift + F** → Buscar en todos los archivos
- **Ctrl + G** → Ir a línea
- **Alt + ←/→** → Navegar atrás/adelante

### Edición
- **Ctrl + D** → Seleccionar siguiente ocurrencia
- **Alt + ↑/↓** → Mover línea arriba/abajo
- **Ctrl + /** → Comentar/descomentar
- **Alt + Shift + F** → Formatear documento

### GitHub Copilot
- **Ctrl + I** → Abrir Copilot Chat (inline)
- **Tab** → Aceptar sugerencia
- **Alt + ]** → Siguiente sugerencia

### Terminal y Debug
- **Ctrl + `** → Abrir terminal
- **F5** → Iniciar debug
- **F9** → Toggle breakpoint

---

## 📁 Archivos Importantes

```
📦 Tu Proyecto
├── 📂 .vscode/              ← Configuración de VS Code
│   ├── extensions.json      ← Extensiones recomendadas
│   ├── settings.json        ← Configuración del editor
│   ├── launch.json          ← Configuración de debug
│   └── tasks.json           ← Tareas automatizadas
├── 📂 backend/              ← API NestJS
├── 📂 frontend/             ← App React
└── 📄 README.md             ← Documentación completa
```

---

## 🎯 Flujo de Trabajo Recomendado

1. **Abre VS Code** en la carpeta del proyecto
2. **Instala extensiones** (primera vez solamente)
3. **Inicia sesión** en GitHub (primera vez solamente)
4. **Abre terminal integrada** (Ctrl + `)
5. **Instala dependencias** si es necesario
6. **Ejecuta el proyecto** (con tareas o comandos)
7. **Escribe código** con ayuda de Copilot
8. **Depura** con F5 si necesitas
9. **Guarda** y el código se formatea automáticamente

---

## ❓ Preguntas Frecuentes

### ¿Necesito pagar por Copilot?

- **Estudiantes:** GRATIS con GitHub Student Pack
- **Otros:** Prueba gratuita, luego $10/mes

### ¿Copilot funciona offline?

No, necesitas conexión a internet para que Copilot funcione.

### ¿Qué pasa si Copilot sugiere código incorrecto?

Simplemente presiona **Esc** para rechazar la sugerencia. Copilot aprende de tu rechazo y mejorará.

### ¿Puedo desactivar Copilot temporalmente?

Sí, haz clic en el ícono de Copilot en la barra inferior y selecciona "Disable Completions".

### ¿VS Code es gratis?

Sí, Visual Studio Code es completamente gratuito y de código abierto.

---

## 🆘 Solución de Problemas Comunes

### Copilot no aparece
1. Verifica que instalaste la extensión "GitHub Copilot"
2. Reinicia VS Code
3. Verifica tu conexión a internet

### No veo sugerencias de Copilot
1. Asegúrate que el ícono de Copilot dice "Active"
2. Verifica tu suscripción: https://github.com/settings/copilot
3. Intenta cerrar sesión y volver a iniciar

### Errores de TypeScript en rojo
1. Ejecuta `npm install` en backend y frontend
2. Reinicia TypeScript: **Ctrl + Shift + P** → "TypeScript: Restart TS Server"

### Puerto ya en uso
Cierra otras aplicaciones o cambia el puerto en los archivos de configuración.

---

## 📚 Recursos Útiles

- 📖 [Documentación completa del proyecto](README.md)
- 🤖 [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- 💻 [VS Code Tips](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- 🎓 [GitHub Student Pack](https://education.github.com/pack)

---

## ✨ Tips Profesionales

1. **Usa Copilot Chat para aprender**: Pregunta "¿Por qué se usa este patrón aquí?"
2. **Escribe buenos comentarios**: Copilot generará mejor código
3. **Revisa las sugerencias**: No aceptes todo automáticamente
4. **Aprovecha los atajos**: Aprende al menos 5 atajos de teclado
5. **Usa GitLens**: Para ver quién escribió cada línea de código

---

**¡Ya estás listo para programar con la ayuda de IA! 🚀**

Si tienes dudas, consulta la [documentación completa](README.md) o abre un issue en GitHub.
