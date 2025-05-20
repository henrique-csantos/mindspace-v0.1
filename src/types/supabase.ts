export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          role: 'admin' | 'psychologist' | 'receptionist' | 'financial'
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          role: 'admin' | 'psychologist' | 'receptionist' | 'financial'
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          role?: 'admin' | 'psychologist' | 'receptionist' | 'financial'
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      psychologists: {
        Row: {
          id: string
          user_id: string
          license_number: string
          specializations: string[]
          bio: string | null
          hourly_rate: number
          availability: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          specializations?: string[]
          bio?: string | null
          hourly_rate: number
          availability?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          specializations?: string[]
          bio?: string | null
          hourly_rate?: number
          availability?: Json
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          full_name: string
          email: string | null
          phone: string | null
          date_of_birth: string
          preferred_contact: 'email' | 'phone' | 'whatsapp' | null
          insurance_provider: string | null
          insurance_number: string | null
          emergency_contact: string | null
          notes: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          phone?: string | null
          date_of_birth: string
          preferred_contact?: 'email' | 'phone' | 'whatsapp' | null
          insurance_provider?: string | null
          insurance_number?: string | null
          emergency_contact?: string | null
          notes?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          date_of_birth?: string
          preferred_contact?: 'email' | 'phone' | 'whatsapp' | null
          insurance_provider?: string | null
          insurance_number?: string | null
          emergency_contact?: string | null
          notes?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          psychologist_id: string
          date: string
          start_time: string
          end_time: string
          type: 'in-person' | 'online'
          status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
          payment_status: 'pending' | 'paid' | 'partial' | 'insurance'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          psychologist_id: string
          date: string
          start_time: string
          end_time: string
          type: 'in-person' | 'online'
          status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
          payment_status?: 'pending' | 'paid' | 'partial' | 'insurance'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          psychologist_id?: string
          date?: string
          start_time?: string
          end_time?: string
          type?: 'in-person' | 'online'
          status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
          payment_status?: 'pending' | 'paid' | 'partial' | 'insurance'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      consultation_notes: {
        Row: {
          id: string
          appointment_id: string
          psychologist_id: string
          content: string
          diagnosis: string | null
          treatment: string | null
          medications: string[] | null
          follow_up_date: string | null
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          psychologist_id: string
          content: string
          diagnosis?: string | null
          treatment?: string | null
          medications?: string[] | null
          follow_up_date?: string | null
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          psychologist_id?: string
          content?: string
          diagnosis?: string | null
          treatment?: string | null
          medications?: string[] | null
          follow_up_date?: string | null
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          type: string
          url: string
          patient_id: string | null
          psychologist_id: string | null
          uploaded_by: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          url: string
          patient_id?: string | null
          psychologist_id?: string | null
          uploaded_by: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          url?: string
          patient_id?: string | null
          psychologist_id?: string | null
          uploaded_by?: string
          uploaded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}