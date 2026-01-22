import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import AdminDashboard from './pages/AdminDashboard'
import ClientDashboard from './pages/ClientDashboard'
import DriverDashboard from './pages/DriverDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-adm" element={<Register />} />
      <Route path="/recover-password" element={<RecoverPassword />} />

      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/driver" element={<DriverDashboard />} />
      <Route path="/dashboard/client" element={<ClientDashboard />} />

      <Route path="/portal" element={<ClientPortal />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/page-2" element={<CompaniesPage2 />} />
      <Route path="/company/:id" element={<CompanyDetail />} />
      <Route path="/company/:id/edit" element={<CompanyEdit />} />

      <Route path="/users" element={<Users />} />
      <Route path="/users/page-2" element={<UsersPage2 />} />
      <Route path="/user/:id" element={<UserDetail />} />
      <Route path="/user/:id/edit" element={<UserEdit />} />

      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicle/:id" element={<VehicleDetail />} />
      <Route path="/vehicle/:id/edit" element={<VehicleEdit />} />

      <Route path="/trips" element={<Trips />} />
      <Route path="/trip/:id" element={<TripDetail />} />

      <Route path="/service-request" element={<ServiceRequest />} />
      <Route path="/payment" element={<Payment />} />

      <Route path="/reports" element={<Reports />} />
      <Route path="/complaints" element={<Complaints />} />

      <Route path="/contact" element={<ClientPortal />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

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
      <Route path="/dashboard-chof.html" element={<Navigate to="/dashboard/driver" replace />} />
      <Route path="/vehicle-detail.html" element={<Navigate to="/vehicle/1" replace />} />
      <Route path="/vehicle-edit.html" element={<Navigate to="/vehicle/1/edit" replace />} />
      <Route path="/user-detail.html" element={<Navigate to="/user/1" replace />} />
      <Route path="/user-edit.html" element={<Navigate to="/user/1/edit" replace />} />
      <Route path="/company-detail.html" element={<Navigate to="/company/1" replace />} />
      <Route path="/company-edit.html" element={<Navigate to="/company/1/edit" replace />} />
      <Route path="/trip-detail.html" element={<Navigate to="/trip/1" replace />} />
      <Route path="/admin-dashboard.html" element={<Navigate to="/dashboard/admin" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
