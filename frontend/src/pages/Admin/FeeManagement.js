import React, { useState } from 'react';
import './FeeManagement.css';

const FeeManagement = () => {
  // Initial static fee records with extra filtering fields.
  const initialFeeRecords = [
    { id: 1, rollNo: "STU1001", name: "Alice Brown", semester: "1", branch: "CE", class: "A", batch: "A1", amount: "$500", feeStatus: "Pending" },
    { id: 2, rollNo: "STU1002", name: "Bob Smith", semester: "2", branch: "IT", class: "B", batch: "B1", amount: "$550", feeStatus: "Paid" },
    { id: 3, rollNo: "STU1003", name: "Charlie Johnson", semester: "1", branch: "EC", class: "A", batch: "A2", amount: "$600", feeStatus: "Pending" },
    { id: 4, rollNo: "STU1004", name: "Daisy Ridley", semester: "3", branch: "CHEM", class: "B", batch: "B2", amount: "$500", feeStatus: "Pending" },
    { id: 5, rollNo: "STU1005", name: "Ethan Hunt", semester: "4", branch: "MECH", class: "A", batch: "A3", amount: "$650", feeStatus: "Paid" },
    { id: 6, rollNo: "STU1006", name: "Fiona Apple", semester: "3", branch: "IT", class: "A", batch: "A1", amount: "$700", feeStatus: "Pending" },
    { id: 7, rollNo: "STU1007", name: "George Martin", semester: "2", branch: "CE", class: "B", batch: "B4", amount: "$600", feeStatus: "Pending" },
    { id: 8, rollNo: "STU1008", name: "Helen Mirren", semester: "1", branch: "MECH", class: "B", batch: "B1", amount: "$500", feeStatus: "Pending" }
  ];

  // States for fee records and dropdown filters
  const [feeRecords, setFeeRecords] = useState(initialFeeRecords);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  
  // States for voucher generation
  const [voucherType, setVoucherType] = useState(''); // "Odd" or "Even"
  const [voucherResult, setVoucherResult] = useState([]);

  // Dropdown options for filtering
  const semesters = ["", "1", "2", "3", "4", "5", "6", "7", "8"];
  const branches = ["", "CE", "IT", "EC", "CHEM", "MECH"];
  const classes = ["", "A", "B"];
  
  // Update batch options based on selected class.
  let batches = [];
  if (selectedClass === "A") {
    batches = ["", "A1", "A2", "A3", "A4"];
  } else if (selectedClass === "B") {
    batches = ["", "B1", "B2", "B3", "B4"];
  } else {
    batches = [""]; // show all if no class is selected
  }
  
  // Compute the list of pending fee records based on the filters.
  const filteredRecords = feeRecords.filter(record => {
    return (
      record.feeStatus === "Pending" &&
      (selectedSemester === '' ? true : record.semester === selectedSemester) &&
      (selectedBranch === '' ? true : record.branch === selectedBranch) &&
      (selectedClass === '' ? true : record.class === selectedClass) &&
      (selectedBatch === '' ? true : record.batch === selectedBatch)
    );
  });

  // Handler to mark a fee record as Paid.
  const handleMarkAsPaid = (recordId) => {
    setFeeRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId ? { ...record, feeStatus: "Paid" } : record
      )
    );
  };

  // Handler to generate fee vouchers based on odd or even semester.
  const handleGenerateVoucher = () => {
    if (!voucherType) return;
    const result = feeRecords.filter(record => {
      const sem = parseInt(record.semester, 10);
      if (voucherType === "Odd") {
        return sem % 2 !== 0;
      } else {
        return sem % 2 === 0;
      }
    });
    setVoucherResult(result);
  };

  return (
    <div className="fee-management">
      <header className="fee-management-header">
        <h1>Fee Management</h1>
      </header>
      
      {/* Filter Section for Pending Fee Records */}
      <section className="filter-section">
        <div className="filter-group">
          <label>Semester:</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem === '' ? "All" : sem}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Branch:</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            {branches.map((br) => (
              <option key={br} value={br}>
                {br === '' ? "All" : br}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedBatch(''); // Reset batch when class changes
            }}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls === '' ? "All" : cls}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Batch:</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {batches.map((bat) => (
              <option key={bat} value={bat}>
                {bat === '' ? "All" : bat}
              </option>
            ))}
          </select>
        </div>
      </section>
      
      {/* Pending Fee Records Table */}
      <section className="view-fee-records-section">
        <h2>Fee Records (Pending)</h2>
        <table className="fee-records-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>Class</th>
              <th>Batch</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.rollNo}</td>
                  <td>{record.name}</td>
                  <td>{record.semester}</td>
                  <td>{record.branch}</td>
                  <td>{record.class}</td>
                  <td>{record.batch}</td>
                  <td>{record.amount}</td>
                  <td>{record.feeStatus}</td>
                  <td>
                    <button
                      className="markPaidBtn"
                      onClick={() => handleMarkAsPaid(record.id)}
                    >
                      Mark as Paid
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No pending fee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      
      {/* Voucher Generation Section */}
      <section className="voucher-section">
        <h2>Generate Fee Voucher</h2>
        <div className="voucher-controls">
          <label>Select Semester Type:</label>
          <select
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Odd">Odd Semesters</option>
            <option value="Even">Even Semesters</option>
          </select>
          <button className="generateVoucherBtn" onClick={handleGenerateVoucher}>
            Generate Voucher
          </button>
        </div>
        {/* Display voucher results */}
        {voucherType && voucherResult.length > 0 && (
          <div className="voucher-result">
            <h3>Voucher List ({voucherType} Semesters)</h3>
            <table className="voucher-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Semester</th>
                  <th>Branch</th>
                  <th>Class</th>
                  <th>Batch</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {voucherResult.map(record => (
                  <tr key={record.id}>
                    <td>{record.rollNo}</td>
                    <td>{record.name}</td>
                    <td>{record.semester}</td>
                    <td>{record.branch}</td>
                    <td>{record.class}</td>
                    <td>{record.batch}</td>
                    <td>{record.feeStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {voucherType && voucherResult.length === 0 && (
          <div className="voucher-result">
            <p>No student records found for {voucherType} semesters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FeeManagement;
