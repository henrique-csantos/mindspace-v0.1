import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Mail, Phone, MessageSquare, Calendar, Clock, MapPin, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog';
import Button from '../ui/Button';
import { Appointment, Patient, Psychologist } from '../../types';

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  patient: Patient;
  psychologist: Psychologist;
  onUpdate: (updatedAppointment: Appointment) => void;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  isOpen,
  onClose,
  appointment,
  patient,
  psychologist,
  onUpdate
}) => {
  // Protege contra dados indefinidos
  if (!appointment || !patient || !psychologist) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  // Garante que a data está no formato ISO
  const getSafeDate = (dateStr: string) => {
    // Se já estiver no formato ISO, retorna, senão tenta converter
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;
    try {
      return format(parseISO(dateStr), 'yyyy-MM-dd');
    } catch {
      return '';
    }
  };

  const handleSave = () => {
    onUpdate(editedAppointment);
    setIsEditing(false);
  };

  const handleContactPatient = (method: 'email' | 'whatsapp' | 'phone') => {
    switch (method) {
      case 'email':
        window.location.href = `mailto:${patient.email}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${patient.phone.replace(/\D/g, '')}`, '_blank');
        break;
      case 'phone':
        window.location.href = `tel:${patient.phone}`;
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Consulta</DialogTitle>
          <DialogDescription>
            {appointment.date
              ? format(parseISO(getSafeDate(appointment.date)), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              : 'Data não informada'}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Informações do Paciente
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Nome</label>
                <p className="text-gray-900 dark:text-white">{patient.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Contato</label>
                <div className="flex space-x-2 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Mail size={16} />}
                    onClick={() => handleContactPatient('email')}
                  >
                    Email
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Phone size={16} />}
                    onClick={() => handleContactPatient('phone')}
                  >
                    Ligar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<MessageSquare size={16} />}
                    onClick={() => handleContactPatient('whatsapp')}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Detalhes da Consulta
            </h3>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      value={editedAppointment.date}
                      onChange={(e) => setEditedAppointment({
                        ...editedAppointment,
                        date: e.target.value
                      })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Horário
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="time"
                        value={editedAppointment.startTime}
                        onChange={(e) => setEditedAppointment({
                          ...editedAppointment,
                          startTime: e.target.value
                        })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      <input
                        type="time"
                        value={editedAppointment.endTime}
                        onChange={(e) => setEditedAppointment({
                          ...editedAppointment,
                          endTime: e.target.value
                        })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Consulta
                  </label>
                  <select
                    value={editedAppointment.type}
                    onChange={(e) => setEditedAppointment({
                      ...editedAppointment,
                      type: e.target.value as 'in-person' | 'online'
                    })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  >
                    <option value="in-person">Presencial</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Observações
                  </label>
                  <textarea
                    value={editedAppointment.notes || ''}
                    onChange={(e) => setEditedAppointment({
                      ...editedAppointment,
                      notes: e.target.value
                    })}
                    rows={3}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span>{format(parseISO(appointment.date), 'dd/MM/yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>{appointment.startTime} - {appointment.endTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.type === 'in-person' ? (
                    <MapPin size={16} className="text-gray-500" />
                  ) : (
                    <Video size={16} className="text-gray-500" />
                  )}
                  <span>{appointment.type === 'in-person' ? 'Presencial' : 'Online'}</span>
                </div>
                {appointment.notes && (
                  <p className="text-gray-600 dark:text-gray-300">{appointment.notes}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar Alterações
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                Editar Consulta
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsModal;