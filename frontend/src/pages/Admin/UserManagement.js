import React, { useState } from 'react';
import './UserManagement.css';

// Dummy student data for demonstration
const dummyStudents = [
  { id: 1, name: "Alice Johnson", branch: "CE", semester: "1" },
  { id: 2, name: "Bob Smith", branch: "IT", semester: "1" },
  { id: 3, name: "Charlie Brown", branch: "CE", semester: "2" },
  { id: 4, name: "Daisy Miller", branch: "IT", semester: "2" }
];

const UserManagement = () => {
  // States for selecting branch, semester, and the student
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  // States for student ID and credentials
  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [caste, setCaste] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');

  // Filter available students based on the current selections
  const availableStudents = dummyStudents.filter(stu => {
    return (branch === "" || stu.branch === branch) &&
           (semester === "" || stu.semester === semester);
  });

  // Handler for submitting the credentials allocation
  const handleSubmit = () => {
    if (selectedStudent && studentId && username && password && email && phoneNumber && caste && category && address) {
      alert(
        `Credentials for ${selectedStudent} have been allocated successfully!\nStudent ID: ${studentId}\nUsername: ${username}\nPassword: ${password}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nCaste: ${caste}\nCategory: ${category}\nAddress: ${address}`
      );
      // Clear all fields after submission
      setBranch('');
      setSemester('');
      setSelectedStudent('');
      setStudentId('');
      setUsername('');
      setPassword('');
      setEmail('');
      setPhoneNumber('');
      setCaste('');
      setCategory('');
      setAddress('');
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  return (
    <div className="user-management">
      <header className="user-management-header">
        <h1>User Management</h1>
      </header>

      {/* Student Selection Section */}
      <section className="student-selection">
        <div className="filter-group">
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select</option>
            {["CE", "IT", "EC", "CHEM", "MECH"].map(br => (
              <option key={br} value={br}>{br}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Semester:</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select</option>
            {["1", "2", "3", "4", "5", "6", "7", "8"].map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Student:</label>
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Select</option>
            {availableStudents.map(stu => (
              <option key={stu.id} value={stu.name}>{stu.name}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Credentials Entry Section */}
      {branch && semester && selectedStudent && (
        <section className="credentials-section">
          <h2>Allocate Credentials</h2>
          <div className="form-group">
            <label>Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="form-group">
            <label>Caste:</label>
            <input
              type="text"
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
              placeholder="Enter Caste"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category"
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
            />
          </div>
          <button className="submitCredentialsBtn" onClick={handleSubmit}>
            Submit
          </button>
        </section>
      )}
    </div>
  );
};

export default UserManagement;
