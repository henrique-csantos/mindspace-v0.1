import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/Calendar';
import Psychologists from './pages/Psychologists';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route 
                path="psychologists" 
                element={
                  <ProtectedRoute roles={['admin', 'receptionist']}>
                    <Psychologists />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="patients" 
                element={
                  <ProtectedRoute roles={['admin', 'receptionist', 'psychologist']}>
                    <Patients />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="settings" 
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="users" 
                element={
                  <ProtectedRoute roles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;