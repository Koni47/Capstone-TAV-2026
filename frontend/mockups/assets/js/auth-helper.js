/**
 * Auth Helper - Funciones de autenticación y gestión de sesiones
 */

// Obtener el rol del usuario actual
function getUserRole() {
    return localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || null;
}

// Obtener el email del usuario actual
function getUserEmail() {
    return localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || null;
}

// Obtener la hora de login
function getLoginTime() {
    return localStorage.getItem('loginTime') || sessionStorage.getItem('loginTime') || null;
}

// Verificar si el usuario está autenticado
function isUserAuthenticated() {
    return getUserRole() !== null && getUserEmail() !== null;
}

// Guardar datos de sesión
function saveSessionData(email, role, rememberMe = false) {
    if (rememberMe) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('loginTime', new Date().toISOString());
    } else {
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('loginTime', new Date().toISOString());
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
    
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('loginTime');
    
    window.location.href = 'logout.html';
}

// Redirigir al dashboard según el rol
function redirectToDashboard(event) {
    event.preventDefault();
    
    const userRole = getUserRole() || 'cliente';
    let dashboardUrl = 'dashboard.html';
    
    switch(userRole.toLowerCase()) {
        case 'admin':
        case 'administrador':
            dashboardUrl = 'dashboard_adm.html';
            break;
        case 'cliente':
            dashboardUrl = 'dashboard-cli.html';
            break;
        case 'chofer':
            dashboardUrl = 'dashboard-chof.html';
            break;
        default:
            dashboardUrl = 'dashboard.html';
    }
    
    window.location.href = dashboardUrl;
}

// Proteger páginas - Redirigir al login si no está autenticado
// function protectPage() {
//     if (!isUserAuthenticated()) {
//         window.location.href = 'login.html';
//     }
// }

// Obtener nombre de usuario desde email
function getUsernameFromEmail(email) {
    if (!email) return 'Usuario';
    const parts = email.split('@')[0].split('.');
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

// Obtener iniciales del usuario
function getUserInitials(email) {
    if (!email) return 'US';
    const parts = email.split('@')[0].split('.');
    return parts.map(p => p.charAt(0).toUpperCase()).join('');
}

// Actualizar información de usuario en el navbar/perfil
function updateUserInfo() {
    const email = getUserEmail();
    const role = getUserRole();
    
    if (email && role) {
        const username = getUsernameFromEmail(email);
        const initials = getUserInitials(email);
        const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);
        
        // Actualizar elementos con clase 'user-name'
        const nameElements = document.querySelectorAll('.user-name');
        nameElements.forEach(el => {
            el.textContent = username;
        });
        
        // Actualizar elementos con clase 'user-role'
        const roleElements = document.querySelectorAll('.user-role');
        roleElements.forEach(el => {
            el.textContent = roleDisplay;
        });
        
        // Actualizar elementos con clase 'user-initials'
        const initialsElements = document.querySelectorAll('.user-initials');
        initialsElements.forEach(el => {
            el.textContent = initials;
        });
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateUserInfo();
});
