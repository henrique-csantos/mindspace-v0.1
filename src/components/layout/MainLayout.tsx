import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;