import React from 'react';

interface StatusBadgeProps {
  status: 'present' | 'absent' | 'late' | 'low' | 'normal' | 'critical';
  text?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = () => {
    if (text) return text;
    
    switch (status) {
      case 'present':
        return 'Presente';
      case 'absent':
        return 'Ausente';
      case 'late':
        return 'Atrasado';
      case 'low':
        return 'Baixo';
      case 'normal':
        return 'Normal';
      case 'critical':
        return 'Crítico';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full border ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;