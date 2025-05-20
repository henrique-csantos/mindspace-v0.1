import { Appointment, Patient, Psychologist, DashboardStats } from './types';

// Current date for generating relative dates
const now = new Date();

// Helper to create dates relative to today
const createDate = (dayOffset: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

export const mockPsychologists: Psychologist[] = [
  {
    id: 'psy-1',
    name: 'Dr. Ana Silva',
    email: 'ana.silva@mindspace.com',
    phone: '(11) 98765-4321',
    licenseNumber: 'CRP 06/12345',
    specializations: ['Cognitive Behavioral Therapy', 'Anxiety Disorders'],
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '16:00' }
    ],
    bio: 'Specialist in anxiety and depression treatment with 10 years of experience.',
    hourlyRate: 250,
    profileImage: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg',
    status: 'active'
  },
  {
    id: 'psy-2',
    name: 'Dr. Rafael Mendes',
    email: 'rafael.mendes@mindspace.com',
    phone: '(11) 97654-3210',
    licenseNumber: 'CRP 06/54321',
    specializations: ['Psychoanalysis', 'Relationship Therapy'],
    availability: [
      { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' }
    ],
    bio: 'Psychoanalyst with focus on relationship issues and personal development.',
    hourlyRate: 280,
    profileImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    status: 'active'
  },
  {
    id: 'psy-3',
    name: 'Dra. Carla Oliveira',
    email: 'carla.oliveira@mindspace.com',
    phone: '(11) 96543-2109',
    licenseNumber: 'CRP 06/67890',
    specializations: ['Child Psychology', 'ADHD', 'Autism Spectrum'],
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '17:00' }
    ],
    bio: 'Child psychologist specializing in neurodevelopmental disorders.',
    hourlyRate: 300,
    profileImage: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg',
    status: 'active'
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'pat-1',
    name: 'João Pereira',
    email: 'joao.pereira@email.com',
    phone: '(11) 91234-5678',
    dateOfBirth: '1985-06-15',
    preferredContact: 'whatsapp',
    insuranceProvider: 'Unimed',
    insuranceNumber: '123456789',
    notes: 'Seeking therapy for work-related stress.',
    emergencyContact: 'Maria Pereira (esposa) - (11) 98765-4321',
    joinedAt: '2023-01-10',
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: 'pat-2',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    phone: '(11) 92345-6789',
    dateOfBirth: '1990-11-23',
    preferredContact: 'email',
    insuranceProvider: 'Bradesco Saúde',
    insuranceNumber: '987654321',
    notes: 'History of anxiety disorder.',
    joinedAt: '2023-02-05',
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
  },
  {
    id: 'pat-3',
    name: 'Lucas Santos',
    email: 'lucas.santos@email.com',
    phone: '(11) 93456-7890',
    dateOfBirth: '1978-03-30',
    preferredContact: 'phone',
    notes: 'Self-referred for depression symptoms.',
    joinedAt: '2023-03-15',
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: 'pat-4',
    name: 'Camila Rodrigues',
    email: 'camila.rodrigues@email.com',
    phone: '(11) 94567-8901',
    dateOfBirth: '1995-09-12',
    preferredContact: 'whatsapp',
    insuranceProvider: 'Amil',
    insuranceNumber: '456789123',
    emergencyContact: 'Roberto Rodrigues (pai) - (11) 97890-1234',
    joinedAt: '2023-01-25',
    status: 'inactive',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'pat-1',
    psychologistId: 'psy-1',
    date: createDate(0),
    startTime: '09:00',
    endTime: '10:00',
    status: 'confirmed',
    notes: 'Follow-up session on stress management techniques.',
    type: 'in-person',
    paymentStatus: 'insurance'
  },
  {
    id: 'app-2',
    patientId: 'pat-2',
    psychologistId: 'psy-2',
    date: createDate(1),
    startTime: '14:00',
    endTime: '15:00',
    status: 'scheduled',
    type: 'online',
    paymentStatus: 'pending'
  },
  {
    id: 'app-3',
    patientId: 'pat-3',
    psychologistId: 'psy-3',
    date: createDate(-1),
    startTime: '11:00',
    endTime: '12:00',
    status: 'completed',
    notes: 'Discussed family relationship dynamics.',
    type: 'in-person',
    paymentStatus: 'paid'
  },
  {
    id: 'app-4',
    patientId: 'pat-4',
    psychologistId: 'psy-1',
    date: createDate(2),
    startTime: '16:00',
    endTime: '17:00',
    status: 'scheduled',
    type: 'online',
    paymentStatus: 'pending'
  },
  {
    id: 'app-5',
    patientId: 'pat-1',
    psychologistId: 'psy-3',
    date: createDate(-3),
    startTime: '10:00',
    endTime: '11:00',
    status: 'completed',
    type: 'in-person',
    paymentStatus: 'paid'
  },
  {
    id: 'app-6',
    patientId: 'pat-2',
    psychologistId: 'psy-2',
    date: createDate(-5),
    startTime: '15:00',
    endTime: '16:00',
    status: 'cancelled',
    notes: 'Patient canceled due to illness.',
    type: 'online',
    paymentStatus: 'pending'
  },
  {
    id: 'app-7',
    patientId: 'pat-3',
    psychologistId: 'psy-1',
    date: createDate(3),
    startTime: '09:00',
    endTime: '10:00',
    status: 'scheduled',
    type: 'in-person',
    paymentStatus: 'insurance'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalAppointments: 45,
  completedAppointments: 32,
  cancelledAppointments: 5,
  totalRevenue: 12750,
  upcomingAppointments: 8,
  activePatients: 18,
  activePsychologists: 3
};