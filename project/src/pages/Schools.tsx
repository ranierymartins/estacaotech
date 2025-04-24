import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { schools, users, classrooms, students } from '../mockData';
import { School } from '../types';
import { Search, Users, BookOpen, Building2 } from 'lucide-react';

const Schools: React.FC = () => {
  const { user } = useAuthStore();
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (user?.role !== 'secretary') return;
    
    let filtered = [...schools];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSchools(filtered);
  }, [user, searchTerm]);
  
  const getSchoolStats = (schoolId: string) => {
    const schoolTeachers = users.filter(u => 
      u.role === 'teacher' && u.schoolIds.includes(schoolId)
    );
    const schoolClassrooms = classrooms.filter(c => c.schoolId === schoolId);
    const schoolStudents = students.filter(s => s.schoolId === schoolId);
    
    return {
      teachers: schoolTeachers.length,
      classrooms: schoolClassrooms.length,
      students: schoolStudents.length,
    };
  };
  
  const getDirectorName = (directorId: string) => {
    const director = users.find(u => u.id === directorId);
    return director?.name || 'Diretor não encontrado';
  };
  
  if (user?.role !== 'secretary') {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Escolas</h1>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800">
          <p>Você não possui acesso ao módulo de escolas.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Escolas</h1>
      <p className="text-gray-600 mb-8">
        Gerencie e monitore todas as unidades escolares.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar escolas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchools.map((school) => {
            const stats = getSchoolStats(school.id);
            
            return (
              <div
                key={school.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {school.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {school.address}
                      </p>
                    </div>
                    <Building2 size={24} className="text-blue-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Diretor</h4>
                      <p className="text-sm font-medium text-gray-800">
                        {getDirectorName(school.directorId)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <Users size={20} className="mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-blue-600 font-medium">Alunos</p>
                        <p className="text-lg font-bold text-blue-800">{stats.students}</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <BookOpen size={20} className="mx-auto mb-1 text-purple-600" />
                        <p className="text-xs text-purple-600 font-medium">Professores</p>
                        <p className="text-lg font-bold text-purple-800">{stats.teachers}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <Building2 size={20} className="mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-green-600 font-medium">Salas</p>
                        <p className="text-lg font-bold text-green-800">{stats.classrooms}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredSchools.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhuma escola encontrada com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools;