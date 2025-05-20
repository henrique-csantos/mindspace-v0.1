import React from 'react';
import CalendarComponent from '../components/calendar/Calendar';
import { mockAppointments, mockPatients, mockPsychologists } from '../mockData';

const CalendarPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agenda</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gerencie suas consultas e agendamentos
        </p>
      </div>
      
      <CalendarComponent
        appointments={mockAppointments}
        patients={mockPatients}
        psychologists={mockPsychologists}
      />
    </div>
  );
};

export default CalendarPage;