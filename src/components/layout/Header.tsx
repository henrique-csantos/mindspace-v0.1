import React from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-20 flex items-center justify-between px-8 transition-all duration-300 ease-in-out">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="search" 
          className="block w-80 p-2 pl-10 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-400 dark:focus:border-teal-400 dark:text-gray-200"
          placeholder="Buscar pacientes, psicólogos..."
        />
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 mr-3"
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <button 
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 mr-3 relative"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <img 
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg" 
            alt="Avatar do usuário" 
            className="h-8 w-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800 dark:text-white">Dr. Rafael Mendes</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;