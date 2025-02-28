import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Announcements.css';

const Announcements = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [rollNumbers, setRollNumbers] = useState('');
  const [scheduledDate, setScheduledDate] = useState(null);

  const branches = ['CE', 'IT', 'EC', 'CHEM', 'MECH'];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const classes = ['A', 'B'];
  const batches = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'];

  const handleCheckboxChange = (event, stateUpdater) => {
    const value = event.target.value;
    stateUpdater(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedBranches.length === 0 &&
      selectedSemesters.length === 0 &&
      selectedClasses.length === 0 &&
      selectedBatches.length === 0 &&
      rollNumbers.trim() === ''
    ) {
      alert('Please select at least one recipient.');
      return;
    }
    const announcementData = {
      title,
      content,
      branches: selectedBranches,
      semesters: selectedSemesters,
      classes: selectedClasses,
      batches: selectedBatches,
      rollNumbers: rollNumbers.split(',').map(num => num.trim()),
      scheduledDate,
    };
    console.log('Announcement Data:', announcementData);
    // TODO: Send announcementData to the backend API
  };

  return (
    <div className="announcements">
      <h1>Announcements</h1>
      <p>Post new announcements or update existing ones.</p>
      <form className="announcement-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>

        <h3>Select Branches:</h3>
        <div className="checkbox-group">
          {branches.map(branch => (
            <label key={branch}>
              <input
                type="checkbox"
                value={branch}
                checked={selectedBranches.includes(branch)}
                onChange={e => handleCheckboxChange(e, setSelectedBranches)}
              />
              {branch}
            </label>
          ))}
        </div>

        <h3>Select Semesters:</h3>
        <div className="checkbox-group">
          {semesters.map(sem => (
            <label key={sem}>
              <input
                type="checkbox"
                value={sem}
                checked={selectedSemesters.includes(String(sem))}
                onChange={e => handleCheckboxChange(e, setSelectedSemesters)}
              />
              {sem}
            </label>
          ))}
        </div>

        <h3>Select Classes:</h3>
        <div className="checkbox-group">
          {classes.map(cls => (
            <label key={cls}>
              <input
                type="checkbox"
                value={cls}
                checked={selectedClasses.includes(cls)}
                onChange={e => {
                  handleCheckboxChange(e, setSelectedClasses);
                  if (cls === "A") {
                    setSelectedBatches(selectedBatches.filter(batch => !batch.startsWith("B")));
                  } else {
                    setSelectedBatches(selectedBatches.filter(batch => !batch.startsWith("A")));
                  }
                }}
              />
              {cls}
            </label>
          ))}
        </div>

        <h3>Select Batches:</h3>
        <div className="checkbox-group">
          {selectedClasses.includes("A") &&
            batches.filter(batch => batch.startsWith("A")).map(batch => (
              <label key={batch}>
                <input
                  type="checkbox"
                  value={batch}
                  checked={selectedBatches.includes(batch)}
                  onChange={e => handleCheckboxChange(e, setSelectedBatches)}
                />
                {batch}
              </label>
            ))
          }
          {selectedClasses.includes("B") &&
            batches.filter(batch => batch.startsWith("B")).map(batch => (
              <label key={batch}>
                <input
                  type="checkbox"
                  value={batch}
                  checked={selectedBatches.includes(batch)}
                  onChange={e => handleCheckboxChange(e, setSelectedBatches)}
                />
                {batch}
              </label>
            ))
          }
        </div>

        <h3>Roll Numbers (comma-separated):</h3>
        <input
          type="text"
          id="rollNumbers"
          name="rollNumbers"
          value={rollNumbers}
          onChange={e => setRollNumbers(e.target.value)}
          placeholder="e.g., 12345, 67890"
        />

        <h3>Schedule Announcement:</h3>
        <DatePicker
          selected={scheduledDate}
          onChange={date => setScheduledDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select date and time"
        />

        <div className="buttons">
          <button type="submit">Post Announcement</button>
          <button type="button" className="back-button" onClick={() => navigate('/professor/dashboard')}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcements;
