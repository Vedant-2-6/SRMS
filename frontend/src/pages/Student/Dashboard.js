import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button className="sign-out">Sign Out</button>
      </header>
      <section className="welcome-section">
        <h2>Welcome, [Student Name]</h2>
        <p>Roll No: STU123456</p>
        <p>Branch: Computer Science</p>
        <p>Semester: 6th</p>
      </section>
      <section className="main-menu">
        <Link to="/profile" className="card">
          <i className="fas fa-user-cog"></i>
          <h3>Profile Management</h3>
          <p>Update your contact details and change password.</p>
        </Link>
        <Link to="/results" className="card">
          <i className="fas fa-chart-line"></i>
          <h3>Exam Results</h3>
          <p>View your semester results and more.</p>
        </Link>
        <Link to="/attendance" className="card">
          <i className="fas fa-calendar-check"></i>
          <h3>Attendance</h3>
          <p>Track your attendance across all subjects.</p>
        </Link>
        <Link to="/contact" className="card">
          <i className="fas fa-phone-alt"></i>
          <h3>Contact Us</h3>
          <p>Get in touch with the admin or department heads.</p>
        </Link>
        <Link to="/news" className="card">
          <i className="fas fa-newspaper"></i>
          <h3>News & Announcements</h3>
          <p>Stay updated with the latest campus news.</p>
        </Link>
        <Link to="/fee-voucher" className="card">
          <i className="fas fa-file-invoice-dollar"></i>
          <h3>Fee Voucher</h3>
          <p>Generate and print your fee voucher here.</p>
        </Link>
      </section>
      <section className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity">
          <p>Mid-Semester Examination Schedule Published</p>
          <span>2 hours ago</span>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
