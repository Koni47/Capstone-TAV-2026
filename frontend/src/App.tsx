import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Companies from './pages/Companies'
import Vehicles from './pages/Vehicles'
import Users from './pages/Users'
import Payment from './pages/Payment'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/users" element={<Users />} />
      <Route path="/service-request" element={<Payment />} />
      <Route path="/dashboard-admin" element={<AdminDashboard />} />
    </Routes>
  )
}
