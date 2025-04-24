import { create } from 'zustand';
import { schools } from '../mockData';
import { School } from '../types';

interface SchoolState {
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
}

export const useSchoolStore = create<SchoolState>((set) => ({
  selectedSchool: null,
  setSelectedSchool: (school) => set({ selectedSchool: school }),
}));