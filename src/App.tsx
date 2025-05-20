import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/Calendar';
import Psychologists from './pages/Psychologists';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

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
              <Route path="psychologists" element={<Psychologists />} />
              <Route path="patients" element={<Patients />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;