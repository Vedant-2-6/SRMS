import React from 'react';
import './StudentProfiles.css';

const StudentProfiles = () => {
  return (
    <div className="student-profiles">
      <h1>Student Profiles</h1>
      <p>View and manage student profiles.</p>
      <div className="profile-list">
        <div className="profile-card">
          <h3>Vedant Patel </h3>
          <p>Roll No: STU123456</p>
          <p>Branch: Computer Science</p>
          <p>Semester: 6</p>
        </div>
        <div className="profile-card">
          <h3>Shyam Vachhani </h3>
          <p>Roll No: STU123457</p>
          <p>Branch: Computer Science</p>
          <p>Semester: 6</p>
        </div>
        {/* Add more profile cards as needed */}
      </div>
    </div>
  );
};

export default StudentProfiles;
