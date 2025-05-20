import React from 'react';
import { Users, UserSquare, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ActivityChart from '../components/dashboard/ActivityChart';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { mockDashboardStats, mockAppointments, mockPatients, mockPsychologists } from '../mockData';
import AppointmentCard from '../components/calendar/AppointmentCard';

const Dashboard: React.FC = () => {
  // Function to get patient by ID
  const getPatient = (id: string) => {
    return mockPatients.find(patient => patient.id === id);
  };

  // Function to get psychologist by ID
  const getPsychologist = (id: string) => {
    return mockPsychologists.find(psych => psych.id === id);
  };

  // Get upcoming appointments (limited to 3)
  const upcomingAppointments = mockAppointments
    .filter(app => new Date(app.date) >= new Date() && app.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Bem-vindo de volta! Aqui está um resumo da sua clínica.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pacientes Ativos"
          value={mockDashboardStats.activePatients}
          icon={<Users size={24} className="text-teal-600 dark:text-teal-400" />}
          change={{ value: 12, isPositive: true }}
          bgColor="bg-teal-500"
        />
        
        <StatCard
          title="Psicólogos"
          value={mockDashboardStats.activePsychologists}
          icon={<UserSquare size={24} className="text-purple-600 dark:text-purple-400" />}
          bgColor="bg-purple-500"
        />
        
        <StatCard
          title="Consultas do Mês"
          value={mockDashboardStats.totalAppointments}
          icon={<CalendarIcon size={24} className="text-blue-600 dark:text-blue-400" />}
          change={{ value: 8, isPositive: true }}
          bgColor="bg-blue-500"
        />
        
        <StatCard
          title="Receita Mensal"
          value={formatCurrency(mockDashboardStats.totalRevenue)}
          icon={<DollarSign size={24} className="text-green-600 dark:text-green-400" />}
          change={{ value: 5, isPositive: true }}
          bgColor="bg-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        
        <div>
          <PerformanceChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    patient={getPatient(appointment.patientId)!}
                    psychologist={getPsychologist(appointment.psychologistId)!}
                  />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Não há consultas agendadas.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Tipo</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Presenciais</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">64%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Online</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">36%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '36%' }} />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Convênio</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">42%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Particular</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">58%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;