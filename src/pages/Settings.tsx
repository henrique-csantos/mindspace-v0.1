import React, { useState } from 'react';
import Card, { CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [clinicInfo, setClinicInfo] = useState({
    name: 'MindSpace Psicologia',
    phone: '(11) 3456-7890',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP'
  });

  const handleSaveChanges = () => {
    console.log('Saving clinic info:', clinicInfo);
    // Add your save logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClinicInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gerencie as preferências da sua conta e da clínica
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil da Clínica</CardTitle>
            <CardDescription>
              Atualize as informações da sua clínica
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome da Clínica
              </label>
              <input
                type="text"
                name="name"
                value={clinicInfo.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefone
              </label>
              <input
                type="text"
                name="phone"
                value={clinicInfo.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={clinicInfo.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <Button onClick={handleSaveChanges}>
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Modo Escuro</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {theme === 'dark' ? 'Ativado' : 'Desativado'}
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Configure como você recebe alertas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receber notificações por email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">SMS</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receber notificações por SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;