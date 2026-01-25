import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ClientPortal from './pages/ClientPortal'
import Companies from './pages/Companies'
import CompaniesPage2 from './pages/CompaniesPage2'
import CompanyDetail from './pages/CompanyDetail'
import CompanyEdit from './pages/CompanyEdit'
import Complaints from './pages/Complaints'
import Payment from './pages/Payment'
import ServiceRequest from './pages/ServiceRequest'
import Privacy from './pages/Privacy'
import RecoverPassword from './pages/RecoverPassword'
import Terms from './pages/Terms'
import Trips from './pages/Trips'
import TripDetail from './pages/TripDetail'
import UserDetail from './pages/UserDetail'
import UserEdit from './pages/UserEdit'
import UsersPage2 from './pages/UsersPage2'
import Users from './pages/Users'
import Vehicles from './pages/Vehicles'
import VehicleEdit from './pages/VehicleEdit'
import VehicleDetail from './pages/VehicleDetail'
import VehicleAdd from './pages/VehicleAdd'
import UserAdd from './pages/UserAdd'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import AdminDashboard from './pages/AdminDashboard'
import ClientDashboard from './pages/ClientDashboard'
import DriverDashboard from './pages/DriverDashboard'
import NotFound from './pages/NotFound'
import WorkWithUs from './pages/WorkWithUs'
import ServiceRequestCreate from './pages/ServiceRequestCreate'
import PortalChoferes from './pages/PortalChoferes'

export default function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-adm" element={<Register />} />
      <Route path="/recover-password" element={<RecoverPassword />} />

      <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />
      <Route path="/AdminDashboard" element={<Navigate to="/dashboard/admin" replace />} />
      <Route path="/admindashboard" element={<Navigate to="/dashboard/admin" replace />} />
      <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/driver" element={<ProtectedRoute allowedRoles={['CHOFER']}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/client" element={<ProtectedRoute allowedRoles={['CLIENTE']}><ClientDashboard /></ProtectedRoute>} />

      <Route path="/portal" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="/companies" element={<ProtectedRoute allowedRoles={['ADMIN']}><Companies /></ProtectedRoute>} />
      <Route path="/companies/page-2" element={<ProtectedRoute allowedRoles={['ADMIN']}><CompaniesPage2 /></ProtectedRoute>} />
      <Route path="/company/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><CompanyDetail /></ProtectedRoute>} />
      <Route path="/company/:id/edit" element={<ProtectedRoute allowedRoles={['ADMIN']}><CompanyEdit /></ProtectedRoute>} />
      <Route path="/company-edit" element={<ProtectedRoute allowedRoles={['ADMIN']}><CompanyEdit /></ProtectedRoute>} />

      <Route path="/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><Users /></ProtectedRoute>} />
      <Route path="/users/page-2" element={<ProtectedRoute allowedRoles={['ADMIN']}><UsersPage2 /></ProtectedRoute>} />
      <Route path="/useradd" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserAdd /></ProtectedRoute>} />
      <Route path="/user/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserDetail /></ProtectedRoute>} />
      <Route path="/user/:id/edit" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserEdit /></ProtectedRoute>} />

      <Route path="/vehicles" element={<ProtectedRoute allowedRoles={['ADMIN']}><Vehicles /></ProtectedRoute>} />
      <Route path="/vehicleadd" element={<ProtectedRoute allowedRoles={['ADMIN']}><VehicleAdd /></ProtectedRoute>} />
      <Route path="/vehicle/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><VehicleDetail /></ProtectedRoute>} />
      <Route path="/vehicle/:id/edit" element={<ProtectedRoute allowedRoles={['ADMIN']}><VehicleEdit /></ProtectedRoute>} />

      <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
      <Route path="/trip/:id" element={<ProtectedRoute><TripDetail /></ProtectedRoute>} />

      <Route path="/service-request" element={<ProtectedRoute allowedRoles={['ADMIN', 'CLIENTE']}><ServiceRequest /></ProtectedRoute>} />
      <Route path="/service-request-create" element={<ProtectedRoute allowedRoles={['ADMIN', 'CLIENTE']}><ServiceRequestCreate /></ProtectedRoute>} />
      <Route path="/portal-choferes" element={<ProtectedRoute allowedRoles={['CHOFER']}><PortalChoferes /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute allowedRoles={['CLIENTE']}><Payment /></ProtectedRoute>} />

      <Route path="/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><Reports /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />

      <Route path="/contact" element={<ClientPortal />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/trabaja-nosotros" element={<WorkWithUs />} />

      {/* Legacy redirects for HTML mocks */}
      <Route path="/login.html" element={<Navigate to="/login" replace />} />
      <Route path="/register.html" element={<Navigate to="/register" replace />} />
      <Route path="/companies.html" element={<Navigate to="/companies" replace />} />
      <Route path="/companies-page-2.html" element={<Navigate to="/companies/page-2" replace />} />
      <Route path="/trips.html" element={<Navigate to="/trips" replace />} />
      <Route path="/service-request.html" element={<Navigate to="/service-request" replace />} />
      <Route path="/users.html" element={<Navigate to="/users" replace />} />
      <Route path="/users-page-2.html" element={<Navigate to="/users/page-2" replace />} />
      <Route path="/recover-password.html" element={<Navigate to="/recover-password" replace />} />
      <Route path="/dashboard_adm.html" element={<Navigate to="/dashboard/admin" replace />} />
      <Route path="/dashboard-cli.html" element={<Navigate to="/dashboard/client" replace />} />
      <Route path="/dashboard-chof.html" element={<Navigate to="/dashboard/driver" replace />} />      <Route path="/vehicles.html" element={<Navigate to="/vehicles" replace />} />
      <Route path="/vehicle-add.html" element={<Navigate to="/vehicle-add" replace />} />      <Route path="/vehicle-detail.html" element={<Navigate to="/vehicle/1" replace />} />
      <Route path="/vehicle-edit.html" element={<Navigate to="/vehicle/1/edit" replace />} />
      <Route path="/user-detail.html" element={<Navigate to="/user/1" replace />} />
      <Route path="/user-edit.html" element={<Navigate to="/user/1/edit" replace />} />
      <Route path="/company-detail.html" element={<Navigate to="/company/1" replace />} />
      <Route path="/company-edit.html" element={<Navigate to="/company/1/edit" replace />} />
      <Route path="/trip-detail.html" element={<Navigate to="/trip/1" replace />} />
      <Route path="/admin-dashboard.html" element={<Navigate to="/dashboard/admin" replace />} />
      <Route path="/trabaja-nosotros.html" element={<Navigate to="/trabaja-nosotros" replace />} />
      <Route path="/service-request-create.html" element={<Navigate to="/service-request-create" replace />} />
      <Route path="/portal-choferes.html" element={<Navigate to="/portal-choferes" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}
