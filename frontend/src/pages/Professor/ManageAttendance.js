import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageAttendance.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Papa from 'papaparse';

const ManageAttendance = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedType, setSelectedType] = useState(''); // 'lecture' or 'lab'
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [timeline, setTimeline] = useState('day'); // 'day', 'week', 'month'

  const subjects = useMemo(() => ['Advanced Algorithms', 'Data Structures'], []);
  const branches = useMemo(() => ['CE', 'IT', 'EC', 'CHEM', 'MECH'], []);
  const semesters = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8], []);
  const classes = useMemo(() => ['A', 'B'], []);
  const batches = useMemo(() => ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'], []);

  useEffect(() => {
    // Fetch attendance data from the backend
    // Updated mock data to include more students and dates
    const generateMockData = () => {
      const mockData = [];
      const names = ['Vedant Sharma', 'Riya Patel', 'Anil Mehta', 'Kavita Rao', 'Sandeep Singh', 'Pooja Jain'];
      const rollNos = Array.from({ length: 150 }, (_, i) => (10000 + i).toString());
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Generate data for the last 30 days

      rollNos.forEach((rollNo, index) => {
        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          mockData.push({
            rollNo: rollNo,
            name: names[index % names.length],
            attendance: Math.random() > 0.2 ? 100 : 0, // Random attendance (80% present, 20% absent)
            subject: subjects[index % subjects.length],
            branch: branches[index % branches.length],
            semester: semesters[Math.floor(index / 10) % semesters.length],
            class: classes[index % classes.length],
            batch: batches[index % batches.length],
            date: date.toISOString().split('T')[0]
          });
        }
      });

      return mockData;
    };

    setAttendanceData(generateMockData());
  }, [subjects, branches, semesters, classes, batches]);

  const filterAttendance = () => {
    // Implement filtering logic based on selected criteria
    const filtered = attendanceData.filter(data => {
      return (
          (!selectedSubject || data.subject === selectedSubject) &&
          (!selectedBranch || data.branch === selectedBranch) &&
          (!selectedSemester || data.semester.toString() === selectedSemester) &&
          (!selectedType || (selectedType === 'lecture' && data.class === selectedClass) || (selectedType === 'lab' && data.batch === selectedBatch))
      );
    });
    setFilteredAttendance(filtered);
  };

  const aggregateAttendance = () => {
    const aggregatedData = {};

    filteredAttendance.forEach(item => {
      const date = item.date;
      if (!aggregatedData[date]) {
        aggregatedData[date] = 0;
      }
      if (item.attendance === 100) {
        aggregatedData[date]++;
      }
    });

    return aggregatedData;
  };

  const getChartData = () => {
    const aggregatedData = aggregateAttendance();
    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of Students Present',
          data: data,
          backgroundColor: 'rgba(99, 59, 173, 0.8)',
          borderColor: 'rgba(99, 59, 173, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        ticks: {
          stepSize: 20,
          callback: function(value) { if (value % 1 === 0) { return value; } }
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterAttendance();
  };

  const handleBulkUpdate = (status) => {
    const updatedData = filteredAttendance.map(item => ({
      ...item,
      attendance: status === 'present' ? 100 : 0
    }));
    setFilteredAttendance(updatedData);
    // Update the original data accordingly if needed
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const updatedData = result.data.map(row => ({
          rollNo: row.RollNo,
          name: row.Name,
          attendance: row.Attendance,
          subject: row.Subject,
          branch: row.Branch,
          semester: parseInt(row.Semester),
          class: row.Class,
          batch: row.Batch,
          date: row.Date
        }));
        setAttendanceData(updatedData);
        filterAttendance();
      }
    });
  };

  return (
      <div className="manage-attendance container">
        <h1>Manage Attendance</h1>
        <form className="attendance-form" onSubmit={handleSubmit}>
          <label htmlFor="subject">Subject:</label>
          <select id="subject" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <label htmlFor="branch">Branch:</label>
          <select id="branch" value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}>
            <option value="">Select Branch</option>
            {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          <label htmlFor="semester">Semester:</label>
          <select id="semester" value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>

          <label htmlFor="type">Type:</label>
          <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="lecture">Lecture</option>
            <option value="lab">Lab</option>
          </select>

          <label htmlFor="class">Class:</label>
          <select id="class" value={selectedClass} onChange={e => setSelectedClass(e.target.value)} disabled={selectedType === ''}>
            <option value="">Select Class</option>
            {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          {selectedType === 'lab' && (
              <>
                <label htmlFor="batch">Batch:</label>
                <select id="batch" value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
                  <option value="">Select Batch</option>
                  {selectedClass === 'A' && batches.filter(batch => batch.startsWith('A')).map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                  ))}
                  {selectedClass === 'B' && batches.filter(batch => batch.startsWith('B')).map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
              </>
          )}

          <label htmlFor="timeline">Timeline:</label>
          <select id="timeline" value={timeline} onChange={e => setTimeline(e.target.value)}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>

          <button type="submit">Filter</button>
          <button type="button" className="back-button" onClick={() => navigate('/professor/dashboard')}>
            Back
          </button>
        </form>

        <div className="bulk-actions">
          <button onClick={() => handleBulkUpdate('present')}>Mark All Present</button>
          <button onClick={() => handleBulkUpdate('absent')}>Mark All Absent</button>
          <input type="file" accept=".csv" onChange={handleCSVUpload} />
        </div>

        <h2>Attendance Bar Graph</h2>
        <Bar data={getChartData()} options={options} />
      </div>
  );
};

export default ManageAttendance;

