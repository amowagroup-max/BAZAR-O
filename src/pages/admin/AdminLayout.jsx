import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, Package, Users, Settings, LogOut, Menu } from 'lucide-react';
import logo from '../../assets/logo.svg';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { name: 'Tableau de bord', path: '/admin', icon: Home },
    { name: 'Produits', path: '/admin/products', icon: Package },
    { name: 'Utilisateurs', path: '/admin/users', icon: Users },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div dir="ltr" className="flex h-screen bg-gray-50 font-inter">
      {/* تطبيق الخط الفرنسي افتراضيًا */}
      <style jsx>{`
        body, html, [dir="ltr"] {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          {isSidebarOpen ? (
            <img src={logo} alt="BAZAR-O Logo" className="h-8" />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={logo} alt="BAZAR-O Logo" className="h-8" />
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={item.path}
                  className="flex items-center p-3 rounded-md text-gray-700 hover:bg-yellow-50 hover:text-black transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md group-hover:border-yellow-500 group-hover:bg-yellow-50">
                    <item.icon size={18} className="text-gray-600 group-hover:text-black" />
                  </div>
                  <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="flex items-center w-full p-3 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
            <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:border-red-500 hover:bg-red-50">
              <LogOut size={18} className="text-gray-600 hover:text-red-600" />
            </div>
            <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;