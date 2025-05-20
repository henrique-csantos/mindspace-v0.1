import { create } from 'zustand';
import { Appointment } from '../types';
import { mockAppointments } from '../mockData';

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentsByDate: (date: string) => Appointment[];
  getAppointmentsByDateRange: (startDate: string, endDate: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: mockAppointments,
  
  addAppointment: (appointment) => {
    set((state) => ({
      appointments: [...state.appointments, appointment]
    }));
  },
  
  updateAppointment: (appointment) => {
    set((state) => ({
      appointments: state.appointments.map((app) =>
        app.id === appointment.id ? appointment : app
      )
    }));
  },
  
  deleteAppointment: (id) => {
    set((state) => ({
      appointments: state.appointments.filter((app) => app.id !== id)
    }));
  },
  
  getAppointmentsByDate: (date) => {
    return get().appointments.filter((app) => app.date === date);
  },
  
  getAppointmentsByDateRange: (startDate, endDate) => {
    return get().appointments.filter(
      (app) => app.date >= startDate && app.date <= endDate
    );
  }
}));