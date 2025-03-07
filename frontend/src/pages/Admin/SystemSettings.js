import React, { useState, useEffect } from 'react';
import './SystemSettings.css';

// Example subjects data for different branches and semesters (initially empty)
const initialSubjectsData = {
  "CE-1": [],
  "CE-2": [],
  "IT-1": [],
  "IT-2": [],
  "EC-1": [],
  "EC-2": [],
  "CHEM-1": [],
  "CHEM-2": [],
  "MECH-1": [],
  "MECH-2": []
  // Add more as needed.
};

const SystemSettings = () => {
  // States for selecting branch and semester
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');

  // State for managing subjects for the selected branch and semester
  const [subjects, setSubjects] = useState([]);
  const [currentSubjectsData, setCurrentSubjectsData] = useState(initialSubjectsData);

  // States for adding a new subject
  const [subjectName, setSubjectName] = useState('');
  const [internalMarks, setInternalMarks] = useState('');
  const [externalMarks, setExternalMarks] = useState('');
  const [practicalMarks, setPracticalMarks] = useState('');
  const [attendanceMarks, setAttendanceMarks] = useState('');
  const [credits, setCredits] = useState('');

  // Effect to update subjects when branch or semester changes
  useEffect(() => {
    if (branch && semester) {
      const key = `${branch}-${semester}`;
      setSubjects(currentSubjectsData[key] || []);
    }
  }, [branch, semester, currentSubjectsData]);

  // Handler for adding a new subject
  const handleAddSubject = () => {
    if (subjectName && internalMarks && externalMarks && attendanceMarks && credits) {
      const newSubject = {
        subjectName,
        internalMarks,
        externalMarks,
        practicalMarks,
        attendanceMarks,
        credits
      };
      const key = `${branch}-${semester}`;
      const updatedSubjects = [...subjects, newSubject];
      setSubjects(updatedSubjects);
      setCurrentSubjectsData(prevData => ({
        ...prevData,
        [key]: updatedSubjects
      }));
      // Clear the input fields
      setSubjectName('');
      setInternalMarks('');
      setExternalMarks('');
      setPracticalMarks('');
      setAttendanceMarks('');
      setCredits('');
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Handler for deleting a subject
  const handleDeleteSubject = (index) => {
    const key = `${branch}-${semester}`;
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
    setCurrentSubjectsData(prevData => ({
      ...prevData,
      [key]: updatedSubjects
    }));
  };

  return (
    <div className="system-settings">
      <header className="system-settings-header">
        <h1>System Settings - Manage Subjects</h1>
      </header>

      {/* Branch and Semester Selection */}
      <section className="selection-section">
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
      </section>

      {/* Add New Subject Form */}
      {branch && semester && (
        <section className="add-subject-section">
          <h2>Add New Subject</h2>
          <div className="form-group">
            <label>Subject Name:</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
            />
          </div>
          <div className="form-group">
            <label>Internal Marks:</label>
            <input
              type="number"
              value={internalMarks}
              onChange={(e) => setInternalMarks(e.target.value)}
              placeholder="Enter Internal Marks"
            />
          </div>
          <div className="form-group">
            <label>External Marks:</label>
            <input
              type="number"
              value={externalMarks}
              onChange={(e) => setExternalMarks(e.target.value)}
              placeholder="Enter External Marks"
            />
          </div>
          <div className="form-group">
            <label>Practical Marks:</label>
            <input
              type="number"
              value={practicalMarks}
              onChange={(e) => setPracticalMarks(e.target.value)}
              placeholder="Enter Practical Marks (Optional)"
            />
          </div>
          <div className="form-group">
            <label>Attendance Marks:</label>
            <input
              type="number"
              value={attendanceMarks}
              onChange={(e) => setAttendanceMarks(e.target.value)}
              placeholder="Enter Attendance Marks"
            />
          </div>
          <div className="form-group">
            <label>Credits:</label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Enter Credits"
            />
          </div>
          <button className="addSubjectBtn" onClick={handleAddSubject}>
            Add Subject
          </button>
        </section>
      )}

      {/* Display Current Subjects */}
      {branch && semester && subjects.length > 0 && (
        <section className="subjects-list-section">
          <h2>Current Subjects for {branch} - Semester {semester}</h2>
          <table className="subjects-table">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Internal Marks</th>
                <th>External Marks</th>
                <th>Practical Marks</th>
                <th>Attendance Marks</th>
                <th>Credits</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, index) => (
                <tr key={index}>
                  <td>{subj.subjectName}</td>
                  <td>{subj.internalMarks}</td>
                  <td>{subj.externalMarks}</td>
                  <td>{subj.practicalMarks}</td>
                  <td>{subj.attendanceMarks}</td>
                  <td>{subj.credits}</td>
                  <td>
                    <button
                      className="deleteSubjectBtn"
                      onClick={() => handleDeleteSubject(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default SystemSettings;
