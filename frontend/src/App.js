import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Student/Dashboard';
import FeeVoucher from './pages/Student/FeeVoucher';
import Results from './pages/Student/Results';
import Attendance from './pages/Student/Attendance';
import Contact from './pages/Student/Contact';
import News from './pages/Student/News';
import Profile from './pages/Student/Profile';
import ProfessorDashboard from './pages/Professor/Dashboard';
import ManageResults from './pages/Professor/ManageResults';
import ManageAttendance from './pages/Professor/ManageAttendance';
import Announcements from './pages/Professor/Announcements';
import StudentProfiles from './pages/Professor/StudentProfiles';
import { AuthProvider } from './context/AuthContext';
import './App.css';  // Add this line to include custom global styles

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <HamburgerMenu onClick={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/fee-voucher" element={<FeeVoucher />} />
            <Route path="/results" element={<Results />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
            <Route path="/professor/manage-results" element={<ManageResults />} />
            <Route path="/professor/manage-attendance" element={<ManageAttendance />} />
            <Route path="/professor/announcements" element={<Announcements />} />
            <Route path="/professor/student-profiles" element={<StudentProfiles />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
