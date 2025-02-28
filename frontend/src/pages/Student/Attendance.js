import React from 'react';
import './Attendance.css';

const Attendance = () => {
  return (
    <div className="attendance">
      <h1>Attendance</h1>
      <p>Track your attendance across all subjects.</p>
      <div className="attendance-info">
        <h2>Semester-wise Attendance:</h2>
        <p>Total Attendance: 85%</p>
        
        <h2>Subject-wise Attendance:</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Lecture</th>
              <th>Lab</th>
              <th>Total Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mathematics</td>
              <td>80%</td>
              <td>N/A</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>Computer Science</td>
              <td>90%</td>
              <td>75%</td>
              <td>82.5%</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
