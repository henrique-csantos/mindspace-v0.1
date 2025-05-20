import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserSquare, 
  Settings, 
  LogOut,
  BrainCircuit
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Agenda', icon: <Calendar size={20} />, path: '/calendar' },
    { name: 'Psicólogos', icon: <UserSquare size={20} />, path: '/psychologists' },
    { name: 'Pacientes', icon: <Users size={20} />, path: '/patients' },
    { name: 'Configurações', icon: <Settings size={20} />, path: '/settings' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ease-in-out z-30">
      <div className="flex items-center justify-center py-6 border-b border-gray-200 dark:border-gray-800">
        <BrainCircuit className="text-teal-500 h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">MindSpace</h1>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${location.pathname === item.path 
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-8 w-full px-4">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;