import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="sign-out">Sign Out</button>
      </header>
      <section className="welcome-section">
        <h2>Welcome, [Admin Name]</h2>
      </section>
      <section className="main-menu">
        <Link to="/admin/fee-management" className="card">
          <i className="fas fa-file-invoice-dollar"></i>
          <h3>Fee Management</h3>
          <p>Manage student fee records and generate fee vouchers.</p>
        </Link>
        <Link to="/admin/report" className="card">
          <i className="fas fa-chart-bar"></i>
          <h3>Report</h3>
          <p>Generate various academic and financial reports.</p>
        </Link>
        <Link to="/admin/system-settings" className="card">
          <i className="fas fa-cogs"></i>
          <h3>System Settings</h3>
          <p>Configure and manage system settings.</p>
        </Link>
        <Link to="/admin/user-management" className="card">
          <i className="fas fa-users-cog"></i>
          <h3>User Management</h3>
          <p>Manage user accounts and permissions.</p>
        </Link>
      </section>
    </div>
  );
};

export default AdminDashboard;
