import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { AuthProvider } from '../context/AuthContext';
import DashboardRedirect from '../pages/Dashboard';

// Pages
import LandingPage from '../pages/LandingPage'; // Import Landing Page
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import LogoutPage from '../pages/auth/LogoutPage';
import RecoverPasswordPage from '../pages/auth/RecoverPasswordPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import DriverDashboard from '../pages/driver/DriverDashboard';
import ClientDashboard from '../pages/client/ClientDashboard';
import VehicleList from '../pages/admin/VehicleList';
import VehicleEdit from '../pages/admin/VehicleEdit';
import VehicleDetail from '../pages/admin/VehicleDetail';
import UserManagement from '../pages/admin/UserManagement';
import UserEdit from '../pages/admin/UserEdit';
import CompanyList from '../pages/admin/CompanyList';
import CompanyEdit from '../pages/admin/CompanyEdit';
import CompanyDetail from '../pages/admin/CompanyDetail';
import AdminRequestList from '../pages/admin/AdminRequestList';
import DriverTrips from '../pages/driver/DriverTrips';

import ClientRequest from '../pages/client/ClientRequest';
import PaymentPage from '../pages/client/PaymentPage';
import PaymentResultPage from '../pages/client/PaymentResultPage';
import ServiceHistoryPage from '../pages/client/ServiceHistoryPage';

import ProfilePage from '../pages/generic/ProfilePage';
import ComplaintsPage from '../pages/generic/ComplaintsPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';
import WorkWithUsPage from '../pages/WorkWithUsPage';
import AdminMessages from '../pages/admin/AdminMessages';
import DispatchPage from '../pages/admin/DispatchPage';
import AdminComplaints from '../pages/admin/AdminComplaints';

// Protected Route Wrapper
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-10 text-center">Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Landing Page (Home) */}
          <Route path="/" element={<LandingPage />} />

          {/* Rutas Públicas */}
          <Route path="/client/request" element={<ClientRequest />} />
          <Route path="/client/payment" element={<PaymentPage />} />
          <Route path="/client/payment/commit" element={<PaymentResultPage />} />
          <Route path="/payment-result" element={<PaymentResultPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/recover-password" element={<RecoverPasswordPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/work-with-us" element={<WorkWithUsPage />} />

          {/* Redirector inteligente */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Rutas Protegidas (Dashboard Layout Wrapper) */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/vehicles/new" element={<VehicleEdit />} />
            <Route path="/admin/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/admin/vehicles/:id/edit" element={<VehicleEdit />} />
            <Route path="/admin/vehicles" element={<VehicleList />} />
            <Route path="/admin/users/new" element={<UserEdit />} />
            <Route path="/admin/users/:id/edit" element={<UserEdit />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/companies" element={<CompanyList />} />
            <Route path="/admin/companies/new" element={<CompanyEdit />} />
            <Route path="/admin/companies/:id" element={<CompanyDetail />} />
            <Route path="/admin/companies/:id/edit" element={<CompanyEdit />} />
            <Route path="/admin/requests" element={<AdminRequestList />} />
            <Route path="/admin/dispatch" element={<DispatchPage />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />

            {/* Driver Routes */}
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/trips" element={<DriverTrips />} />

            {/* Client Routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            {/* Request moved to public */}
            <Route path="/client/trips" element={<ServiceHistoryPage />} />

            {/* Shared Routes */}
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* 404 Wildcard */}
          <Route
            path="*"
            element={<div className="p-10 text-center">404 - Página no encontrada</div>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
