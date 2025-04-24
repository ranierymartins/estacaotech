import { User, School, Classroom, Student, InventoryItem, FinancialRecord, Schedule } from '../types';

// Generate mock users
export const users: User[] = [
  {
    id: 'user1',
    name: 'Secretário Demo',
    email: 'secretario@estacaotech.com',
    role: 'secretary',
    schoolIds: ['school1', 'school2', 'school3'],
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'user2',
    name: 'Maria Silva',
    email: 'maria@estacaotech.com',
    role: 'director',
    schoolIds: ['school1'],
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'user3',
    name: 'João Oliveira',
    email: 'joao@estacaotech.com',
    role: 'director',
    schoolIds: ['school2'],
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 'user4',
    name: 'Ana Santos',
    email: 'ana@estacaotech.com',
    role: 'director',
    schoolIds: ['school3'],
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 'user5',
    name: 'Carlos Mendes',
    email: 'carlos@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school1'],
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 'user6',
    name: 'Patrícia Lima',
    email: 'patricia@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school1'],
    profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 'user7',
    name: 'Roberto Alves',
    email: 'roberto@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school1'],
    profilePicture: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 'user8',
    name: 'Fernanda Costa',
    email: 'fernanda@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school2'],
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 'user9',
    name: 'Miguel Souza',
    email: 'miguel@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school2'],
    profilePicture: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 'user10',
    name: 'Juliana Ferreira',
    email: 'juliana@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school2'],
    profilePicture: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    id: 'user11',
    name: 'Lucas Dias',
    email: 'lucas@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school3'],
    profilePicture: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 'user12',
    name: 'Camila Rocha',
    email: 'camila@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school3'],
    profilePicture: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 'user13',
    name: 'Paulo Gomes',
    email: 'paulo@estacaotech.com',
    role: 'teacher',
    schoolIds: ['school3'],
    profilePicture: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
];

// Generate mock schools
export const schools: School[] = [
  {
    id: 'school1',
    name: 'Escola Estação Central',
    address: 'Rua das Flores, 123, Centro',
    directorId: 'user2',
    teacherIds: ['user5', 'user6', 'user7'],
    classroomIds: ['classroom1', 'classroom2', 'classroom3'],
  },
  {
    id: 'school2',
    name: 'Escola Estação Norte',
    address: 'Av. dos Ipês, 456, Zona Norte',
    directorId: 'user3',
    teacherIds: ['user8', 'user9', 'user10'],
    classroomIds: ['classroom4', 'classroom5', 'classroom6'],
  },
  {
    id: 'school3',
    name: 'Escola Estação Sul',
    address: 'Praça da Liberdade, 789, Zona Sul',
    directorId: 'user4',
    teacherIds: ['user11', 'user12', 'user13'],
    classroomIds: ['classroom7', 'classroom8', 'classroom9'],
  },
];

// Generate mock classrooms
export const classrooms: Classroom[] = [
  {
    id: 'classroom1',
    name: 'Sala 101',
    schoolId: 'school1',
    teacherId: 'user5',
    capacity: 30,
    schedule: [],
  },
  {
    id: 'classroom2',
    name: 'Sala 102',
    schoolId: 'school1',
    teacherId: 'user6',
    capacity: 25,
    schedule: [],
  },
  {
    id: 'classroom3',
    name: 'Sala 103',
    schoolId: 'school1',
    teacherId: 'user7',
    capacity: 35,
    schedule: [],
  },
  {
    id: 'classroom4',
    name: 'Sala 201',
    schoolId: 'school2',
    teacherId: 'user8',
    capacity: 28,
    schedule: [],
  },
  {
    id: 'classroom5',
    name: 'Sala 202',
    schoolId: 'school2',
    teacherId: 'user9',
    capacity: 32,
    schedule: [],
  },
  {
    id: 'classroom6',
    name: 'Sala 203',
    schoolId: 'school2',
    teacherId: 'user10',
    capacity: 30,
    schedule: [],
  },
  {
    id: 'classroom7',
    name: 'Sala 301',
    schoolId: 'school3',
    teacherId: 'user11',
    capacity: 34,
    schedule: [],
  },
  {
    id: 'classroom8',
    name: 'Sala 302',
    schoolId: 'school3',
    teacherId: 'user12',
    capacity: 26,
    schedule: [],
  },
  {
    id: 'classroom9',
    name: 'Sala 303',
    schoolId: 'school3',
    teacherId: 'user13',
    capacity: 30,
    schedule: [],
  },
];

// Generate mock schedules for each classroom
export const schedules: Schedule[] = [
  {
    id: 'schedule1',
    classroomId: 'classroom1',
    teacherId: 'user5',
    subject: 'Matemática',
    dayOfWeek: 'Segunda-feira',
    startTime: '08:00',
    endTime: '10:00',
  },
  {
    id: 'schedule2',
    classroomId: 'classroom1',
    teacherId: 'user5',
    subject: 'Matemática',
    dayOfWeek: 'Quarta-feira',
    startTime: '08:00',
    endTime: '10:00',
  },
  {
    id: 'schedule3',
    classroomId: 'classroom2',
    teacherId: 'user6',
    subject: 'Português',
    dayOfWeek: 'Terça-feira',
    startTime: '10:00',
    endTime: '12:00',
  },
  {
    id: 'schedule4',
    classroomId: 'classroom2',
    teacherId: 'user6',
    subject: 'Português',
    dayOfWeek: 'Quinta-feira',
    startTime: '10:00',
    endTime: '12:00',
  },
  {
    id: 'schedule5',
    classroomId: 'classroom3',
    teacherId: 'user7',
    subject: 'Ciências',
    dayOfWeek: 'Segunda-feira',
    startTime: '13:00',
    endTime: '15:00',
  },
  {
    id: 'schedule6',
    classroomId: 'classroom3',
    teacherId: 'user7',
    subject: 'Ciências',
    dayOfWeek: 'Sexta-feira',
    startTime: '13:00',
    endTime: '15:00',
  },
];

// Update classroom schedules
classrooms.forEach(classroom => {
  classroom.schedule = schedules.filter(schedule => schedule.classroomId === classroom.id);
});

// Generate mock students (10 per classroom)
export const generateStudents = (): Student[] => {
  const students: Student[] = [];
  const firstNames = ['Ana', 'João', 'Maria', 'Pedro', 'Lucas', 'Juliana', 'Mateus', 'Carla', 'Bruno', 'Larissa'];
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Costa', 'Ferreira', 'Rodrigues', 'Almeida'];
  
  classrooms.forEach(classroom => {
    for (let i = 0; i < 10; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const studentId = `student${students.length + 1}`;
      
      // Generate attendance records for the past 30 days
      const attendance = [];
      const today = new Date();
      
      for (let j = 0; j < 30; j++) {
        const date = new Date();
        date.setDate(today.getDate() - j);
        
        // Random attendance status with weighted probabilities
        const random = Math.random();
        let status: 'present' | 'absent' | 'late';
        
        if (random < 0.8) {
          status = 'present';
        } else if (random < 0.95) {
          status = 'late';
        } else {
          status = 'absent';
        }
        
        attendance.push({
          id: `attendance${studentId}_${j}`,
          studentId,
          date: date.toISOString().split('T')[0],
          status,
        });
      }
      
      students.push({
        id: studentId,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@aluno.estacaotech.com`,
        schoolId: classroom.schoolId,
        classroomId: classroom.id,
        grade: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        attendance,
        profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${students.length % 70 + 1}.jpg`,
      });
    }
  });
  
  return students;
};

export const students = generateStudents();

// Generate mock inventory items
export const inventoryItems: InventoryItem[] = [
  {
    id: 'item1',
    name: 'Notebooks',
    category: 'Materiais',
    quantity: 150,
    schoolId: 'school1',
    minQuantity: 50,
    price: 15.0,
  },
  {
    id: 'item2',
    name: 'Lápis',
    category: 'Materiais',
    quantity: 500,
    schoolId: 'school1',
    minQuantity: 100,
    price: 1.5,
  },
  {
    id: 'item3',
    name: 'Livros de Português',
    category: 'Didáticos',
    quantity: 80,
    schoolId: 'school1',
    minQuantity: 30,
    price: 45.0,
  },
  {
    id: 'item4',
    name: 'Livros de Matemática',
    category: 'Didáticos',
    quantity: 75,
    schoolId: 'school1',
    minQuantity: 30,
    price: 48.0,
  },
  {
    id: 'item5',
    name: 'Computadores',
    category: 'Equipamentos',
    quantity: 25,
    schoolId: 'school1',
    minQuantity: 10,
    price: 1500.0,
  },
  {
    id: 'item6',
    name: 'Notebooks',
    category: 'Materiais',
    quantity: 120,
    schoolId: 'school2',
    minQuantity: 50,
    price: 15.0,
  },
  {
    id: 'item7',
    name: 'Lápis',
    category: 'Materiais',
    quantity: 450,
    schoolId: 'school2',
    minQuantity: 100,
    price: 1.5,
  },
  {
    id: 'item8',
    name: 'Livros de Ciências',
    category: 'Didáticos',
    quantity: 70,
    schoolId: 'school2',
    minQuantity: 30,
    price: 42.0,
  },
  {
    id: 'item9',
    name: 'Projetores',
    category: 'Equipamentos',
    quantity: 12,
    schoolId: 'school2',
    minQuantity: 5,
    price: 800.0,
  },
  {
    id: 'item16',
    name: 'Canetas Esferográficas',
    category: 'Materiais',
    quantity: 400,
    schoolId: 'school2',
    minQuantity: 150,
    price: 2.0,
  },
  {
    id: 'item17',
    name: 'Régua 30cm',
    category: 'Materiais',
    quantity: 120,
    schoolId: 'school2',
    minQuantity: 50,
    price: 3.5,
  },

  // Escola 3
  {
    id: 'item18',
    name: 'Tesoura Escolar',
    category: 'Materiais',
    quantity: 80,
    schoolId: 'school3',
    minQuantity: 30,
    price: 4.0,
  },
  {
    id: 'item19',
    name: 'Cola Branca',
    category: 'Materiais',
    quantity: 150,
    schoolId: 'school3',
    minQuantity: 50,
    price: 3.0,
  },

  {
    id: 'item10',
    name: 'Notebooks',
    category: 'Materiais',
    quantity: 130,
    schoolId: 'school3',
    minQuantity: 50,
    price: 15.0,
  },
  {
    id: 'item11',
    name: 'Canetas',
    category: 'Materiais',
    quantity: 580,
    schoolId: 'school3',
    minQuantity: 150,
    price: 2.0,
  },
  {
    id: 'item12',
    name: 'Livros de História',
    category: 'Didáticos',
    quantity: 65,
    schoolId: 'school3',
    minQuantity: 30,
    price: 40.0,
  },
  {
    id: 'item13',
    name: 'Tablets',
    category: 'Equipamentos',
    quantity: 18,
    schoolId: 'school3',
    minQuantity: 5,
    price: 6.0,
  },
  {
    id: 'item14',
    name: 'Cadernos Universitários',
    category: 'Materiais',
    quantity: 200,
    schoolId: 'school1',
    minQuantity: 80,
    price: 12.0,
  },
  {
    id: 'item15',
    name: 'Borracha',
    category: 'Materiais',
    quantity: 300,
    schoolId: 'school1',
    minQuantity: 100,
    price: 0.5,
  },
];

// Generate mock financial records
export const financialRecords: FinancialRecord[] = [
  {
    id: 'finance1',
    schoolId: 'school1',
    type: 'income',
    amount: 25000.0,
    category: 'Mensalidades',
    description: 'Mensalidades do mês de Março',
    date: '2025-03-10',
  },
  {
    id: 'finance2',
    schoolId: 'school1',
    type: 'expense',
    amount: 15000.0,
    category: 'Salários',
    description: 'Pagamento de salários - Março',
    date: '2025-03-05',
  },
  {
    id: 'finance3',
    schoolId: 'school1',
    type: 'expense',
    amount: 2500.0,
    category: 'Materiais',
    description: 'Compra de materiais escolares',
    date: '2025-03-15',
  },
  {
    id: 'finance4',
    schoolId: 'school1',
    type: 'income',
    amount: 5000.0,
    category: 'Atividades Extras',
    description: 'Cursos extracurriculares',
    date: '2025-03-20',
  },
  {
    id: 'finance5',
    schoolId: 'school2',
    type: 'income',
    amount: 22000.0,
    category: 'Mensalidades',
    description: 'Mensalidades do mês de Março',
    date: '2025-03-10',
  },
  {
    id: 'finance6',
    schoolId: 'school2',
    type: 'expense',
    amount: 13000.0,
    category: 'Salários',
    description: 'Pagamento de salários - Março',
    date: '2025-03-05',
  },
  {
    id: 'finance7',
    schoolId: 'school2',
    type: 'expense',
    amount: 3000.0,
    category: 'Infraestrutura',
    description: 'Manutenção do prédio',
    date: '2025-03-18',
  },
  {
    id: 'finance8',
    schoolId: 'school3',
    type: 'income',
    amount: 26000.0,
    category: 'Mensalidades',
    description: 'Mensalidades do mês de Março',
    date: '2025-03-10',
  },
  {
    id: 'finance9',
    schoolId: 'school3',
    type: 'expense',
    amount: 14500.0,
    category: 'Salários',
    description: 'Pagamento de salários - Março',
    date: '2025-03-05',
  },
  {
    id: 'finance10',
    schoolId: 'school3',
    type: 'expense',
    amount: 4200.0,
    category: 'Equipamentos',
    description: 'Compra de equipamentos tecnológicos',
    date: '2025-03-22',
  },
];