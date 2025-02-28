import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <h2>Professor Dashboard</h2>
      <ul>
        <li><Link to="/professor/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
        <li><Link to="/professor/manage-results" onClick={toggleSidebar}>Manage Results</Link></li>
        <li><Link to="/professor/manage-attendance" onClick={toggleSidebar}>Manage Attendance</Link></li>
        <li><Link to="/professor/announcements" onClick={toggleSidebar}>Announcements</Link></li>
        <li><Link to="/professor/student-profiles" onClick={toggleSidebar}>Student Profiles</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
