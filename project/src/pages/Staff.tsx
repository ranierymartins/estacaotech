import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useSchoolStore } from '../store/schoolStore';
import { users, schools } from '../mockData';
import { User } from '../types';
import { Search, Building2 } from 'lucide-react';

const Staff: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedSchool } = useSchoolStore();
  const [filteredStaff, setFilteredStaff] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  
  const roles = [
    { value: 'director', label: 'Diretor' },
    { value: 'teacher', label: 'Professor' },
  ];
  
  useEffect(() => {
    let filtered = users.filter(u => u.role !== 'secretary');
    
    // Filter by user's access
    if (user?.role === 'director') {
      filtered = filtered.filter(s => 
        s.schoolIds.some(id => user.schoolIds.includes(id))
      );
    } else if (user?.role === 'secretary' && selectedSchool) {
      filtered = filtered.filter(s => 
        s.schoolIds.includes(selectedSchool.id)
      );
    }
    
    // Apply role filter
    if (selectedRole) {
      filtered = filtered.filter(s => s.role === selectedRole);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStaff(filtered);
  }, [user, selectedSchool, searchTerm, selectedRole]);
  
  const getSchoolNames = (schoolIds: string[]) => {
    return schoolIds.map(id => {
      const school = schools.find(s => s.id === id);
      return school?.name || 'Escola não encontrada';
    });
  };
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Funcionários</h1>
      <p className="text-gray-600 mb-8">
        Gerencie os funcionários da instituição.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os Cargos</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={staff.profilePicture}
                    alt={staff.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {staff.name}
                    </h3>
                    <p className="text-sm text-gray-500">{staff.email}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Cargo</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      staff.role === 'director'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {staff.role === 'director' ? 'Diretor' : 'Professor'}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Escolas</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSchoolNames(staff.schoolIds).map((schoolName, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Building2 size={16} className="mr-1 text-gray-400" />
                          {schoolName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStaff.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhum funcionário encontrado com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;