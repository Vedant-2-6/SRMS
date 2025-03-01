import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";

const ProfessorDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="professor-dashboard">
        <header className="dashboard-header">
          <h1>Professor Dashboard</h1>
          <button className="sign-out">Sign Out</button>
        </header>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="welcome-section">
          <h2>Welcome, Dr. Shyam Vachhani</h2>
          <p>Department: Computer Science</p>
          <p>Courses: Advanced Algorithms, Data Structures</p>
        </section>
        <section className="main-menu">
          <div className="row">
            <div className="card">
              <Link to="/professor/announcements" className="card-link">
                <h3>Announcements</h3>
                <p>Post and manage announcements.</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/professor/manage-results" className="card-link">
                <h3>Manage Results</h3>
                <p>Update and view student results.</p>
              </Link>
            </div>
            <div className="card">
              <Link to="/professor/manage-attendance" className="card-link">
                <h3>Manage Attendance</h3>
                <p>Update and track attendance records.</p>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="card">
              <h3>Average Attendance</h3>
              <p>85%</p>
            </div>
            <div className="card">
              <h3>Pending Tasks</h3>
              <p>3</p>
            </div>
            <div className="card">
              <h3>Total Students</h3>
              <p>150</p>
            </div>
          </div>
        </section>
      </div>
  );
};

export default ProfessorDashboard;
