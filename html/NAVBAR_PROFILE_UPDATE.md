# Guía: Cómo se actualiza el perfil del usuario en el navbar

## Flujo completo de actualización

### 1. Usuario inicia sesión en `login.html`

El usuario ingresa:
- Email: `juan.perez@example.com`
- Contraseña: `*****`
- Rol: `admin`

### 2. Al hacer submit, se guardan los datos

```javascript
localStorage.setItem('userRole', 'admin');
localStorage.setItem('userEmail', 'juan.perez@example.com');
localStorage.setItem('loginTime', new Date().toISOString());
```

### 3. Se redirige al dashboard correspondiente

- Si rol = `admin` → `dashboard_adm.html`
- Si rol = `cliente` → `dashboard-cli.html`
- Si rol = `chofer` → `dashboard-chof.html`

### 4. En el dashboard, se carga `auth-helper.js`

El script ejecuta automáticamente:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    updateUserInfo();
});
```

### 5. La función `updateUserInfo()` hace lo siguiente:

1. Lee el email: `juan.perez@example.com`
2. Calcula el nombre: `Juan Perez` (de la función `getUsernameFromEmail()`)
3. Calcula las iniciales: `JP` (de la función `getUserInitials()`)
4. Lee el rol: `admin` → se capitaliza a `Admin`

### 6. Los elementos del navbar se actualizan:

```html
<!-- Nombre del usuario -->
<p class="user-name">Juan Perez</p>  <!-- Cambió de "Usuario" a "Juan Perez" -->

<!-- Rol del usuario -->
<p class="user-role">Admin</p>       <!-- Cambió de "Admin" a "Admin" (en este caso igual) -->

<!-- Iniciales en el círculo -->
<div class="user-initials">JP</div>  <!-- Cambió de "US" a "JP" -->
```

## Ejemplos con diferentes emails

### Ejemplo 1: juan.perez@example.com
- Nombre: `Juan Perez`
- Iniciales: `JP`

### Ejemplo 2: maria.garcia@example.com
- Nombre: `Maria Garcia`
- Iniciales: `MG`

### Ejemplo 3: carlos.lopez.romero@example.com
- Nombre: `Carlos Lopez` (toma solo los dos primeros puntos)
- Iniciales: `CLR` (toma las iniciales de cada parte)

## Cómo funciona la función `getUsernameFromEmail()`

```javascript
function getUsernameFromEmail(email) {
    if (!email) return 'Usuario';
    const parts = email.split('@')[0].split('.');
    // Para 'juan.perez@example.com':
    // 1. Quita lo que viene después de @ → 'juan.perez'
    // 2. Divide por puntos → ['juan', 'perez']
    // 3. Capitaliza cada parte → ['Juan', 'Perez']
    // 4. Une con espacio → 'Juan Perez'
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}
```

## Cómo funciona la función `getUserInitials()`

```javascript
function getUserInitials(email) {
    if (!email) return 'US';
    const parts = email.split('@')[0].split('.');
    // Para 'juan.perez@example.com':
    // 1. Quita lo que viene después de @ → 'juan.perez'
    // 2. Divide por puntos → ['juan', 'perez']
    // 3. Toma la primera letra de cada parte en mayúsculas → 'J', 'P'
    // 4. Une → 'JP'
    return parts.map(p => p.charAt(0).toUpperCase()).join('');
}
```

## HTML necesario en el navbar

Para que `updateUserInfo()` funcione, el HTML debe tener estas clases:

```html
<div class="flex items-center gap-3 pl-4 border-l border-blue-800">
    <!-- Mostrar nombre y rol del usuario -->
    <div class="text-right hidden sm:block">
        <p class="text-sm font-bold leading-none user-name">Usuario</p>      <!-- Se actualiza -->
        <p class="text-xs text-blue-300 user-role">Admin</p>                 <!-- Se actualiza -->
    </div>
    
    <!-- Mostrar iniciales en círculo -->
    <div class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-900 user-initials">
        US  <!-- Se actualiza -->
    </div>
    
    <!-- Botón de salir -->
    <a href="logout.html" class="ml-2 text-sm font-semibold hover:text-gray-300">Salir</a>
</div>
```

## Flujo visual

```
ANTES DE INICIAR SESIÓN
─────────────────────
Usuario | Admin | [US] → Salir

         ↓ Usuario ingresa credenciales

DESPUÉS DE INICIAR SESIÓN
────────────────────────
Juan Perez | Admin | [JP] → Salir
```

## Debugging

Si el navbar no se actualiza, verifica:

1. ✅ Que `auth-helper.js` esté siendo cargado (check en devtools)
2. ✅ Que el email esté guardado correctamente: `localStorage.getItem('userEmail')`
3. ✅ Que el rol esté guardado correctamente: `localStorage.getItem('userRole')`
4. ✅ Que los elementos tengan las clases: `.user-name`, `.user-role`, `.user-initials`
5. ✅ Que `updateUserInfo()` se esté ejecutando en `DOMContentLoaded`

En la consola del navegador (F12), puedes probar manualmente:
```javascript
localStorage.setItem('userEmail', 'juan.perez@example.com');
localStorage.setItem('userRole', 'admin');
updateUserInfo(); // Ejecuta manualmente
```
