import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useSchoolStore } from '../store/schoolStore';
import { students, classrooms } from '../mockData';
import { Student } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import { Search, Filter, GraduationCap } from 'lucide-react';

const Students: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedSchool } = useSchoolStore();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  
  useEffect(() => {
    let filtered = [...students];
    
    // Filter by user's access
    if (user?.role === 'teacher') {
      const teacherClassroom = classrooms.find(c => c.teacherId === user.id);
      filtered = filtered.filter(s => s.classroomId === teacherClassroom?.id);
    } else if (user?.role === 'director') {
      filtered = filtered.filter(s => user.schoolIds.includes(s.schoolId));
    } else if (user?.role === 'secretary' && selectedSchool) {
      filtered = filtered.filter(s => s.schoolId === selectedSchool.id);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply classroom filter
    if (selectedClass) {
      filtered = filtered.filter(s => s.classroomId === selectedClass);
    }
    
    setFilteredStudents(filtered);
  }, [user, selectedSchool, searchTerm, selectedClass]);
  
  // Get available classrooms based on user role and selected school
  const availableClassrooms = classrooms.filter(classroom => {
    if (user?.role === 'teacher') {
      return classroom.teacherId === user.id;
    } else if (user?.role === 'director') {
      return user.schoolIds.includes(classroom.schoolId);
    } else if (user?.role === 'secretary' && selectedSchool) {
      return classroom.schoolId === selectedSchool.id;
    }
    return true;
  });
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Discentes</h1>
      <p className="text-gray-600 mb-8">
        Gerencie e acompanhe os alunos matriculados.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap size={20} className="text-gray-400" />
              </div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Todas as Turmas</option>
                {availableClassrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aluno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequência
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const classroom = classrooms.find(c => c.id === student.classroomId);
                const latestAttendance = student.attendance[0];
                
                // Calculate attendance percentage
                const totalClasses = student.attendance.length;
                const presentClasses = student.attendance.filter(
                  a => a.status === 'present'
                ).length;
                const attendancePercentage = (presentClasses / totalClasses) * 100;
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={student.profilePicture}
                            alt={student.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classroom?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 mb-1">
                          {attendancePercentage.toFixed(1)}% de presença
                        </div>
                        <StatusBadge 
                          status={latestAttendance.status}
                          text={`Última aula: ${latestAttendance.status === 'present' ? 'Presente' : 
                            latestAttendance.status === 'late' ? 'Atrasado' : 'Ausente'}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhum aluno encontrado com os filtros aplicados.
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo da Turma</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total de Alunos</h3>
            <p className="text-3xl font-bold">{filteredStudents.length}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Média de Notas</h3>
            <p className="text-3xl font-bold">
              {filteredStudents.length > 0
                ? (
                    filteredStudents.reduce((acc, student) => {
                      const grade = student.grade;
                      const gradeValue = grade === 'A' ? 4 : grade === 'B' ? 3 : grade === 'C' ? 2 : 1;
                      return acc + gradeValue;
                    }, 0) / filteredStudents.length
                  ).toFixed(1)
                : '-'}
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Média de Frequência</h3>
            <p className="text-3xl font-bold">
              {filteredStudents.length > 0
                ? (
                    filteredStudents.reduce((acc, student) => {
                      const totalClasses = student.attendance.length;
                      const presentClasses = student.attendance.filter(a => a.status === 'present').length;
                      return acc + (presentClasses / totalClasses) * 100;
                    }, 0) / filteredStudents.length
                  ).toFixed(1)
                : '-'}%
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Turmas Ativas</h3>
            <p className="text-3xl font-bold">{availableClassrooms.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;