export type Role = 'secretary' | 'director' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolIds: string[];
  profilePicture?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  directorId: string;
  teacherIds: string[];
  classroomIds: string[];
}

export interface Classroom {
  id: string;
  name: string;
  schoolId: string;
  teacherId: string;
  capacity: number;
  schedule: Schedule[];
}

export interface Schedule {
  id: string;
  classroomId: string;
  teacherId: string;
  subject: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  classroomId: string;
  grade: string;
  attendance: Attendance[];
  profilePicture?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  schoolId: string;
  minQuantity: number;
  price: number;
}

export interface FinancialRecord {
  id: string;
  schoolId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}