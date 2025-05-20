import { ReactNode } from 'react';

export interface Appointment {
  id: string;
  patientId: string;
  psychologistId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  type: 'in-person' | 'online';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'insurance';
  sessionNotes?: string;
  diagnosis?: string;
  treatment?: string;
  insuranceDetails?: {
    provider: string;
    authorizationNumber?: string;
    coveragePercentage: number;
  };
  paymentAmount?: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
  emergencyContact?: string;
  joinedAt: string;
  status: 'active' | 'inactive';
  profileImage?: string;
  totalSpent?: number;
  lastAppointment?: string;
  upcomingAppointment?: string;
  preferredPsychologist?: string;
  medicalHistory?: string[];
  documents?: Document[];
  consultationHistory?: ConsultationNote[];
}

export interface ConsultationNote {
  id: string;
  appointmentId: string;
  date: string;
  psychologistId: string;
  content: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  followUpDate?: string;
  isPrivate: boolean;
}

export interface Psychologist {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specializations: string[];
  availability: Availability[];
  bio: string;
  hourlyRate: number;
  profileImage?: string;
  status: 'active' | 'inactive';
  totalPatients?: number;
  totalAppointments?: number;
  averageRating?: number;
  revenueStats?: {
    monthly: number;
    yearly: number;
  };
  appointmentTypes?: {
    inPerson: number;
    online: number;
  };
  insuranceAcceptance?: {
    providers: string[];
    rates: Record<string, number>;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  upcomingAppointments: number;
  activePatients: number;
  activePsychologists: number;
  revenueByType?: {
    insurance: number;
    private: number;
  };
  appointmentsByType?: {
    inPerson: number;
    online: number;
  };
  psychologistStats?: {
    id: string;
    name: string;
    appointmentsToday: number;
    appointmentsThisWeek: number;
    revenue: number;
  }[];
}

export type UserRole = 'admin' | 'psychologist' | 'receptionist' | 'financial';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  lastLogin?: string;
  status: 'active' | 'inactive';
  psychologistId?: string; // Only for users with role 'psychologist'
}

export type Permission = 
  | 'manage_users'
  | 'view_financial'
  | 'manage_appointments'
  | 'manage_patients'
  | 'manage_psychologists'
  | 'view_consultation_notes'
  | 'manage_consultation_notes'
  | 'view_dashboard'
  | 'manage_settings';

export type ThemeMode = 'light' | 'dark';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
}