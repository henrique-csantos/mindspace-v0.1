import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog';
import Button from '../ui/Button';
import { Appointment, Patient, Psychologist } from '../../types';
import { useAppointmentStore } from '../../store/appointmentStore';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  date?: string;
  patients: Patient[];
  psychologists: Psychologist[];
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  date,
  patients,
  psychologists
}) => {
  const addAppointment = useAppointmentStore(state => state.addAppointment);
  
  const [formData, setFormData] = useState<Partial<Appointment>>({
    date: date || format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    type: 'in-person',
    status: 'scheduled',
    paymentStatus: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.patientId && formData.psychologistId && formData.date) {
      const newAppointment: Appointment = {
        id: `app-${Date.now()}`,
        ...formData as Appointment
      };
      
      addAppointment(newAppointment);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nova Consulta</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Paciente
            </label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              required
            >
              <option value="">Selecione um paciente</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Psicólogo
            </label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.psychologistId}
              onChange={(e) => setFormData({ ...formData, psychologistId: e.target.value })}
              required
            >
              <option value="">Selecione um psicólogo</option>
              {psychologists.map((psychologist) => (
                <option key={psychologist.id} value={psychologist.id}>
                  {psychologist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'in-person' | 'online' })}
                required
              >
                <option value="in-person">Presencial</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horário Início
              </label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horário Fim
              </label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">
              Agendar Consulta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentModal;