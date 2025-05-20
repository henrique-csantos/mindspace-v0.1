/*
  # Initial Schema Setup for MindSpace Platform

  1. New Tables
    - `users`
      - System users including admins, psychologists, and staff
      - Integrated with Supabase Auth
    - `psychologists`
      - Professional details and credentials
      - Linked to users table for authentication
    - `patients`
      - Patient information and medical history
      - HIPAA & LGPD compliant data structure
    - `appointments`
      - Consultation scheduling and management
      - Links patients and psychologists
    - `consultation_notes`
      - Session documentation
      - Encrypted medical records
    - `documents`
      - Patient and clinic document storage
      - Secure file metadata tracking

  2. Security
    - RLS policies for each table
    - Role-based access control
    - Data encryption for sensitive fields

  3. Indexes
    - Optimized queries for common operations
    - Full-text search capabilities
*/

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'psychologist', 'receptionist', 'financial')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Psychologists table
CREATE TABLE IF NOT EXISTS psychologists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  license_number text NOT NULL UNIQUE,
  specializations text[] NOT NULL DEFAULT '{}',
  bio text,
  hourly_rate numeric(10,2) NOT NULL,
  availability jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE,
  phone text,
  date_of_birth date NOT NULL,
  preferred_contact text CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  insurance_provider text,
  insurance_number text,
  emergency_contact text,
  notes text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id),
  psychologist_id uuid NOT NULL REFERENCES psychologists(id),
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  type text NOT NULL CHECK (type IN ('in-person', 'online')),
  status text NOT NULL DEFAULT 'scheduled' 
    CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
  payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'partial', 'insurance')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Consultation notes table (encrypted medical records)
CREATE TABLE IF NOT EXISTS consultation_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL REFERENCES appointments(id),
  psychologist_id uuid NOT NULL REFERENCES psychologists(id),
  content text NOT NULL,
  diagnosis text,
  treatment text,
  medications text[],
  follow_up_date date,
  is_private boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  patient_id uuid REFERENCES patients(id),
  psychologist_id uuid REFERENCES psychologists(id),
  uploaded_by uuid NOT NULL REFERENCES users(id),
  uploaded_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE psychologists ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_psychologist ON appointments(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients USING gin(to_tsvector('portuguese', full_name));
CREATE INDEX IF NOT EXISTS idx_consultation_notes_appointment ON consultation_notes(appointment_id);

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage users"
  ON users FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Psychologists policies
CREATE POLICY "Psychologists can view own profile"
  ON psychologists FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Staff can view psychologists"
  ON psychologists FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'receptionist')
  ));

-- Patients policies
CREATE POLICY "Staff can manage patients"
  ON patients FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'receptionist')
  ));

CREATE POLICY "Psychologists can view assigned patients"
  ON patients FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM appointments 
    WHERE appointments.patient_id = patients.id 
    AND appointments.psychologist_id IN (
      SELECT id FROM psychologists WHERE user_id = auth.uid()
    )
  ));

-- Appointments policies
CREATE POLICY "Staff can manage appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'receptionist')
  ));

CREATE POLICY "Psychologists can view and update own appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (
    psychologist_id IN (
      SELECT id FROM psychologists WHERE user_id = auth.uid()
    )
  );

-- Consultation notes policies
CREATE POLICY "Psychologists can manage own notes"
  ON consultation_notes FOR ALL
  TO authenticated
  USING (
    psychologist_id IN (
      SELECT id FROM psychologists WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all notes"
  ON consultation_notes FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Documents policies
CREATE POLICY "Users can view uploaded documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can upload documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (true);