import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex h-screen bg-gradient-to-br from-ide-gray-50 via-white to-ide-primary-50">
      <Sidebar />
      <main className={`flex-1 lg:ml-0 ${isHomePage ? '' : 'overflow-auto'}`}>
        {/* Mobile-optimized main content with safe areas */}
        <div className={`safe-top safe-bottom ${isHomePage ? '' : 'pt-20 lg:pt-6'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;