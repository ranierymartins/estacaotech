import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Schedule from './pages/Schedule';
import Staff from './pages/Staff';
import Schools from './pages/Schools';
import TeacherArea from './pages/TeacherArea';
import Inventory from './pages/Inventory';
import Finance from './pages/Finance';
import Assistant from './pages/Assistant';

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="discentes" element={<Students />} />
          <Route path="docentes" element={<Teachers />} />
          <Route path="agendamentos" element={<Schedule />} />
          <Route path="funcionarios" element={<Staff />} />
          <Route path="escolas" element={<Schools />} />
          <Route path="area-professor" element={<TeacherArea />} />
          <Route path="estoque" element={<Inventory />} />
          <Route path="financeiro" element={<Finance />} />
          <Route path="assistente" element={<Assistant />} />
        </Route>
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;