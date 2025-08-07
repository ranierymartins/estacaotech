import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import SchoolSelector from './SchoolSelector';
import { 
  Home, Users, BookOpen, Calendar, Package2, User, DollarSign, 
  MessagesSquare, LogOut, School, Menu, X 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check user role to determine which menu items to show
  const isSecretary = user?.role === 'secretary';
  const isDirector = user?.role === 'director';
  const isTeacher = user?.role === 'teacher';
  
  // Only secretary and director can see financial module
  const canAccessFinancial = isSecretary || isDirector;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="fixed z-50 bottom-4 right-4 bg-blue-900 text-white p-3 rounded-full shadow-lg md:hidden"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-40 h-screen bg-white-900 text-black w-64 flex flex-col transition-transform duration-300 ease-in-out
          ${isMobile ? (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex justify-end p-4 md:hidden">
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-white hover:text-blue-200"
            >
              <X size={24} />
            </button>
          </div>
        )}

        <div className="p-6 font-bold text-xl border-b border-blue-700">Educacional iA</div>
        
        <SchoolSelector />
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/dashboard" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
                }
              >
                <Home size={20} className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/discentes" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
                }
              >
                <Users size={20} className="mr-3" />
                Discentes
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/docentes" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
                }
              >
                <BookOpen size={20} className="mr-3" />
                Docentes
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/agendamentos" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
                }
              >
                <Calendar size={20} className="mr-3" />
                Agendamentos
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/estoque" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
                }
              >
                <Package2 size={20} className="mr-3" />
                Estoque
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/funcionarios" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
                }
              >
                <User size={20} className="mr-3" />
                Funcionários
              </NavLink>
            </li>
            
            {canAccessFinancial && (
              <li>
                <NavLink 
                  to="/financeiro" 
                  onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-500' : ''}`
                  }
                >
                  <DollarSign size={20} className="mr-3" />
                  Financeiro
                </NavLink>
              </li>
            )}
            
            {isTeacher && (
              <li>
                <NavLink 
                  to="/area-professor" 
                  onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-500' : ''}`
                  }
                >
                  <BookOpen size={20} className="mr-3" />
                  Área do Professor
                </NavLink>
              </li>
            )}
            
            {isSecretary && (
              <li>
                <NavLink 
                  to="/escolas" 
                  onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-500' : ''}`
                  }
                >
                  <School size={20} className="mr-3" />
                  Escolas
                </NavLink>
              </li>
            )}
            
            <li>
              <NavLink 
                to="/assistente" 
                onClick={() => isMobile && setIsMobileSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-500' : ''}`
                }
              >
                <MessagesSquare size={20} className="mr-3" />
                Assistente
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img 
                src={user?.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold">{user?.name || "Usuário"}</div>
              <div className="text-sm text-black-200 capitalize">{user?.role || "Role"}</div>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="flex items-center p-3 w-full rounded-lg hover:bg-blue-800 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Sair
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;