import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useSchoolStore } from '../store/schoolStore';
import { 
  Users, BookOpen, Calendar, Package2, User, DollarSign, 
  MessagesSquare, School, GraduationCap, Trophy, Target
} from 'lucide-react';
import { students, users, classrooms, schools } from '../mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { selectedSchool } = useSchoolStore();
  
  // Check user role to determine which modules to show
  const isSecretary = user?.role === 'secretary';
  const isDirector = user?.role === 'director';
  const isTeacher = user?.role === 'teacher';
  
  // Calculate statistics based on user role and selected school
  const getStats = () => {
    let filteredStudents = students;
    let filteredTeachers = users.filter(u => u.role === 'teacher');
    let filteredClassrooms = classrooms;
    let filteredSchools = schools;
    
    if (isTeacher && user) {
      const teacherClassroom = classrooms.find(c => c.teacherId === user.id);
      filteredStudents = students.filter(s => s.classroomId === teacherClassroom?.id);
      filteredTeachers = [user];
      filteredClassrooms = classrooms.filter(c => c.teacherId === user.id);
      filteredSchools = schools.filter(s => user.schoolIds.includes(s.id));
    } else if (isDirector && user) {
      filteredStudents = students.filter(s => user.schoolIds.includes(s.schoolId));
      filteredTeachers = users.filter(u => 
        u.role === 'teacher' && u.schoolIds.some(id => user.schoolIds.includes(id))
      );
      filteredClassrooms = classrooms.filter(c => user.schoolIds.includes(c.schoolId));
      filteredSchools = schools.filter(s => user.schoolIds.includes(s.id));
    } else if (isSecretary && selectedSchool) {
      filteredStudents = students.filter(s => s.schoolId === selectedSchool.id);
      filteredTeachers = users.filter(u => 
        u.role === 'teacher' && u.schoolIds.includes(selectedSchool.id)
      );
      filteredClassrooms = classrooms.filter(c => c.schoolId === selectedSchool.id);
      filteredSchools = [selectedSchool];
    }
    
    return {
      totalStudents: filteredStudents.length,
      totalTeachers: filteredTeachers.length,
      totalClassrooms: filteredClassrooms.length,
      totalSchools: filteredSchools.length,
      activeStudents: filteredStudents.filter(s => 
        s.attendance.length > 0 && s.attendance[0].status === 'present'
      ).length,
      completedCourses: Math.floor(filteredStudents.length * 0.8), // Mock data
    };
  };
  
  const stats = getStats();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.email}</h1>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4].map((star) => (
                    <span key={star}>★</span>
                  ))}
                  <span className="text-gray-300">★</span>
                </div>
                <span className="ml-2 text-sm text-gray-500">4.35 (20 Avaliações)</span>
              </div>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Criar um novo curso
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
              <h2 className="font-bold text-lg mb-2">📊 Painel</h2>
            </div>
            
            <nav className="space-y-2">
              <a href="/dashboard" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                <User className="w-5 h-5 mr-3" />
                Meu perfil
              </a>
              <a href="/discentes" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <BookOpen className="w-5 h-5 mr-3" />
                Cursos matriculados
              </a>
              <a href="/agendamentos" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 mr-3" />
                Lista de desejos
              </a>
              <a href="/assistente" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Trophy className="w-5 h-5 mr-3" />
                Avaliações
              </a>
              <a href="/docentes" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Target className="w-5 h-5 mr-3" />
                Minhas tentativas de questionários
              </a>
              <a href="/estoque" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Package2 className="w-5 h-5 mr-3" />
                Histórico de Pedidos
              </a>
              <a href="/funcionarios" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <MessagesSquare className="w-5 h-5 mr-3" />
                Perguntas & Respostas
              </a>
              <a href="/financeiro" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 mr-3" />
                Calendário
              </a>
            </nav>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Instrutores</h3>
              <nav className="space-y-2">
                <a href="/area-professor" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Meus cursos
                </a>
                <a href="/escolas" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Package2 className="w-5 h-5 mr-3" />
                  Meus Pacotes
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Profile Completion */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Complete seu perfil.</h2>
                <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-gray-600">Por favor, preencha o perfil: <span className="font-semibold">0/3</span></p>
              </div>
              <div className="text-blue-600">
                <Trophy className="w-12 h-12" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-orange-600">
                <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                Defina sua foto de perfil
              </div>
              <div className="flex items-center text-orange-600">
                <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                Defina sua biografia
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Painel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalClassrooms}</div>
                <div className="text-gray-600">Cursos matriculados</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.activeStudents}</div>
                <div className="text-gray-600">Cursos ativos</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.completedCourses}</div>
                <div className="text-gray-600">Cursos completos</div>
              </div>

              {/* Second Row */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalStudents}</div>
                <div className="text-gray-600">Total de alunos</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalTeachers}</div>
                <div className="text-gray-600">Total de cursos</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">$0.00</div>
                <div className="text-gray-600">Total de ganhos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;