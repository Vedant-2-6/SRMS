import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/fee-voucher">Fee Voucher</Link></li>
        <li><Link to="/results">Exam Results</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
