import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  classrooms, 
  students, 
  schedules 
} from '../mockData';
import { Student, Classroom, Schedule } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import { ClipboardList, Clock, AlertCircle } from 'lucide-react';

const TeacherArea: React.FC = () => {
  const { user } = useAuthStore();
  const [myClassroom, setMyClassroom] = useState<Classroom | null>(null);
  const [myStudents, setMyStudents] = useState<Student[]>([]);
  const [mySchedules, setMySchedules] = useState<Schedule[]>([]);
  const [attendanceSummary, setAttendanceSummary] = useState<{
    present: number;
    absent: number;
    late: number;
    total: number;
  }>({ present: 0, absent: 0, late: 0, total: 0 });
  
  useEffect(() => {
    if (user) {
      // Get teacher's classroom
      const classroom = classrooms.find(c => c.teacherId === user.id);
      setMyClassroom(classroom || null);
      
      if (classroom) {
        // Get students in this classroom
        const classroomStudents = students.filter(s => s.classroomId === classroom.id);
        setMyStudents(classroomStudents);
        
        // Get schedules for this classroom
        const classroomSchedules = schedules.filter(s => s.classroomId === classroom.id);
        setMySchedules(classroomSchedules);
        
        // Calculate attendance statistics
        // We'll use the latest date for all students to show meaningful data
        if (classroomStudents.length > 0) {
          let present = 0;
          let absent = 0;
          let late = 0;
          
          classroomStudents.forEach(student => {
            if (student.attendance.length > 0) {
              // Use the latest attendance record
              const latestAttendance = student.attendance[0];
              
              switch (latestAttendance.status) {
                case 'present':
                  present++;
                  break;
                case 'absent':
                  absent++;
                  break;
                case 'late':
                  late++;
                  break;
              }
            }
          });
          
          setAttendanceSummary({
            present,
            absent,
            late,
            total: classroomStudents.length
          });
        }
      }
    }
  }, [user]);
  
  if (!user || user.role !== 'teacher' || !myClassroom) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Área do Professor</h1>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800">
          <p>Você não possui acesso a esta área ou não há nenhuma sala atribuída a você.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Área do Professor</h1>
      <p className="text-gray-600 mb-8">Gerencie sua sala de aula e visualize informações sobre seus alunos.</p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <ClipboardList className="mr-2" size={24} />
          Dados da Sala
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Escola</h3>
              <p className="text-lg font-semibold">{
                myClassroom.schoolId === 'school1' ? 'Escola Estação Central' :
                myClassroom.schoolId === 'school2' ? 'Escola Estação Norte' :
                'Escola Estação Sul'
              }</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="text-sm font-medium text-purple-800 mb-1">Sala</h3>
              <p className="text-lg font-semibold">{myClassroom.name}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-sm font-medium text-green-800 mb-1">Capacidade</h3>
              <p className="text-lg font-semibold">{myClassroom.capacity} alunos</p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <h3 className="text-sm font-medium text-amber-800 mb-1">Alunos Matriculados</h3>
              <p className="text-lg font-semibold">{myStudents.length} alunos</p>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <Clock className="mr-2" size={20} />
          Horários da Sala
        </h3>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {mySchedules.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disciplina
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dia da Semana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mySchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{schedule.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{schedule.dayOfWeek}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Nenhum horário registrado para esta sala.
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <AlertCircle className="mr-2" size={20} />
          Resumo de Presença (Últimas Aulas)
        </h3>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-center">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Total de Alunos</h3>
              <p className="text-3xl font-bold">{attendanceSummary.total}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100 text-center">
              <h3 className="text-sm font-medium text-green-800 mb-1">Presentes</h3>
              <p className="text-3xl font-bold">{attendanceSummary.present}</p>
              <p className="text-sm text-green-600">
                {Math.round((attendanceSummary.present / attendanceSummary.total) * 100)}%
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 text-center">
              <h3 className="text-sm font-medium text-yellow-800 mb-1">Atrasados</h3>
              <p className="text-3xl font-bold">{attendanceSummary.late}</p>
              <p className="text-sm text-yellow-600">
                {Math.round((attendanceSummary.late / attendanceSummary.total) * 100)}%
              </p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 border border-red-100 text-center">
              <h3 className="text-sm font-medium text-red-800 mb-1">Ausentes</h3>
              <p className="text-3xl font-bold">{attendanceSummary.absent}</p>
              <p className="text-sm text-red-600">
                {Math.round((attendanceSummary.absent / attendanceSummary.total) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Alunos</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  Nota Atual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Presença
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myStudents.map((student) => {
                // Get latest attendance
                const latestAttendance = student.attendance[0];
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={student.profilePicture} 
                            alt={student.name} 
                          />
                        </div>
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">
                        {student.grade}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {latestAttendance ? (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {new Date(latestAttendance.date).toLocaleDateString('pt-BR')}
                          </div>
                          <StatusBadge status={latestAttendance.status} />
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Sem registro
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherArea;