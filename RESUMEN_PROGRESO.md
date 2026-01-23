# Proyecto Capstone TAV-2026: Sistema de Transporte El Loa

**Presentación de 10 minutos - 22 de enero de 2026**

---

Hola, voy a explicarles el proyecto Capstone TAV-2026, un sistema completo de servicios de transporte que hemos desarrollado. Imagínense una plataforma como Uber o Didi, pero especializada para el transporte de carga y pasajeros en la región de El Loa.

## La Historia del Proyecto

Todo empezó con la necesidad de digitalizar los servicios de transporte tradicionales. Teníamos páginas HTML estáticas que funcionaban bien, pero queríamos convertirlas en una aplicación web moderna con React que mantuviera exactamente la misma apariencia visual.

El desafío principal era lograr que las páginas React se vieran idénticas a los HTML originales, pixel por pixel. Para esto, creamos un componente especial llamado HtmlMockRenderer que toma el HTML original y lo renderiza dentro de React, manteniendo toda la funcionalidad de navegación y interactividad.

## Lo Que Construimos

Desarrollamos una aplicación completa con tres tipos de usuarios: administradores que gestionan todo el sistema, choferes que ven sus viajes y ganancias, y clientes que solicitan servicios de transporte.

El backend está hecho con NestJS y Prisma, conectándose a una base de datos PostgreSQL. El frontend usa React con TypeScript y Vite para un desarrollo rápido. Todo está estilizado con Tailwind CSS para mantener la consistencia visual.

La aplicación incluye dashboards personalizados para cada rol. El dashboard del administrador muestra estadísticas de la flota, ingresos por servicio, y permite gestionar usuarios, empresas y vehículos. Los choferes ven sus viajes activos y pueden gestionar su disponibilidad. Los clientes pueden solicitar servicios y hacer seguimiento de sus pedidos.

## Los Desafíos Técnicos

Uno de los retos más interesantes fue mantener la navegación consistente. Cuando un administrador se loguea, debe ir automáticamente a su dashboard específico. Implementamos un sistema de rutas que redirige correctamente según el rol del usuario.

Otro desafío fue el selector de roles que aparecía como un cuadrito flotante durante el desarrollo. Era útil para testing, pero no debía estar en producción, así que lo removimos completamente.

## El Resultado Final

Hoy tenemos una aplicación completamente funcional que incluye:

- Un sistema de autenticación robusto
- Gestión completa de usuarios, empresas y vehículos
- Un portal especializado para choferes
- Sistema de solicitudes de servicio con mapas
- Reportes con gráficos interactivos
- Páginas informativas como contacto y términos

La aplicación compila correctamente, pasa todas las verificaciones de código, y está lista para ser desplegada en producción.

## Lo Que Aprendimos

Este proyecto nos enseñó la importancia de mantener la fidelidad visual cuando migras de HTML estático a frameworks modernos. También vimos cómo una buena arquitectura desde el inicio facilita agregar nuevas funcionalidades.

El HtmlMockRenderer que creamos es una solución elegante para mantener la consistencia entre diseño y desarrollo, permitiendo iteraciones rápidas sin perder la calidad visual.

## Conclusión

Hemos completado exitosamente el proyecto Capstone TAV-2026, creando una plataforma robusta y escalable para servicios de transporte. La aplicación está lista para ayudar a digitalizar y modernizar los servicios de transporte en la región de El Loa.

¿Preguntas?

---

*Proyecto desarrollado con: NestJS, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS*</content>
<parameter name="filePath">c:\Users\johan\Documents\GitHub\Capstone-TAV-2026\RESUMEN_PROGRESO.md