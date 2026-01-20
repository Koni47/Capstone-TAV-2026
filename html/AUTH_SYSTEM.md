# Sistema de Autenticación y Gestión de Roles

## Descripción

El sistema gestiona la autenticación de usuarios y su redirección a dashboards específicos según su rol (Administrador, Cliente o Chofer).

## Cómo funciona

### 1. Login (login.html)

El usuario debe:
1. Ingresar su email
2. Ingresar su contraseña
3. Seleccionar su rol (Administrador, Cliente o Chofer)
4. Hacer clic en "Iniciar Sesión"

Cuando inicia sesión:
- Se guardan los datos en `localStorage`:
  - `userRole`: El rol del usuario (admin, cliente, chofer)
  - `userEmail`: El email del usuario
  - `loginTime`: La hora de login
- Es redirigido automáticamente al dashboard correspondiente

### 2. Redirección de Dashboards

Según el rol seleccionado, se redirige a:
- **Admin** → `dashboard_adm.html`
- **Cliente** → `dashboard-cli.html`
- **Chofer** → `dashboard-chof.html`

### 3. Logout (logout.html)

El botón "Cerrar Sesión" lleva a `logout.html` que:
- Limpia todos los datos de sesión de `localStorage` y `sessionStorage`
- Redirige a `login.html` después de 2 segundos

## Uso del archivo auth-helper.js

### Importar el archivo en tus HTML

```html
<script src="assets/js/auth-helper.js"></script>
```

### Funciones disponibles

#### `getUserRole()`
Retorna el rol actual del usuario o `null` si no está autenticado.

```javascript
const role = getUserRole(); // 'admin', 'cliente', 'chofer' o null
```

#### `getUserEmail()`
Retorna el email del usuario o `null`.

```javascript
const email = getUserEmail(); // 'usuario@example.com'
```

#### `isUserAuthenticated()`
Verifica si el usuario está autenticado.

```javascript
if (isUserAuthenticated()) {
    // Usuario autenticado
}
```

#### `saveSessionData(email, role, rememberMe)`
Guarda datos de sesión (útil para login manual).

```javascript
saveSessionData('user@example.com', 'admin', true); // true para recordar
```

#### `logout()`
Cierra la sesión del usuario.

```javascript
logout(); // Limpia datos y redirige a logout.html
```

#### `protectPage()`
Protege una página requiriendo autenticación. Si no está autenticado, redirige a login.

```javascript
// Colocar al inicio de la página (después de cargar el DOM)
protectPage();
```

#### `updateUserInfo()`
Actualiza la información del usuario en el navbar/perfil.

```javascript
updateUserInfo(); // Se ejecuta automáticamente al cargar
```

### Clases CSS útiles

Para mostrar información del usuario en el navbar, usa estas clases:

```html
<!-- Mostrar nombre del usuario -->
<span class="user-name">Usuario</span>

<!-- Mostrar rol del usuario -->
<span class="user-role">Admin</span>

<!-- Mostrar iniciales del usuario -->
<span class="user-initials">AB</span>

<!-- Botón de logout -->
<a href="logout.html">Cerrar Sesión</a>
```

## Ejemplo de Navbar Actualizado

```html
<div class="flex items-center gap-3">
    <div class="text-right hidden sm:block">
        <p class="text-sm font-bold leading-none user-name">Usuario</p>
        <p class="text-xs text-blue-300 user-role">Admin</p>
    </div>
    <div class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-900 user-initials">AB</div>
    <a href="logout.html" class="ml-2 text-sm font-semibold hover:text-gray-300">Cerrar</a>
</div>

<script src="assets/js/auth-helper.js"></script>
```

## Proteger Páginas de Administrador

Si quieres que una página solo sea accesible para administradores:

```html
<script src="assets/js/auth-helper.js"></script>
<script>
    if (!isUserAuthenticated() || getUserRole() !== 'admin') {
        window.location.href = 'login.html';
    }
</script>
```

## Integración con Backend

Para integrar con un backend real:

1. En `login.html`, reemplaza la validación local con una llamada al servidor:

```javascript
// En lugar de redirigir directamente, hacer una petición POST
fetch('/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        saveSessionData(email, data.role, rememberMe);
        redirectToDashboard();
    } else {
        alert('Credenciales inválidas');
    }
})
.catch(error => console.error('Error:', error));
```

2. En `logout.html`, también puedes hacer una llamada al backend:

```javascript
fetch('/api/logout', {
    method: 'POST'
})
.then(response => {
    // Limpiar datos locales después
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
});
```

## Notas de Seguridad

⚠️ **Importante:** 
- `localStorage` no es seguro para datos sensibles en producción
- En producción, usar tokens JWT en cookies seguras
- Implementar CSRF protection en formularios
- Validar siempre en el backend, nunca confiar solo en datos del cliente
- Usar HTTPS siempre

## Archivos modificados

- `login.html`: Formulario de login mejorado
- `logout.html`: Página de cierre de sesión (NUEVO)
- `assets/js/auth-helper.js`: Funciones de autenticación (NUEVO)
- Múltiples archivos HTML: Actualizado `redirectToDashboard()` para usar el rol guardado

## Flujo de Autenticación

```
Usuario ingresa credenciales
         ↓
  Selecciona su rol
         ↓
  Hace clic en "Iniciar Sesión"
         ↓
  Se guardan datos en localStorage
         ↓
  Se redirige al dashboard según rol
         ↓
  Dashboard muestra información del usuario
         ↓
  Botón "Dashboard" redirige según rol guardado
         ↓
  Botón "Cerrar Sesión" limpia datos y redirige
```
