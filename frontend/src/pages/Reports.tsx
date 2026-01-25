import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips, recalculateAllFares } from "../services/api";
import Header from '../components/Header';

interface ReportData {
  id?: string;
  empresaCliente?: {
    nombre_comercial: string;
    rut?: string;
  };
  company?: {
    name: string;
    rut?: string;
  };
  client?: {
    fullName: string;
  };
  cantidad_viajes: number;
  total_kilometros: number;
  monto_total: number;
}

const Reports = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("Todas");
  const [reports, setReports] = useState<ReportData[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<string[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  // Recalcular tarifas y distancias automáticamente al cargar
  useEffect(() => {
    const recalc = async () => {
      try {
        await recalculateAllFares();
      } catch (e) {
        // Silenciar error si ya está actualizado
      }
    };
    recalc();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        
        // Obtener trips desde el backend
        const response: any = await getTrips();
        console.log('Trips response:', response);
        
        // Extraer el array de datos
        const tripsData = Array.isArray(response) ? response : (response.trips || response.data || []);
        console.log('tripsData length:', tripsData.length);
        setTrips(tripsData);
        
        // Función para calcular fare según la fórmula
        const calculateFare = (trip: any): number => {
          const baseRate = 1800;
          const airportSurcharge = 5000;
          const minimumFare = 30000;
          
          const distance = trip.distance || 20; // Usar distancia almacenada o default
          
          const isAirport = 
            trip.origin?.toLowerCase().includes('aeropuerto') ||
            trip.destination?.toLowerCase().includes('aeropuerto');
          
          const baseCost = distance * baseRate;
          const surcharge = isAirport ? airportSurcharge : 0;
          return Math.max(baseCost + surcharge, minimumFare);
        };
        
        // Procesar datos para crear el reporte agrupado por cliente
        const clientsMap = new Map<string, {
          name: string;
          rut?: string;
          viajes: number;
          kilometros: number;
          monto: number;
        }>();

        // Agrupar por cliente/empresa
        tripsData.forEach((trip: any) => {
          const clientName = trip.client?.name || 'Cliente Desconocido';
          const clientRut = trip.client?.rut || '';
          
          // Incluir todos los trips excepto cancelados
          if (trip.status !== 'CANCELADO') {
            if (!clientsMap.has(clientName)) {
              clientsMap.set(clientName, {
                name: clientName,
                rut: clientRut,
                viajes: 0,
                kilometros: 0,
                monto: 0
              });
            }

            const clientData = clientsMap.get(clientName)!;
            clientData.viajes += 1;
            if (typeof trip.distance === 'number' && !isNaN(trip.distance)) {
              clientData.kilometros += trip.distance;
            }
            clientData.monto += calculateFare(trip);
          }
        });

        // Convertir a array de reportes
        const reportsData: ReportData[] = Array.from(clientsMap.values()).map(client => ({
          empresaCliente: {
            nombre_comercial: client.name,
            rut: client.rut
          },
          cantidad_viajes: client.viajes,
          total_kilometros: Math.round(client.kilometros),
          monto_total: client.monto
        }));

        // Obtener lista única de clientes para el filtro
        const uniqueClients = Array.from(new Set(reportsData.map(r => r.empresaCliente?.nombre_comercial).filter(Boolean)));
        setClients(uniqueClients as string[]);

        setReports(reportsData);
        setFilteredReports(reportsData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching reports:', err);
        setError('Error al cargar reportes. Asegúrate de estar autenticado.');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Total trips:', trips.length);
    console.log('Start date:', startDate, 'End date:', endDate);
    
    // Función para calcular fare según la fórmula
    const calculateFare = (trip: any): number => {
      const baseRate = 1800;
      const airportSurcharge = 5000;
      const minimumFare = 30000;
      
      const distance = trip.distance || 20;
      
      const isAirport = 
        trip.origin?.toLowerCase().includes('aeropuerto') ||
        trip.destination?.toLowerCase().includes('aeropuerto');
      
      const baseCost = distance * baseRate;
      const surcharge = isAirport ? airportSurcharge : 0;
      return Math.max(baseCost + surcharge, minimumFare);
    };
    
    // Filtrar trips por fecha
    let filteredTrips = [...trips];
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      filteredTrips = trips.filter(trip => {
        if (!trip.scheduledDate) return false;
        const tripDate = new Date(trip.scheduledDate);
        return tripDate >= start && tripDate <= end;
      });
    }
    
    console.log('Filtered trips:', filteredTrips.length);
    
    // Procesar datos filtrados
    const clientsMap = new Map<string, {
      name: string;
      rut?: string;
      viajes: number;
      kilometros: number;
      monto: number;
    }>();

    filteredTrips.forEach((trip: any) => {
      const clientName = trip.client?.name || 'Cliente Desconocido';
      const clientRut = trip.client?.rut || '';
      
      if (trip.status !== 'CANCELADO') {
        if (!clientsMap.has(clientName)) {
          clientsMap.set(clientName, {
            name: clientName,
            rut: clientRut,
            viajes: 0,
            kilometros: 0,
            monto: 0
          });
        }

        const clientData = clientsMap.get(clientName)!;
        clientData.viajes += 1;
        if (typeof trip.distance === 'number' && !isNaN(trip.distance)) {
          clientData.kilometros += trip.distance;
        }
        clientData.monto += calculateFare(trip);
      }
    });

    const reportsData: ReportData[] = Array.from(clientsMap.values()).map(client => ({
      empresaCliente: {
        nombre_comercial: client.name,
        rut: client.rut
      },
      cantidad_viajes: client.viajes,
      total_kilometros: Math.round(client.kilometros),
      monto_total: client.monto
    }));

    // Filtrar por cliente seleccionado
    let finalReports = reportsData;
    if (selectedClient !== "Todas") {
      finalReports = reportsData.filter(r => r.empresaCliente?.nombre_comercial === selectedClient);
    }
    
    setFilteredReports(finalReports);
  };

  const handleExport = () => {
    if (filteredReports.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    // Generar contenido HTML para Excel
    const dateRange = startDate && endDate 
      ? `${new Date(startDate).toLocaleDateString('es-CL')} - ${new Date(endDate).toLocaleDateString('es-CL')}`
      : `${new Date().toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}`;

    const totalViajes = filteredReports.reduce((sum, r) => sum + (r.cantidad_viajes || 0), 0);
    const totalKilometros = filteredReports.reduce((sum, r) => sum + (r.total_kilometros || 0), 0);
    const totalFacturable = filteredReports.reduce((sum, r) => sum + (r.monto_total || 0), 0);

    const excelContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <style>
    body { font-family: Calibri, Arial, sans-serif; }
    .header { background-color: #003366; color: white; font-weight: bold; font-size: 18px; padding: 15px; text-align: center; }
    .subheader { background-color: #FF6600; color: white; font-weight: bold; font-size: 14px; padding: 10px; text-align: center; }
    .info { padding: 10px; font-size: 12px; background-color: #f8f9fa; }
    .info b { color: #003366; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th { background-color: #003366; color: white; font-weight: bold; padding: 12px 8px; text-align: left; border: 1px solid #ddd; font-size: 11px; text-transform: uppercase; }
    td { padding: 10px 8px; border: 1px solid #ddd; font-size: 11px; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .total-row { background-color: #f8f9fa; font-weight: bold; }
    .grand-total { background-color: #003366; color: white; font-weight: bold; font-size: 14px; }
    tr:nth-child(even) { background-color: #f8f9fa; }
    .summary-box { background-color: #e3f2fd; border-left: 4px solid #003366; padding: 15px; margin: 20px 0; }
    .summary-box h3 { color: #003366; margin: 0 0 10px 0; font-size: 14px; }
    .summary-item { display: inline-block; margin-right: 30px; margin-bottom: 10px; }
    .summary-label { font-weight: bold; color: #666; font-size: 11px; }
    .summary-value { font-size: 16px; color: #003366; font-weight: bold; }
    .footer { text-align: center; padding: 20px; font-size: 10px; color: #666; border-top: 2px solid #003366; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="header">SERVICIOS EL LOA - REPORTE DE GESTIÓN</div>
  <div class="subheader">Análisis de Viajes y Facturación</div>
  
  <div class="info">
    <p><b>Período de Análisis:</b> ${dateRange}</p>
    <p><b>Cliente/Empresa:</b> ${selectedClient}</p>
    <p><b>Fecha de Generación:</b> ${new Date().toLocaleDateString('es-CL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}</p>
    <p><b>Total de Registros:</b> ${filteredReports.length}</p>
  </div>

  <div class="summary-box">
    <h3>RESUMEN EJECUTIVO</h3>
    <div class="summary-item">
      <div class="summary-label">Total Viajes</div>
      <div class="summary-value">${totalViajes}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Total Kilómetros</div>
      <div class="summary-value">${totalKilometros.toLocaleString('es-CL')} km</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Total Facturable</div>
      <div class="summary-value">$${totalFacturable.toLocaleString('es-CL')}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Centro de Costo</th>
        <th class="text-center">Cantidad de Viajes</th>
        <th class="text-center">Kilómetros Recorridos</th>
        <th class="text-right">Total Facturable (CLP)</th>
      </tr>
    </thead>
    <tbody>
      ${filteredReports.map((report, idx) => `
        <tr>
          <td><b>${report.empresaCliente?.nombre_comercial || 'Sin empresa'}</b>${report.empresaCliente?.rut ? `<br><small style="color: #666;">RUT: ${report.empresaCliente.rut}</small>` : ''}</td>
          <td class="text-center">${report.cantidad_viajes || 0}</td>
          <td class="text-center">${(report.total_kilometros || 0).toLocaleString('es-CL')} km</td>
          <td class="text-right"><b>$${(report.monto_total || 0).toLocaleString('es-CL')}</b></td>
        </tr>
      `).join('')}
    </tbody>
    <tfoot>
      <tr class="grand-total">
        <td></td>
        <td class="text-center"><b>Total Viajes: ${totalViajes}</b></td>
        <td class="text-center"><b>${totalKilometros.toLocaleString('es-CL')} km</b></td>
        <td class="text-right"><b>${totalFacturable.toLocaleString('es-CL')}</b></td>
      </tr>
    </tfoot>
      <tfoot>
        <tr class="grand-total">
          <td class="text-center"><b>Total Viajes: ${totalViajes}</b></td>
          <td class="text-center"><b>${totalKilometros.toLocaleString('es-CL')} km</b></td>
          <td class="text-right" colspan="2"><b>${totalFacturable.toLocaleString('es-CL')}</b></td>
        </tr>
      </tfoot>
  </table>

  <div class="footer">
    <p><b>SERVICIOS EL LOA</b> - Transporte Corporativo y Privado</p>
    <p>Región de Antofagasta, Chile | www.elloa.cl | contacto@elloa.cl</p>
    <p>Este documento es confidencial y está destinado únicamente para uso interno</p>
  </div>
</body>
</html>
    `;

    // Crear blob y descargar
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const fileName = `Reporte_Gestion_${startDate || 'actual'}_${endDate || 'actual'}.xls`;
    a.download = fileName;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto p-6 lg:p-10 w-full">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={() => navigate("/")} 
              className="text-gray-500 hover:text-primary flex items-center gap-1 transition-colors mb-2 group"
            >
              <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span> 
              Volver al inicio
            </button>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
              <span className="material-icons text-3xl">analytics</span>
              Reportes de Gestión
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="bg-success text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-success/20 active:scale-95 font-bold"
            >
              <span className="material-icons">table_view</span>
              Exportar Excel
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <span className="material-icons text-primary">filter_alt</span>
            Generar Reporte Personalizado
          </h2>
          <p className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <span className="material-icons text-sm text-blue-500">info</span>
            El reporte incluye todas las solicitudes de servicio excepto las canceladas (PENDIENTE, AGENDADO, FINALIZADO, etc.)
          </p>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fecha Inicio</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Fecha Fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Empresa / Cliente</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Todas">Todas las empresas</option>
                {clients.map((client) => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-icons">search</span> Buscar
            </button>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="font-bold text-slate-700">
              Resultados: {startDate && endDate ? `${new Date(startDate).toLocaleDateString('es-CL')} - ${new Date(endDate).toLocaleDateString('es-CL')}` : new Date().toLocaleDateString('es-CL', {month: 'long', year: 'numeric'})}
            </span>
            <div className="text-sm font-bold text-primary bg-white px-3 py-1 rounded-lg border border-gray-200">
              {filteredReports.length} Registros
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Centro de Costo</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Cant. Viajes</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Kilómetros</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Facturable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-gray-500">
                      <span className="material-icons text-5xl text-gray-300 mb-2">search_off</span>
                      <p className="font-medium">No se encontraron resultados</p>
                      <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report: ReportData, idx: number) => (
                    <tr key={report.id || idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-700">
                        {report.empresaCliente?.nombre_comercial || 'Sin empresa'}
                      </td>
                      <td className="px-8 py-5 text-center text-slate-600 font-medium">
                        {report.cantidad_viajes || 0}
                      </td>
                      <td className="px-8 py-5 text-center text-slate-600 font-medium">
                        {(report.total_kilometros || 0).toLocaleString('es-CL')} km
                      </td>
                      <td className="px-8 py-5 text-right font-bold text-primary">
                        ${(report.monto_total || 0).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {filteredReports.length > 0 && (
              <tfoot className="bg-slate-50 border-t-2 border-slate-100">
                <tr>
                  <td className="px-8 py-6"></td>
                  <td className="px-8 py-6 text-center font-bold text-slate-500 uppercase tracking-wider">Total Viajes: {filteredReports.reduce((sum, r) => sum + (r.cantidad_viajes || 0), 0)}</td>
                  <td className="px-8 py-6 text-center font-bold text-slate-500">
                    {filteredReports.reduce((sum, r) => sum + (r.total_kilometros || 0), 0).toLocaleString('es-CL')} km
                  </td>
                  <td className="px-8 py-6 text-right font-black text-2xl text-secondary">
                    ${filteredReports.reduce((sum, r) => sum + (r.monto_total || 0), 0).toLocaleString('es-CL')}
                  </td>
                </tr>
              </tfoot>
              )}
            </table>
          </div>
        </div>
        )}
      </main>

      <footer className="mt-auto py-10 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
          © 2026 Transportes El Loa | Inteligencia de Negocios
        </div>
      </footer>
    </div>
  );
};

export default Reports;
