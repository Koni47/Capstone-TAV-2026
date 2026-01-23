import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
  getTerms() {
    return {
      title: 'Términos y Condiciones',
      lastUpdated: '2026-01-01',
      content: `
# Términos y Condiciones de Servicio

## 1. Aceptación de los Términos
Al utilizar los servicios de Transportes El Loa, usted acepta estar sujeto a estos términos y condiciones.

## 2. Servicios Ofrecidos
- Transporte de personal a faenas mineras
- Servicios corporativos
- Traslados aeropuerto
- Turismo regional

## 3. Responsabilidades del Cliente
- Proporcionar información veraz
- Confirmar reservas con anticipación
- Respetar las políticas de cancelación

## 4. Políticas de Pago
- Pago anticipado para servicios particulares
- Facturación mensual para clientes corporativos
- Multas por cancelaciones tardías

## 5. Limitaciones de Responsabilidad
La empresa no se hace responsable por retrasos causados por condiciones climáticas adversas o caso fortuito.

Para más información, contactar a operaciones@elloa.cl
      `,
    };
  }

  getPrivacy() {
    return {
      title: 'Política de Privacidad',
      lastUpdated: '2026-01-01',
      content: `
# Política de Privacidad

## 1. Recopilación de Datos
Transportes El Loa recopila información personal necesaria para prestar nuestros servicios.

## 2. Uso de la Información
- Gestión de reservas y facturación
- Comunicación con clientes
- Mejora de servicios

## 3. Protección de Datos
Cumplimos con la Ley N° 19.628 sobre Protección de la Vida Privada.

## 4. Compartir Información
No compartimos información personal con terceros sin consentimiento expreso.

## 5. Derechos del Usuario
- Acceso a sus datos personales
- Rectificación de información incorrecta
- Eliminación de datos (derecho al olvido)

Contacto DPO: privacidad@elloa.cl
      `,
    };
  }
}
