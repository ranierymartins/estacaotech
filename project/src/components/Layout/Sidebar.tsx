import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import SchoolSelector from './SchoolSelector';
import { 
  Home, Users, BookOpen, Calendar, Package2, User, DollarSign, 
  MessagesSquare, LogOut, School 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  
  // Check user role to determine which menu items to show
  const isSecretary = user?.role === 'secretary';
  const isDirector = user?.role === 'director';
  const isTeacher = user?.role === 'teacher';
  
  // Only secretary and director can see financial module
  const canAccessFinancial = isSecretary || isDirector;
  
  return (
    <div className="h-screen bg-blue-900 text-white w-64 flex flex-col">
      <div className="p-6 font-bold text-xl border-b border-blue-700">Estação Tech</div>
      
      <SchoolSelector />
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
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
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
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
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
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
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
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
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg hover:bg-blue-800 transition-colors ${isActive ? 'bg-blue-800' : ''}`
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
            <div className="text-sm text-blue-200 capitalize">{user?.role || "Role"}</div>
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
  );
};

export default Sidebar;