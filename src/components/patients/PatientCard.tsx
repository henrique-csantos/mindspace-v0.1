import React from 'react';
import Card, { CardContent } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { Calendar, Mail, Phone } from 'lucide-react';
import { Patient } from '../../types';

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onClick
}) => {
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200" onClick={onClick}>
      <CardContent className="p-5">
        <div className="flex items-start">
          <Avatar 
            src={patient.profileImage} 
            alt={patient.name}
            size="lg"
            status={patient.status === 'active' ? 'online' : 'offline'}
          />
          
          <div className="ml-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
              <Badge variant={patient.status === 'active' ? 'success' : 'danger'}>
                {patient.status === 'active' ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              <Calendar size={14} className="mr-1" />
              <span>{calculateAge(patient.dateOfBirth)} anos</span>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail size={14} className="mr-2" />
                <span>{patient.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Phone size={14} className="mr-2" />
                <span>{patient.phone}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Contato Preferido</p>
              <Badge variant="primary" className="mt-1">
                {patient.preferredContact === 'email' ? 'Email' : 
                 patient.preferredContact === 'phone' ? 'Telefone' : 'WhatsApp'}
              </Badge>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Convênio</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                {patient.insuranceProvider || 'Particular'}
              </p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cliente desde</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                {new Date(patient.joinedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;