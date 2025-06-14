import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Building, BookOpen, Calendar, LogOut, Eye, Menu, X, GraduationCap, Home, Zap, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { 
      to: '/', 
      icon: Home, 
      label: 'Anasayfa', 
      color: 'ide-primary',
      description: 'Sistem özeti ve hızlı erişim'
    },
    { 
      to: '/subjects', 
      icon: BookOpen, 
      label: 'Dersler', 
      color: 'ide-orange',
      description: 'Ders tanımları ve branş yönetimi'
    },
    { 
      to: '/teachers', 
      icon: Users, 
      label: 'Öğretmenler', 
      color: 'ide-primary',
      description: 'Öğretmen kayıtları ve bilgileri'
    },
    { 
      to: '/classes', 
      icon: Building, 
      label: 'Sınıflar', 
      color: 'ide-secondary',
      description: 'Sınıf tanımları ve seviye yönetimi'
    },
    { 
      to: '/schedules', 
      icon: Calendar, 
      label: 'Program Oluştur', 
      color: 'ide-accent',
      description: 'Ders programı düzenleme aracı'
    },
    { 
      to: '/auto-schedule', 
      icon: Zap, 
      label: 'Otomatik Program', 
      color: 'ide-accent',
      description: 'Yapay zeka destekli program oluşturma'
    },
    { 
      to: '/class-schedules', 
      icon: GraduationCap, 
      label: 'Sınıf Programları', 
      color: 'ide-secondary',
      description: 'Sınıf bazında program görüntüleme'
    },
    { 
      to: '/all-schedules', 
      icon: Eye, 
      label: 'Öğretmen Programları', 
      color: 'ide-primary',
      description: 'Öğretmen bazında program görüntüleme'
    },
    { 
      to: '/pdf', 
      icon: FileText, 
      label: 'PDF Çıktı', 
      color: 'ide-orange',
      description: 'Profesyonel PDF raporları'
    }
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50 safe-top safe-left">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-white rounded-xl shadow-ide-lg border border-ide-gray-200 hover:bg-ide-gray-50 focus:outline-none focus:ring-2 focus:ring-ide-primary-500 focus:ring-offset-2 transition-all duration-200 btn-touch touch-enhanced"
          aria-label="Menüyü aç/kapat"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-ide-gray-700" />
          ) : (
            <Menu size={24} className="text-ide-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 bg-white shadow-ide-2xl lg:shadow-ide-xl h-screen flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        sidebar-mobile lg:w-72
        safe-top safe-bottom safe-left
        border-r border-ide-gray-200
      `}>
        
        {/* Professional Header */}
        <div className="p-6 border-b border-ide-gray-200 bg-gradient-to-br from-ide-primary-500 to-ide-primary-600">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <img 
                  src="https://cv.ide.k12.tr/images/ideokullari_logo.png" 
                  alt="İDE Okulları Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-8 h-8 bg-ide-primary-100 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-ide-primary-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>';
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">İDE Okulları</h1>
                <p className="text-xs text-ide-primary-100 mt-0.5">Ders Programı Sistemi</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-ide-primary-700 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 btn-touch touch-enhanced"
              aria-label="Menüyü kapat"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Professional Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-ide-gray-50 to-white">
          <div className="space-y-2">
            {navItems.map(({ to, icon: Icon, label, color, description }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `group relative flex items-center p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-ide-primary-50 text-ide-primary-700 shadow-ide border border-ide-primary-200'
                      : 'text-ide-gray-700 hover:bg-white hover:text-ide-primary-600 hover:shadow-ide-lg border border-transparent hover:border-ide-gray-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-ide-primary-600 rounded-r-full" />
                    )}
                    
                    {/* Icon */}
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                      ${isActive 
                        ? 'bg-ide-primary-100 text-ide-primary-600' 
                        : 'bg-ide-gray-100 text-ide-gray-500 group-hover:bg-ide-primary-100 group-hover:text-ide-primary-600'
                      }
                    `}>
                      <Icon size={20} />
                    </div>
                    
                    {/* Content */}
                    <div className="ml-4 flex-1 min-w-0">
                      <div className={`font-semibold text-sm ${
                        isActive ? 'text-ide-primary-700' : 'text-ide-gray-900 group-hover:text-ide-primary-600'
                      }`}>
                        {label}
                      </div>
                      <div className={`text-xs mt-0.5 ${
                        isActive ? 'text-ide-primary-600' : 'text-ide-gray-500 group-hover:text-ide-primary-500'
                      }`}>
                        {description}
                      </div>
                    </div>
                    
                    {/* Arrow indicator for active */}
                    {isActive && (
                      <div className="flex-shrink-0 w-2 h-2 bg-ide-primary-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
        
        {/* Professional Footer */}
        <div className="p-4 border-t border-ide-gray-200 bg-white safe-bottom">
          {/* System Status */}
          <div className="mb-4 p-3 bg-ide-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-ide-gray-700">Sistem Aktif</span>
              </div>
              <span className="text-xs text-ide-gray-500">v2.1.0</span>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-xl text-ide-gray-700 hover:bg-ide-accent-50 hover:text-ide-accent-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ide-accent-500 focus:ring-offset-2 group border border-transparent hover:border-ide-accent-200"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ide-gray-100 group-hover:bg-ide-accent-100 flex items-center justify-center transition-all duration-200">
              <LogOut size={20} className="text-ide-gray-500 group-hover:text-ide-accent-600" />
            </div>
            <div className="ml-4 flex-1 text-left">
              <div className="font-semibold text-sm">Güvenli Çıkış</div>
              <div className="text-xs text-ide-gray-500 group-hover:text-ide-accent-500">Oturumu sonlandır</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;