import React, { useState, useEffect } from 'react';
import './Reports.css';

// Fixed subjects data for each branch-semester combination.
// (You may expand this object with additional branches/semesters as needed.)
const fixedSubjectsData = {
  "CE-1": [
    { subject: "Mathematics I" },
    { subject: "Physics" },
    { subject: "Chemistry" },
    { subject: "Engineering Graphics" }
  ],
  "CE-2": [
    { subject: "Mathematics II" },
    { subject: "Mechanics" },
    { subject: "Electrical Engineering" },
    { subject: "Programming Fundamentals" }
  ],
  "IT-1": [
    { subject: "Mathematics I" },
    { subject: "Computer Fundamentals" },
    { subject: "English" },
    { subject: "Programming Basics" }
  ],
  "IT-2": [
    { subject: "Mathematics II" },
    { subject: "Data Structures" },
    { subject: "Digital Electronics" },
    { subject: "Web Fundamentals" }
  ]
  // Add more as needed.
};

// Dummy student data for demonstration.
const dummyStudents = [
  { id: 1, name: "Alice Johnson", branch: "CE", semester: "1" },
  { id: 2, name: "Bob Smith", branch: "IT", semester: "1" },
  { id: 3, name: "Charlie Brown", branch: "CE", semester: "2" },
  { id: 4, name: "Daisy Miller", branch: "IT", semester: "2" }
];

const Reports = () => {
  // Filters for selecting branch, semester, and the student.
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  
  // Subjects state: each subject holds the marks and computed result details.
  const [subjects, setSubjects] = useState([]);
  
  // When branch or semester changes, load the fixed subjects.
  useEffect(() => {
    setSelectedStudent(''); // Reset the student selection when branch/semester change.
    if (branch && semester) {
      const key = `${branch}-${semester}`;
      if (fixedSubjectsData[key]) {
        const initialSubjects = fixedSubjectsData[key].map(item => ({
          subject: item.subject,
          theory: "",
          practical: "",
          attendance: "",
          total: "",
          percentage: "",
          grade: "",
          gradePoint: ""
        }));
        setSubjects(initialSubjects);
      } else {
        setSubjects([]);
      }
    } else {
      setSubjects([]);
    }
  }, [branch, semester]);

  // Filter available students based on the current selections.
  const availableStudents = dummyStudents.filter((stu) =>
    (branch === "" || stu.branch === branch) &&
    (semester === "" || stu.semester === semester)
  );

  /*
    Helper function to compute subject result.
    For each subject, if a mark field is left blank, its maximum is omitted.
      - Theory: Maximum is 100 if provided; otherwise, 0.
      - Practical: Maximum is 50 if provided; otherwise, 0.
      - Attendance: Maximum is 10 (this field is required).
  */
  const calculateSubjectGrade = (theory, practical, attendance) => {
    const markT = theory !== '' ? parseFloat(theory) : 0;
    const markP = practical !== '' ? parseFloat(practical) : 0;
    const markA = attendance !== '' ? parseFloat(attendance) : 0;

    const maxT = theory !== '' ? 100 : 0;
    const maxP = practical !== '' ? 50 : 0;
    const maxA = attendance !== '' ? 10 : 0;

    const total = markT + markP + markA;
    const maxTotal = maxT + maxP + maxA;
    let percentage = maxTotal > 0 ? (total / maxTotal) * 100 : 0;

    let grade = "";
    let gradePoint = 0;
    if (percentage >= 90) {
      grade = "A";
      gradePoint = 10;
    } else if (percentage >= 80) {
      grade = "B";
      gradePoint = 8;
    } else if (percentage >= 70) {
      grade = "C";
      gradePoint = 6;
    } else if (percentage >= 60) {
      grade = "D";
      gradePoint = 4;
    } else {
      grade = "F";
      gradePoint = 0;
    }
    return { total, percentage: percentage.toFixed(2), grade, gradePoint };
  };

  // Update subject marks and recalculate details as fields change.
  const handleSubjectMarkChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;

    // We require attendance to be provided for calculation.
    if (newSubjects[index].attendance !== '') {
      const result = calculateSubjectGrade(
        newSubjects[index].theory,
        newSubjects[index].practical,
        newSubjects[index].attendance
      );
      newSubjects[index] = { ...newSubjects[index], ...result };
    } else {
      newSubjects[index] = {
        ...newSubjects[index],
        total: "",
        percentage: "",
        grade: "",
        gradePoint: ""
      };
    }
    setSubjects(newSubjects);
  };

  // Consider a subject entry complete if the attendance field is filled.
  const allSubjectsCompleted =
    subjects.length > 0 && subjects.every((subj) => subj.attendance !== "");

  // Compute overall SPI (or CPI) as the average of grade points.
  const overallSPI = allSubjectsCompleted
    ? (
        subjects.reduce((acc, subj) => acc + subj.gradePoint, 0) / subjects.length
      ).toFixed(2)
    : null;

  // Handler for "Submit Report" – simulates submission and then clears all fields.
  const handleSubmitReport = () => {
    alert(
      `Report for ${selectedStudent} submitted successfully!\nOverall SPI: ${overallSPI}`
    );
    // Reset all filters and the subjects.
    setSemester('');
    setBranch('');
    setSelectedStudent('');
    setSubjects([]);
  };

  return (
    <div className="reports">
      <header className="reports-header">
        <h1>Student Performance Report</h1>
      </header>

      {/* Student Selection Section */}
      <section className="student-selection">
        <div className="filter-group">
          <label>Semester:</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select</option>
            {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select</option>
            {["CE", "IT", "EC", "CHEM", "MECH"].map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select</option>
            {availableStudents.map((stu) => (
              <option key={stu.id} value={stu.name}>
                {stu.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Subjects Marks Entry Section */}
      {branch && semester && selectedStudent && subjects.length > 0 && (
        <section className="subjects-section">
          <h2>Enter Marks for Fixed Subjects</h2>
          <table className="subjects-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Theory (100)</th>
                <th>Practical (50)</th>
                <th>Attendance (10)</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Grade Point</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, index) => (
                <tr key={index}>
                  <td>{subj.subject}</td>
                  <td>
                    <input
                      type="number"
                      value={subj.theory}
                      onChange={(e) =>
                        handleSubjectMarkChange(index, "theory", e.target.value)
                      }
                      placeholder="Optional"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={subj.practical}
                      onChange={(e) =>
                        handleSubjectMarkChange(index, "practical", e.target.value)
                      }
                      placeholder="Optional"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={subj.attendance}
                      onChange={(e) =>
                        handleSubjectMarkChange(index, "attendance", e.target.value)
                      }
                      placeholder="Required"
                    />
                  </td>
                  <td>{subj.total}</td>
                  <td>{subj.percentage ? `${subj.percentage}%` : ""}</td>
                  <td>{subj.grade}</td>
                  <td>{subj.gradePoint}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* When all subjects are complete, display the overall report along with a Submit button */}
          {allSubjectsCompleted ? (
            <section className="report-result">
              <h2>Report for {selectedStudent}</h2>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Grade Point</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subj, index) => (
                    <tr key={index}>
                      <td>{subj.subject}</td>
                      <td>{subj.total}</td>
                      <td>{subj.percentage}%</td>
                      <td>{subj.grade}</td>
                      <td>{subj.gradePoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="overall-spi">
                <h3>Overall SPI: {overallSPI}</h3>
              </div>
              <button className="submitReportBtn" onClick={handleSubmitReport}>
                Submit Report
              </button>
            </section>
          ) : (
            <section className="incomplete-msg">
              <p>
                Please ensure the attendance marks for all subjects are entered to
                generate the complete report.
              </p>
            </section>
          )}
        </section>
      )}
    </div>
  );
};

export default Reports;
