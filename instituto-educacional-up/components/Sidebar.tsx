import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Users, BookOpen, MapPin, Calendar, Rocket, Lock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useContent();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Removed Admin from main nav items
  const navItems = [
    { to: '/', label: 'Início', icon: <Home size={20} /> },
    { to: '/sobre', label: 'Quem Somos', icon: <Users size={20} /> },
    { to: '/especialidades', label: 'Especialidades', icon: <BookOpen size={20} /> },
    { to: '/espaco', label: 'Espaço e Didática', icon: <Rocket size={20} /> },
    { to: '/contato', label: 'Localização', icon: <MapPin size={20} /> },
    { to: '/agendamento', label: 'Agendamento', icon: <Calendar size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-lg md:hidden hover:bg-indigo-700 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-6 bg-indigo-600 text-white flex flex-col items-center justify-center">
             {content.home.logoUrl ? (
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-2 p-2 overflow-hidden shadow-md">
                    <img 
                        src={content.home.logoUrl} 
                        alt="Logo Instituto UP" 
                        className="w-full h-full object-contain"
                    />
                </div>
             ) : (
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mb-2">
                UP
                </div>
             )}
            <h1 className="text-xl font-bold text-center leading-tight">Instituto<br/>Educacional UP</h1>
            <p className="text-xs text-indigo-200 mt-1">Descomplicando a Aprendizagem</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Info & Admin Access */}
          <div className="p-4 border-t border-gray-100 text-center">
             <div className="text-xs text-gray-400 mb-2">
                <p>&copy; {new Date().getFullYear()} Instituto UP</p>
                <p>Educação com amor.</p>
             </div>
             <NavLink to="/admin" className="inline-flex items-center justify-center text-gray-300 hover:text-indigo-400 transition-colors" title="Acesso Restrito">
                 <Lock size={14} />
             </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
