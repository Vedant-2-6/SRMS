import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Results.css';

const Results = () => {
  const [results, setResults] = useState({
    name: 'Vedant Sharma',
    rollNo: '10001',
    branch: 'Computer Engineering',
    semester: '6th',
    subjects: [
      { name: 'Advanced Algorithms', midterm: 40, final: 50, practical: 30 },
      { name: 'Data Structures', midterm: 40, final: 75, practical: 28 },
      { name: 'Operating Systems', midterm: 42, final: 78, practical: 29 },
    ],
    comments: 'Great performance overall! Keep up the good work!',
  });

  const getTotalMarks = (subject) => {
    return subject.midterm + subject.final + subject.practical;
  };

  const getPercentage = (total) => {
    return ((total / 150) * 100).toFixed(2);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const handleDownload = () => {
    // Implement download functionality
  };

  const subjectNames = results.subjects.map(subject => subject.name);
  const midtermMarks = results.subjects.map(subject => subject.midterm);
  const finalMarks = results.subjects.map(subject => subject.final);
  const practicalMarks = results.subjects.map(subject => subject.practical);

  const chartData = {
    labels: subjectNames,
    datasets: [
      {
        label: 'Midterm Marks',
        data: midtermMarks,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Final Marks',
        data: finalMarks,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Practical Marks',
        data: practicalMarks,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalMarks = results.subjects.reduce((sum, subject) => sum + getTotalMarks(subject), 0);
  const percentage = getPercentage(totalMarks);
  const grade = getGrade(percentage);

  return (
      <div className="results container">
        <h1>Exam Results</h1>
        <div className="student-info">
          <p>Name: {results.name}</p>
          <p>Roll Number: {results.rollNo}</p>
          <p>Branch: {results.branch}</p>
          <p>Semester: {results.semester}</p>
        </div>
        <h2>Subject-wise Performance</h2>
        <table className="results-table">
          <thead>
          <tr>
            <th>Subject</th>
            <th>Midterm Marks</th>
            <th>Final Marks</th>
            <th>Practical Marks</th>
            <th>Total Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
          </thead>
          <tbody>
          {results.subjects.map((subject, index) => {
            const total = getTotalMarks(subject);
            const percentage = getPercentage(total);
            const grade = getGrade(percentage);
            return (
                <tr key={index}>
                  <td>{subject.name}</td>
                  <td>{subject.midterm}</td>
                  <td>{subject.final}</td>
                  <td>{subject.practical}</td>
                  <td>{total}</td>
                  <td>{percentage}%</td>
                  <td>{grade}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
        <h2>Overall Performance</h2>
        <p>Total Marks: {totalMarks}</p>
        <p>Percentage: {percentage}%</p>
        <p>Grade: {grade}</p>
        <h2>Comments and Feedback</h2>
        <p>{results.comments}</p>
        <button onClick={handleDownload}>Download Results as PDF</button>
        <h2>Performance Chart</h2>
        <Bar data={chartData} />
      </div>
  );
};

export default Results;
