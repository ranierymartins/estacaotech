import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useSchoolStore } from '../store/schoolStore';
import { classrooms, schedules, users } from '../mockData';
import { Schedule } from '../types';
import { Calendar, Clock, Search } from 'lucide-react';

const SchedulePage: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedSchool } = useSchoolStore();
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const daysOfWeek = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira'
  ];
  
  useEffect(() => {
    let filtered = [...schedules];
    
    // Filter by user's access
    if (user?.role === 'teacher') {
      filtered = filtered.filter(s => s.teacherId === user.id);
    } else if (user?.role === 'director') {
      const directorClassrooms = classrooms.filter(c => 
        user.schoolIds.includes(c.schoolId)
      );
      filtered = filtered.filter(s => 
        directorClassrooms.some(c => c.id === s.classroomId)
      );
    } else if (user?.role === 'secretary' && selectedSchool) {
      const schoolClassrooms = classrooms.filter(c => 
        c.schoolId === selectedSchool.id
      );
      filtered = filtered.filter(s => 
        schoolClassrooms.some(c => c.id === s.classroomId)
      );
    }
    
    // Apply day filter
    if (selectedDay) {
      filtered = filtered.filter(s => s.dayOfWeek === selectedDay);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(s => {
        const classroom = classrooms.find(c => c.id === s.classroomId);
        const teacher = users.find(u => u.id === s.teacherId);
        return (
          s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classroom?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    setFilteredSchedules(filtered);
  }, [user, selectedSchool, selectedDay, searchTerm]);
  
  const getTeacherName = (teacherId: string) => {
    const teacher = users.find(u => u.id === teacherId);
    return teacher?.name || 'Professor não encontrado';
  };
  
  const getClassroomName = (classroomId: string) => {
    const classroom = classrooms.find(c => c.id === classroomId);
    return classroom?.name || 'Sala não encontrada';
  };
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Agendamentos</h1>
      <p className="text-gray-600 mb-8">
        Visualize e gerencie os horários das aulas.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar agendamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDay('')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedDay === ''
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedDay === day
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day.split('-')[0]}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          {daysOfWeek.map((day) => {
            const daySchedules = filteredSchedules.filter(s => 
              selectedDay ? s.dayOfWeek === selectedDay : s.dayOfWeek === day
            );
            
            if (selectedDay && day !== selectedDay) return null;
            if (daySchedules.length === 0) return null;
            
            return (
              <div key={day} className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="mr-2" size={20} />
                  {day}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {daySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-500 flex items-center">
                          <Clock size={16} className="mr-1" />
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {schedule.subject}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Professor</p>
                          <p className="text-sm font-medium text-gray-800">
                            {getTeacherName(schedule.teacherId)}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Sala</p>
                          <p className="text-sm font-medium text-gray-800">
                            {getClassroomName(schedule.classroomId)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredSchedules.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhum agendamento encontrado com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;