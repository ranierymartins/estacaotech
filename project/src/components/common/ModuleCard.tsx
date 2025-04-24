import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  icon: LucideIcon;
  to: string;
  iconColor: string;
  iconBgColor: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  icon: Icon, 
  to, 
  iconColor,
  iconBgColor
}) => {
  return (
    <Link 
      to={to}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className={`${iconBgColor} rounded-full p-4 mb-4`}>
        <Icon className={`${iconColor}`} size={36} />
      </div>
      <h3 className="font-semibold text-gray-700 text-xl text-center">{title}</h3>
    </Link>
  );
};

export default ModuleCard;