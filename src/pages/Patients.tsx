import React from 'react';
import { Plus, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import PatientCard from '../components/patients/PatientCard';
import { mockPatients } from '../mockData';

const Patients: React.FC = () => {
  const handleNewPatient = () => {
    console.log('New patient clicked');
    // Add your new patient logic here
  };

  const handlePatientClick = (patientId: string) => {
    console.log('Patient clicked:', patientId);
    // Add your patient details navigation logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gerencie pacientes e seus registros
          </p>
        </div>
        
        <Button 
          icon={<Plus size={16} />}
          onClick={handleNewPatient}
        >
          Novo Paciente
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="search" 
            className="block w-full p-2 pl-10 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 dark:text-gray-200"
            placeholder="Buscar por nome, email..."
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPatients.map(patient => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => handlePatientClick(patient.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Patients;