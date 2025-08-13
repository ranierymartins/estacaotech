import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSchoolStore } from '../../store/schoolStore';
import { schools } from '../../mockData';
import { School } from 'lucide-react';

const SchoolSelector: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedSchool, setSelectedSchool } = useSchoolStore();
  
  if (user?.role !== 'secretary') return null;
  
  return (
    <div className="px-4 py-3 border-b border-blue-700 bg-blue-800 flex items-center">
      <School className="text-blue-300 mr-2" size={20} />
      <select
        value={selectedSchool?.id || ''}
        onChange={(e) => {
          const school = schools.find(s => s.id === e.target.value);
          setSelectedSchool(school || null);
        }}
        className="flex-1 bg-blue-700 text-white border border-blue-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Todas as Escolas</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SchoolSelector;