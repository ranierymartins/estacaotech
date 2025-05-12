import React from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Users, BookOpen, Calendar, Package2, User, DollarSign, 
  MessagesSquare, School 
} from 'lucide-react';
import ModuleCard from '../components/common/ModuleCard';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  
  // Check user role to determine which modules to show
  const isSecretary = user?.role === 'secretary';
  const isDirector = user?.role === 'director';
  const isTeacher = user?.role === 'teacher';
  
  // Only secretary and director can see financial module
  const canAccessFinancial = isSecretary || isDirector;
  
  // If user is a teacher, they should only see their area
  const teacherModules = [
    {
      title: 'Área do Professor',
      icon: BookOpen,
      to: '/area-professor',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
    },
    {
      title: 'Discentes',
      icon: Users,
      to: '/discentes',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
    },
    {
      title: 'Agendamentos',
      icon: Calendar,
      to: '/agendamentos',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
    },
    {
      title: 'Assistente',
      icon: MessagesSquare,
      to: '/assistente',
      iconColor: 'text-rose-600',
      iconBgColor: 'bg-rose-100',
    },
  ];
  
  // Admin modules (secretary and director)
  const adminModules = [
    {
      title: 'Discentes',
      icon: Users,
      to: '/discentes',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
    },
    {
      title: 'Docentes',
      icon: BookOpen,
      to: '/docentes',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
    },
    {
      title: 'Agendamentos',
      icon: Calendar,
      to: '/agendamentos',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
    },
    {
      title: 'Estoque',
      icon: Package2,
      to: '/estoque',
      iconColor: 'text-amber-600',
      iconBgColor: 'bg-amber-100',
    },
    {
      title: 'Funcionários',
      icon: User,
      to: '/funcionarios',
      iconColor: 'text-pink-600',
      iconBgColor: 'bg-pink-100',
    },
    ...(canAccessFinancial ? [
      {
        title: 'Financeiro',
        icon: DollarSign,
        to: '/financeiro',
        iconColor: 'text-blue-600',
        iconBgColor: 'bg-blue-100',
      }
    ] : []),
    {
      title: 'Assistente',
      icon: MessagesSquare,
      to: '/assistente',
      iconColor: 'text-rose-600',
      iconBgColor: 'bg-rose-100',
    },
  ];
  
  const secretaryExtraModules = [
    {
      title: 'Escolas',
      icon: School,
      to: '/escolas',
      iconColor: 'text-indigo-600',
      iconBgColor: 'bg-indigo-100',
    },
  ];
  
  // Choose which modules to display based on user role
  const modules = isTeacher 
    ? teacherModules 
    : isSecretary 
      ? [...adminModules, ...secretaryExtraModules]
      : adminModules;
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao Sistema Educacional iA</h1>
      <p className="text-gray-600 mb-8">Olá, {user?.name}! Selecione um módulo para começar.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            icon={module.icon}
            to={module.to}
            iconColor={module.iconColor}
            iconBgColor={module.iconBgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;