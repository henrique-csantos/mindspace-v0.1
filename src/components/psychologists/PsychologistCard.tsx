import React from 'react';
import Card, { CardContent } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { Psychologist } from '../../types';

interface PsychologistCardProps {
  psychologist: Psychologist;
  onClick?: () => void;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
  onClick
}) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200" onClick={onClick}>
      <CardContent className="p-5">
        <div className="flex items-start">
          <Avatar 
            src={psychologist.profileImage} 
            alt={psychologist.name}
            size="lg"
            status={psychologist.status === 'active' ? 'online' : 'offline'}
          />
          
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">{psychologist.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{psychologist.licenseNumber}</p>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span>
                <span className="ml-2">{psychologist.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Telefone:</span>
                <span className="ml-2">{psychologist.phone}</span>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {psychologist.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="mt-1">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{psychologist.bio}</p>
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              R$ {psychologist.hourlyRate}/h
            </p>
            
            <Badge 
              variant={psychologist.status === 'active' ? 'success' : 'danger'}
            >
              {psychologist.status === 'active' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PsychologistCard;