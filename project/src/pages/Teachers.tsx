import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useSchoolStore } from '../store/schoolStore';
import { users, classrooms, schools } from '../mockData';
import { User } from '../types';
import { Search, BookOpen } from 'lucide-react';

const Teachers: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedSchool } = useSchoolStore();
  const [filteredTeachers, setFilteredTeachers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    let filtered = users.filter(u => u.role === 'teacher');
    
    // Filter by user's access
    if (user?.role === 'director') {
      filtered = filtered.filter(t => 
        t.schoolIds.some(id => user.schoolIds.includes(id))
      );
    } else if (user?.role === 'secretary' && selectedSchool) {
      filtered = filtered.filter(t => 
        t.schoolIds.includes(selectedSchool.id)
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTeachers(filtered);
  }, [user, selectedSchool, searchTerm]);
  
  const getTeacherClassrooms = (teacherId: string) => {
    return classrooms.filter(c => c.teacherId === teacherId);
  };
  
  const getSchoolName = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    return school?.name || 'Escola não encontrada';
  };
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Docentes</h1>
      <p className="text-gray-600 mb-8">
        Gerencie e acompanhe os professores da instituição.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar professores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => {
            const teacherClassrooms = getTeacherClassrooms(teacher.id);
            
            return (
              <div key={teacher.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={teacher.profilePicture}
                      alt={teacher.name}
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-gray-500">{teacher.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Escola</h4>
                      <div className="flex flex-wrap gap-2">
                        {teacher.schoolIds.map((schoolId) => (
                          <span
                            key={schoolId}
                            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {getSchoolName(schoolId)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Turmas</h4>
                      <div className="space-y-2">
                        {teacherClassrooms.map((classroom) => (
                          <div
                            key={classroom.id}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <BookOpen size={16} className="mr-2 text-purple-500" />
                            {classroom.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredTeachers.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhum professor encontrado com os filtros aplicados.
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo do Corpo Docente</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Total de Professores</h3>
            <p className="text-3xl font-bold">{filteredTeachers.length}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Média de Turmas por Professor</h3>
            <p className="text-3xl font-bold">
              {filteredTeachers.length > 0
                ? (classrooms.length / filteredTeachers.length).toFixed(1)
                : '-'}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Total de Turmas Ativas</h3>
            <p className="text-3xl font-bold">{classrooms.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;