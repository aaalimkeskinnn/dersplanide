import React from 'react';
import { 
  Users, 
  Building, 
  BookOpen, 
  Calendar, 
  FileText, 
  Eye,
  ArrowRight,
  Zap,
  GraduationCap,
  CheckCircle,
  Shield,
  Clock,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Calendar,
      title: 'Program Oluştur',
      description: 'Yeni ders programı oluşturun',
      color: 'from-ide-accent-500 to-ide-accent-600',
      textColor: 'text-white',
      path: '/schedules'
    },
    {
      icon: Zap,
      title: 'Otomatik Program',
      description: 'AI ile hızlı program oluşturun',
      color: 'from-ide-primary-500 to-ide-primary-600',
      textColor: 'text-white',
      path: '/auto-schedule'
    },
    {
      icon: Eye,
      title: 'Programları Görüntüle',
      description: 'Mevcut programları inceleyin',
      color: 'from-ide-secondary-500 to-ide-secondary-600',
      textColor: 'text-white',
      path: '/all-schedules'
    },
    {
      icon: FileText,
      title: 'PDF İndir',
      description: 'Programları PDF olarak indirin',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-white',
      path: '/pdf'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Ders Yönetimi',
      description: 'Dersleri branş ve seviyelerine göre organize edin',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      path: '/subjects'
    },
    {
      icon: Users,
      title: 'Öğretmen Yönetimi',
      description: 'Öğretmenleri ekleyin ve branşlarına göre yönetin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      path: '/teachers'
    },
    {
      icon: Building,
      title: 'Sınıf Yönetimi',
      description: 'Sınıfları seviyelerine göre kategorize edin',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      path: '/classes'
    },
    {
      icon: GraduationCap,
      title: 'Sınıf Programları',
      description: 'Sınıf bazında ders programlarını görüntüleyin',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      path: '/class-schedules'
    }
  ];

  const systemFeatures = [
    {
      icon: CheckCircle,
      title: 'Çakışma Kontrolü',
      description: 'Otomatik çakışma tespiti ve uyarı sistemi'
    },
    {
      icon: Download,
      title: 'PDF Çıktı',
      description: 'Profesyonel görünümlü PDF raporları'
    },
    {
      icon: Clock,
      title: 'Otomatik Saatler',
      description: 'Yemek ve mola saatleri otomatik eklenir'
    },
    {
      icon: Shield,
      title: 'Güvenli Saklama',
      description: 'Firebase altyapısı ile güvenli veri saklama'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ide-gray-50 via-white to-ide-primary-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-2xl shadow-ide-lg border border-ide-gray-200">
              <img 
                src="https://cv.ide.k12.tr/images/ideokullari_logo.png" 
                alt="İDE Okulları Logo"
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-16 h-16 bg-ide-primary-100 rounded-xl flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-ide-primary-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>';
                  }
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ide-gray-900 mb-4">
            İDE Okulları
            <span className="block text-2xl md:text-3xl text-ide-primary-600 mt-2">
              Ders Programı Yönetim Sistemi
            </span>
          </h1>
          <p className="text-lg text-ide-gray-600 max-w-3xl mx-auto leading-relaxed">
            Okul ders programlarını kolayca oluşturun, yönetin ve PDF olarak indirin. 
            Çakışma kontrolü, otomatik saatler ve profesyonel çıktılar ile modern eğitim yönetimi.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-ide-gray-900 mb-6 text-center">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className="group cursor-pointer bg-white rounded-xl p-6 shadow-ide hover:shadow-ide-xl transition-all duration-300 border border-ide-gray-200 hover:border-ide-primary-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <h3 className="font-semibold text-ide-gray-900 mb-2 group-hover:text-ide-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-ide-gray-600 mb-3">
                  {action.description}
                </p>
                <div className="flex items-center text-ide-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Başla <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-ide-gray-900 mb-6 text-center">Sistem Modülleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className={`group cursor-pointer bg-white rounded-xl p-6 shadow-ide hover:shadow-ide-lg transition-all duration-200 border ${feature.borderColor} hover:border-opacity-60`}
              >
                <div className={`${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-ide-gray-900 mb-2 group-hover:text-ide-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-ide-gray-600 leading-relaxed mb-3">
                  {feature.description}
                </p>
                <div className="flex items-center text-ide-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Yönet <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Features */}
        <div className="bg-white rounded-2xl p-8 shadow-ide-lg border border-ide-gray-200">
          <h2 className="text-xl font-bold text-ide-gray-900 mb-6 text-center">Sistem Özellikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-ide-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-ide-primary-100 transition-colors duration-200">
                  <feature.icon className="w-8 h-8 text-ide-primary-600" />
                </div>
                <h3 className="font-semibold text-ide-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-ide-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-ide-gray-500">
            Modern, kullanıcı dostu ve güvenilir ders programı yönetim sistemi
          </p>
          <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-ide-gray-400">
            <span>v2.1.0</span>
            <span>•</span>
            <span>Firebase Backend</span>
            <span>•</span>
            <span>React + TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;