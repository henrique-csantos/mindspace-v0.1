import React from 'react';
import { Clock, MapPin, Video } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { Appointment, Patient, Psychologist } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  patient: Patient;
  psychologist: Psychologist;
  onClick?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  patient,
  psychologist,
  onClick
}) => {
  // Status badge variant mapping
  const statusVariantMap: Record<string, any> = {
    scheduled: { variant: 'info', label: 'Agendado' },
    confirmed: { variant: 'primary', label: 'Confirmado' },
    completed: { variant: 'success', label: 'Realizado' },
    cancelled: { variant: 'danger', label: 'Cancelado' },
    'no-show': { variant: 'warning', label: 'Não Compareceu' }
  };

  // Payment status badge variant mapping
  const paymentVariantMap: Record<string, any> = {
    pending: { variant: 'warning', label: 'Pagamento Pendente' },
    paid: { variant: 'success', label: 'Pago' },
    partial: { variant: 'info', label: 'Pagamento Parcial' },
    insurance: { variant: 'secondary', label: 'Convênio' }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Avatar 
            src={patient.profileImage} 
            alt={patient.name} 
            size="md" 
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">{patient.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              com {psychologist.name}
            </p>
          </div>
        </div>
        <Badge variant={statusVariantMap[appointment.status].variant}>
          {statusVariantMap[appointment.status].label}
        </Badge>
      </div>
      
      <div className="space-y-2 mt-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Clock size={16} className="mr-2" />
          <span>{appointment.startTime} - {appointment.endTime}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          {appointment.type === 'in-person' ? (
            <MapPin size={16} className="mr-2" />
          ) : (
            <Video size={16} className="mr-2" />
          )}
          <span>{appointment.type === 'in-person' ? 'Presencial' : 'Online'}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
        <Badge 
          variant={paymentVariantMap[appointment.paymentStatus].variant}
          className="text-xs"
        >
          {paymentVariantMap[appointment.paymentStatus].label}
        </Badge>
      </div>
    </div>
  );
};

export default AppointmentCard;