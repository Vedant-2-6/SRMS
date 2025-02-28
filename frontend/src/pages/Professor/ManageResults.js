import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageResults.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ManageResults = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [resultsData, setResultsData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  const subjects = useMemo(() => ['Advanced Algorithms', 'Data Structures'], []);
  const branches = useMemo(() => ['CE', 'IT', 'EC', 'CHEM', 'MECH'], []);
  const semesters = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8], []);
  const classes = useMemo(() => ['A', 'B'], []);
  const batches = useMemo(() => ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'], []);

  useEffect(() => {
    // Fetch results data from the backend
    // This is just a mock example, replace it with actual API call
    const generateMockData = () => {
      const mockData = [];
      const names = ['Vedant Sharma', 'Riya Patel', 'Anil Mehta', 'Kavita Rao', 'Sandeep Singh', 'Pooja Jain'];
      const rollNos = Array.from({ length: 150 }, (_, i) => (10000 + i).toString());

      rollNos.forEach((rollNo, index) => {
        mockData.push({
          rollNo: rollNo,
          name: names[index % names.length],
          subject: subjects[index % subjects.length],
          branch: branches[index % branches.length],
          semester: semesters[Math.floor(index / 10) % semesters.length],
          class: classes[index % classes.length],
          batch: batches[index % batches.length],
          externalMarks: Math.floor(Math.random() * 51),  // Random marks between 0 and 50
          internalMarks: Math.floor(Math.random() * 51),  // Random marks between 0 and 50
          termworkVivaMarks: Math.floor(Math.random() * 51),  // Random marks between 0 and 50
        });
      });

      return mockData;
    };

    setResultsData(generateMockData());
  }, [subjects, branches, semesters, classes, batches]);

  const filterResults = () => {
    // Implement filtering logic based on selected criteria
    const filtered = resultsData.filter(data => {
      return (
          (!selectedSubject || data.subject === selectedSubject) &&
          (!selectedBranch || data.branch === selectedBranch) &&
          (!selectedSemester || data.semester.toString() === selectedSemester) &&
          (!selectedClass || data.class === selectedClass) &&
          (!selectedBatch || data.batch === selectedBatch)
      );
    });
    setFilteredResults(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterResults();
  };

  const handleMarksChange = (rollNo, newMarks, type) => {
    const updatedResults = filteredResults.map(item =>
        item.rollNo === rollNo ? { ...item, [type]: newMarks } : item
    );
    setFilteredResults(updatedResults);
  };

  const aggregateResults = () => {
    const aggregatedData = {};

    filteredResults.forEach(item => {
      const subject = item.subject;
      if (!aggregatedData[subject]) {
        aggregatedData[subject] = { externalMarks: 0, internalMarks: 0, termworkVivaMarks: 0, totalMarks: 0, count: 0 };
      }
      aggregatedData[subject].externalMarks += item.externalMarks;
      aggregatedData[subject].internalMarks += item.internalMarks;
      aggregatedData[subject].termworkVivaMarks += item.termworkVivaMarks;
      aggregatedData[subject].totalMarks += item.externalMarks + item.internalMarks + item.termworkVivaMarks;
      aggregatedData[subject].count++;
    });

    return Object.keys(aggregatedData).map(subject => ({
      subject: subject,
      averageExternalMarks: aggregatedData[subject].externalMarks / aggregatedData[subject].count,
      averageInternalMarks: aggregatedData[subject].internalMarks / aggregatedData[subject].count,
      averageTermworkVivaMarks: aggregatedData[subject].termworkVivaMarks / aggregatedData[subject].count,
      averageTotalMarks: aggregatedData[subject].totalMarks / aggregatedData[subject].count,
    }));
  };

  const getChartData = () => {
    const aggregatedData = aggregateResults();
    const labels = aggregatedData.map(item => item.subject);
    const externalData = aggregatedData.map(item => item.averageExternalMarks);
    const internalData = aggregatedData.map(item => item.averageInternalMarks);
    const termworkVivaData = aggregatedData.map(item => item.averageTermworkVivaMarks);
    const totalData = aggregatedData.map(item => item.averageTotalMarks);

    return {
      labels,
      datasets: [
        {
          label: 'Average External Marks',
          data: externalData,
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Average Internal Marks',
          data: internalData,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Average Termwork/Viva Marks',
          data: termworkVivaData,
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Average Total Marks',
          data: totalData,
          backgroundColor: 'rgba(153, 102, 255, 0.8)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 150,
        ticks: {
          stepSize: 10,
          callback: function (value) { if (value % 1 === 0) { return value; } }
        }
      }
    }
  };

  // Pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredResults.length / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <div className="manage-results container">
        <h1>Manage Results</h1>
        <form className="results-form" onSubmit={handleSubmit}>
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

          <label htmlFor="class">Class:</label>
          <select id="class" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            <option value="">Select Class</option>
            {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

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

          <button type="submit">Filter</button>
          <button type="button" className="back-button" onClick={() => navigate('/professor/dashboard')}>
            Back
          </button>
        </form>

        <h2>Results Table</h2>
        <table className="results-table">
          <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>External Marks</th>
            <th>Internal Marks</th>
            <th>Termwork/Viva Marks</th>
            <th>Total Marks</th>
          </tr>
          </thead>
          <tbody>
          {currentResults.map((item, index) => (
              <tr key={index}>
                <td>{item.rollNo}</td>
                <td>{item.name}</td>
                <td>
                  <input
                      type="number"
                      value={item.externalMarks}
                      onChange={e => handleMarksChange(item.rollNo, parseInt(e.target.value), 'externalMarks')}
                      max={50}
                      min={0}
                  />
                </td>
                <td>
                  <input
                      type="number"
                      value={item.internalMarks}
                      onChange={e => handleMarksChange(item.rollNo, parseInt(e.target.value), 'internalMarks')}
                      max={50}
                      min={0}
                  />
                </td>
                <td>
                  <input
                      type="number"
                      value={item.termworkVivaMarks}
                      onChange={e => handleMarksChange(item.rollNo, parseInt(e.target.value), 'termworkVivaMarks')}
                      max={50}
                      min={0}
                  />
                </td>
                <td>{item.externalMarks + item.internalMarks + item.termworkVivaMarks}</td>
              </tr>
          ))}
          </tbody>
        </table>

        <div className="pagination">
          {pageNumbers.map(number => (
              <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                {number}
              </button>
          ))}
        </div>

        <h2>Average Marks Bar Graph</h2>
        <Bar data={getChartData()} options={options} />
      </div>
  );
};

export default ManageResults;
