import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ClientPortal from './pages/ClientPortal'
import Companies from './pages/Companies'
import CompaniesPage2 from './pages/CompaniesPage2'
import CompanyDetail from './pages/CompanyDetail'
import CompanyEdit from './pages/CompanyEdit'
import Complaints from './pages/Complaints'
import Payment from './pages/Payment'
import Privacy from './pages/Privacy'
import RecoverPassword from './pages/RecoverPassword'
import Terms from './pages/Terms'
import Trips from './pages/Trips'
import UserDetail from './pages/UserDetail'
import UserEdit from './pages/UserEdit'
import UsersPage2 from './pages/UsersPage2'
import Users from './pages/Users'
import Vehicles from './pages/Vehicles'
import VehicleEdit from './pages/VehicleEdit'
import VehicleDetail from './pages/VehicleDetail'
import TripDetail from './pages/TripDetail'
import Reports from './pages/Reports'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies-page-2" element={<CompaniesPage2 />} />
      <Route path="/company-detail" element={<CompanyDetail />} />
      <Route path="/company-edit" element={<CompanyEdit />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/service-request" element={<Payment />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/user-detail" element={<UserDetail />} />
      <Route path="/user-edit" element={<UserEdit />} />
      <Route path="/users-page-2" element={<UsersPage2 />} />
      <Route path="/users" element={<Users />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicle-edit" element={<VehicleEdit />} />
      <Route path="/vehicle-detail" element={<VehicleDetail />} />
      <Route path="/trip-detail" element={<TripDetail />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}
